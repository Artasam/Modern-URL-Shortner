import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShortenUrl } from '../../../entities/url/hooks';
import { Link, Loader2, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../../../shared/lib/api';

export function ShortenForm() {
  const [url, setUrl] = useState('');
  const shortenMutation = useShortenUrl();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      shortenMutation.mutate(url);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12 glass-card p-8 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-[-50%] left-[-10%] w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top,_var(--color-primary-glow)_0%,_transparent_50%)] pointer-events-none opacity-40 z-0"></div>
      
      <div className="relative z-10 text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Shorten Your <span className="text-blue-400">URL</span>
        </h1>
        <p className="text-gray-400">Enter a valid URL to generate a secure, tiny link instantly.</p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Link className="text-gray-400 h-5 w-5" />
          </div>
          <input
            type="url"
            name="long_url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very/long/path"
            required
            className="block w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all outline-none"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={shortenMutation.isPending}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {shortenMutation.isPending ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              Shorten <ArrowRight className="h-5 w-5" />
            </>
          )}
        </motion.button>
      </form>

      <AnimatePresence>
        {shortenMutation.isSuccess && shortenMutation.data && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="relative z-10 glass rounded-xl p-6 mt-6 flex items-center justify-between border-green-500/30 bg-green-500/5"
          >
            <div>
              <p className="text-sm text-gray-400 mb-1">Your shortened link:</p>
              <a 
                href={`${API_BASE_URL}/${shortenMutation.data.short_url}`} 
                target="_blank" 
                rel="noreferrer"
                className="text-xl font-medium text-blue-400 hover:text-blue-300 transition-colors"
                title={shortenMutation.data.long_url}
              >
                {API_BASE_URL}/{shortenMutation.data.short_url}
              </a>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigator.clipboard.writeText(`${API_BASE_URL}/${shortenMutation.data.short_url}`)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
            >
              Copy
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
