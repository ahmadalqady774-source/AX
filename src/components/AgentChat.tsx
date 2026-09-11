import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { toast } from 'sonner';
import { getTasks, addTask } from '../lib/tasks';

export default function AgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'agent', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, {role: 'user', text: userMsg}]);
    setLoading(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await response.json();

      if (data.toolCalls) {
        // Handle tool calls locally for this prototype
        for (const call of data.toolCalls) {
          if (call.name === 'getTasks') {
            const tasks = getTasks();
            setMessages(prev => [...prev, {role: 'agent', text: `لديك ${tasks.length} مهام حالياً: ${tasks.map(t => t.title).join(', ')}`}]);
          } else if (call.name === 'addTask') {
            const args = call.args as any;
            addTask(args);
            setMessages(prev => [...prev, {role: 'agent', text: `تمت إضافة المهمة: ${args.title}`}]);
          }
        }
      } else {
        setMessages(prev => [...prev, {role: 'agent', text: data.reply}]);
      }
    } catch (e) {
      toast.error('حدث خطأ في الاتصال بالوكيل.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 bg-emerald-600 p-4 rounded-full text-white shadow-lg hover:bg-emerald-700 transition-all z-50"
      >
        <Bot size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-3xl shadow-2xl border flex flex-col z-50 overflow-hidden"
          >
            <div className="p-4 bg-emerald-600 text-white flex justify-between items-center">
              <span className="font-bold">المساعد الجامعي</span>
              <button onClick={() => setIsOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-slate-100 self-end' : 'bg-emerald-50 self-start'}`}>
                  {m.text}
                </div>
              ))}
              {loading && <div className="text-xs text-slate-400">جاري التفكير...</div>}
            </div>

            <div className="p-4 border-t flex gap-2">
              <input 
                value={input} onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                placeholder="اسألني أي شيء..."
                className="flex-1 text-sm outline-none"
              />
              <button onClick={sendMessage} className="text-emerald-600"><Send size={20} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
