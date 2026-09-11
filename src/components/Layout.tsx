import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';
import AgentChat from './AgentChat';
import { getUserProfile } from '../lib/profile';
import { cn } from '../lib/utils';

export default function Layout() {
  const location = useLocation();
  const [theme, setTheme] = useState(getUserProfile().theme);
  const hideChrome = ['/', '/lesson', '/focus'].includes(location.pathname);

  useEffect(() => {
    const handleUpdate = () => setTheme(getUserProfile().theme);
    window.addEventListener('profile_updated', handleUpdate);
    return () => window.removeEventListener('profile_updated', handleUpdate);
  }, []);

  return (
    <div className={cn(
      "min-h-screen flex flex-col w-full xl:max-w-[1600px] mx-auto shadow-xl overflow-x-hidden",
      `theme-${theme}`,
      theme === 'midnight' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
    )}>
      {!hideChrome && <Header />}
      
      <main className="flex-1 pb-20 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {!hideChrome && <BottomNav />}
      <AgentChat />
    </div>
  );
}
