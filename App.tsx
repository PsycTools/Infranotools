import React, { useState } from 'react';
import { TOOLS, CATEGORIES, APP_NAME } from './constants';
import { Tool } from './types';
import Header from './components/Header';
import ParticleBackground from './components/ParticleBackground';
import ToolCard from './components/ToolCard';
import { ToolLogic } from './components/ToolLogic';
import { Search, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const goHome = () => {
    setCurrentTool(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-100 relative overflow-x-hidden selection:bg-blood-500/30">
      <ParticleBackground />
      
      <Header 
        soundEnabled={soundEnabled} 
        toggleSound={() => setSoundEnabled(!soundEnabled)} 
        goHome={goHome}
      />

      <main className="flex-grow container mx-auto px-4 md:px-8 lg:px-12 py-16 relative z-10 max-w-7xl">
        <AnimatePresence mode="wait">
          {!currentTool ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero Section */}
              <div className="text-center mb-20 md:mb-24">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-4 drop-shadow-2xl">
                    <span className="text-gradient">{APP_NAME}</span>
                  </h1>
                </motion.div>
                
                <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6 mt-4 tracking-tight">
                  Forged in Fire. Built to Break Limits.
                </h2>
                
                <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed text-lg md:text-xl font-light">
                  50+ powerful utilities for developers, creators, and analysts. Hell-forged performance without the clutter.
                </p>

                {/* Modern Search Bar */}
                <div className="mt-12 max-w-3xl mx-auto relative group">
                  <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-gray-500 group-focus-within:text-blood-500 transition-colors" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search tools (e.g., 'Youtube', 'Writer', 'PDF')..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-surface-200/80 backdrop-blur-xl border border-white/10 text-white pl-16 pr-6 py-6 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blood-500/50 focus:border-blood-500/50 transition-all placeholder-gray-500 shadow-2xl text-lg"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-blood-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500 blur-xl -z-10" />
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap justify-center gap-3 mt-8 max-w-4xl mx-auto">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border backdrop-blur-sm ${
                        selectedCategory === cat 
                          ? 'bg-blood-600/20 border-blood-600 text-blood-400 shadow-[0_0_15px_rgba(255,59,59,0.3)]' 
                          : 'bg-surface-200/50 border-white/5 text-gray-400 hover:border-white/20 hover:text-white hover:bg-surface-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
                {filteredTools.map(tool => (
                  <ToolCard key={tool.id} tool={tool} onClick={(t) => {
                     setCurrentTool(t);
                     window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} />
                ))}
              </div>
              
              {filteredTools.length === 0 && (
                <div className="text-center text-gray-500 py-32 bg-surface-200/20 rounded-3xl border border-dashed border-white/5">
                  <p className="text-xl">No tools found matching your search.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="tool-view"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="py-4 max-w-5xl mx-auto"
            >
              <button 
                onClick={goHome}
                className="group flex items-center gap-3 text-gray-500 hover:text-white mb-10 transition-colors px-6 py-3 rounded-2xl hover:bg-white/5 w-fit border border-transparent hover:border-white/5"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
                <span className="font-semibold text-lg">Back to Tools</span>
              </button>

              <div className="bg-surface-200/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 lg:p-14 shadow-2xl relative overflow-hidden">
                 {/* Subtle gradient splash in background */}
                 <div className="absolute -top-32 -right-32 w-96 h-96 bg-blood-600/10 blur-[120px] pointer-events-none rounded-full" />
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blood-500/50 to-transparent opacity-50" />

                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12 relative z-10 border-b border-white/5 pb-10">
                  <div className="w-24 h-24 rounded-3xl bg-surface-300 border border-white/10 flex items-center justify-center shadow-xl flex-shrink-0">
                    {React.createElement(currentTool.icon, { size: 40, className: "text-blood-500" })}
                  </div>
                  <div>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-3 tracking-tight">{currentTool.name}</h2>
                    <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl">{currentTool.description}</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <ToolLogic tool={currentTool} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/5 bg-surface-400/80 backdrop-blur-md py-16 text-center text-gray-600 text-sm">
        <div className="container mx-auto">
          <p className="mb-3 font-semibold text-gray-500">Infrano Tools &copy; {new Date().getFullYear()}</p>
          <p className="opacity-40 font-mono text-xs tracking-widest uppercase">Forged in Fire. Built to Break Limits.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;