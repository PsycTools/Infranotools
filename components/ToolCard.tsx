import React from 'react';
import { motion } from 'framer-motion';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  onClick: (tool: Tool) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const Icon = tool.icon;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => onClick(tool)}
      className="group cursor-pointer relative overflow-hidden bg-surface-200 hover:bg-surface-100 rounded-3xl border border-white/5 hover:border-blood-500/30 transition-all duration-300 p-8 flex flex-col items-start gap-6 shadow-xl hover:shadow-blood-900/10"
    >
      {/* Icon Box */}
      <div className="w-14 h-14 rounded-2xl bg-surface-300 border border-white/10 flex items-center justify-center group-hover:bg-blood-900/20 group-hover:border-blood-500/20 transition-all duration-300 shadow-md">
        <Icon className="w-7 h-7 text-gray-400 group-hover:text-blood-500 transition-colors duration-300" />
      </div>

      {/* Text Content */}
      <div className="flex-grow">
        <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-blood-100 transition-colors tracking-tight">
          {tool.name}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors line-clamp-2">
          {tool.description}
        </p>
      </div>

      {/* Decorative Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default ToolCard;