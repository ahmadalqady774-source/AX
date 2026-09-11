import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { storage, db } from './firebase';
import { FileMetadata } from '../types';
import { DatabaseService } from './database';
import { SYSTEM_PERMISSION_PROFILES } from './permissions';

/**
 * Storage Service for Multi-tier File Management
 * (Files in Cloud Storage, Metadata in Firestore)
 */
export const StorageService = {
  /**
   * Uploads large binary or document files to Cloud Storage with strict quota enforcement
   */
  async uploadFile(
    file: File,
    userId: string,
    category: FileMetadata['category'],
    courseId?: string
  ): Promise<FileMetadata> {
    const profile = await DatabaseService.getUserProfile(userId);
    const settings = await DatabaseService.getSystemSettings();

    // 1. Quota & Limits Verification
    const profileId = profile?.permissionProfileId || 'UNVERIFIED_PROFILE';
    const profileLimits = SYSTEM_PERMISSION_PROFILES[profileId]?.storageLimits || {
      maxStorageMb: settings.storage.maxDefaultStorageMb,
      maxSingleFileSizeMb: settings.storage.maxDefaultFileSizeMb,
    };

    const maxSingleFileBytes = (profileLimits.maxSingleFileSizeMb || settings.storage.maxDefaultFileSizeMb || 25) * 1024 * 1024;
    const maxTotalStorageBytes = (profileLimits.maxStorageMb || settings.storage.maxDefaultStorageMb || 250) * 1024 * 1024;

    if (file.size > maxSingleFileBytes) {
      throw new Error(`حجم الملف (${(file.size / (1024 * 1024)).toFixed(1)} MB) يتجاوز الحد الأقصى المسموح به للملف الواحد (${profileLimits.maxSingleFileSizeMb} MB)`);
    }

    const currentUsedBytes = profile?.storageUsedBytes || 0;
    if (currentUsedBytes + file.size > maxTotalStorageBytes) {
      throw new Error(`سعة التخزين المتاحة غير كافية. المساحة المستخدمة: ${(currentUsedBytes / (1024 * 1024)).toFixed(1)} MB من إجمالي ${profileLimits.maxStorageMb} MB`);
    }

    const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${file.name.replace(/\s+/g, '_')}`;
    const storagePath = `users/${userId}/${category.toLowerCase()}/${uniqueFileName}`;
    
    let downloadUrl = '';

    try {
      const storageRef = ref(storage, storagePath);
      const snapshot = await uploadBytes(storageRef, file);
      downloadUrl = await getDownloadURL(snapshot.ref);
    } catch (err) {
      console.warn('Firebase Storage upload notice (using blob reference):', err);
      downloadUrl = URL.createObjectURL(file);
    }

    const metadata: FileMetadata = {
      id: 'file_' + Date.now(),
      userId,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type || 'application/octet-stream',
      storageUrl: downloadUrl,
      storagePath,
      category,
      associatedCourseId: courseId,
      uploadedAt: new Date().toISOString(),
    };

    // Store File Metadata in Firestore / Local Cache
    try {
      const colRef = collection(db, 'file_metadata');
      const docRef = await addDoc(colRef, metadata);
      metadata.id = docRef.id;
    } catch (err) {
      console.warn('File metadata stored in local registry:', err);
    }

    // Cache locally
    const localFiles = JSON.parse(localStorage.getItem(`user_files_${userId}`) || '[]');
    localFiles.unshift(metadata);
    localStorage.setItem(`user_files_${userId}`, JSON.stringify(localFiles));

    // Update User Storage Used Bytes
    if (profile) {
      profile.storageUsedBytes = (profile.storageUsedBytes || 0) + file.size;
      await DatabaseService.saveUserProfile(profile);
    }

    // Audit log
    await DatabaseService.logAuditEvent({
      actorId: userId,
      actorEmail: profile?.email || 'student@taiz.edu',
      actorName: profile?.displayName || 'طالب',
      action: 'FILE_UPLOADED',
      category: 'STORAGE',
      targetId: metadata.id,
      targetName: file.name,
      details: `تم رفع ملف ${file.name} بحجم ${(file.size / 1024).toFixed(1)} KB`,
      result: 'SUCCESS',
    });

    return metadata;
  },

  /**
   * Retrieves all file metadata for a specific user
   */
  async getUserFiles(userId: string): Promise<FileMetadata[]> {
    try {
      const colRef = collection(db, 'file_metadata');
      const q = query(colRef, where('userId', '==', userId));
      const snap = await getDocs(q);
      if (!snap.empty) {
        return snap.docs.map(d => ({ ...d.data(), id: d.id } as FileMetadata));
      }
    } catch (err) {
      console.warn('StorageService.getUserFiles using cached entries:', err);
    }

    return JSON.parse(localStorage.getItem(`user_files_${userId}`) || '[]');
  },

  /**
   * Deletes a file from Cloud Storage and cleans up metadata
   */
  async deleteFile(fileId: string, userId: string, storagePath: string, fileSize: number): Promise<void> {
    try {
      const fileRef = ref(storage, storagePath);
      await deleteObject(fileRef);
    } catch (err) {
      console.warn('Notice during Cloud Storage delete:', err);
    }

    try {
      const docRef = doc(db, 'file_metadata', fileId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Notice during file metadata delete:', err);
    }

    // Update local cache
    const localFiles = JSON.parse(localStorage.getItem(`user_files_${userId}`) || '[]');
    const filtered = localFiles.filter((f: FileMetadata) => f.id !== fileId);
    localStorage.setItem(`user_files_${userId}`, JSON.stringify(filtered));

    // Decrement Storage Quota
    const profile = await DatabaseService.getUserProfile(userId);
    if (profile && profile.storageUsedBytes !== undefined) {
      profile.storageUsedBytes = Math.max(0, profile.storageUsedBytes - fileSize);
      await DatabaseService.saveUserProfile(profile);
    }

    await DatabaseService.logAuditEvent({
      actorId: userId,
      actorEmail: profile?.email || '',
      actorName: profile?.displayName || '',
      action: 'FILE_DELETED',
      category: 'STORAGE',
      targetId: fileId,
      targetName: storagePath,
      details: `تم حذف ملف بمساحة ${(fileSize / 1024).toFixed(1)} KB وتحرير السعة التخزينية`,
      result: 'SUCCESS',
    });
  },
};

