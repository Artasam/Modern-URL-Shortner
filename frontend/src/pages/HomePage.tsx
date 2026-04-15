import { Background3D } from '../shared/ui/Background3D';
import { ShortenForm } from '../features/shortener/ui/ShortenForm';
import { UrlList } from '../features/shortener/ui/UrlList';
import { motion } from 'framer-motion';

export function HomePage() {
  return (
    <main className="min-h-screen pt-20 px-4 pb-12 relative font-sans">
      <Background3D />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="container mx-auto"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </div>
          
          <ShortenForm />
          <UrlList />
        </div>
      </motion.div>
    </main>
  );
}
