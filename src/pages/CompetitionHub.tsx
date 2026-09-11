import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Calendar, Users, ArrowLeft } from 'lucide-react';
import { MOCK_COMPETITIONS, Competition } from '../data/competitions';
import QuizModal from '../components/QuizModal';
import { useNavigate } from 'react-router-dom';

export default function CompetitionHub() {
  const [selectedComp, setSelectedComp] = useState<Competition | null>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2"><Trophy className="text-emerald-500"/>غرفة المسابقات</h1>
        <button onClick={() => navigate(-1)} className="p-3 bg-white shadow-sm rounded-xl"><ArrowLeft size={20}/></button>
      </header>

      <div className="grid gap-4">
        {MOCK_COMPETITIONS.map(comp => (
          <motion.div key={comp.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">{comp.title}</h3>
              <p className="text-xs text-slate-500 font-bold">{comp.major} | المستوى {comp.level}</p>
            </div>
            <button 
              onClick={() => setSelectedComp(comp)}
              className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors"
            >
              انضم الآن
            </button>
          </motion.div>
        ))}
      </div>

      {selectedComp && (
        <QuizModal competition={selectedComp} onClose={() => setSelectedComp(null)} />
      )}
    </div>
  );
}
