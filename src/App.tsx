import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sun, Moon, Layout, Palette, Terminal, FileJson, Hash, Code, Ruler, Shapes, Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import ColorConverter from './components/tools/ColorConverter';
import GradientGenerator from './components/tools/GradientGenerator';
import JsonViewer from './components/tools/JsonViewer';
import RegexTester from './components/tools/RegexTester';
import CodeSnippets from './components/tools/CodeSnippets';
import UnitConverter from './components/tools/UnitConverter';
import SvgGenerator from './components/tools/SvgGenerator';

interface Tool {
  id: string;
  icon: React.ElementType;
  name: string;
  component: React.ComponentType;
}

const tools: Tool[] = [
  { id: 'colors', icon: Palette, name: 'Color Converter', component: ColorConverter },
  { id: 'gradients', icon: Layout, name: 'Gradient Generator', component: GradientGenerator },
  { id: 'json', icon: FileJson, name: 'JSON Viewer', component: JsonViewer },
  { id: 'regex', icon: Hash, name: 'Regex Tester', component: RegexTester },
  { id: 'snippets', icon: Code, name: 'Code Snippets', component: CodeSnippets },
  { id: 'units', icon: Ruler, name: 'Unit Converter', component: UnitConverter },
  { id: 'svg', icon: Shapes, name: 'SVG Generator', component: SvgGenerator },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTool, setActiveTool] = useState(tools[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const ActiveComponent = tools.find(tool => tool.id === activeTool)?.component || tools[0].component;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-300 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row">
        {/* Mobile header */}
        <header className="sm:hidden bg-white dark:bg-dark-200 border-b border-gray-200 dark:border-dark-100 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-100"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">DevFlow</h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-white dark:bg-dark-200 hover:bg-gray-100 dark:hover:bg-dark-100"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </header>

        {/* Sidebar with mobile overlay */}
        <div className={`
          fixed inset-0 z-40 sm:relative sm:block
          ${isSidebarOpen ? 'block' : 'hidden'}
        `}>
          <div className="absolute inset-0 bg-black bg-opacity-50 sm:hidden" onClick={() => setIsSidebarOpen(false)} />
          <Sidebar 
            tools={tools}
            activeTool={activeTool}
            setActiveTool={(id) => {
              setActiveTool(id);
              setIsSidebarOpen(false);
            }}
          />
        </div>
        
        {/* Main content */}
        <main className="flex-1 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Desktop header */}
            <div className="hidden sm:flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                DevFlow
              </h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-white dark:bg-dark-200 shadow-md hover:shadow-lg transition-all duration-300"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-dark-200 rounded-xl shadow-xl p-4 sm:p-6"
              >
                <ActiveComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;