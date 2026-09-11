import { motion } from 'motion/react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Trash2, 
  Home, 
  BookOpen, 
  MessageSquare, 
  Map, 
  Calendar, 
  Users, 
  Contact, 
  Sparkles, 
  Dna,
  ShieldCheck,
  Lock
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/authContext';
import { PermissionKey } from '../types';

export default function BottomNav() {
  const location = useLocation();
  const { checkPermission } = useAuth();
  const isSchedules = location.pathname === '/schedules';

  const rawNavItems: Array<{
    icon: any;
    label: string;
    to: string;
    permission: PermissionKey;
  }> = [
    { icon: Home, label: 'الرئيسية', to: '/dashboard', permission: 'VIEW_HOME' },
    { icon: Users, label: 'الدكاترة', to: '/doctors', permission: 'VIEW_DOCTORS' },
    { icon: Map, label: 'الجداول', to: '/schedules', permission: 'VIEW_SCHEDULES' },
    { icon: BookOpen, label: 'المقررات', to: '/courses', permission: 'VIEW_COURSES' },
    { icon: Sparkles, label: 'المحلل الذكي', to: '/lecture-analyzer', permission: 'VIEW_AI' },
    { icon: Calendar, label: 'التقويم', to: '/calendar', permission: 'VIEW_HOME' },
    { icon: MessageSquare, label: 'المنتدى', to: '/community', permission: 'VIEW_COMMUNITY' },
    { icon: Contact, label: 'المستخدمين', to: '/users', permission: 'MANAGE_USERS' },
    { icon: ShieldCheck, label: 'الإدارة', to: '/admin', permission: 'ACCESS_ADMIN_PORTAL' },
  ];

  // Filter items based on permission state (Allow, Lock, or Hide)
  const navItems = rawNavItems.filter((item) => {
    const state = checkPermission(item.permission);
    return state !== 'HIDE';
  });

  if (location.pathname === '/trash') {
    navItems.push({ icon: Trash2, label: 'سلة المهملات', to: '/trash', permission: 'VIEW_HOME' });
  }

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 z-50 border-t px-1 pb-safe-area-inset-bottom transition-colors duration-500",
      isSchedules ? "bg-[#0c0c0f] border-[#d4af37]/20" : "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-slate-200 dark:border-slate-800"
    )}>
      <div className="flex flex-nowrap items-center h-16 w-full max-w-5xl mx-auto relative px-2 lg:px-6 overflow-x-auto no-scrollbar scroll-smooth gap-1" style={{ WebkitOverflowScrolling: 'touch' }}>
        {navItems.map((item) => {
          const permState = checkPermission(item.permission);
          const isLocked = permState === 'LOCK';

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex flex-col flex-none items-center justify-center space-y-1 transition-all duration-300 min-w-[64px] px-2 h-full relative z-10",
                  isActive 
                    ? (isSchedules ? "text-[#d4af37]" : "text-emerald-600 dark:text-emerald-400") 
                    : (isSchedules ? "text-slate-600 hover:text-slate-400" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200")
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="relative">
                    <item.icon className={cn("w-5 h-5 transition-all", isActive && "stroke-[2.5px] scale-110")} />
                    {isLocked && (
                      <span className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-0.5">
                        <Lock className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold leading-none whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navIndicator"
                      className={cn(
                        "absolute inset-0 -top-1 rounded-2xl -z-10 mx-1 mb-1 transition-colors",
                        isSchedules ? "bg-[#d4af37]/10" : "bg-emerald-50/80 dark:bg-emerald-950/40"
                      )}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", damping: 15, stiffness: 300 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
