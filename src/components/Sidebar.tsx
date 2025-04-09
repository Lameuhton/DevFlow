import React from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface Tool {
  id: string;
  icon: React.ElementType;
  name: string;
}

interface SidebarProps {
  tools: Tool[];
  activeTool: string;
  setActiveTool: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tools, activeTool, setActiveTool }) => {
  return (
    <aside className="relative z-50 w-64 sm:w-20 lg:w-64 h-[100dvh] bg-white dark:bg-dark-200 border-r border-gray-200 dark:border-dark-100">
      <div className="sticky top-0 p-4">
        <div className="flex items-center space-x-2 mb-8">
          <Terminal className="w-8 h-8 text-primary-500" />
          <span className="hidden lg:block text-xl font-bold text-gray-900 dark:text-white">
            DevFlow
          </span>
        </div>

        <nav className="space-y-1">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const isActive = tool.id === activeTool;

            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`
                  relative w-full flex items-center space-x-3 px-3 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-100'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-primary-500 rounded-lg"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  />
                )}
                
                <Icon className="w-6 h-6 relative z-10" />
                <span className="block sm:hidden lg:block relative z-10 font-medium truncate">
                  {tool.name}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;