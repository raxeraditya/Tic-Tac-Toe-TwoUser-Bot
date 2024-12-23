import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <motion.button
      className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700
        hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isDark ? (
        <Sun className="w-6 h-6 text-yellow-500" />
      ) : (
        <Moon className="w-6 h-6 text-gray-700" />
      )}
    </motion.button>
  );
}