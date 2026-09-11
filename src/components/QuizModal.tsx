import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Competition } from '../data/competitions';
import { Award, Timer, CheckCircle, XCircle } from 'lucide-react';

export default function QuizModal({ competition, onClose }: { competition: Competition, onClose: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !finished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !finished) {
      setFinished(true);
    }
  }, [timeLeft, finished]);

  const handleAnswer = (index: number) => {
    if (index === competition.questions[currentQuestion].correct) {
      setScore(s => s + 100 + (timeLeft * 5));
    }
    if (currentQuestion < competition.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl"
      >
        {finished ? (
          <div className="text-center py-10">
            <Award className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
            <h2 className="text-2xl font-black text-slate-900">انتهت المسابقة!</h2>
            <p className="text-xl font-bold text-slate-600 mt-2">نتيجتك النهائية: {score}</p>
            <button onClick={onClose} className="mt-6 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold">إغلاق</button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-emerald-600">سؤال {currentQuestion + 1} / {competition.questions.length}</span>
              <div className="flex items-center gap-2 text-rose-500 font-black bg-rose-50 px-3 py-1 rounded-full">
                <Timer size={18} /> {timeLeft}
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">{competition.questions[currentQuestion].question}</h3>
            <div className="grid gap-3">
              {competition.questions[currentQuestion].options.map((option, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="p-4 bg-slate-50 rounded-2xl text-right font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors border border-slate-100"
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
