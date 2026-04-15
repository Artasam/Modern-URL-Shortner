import { motion } from 'framer-motion';
import { useGetUrls } from '../../../entities/url/hooks';
import { Globe, ArrowRight, ExternalLink } from 'lucide-react';
import { API_BASE_URL } from '../../../shared/lib/api';

export function UrlList() {
  const { data: urls, isLoading, isError } = useGetUrls();

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12 grid gap-4 grid-cols-1 md:grid-cols-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="glass-card p-6 h-32 animate-shimmer rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (isError || !urls) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 text-center text-red-400">
        <p>Failed to load recent URLs.</p>
      </div>
    );
  }

  if (urls.length === 0) {
    return null;
  }

  // Reverse so newest are first
  const displayUrls = [...urls].reverse();

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 mb-24">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 px-2">
        <Globe className="text-blue-400" /> Recent Links
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {displayUrls.map((url, i) => (
          <motion.div
            key={url.short_url}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass p-5 rounded-xl hover:bg-white/[0.08] transition-colors border-white/5 relative group"
          >
            <div className="truncate max-w-[90%] text-gray-400 text-sm mb-2" title={url.long_url}>
              {url.long_url}
            </div>
            <div className="flex items-center justify-between">
              <a 
                href={`${API_BASE_URL}/${url.short_url}`}
                target="_blank"
                rel="noreferrer"
                className="text-lg font-medium text-blue-400 flex items-center gap-2 group-hover:text-blue-300 transition-colors"
              >
                /{url.short_url}
                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
