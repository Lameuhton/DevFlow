import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';

const snippets = {
  'React Component': `import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const Component: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
};`,
  'Custom Hook': `import { useState, useEffect } from 'react';

export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
};`,
  'API Client': `const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = {
  async get<T>(endpoint: string) {
    const response = await fetch(\`\${API_URL}\${endpoint}\`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json() as Promise<T>;
  },

  async post<T>(endpoint: string, data: unknown) {
    const response = await fetch(\`\${API_URL}\${endpoint}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json() as Promise<T>;
  },
};`,
};

const CodeSnippets = () => {
  const [selectedSnippet, setSelectedSnippet] = useState(Object.keys(snippets)[0]);
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        {Object.keys(snippets).map((name) => (
          <button
            key={name}
            onClick={() => setSelectedSnippet(name)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedSnippet === name
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-dark-100 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-200'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="rounded-lg overflow-hidden border dark:border-dark-100">
        <CodeMirror
          value={snippets[selectedSnippet]}
          height="400px"
          theme={isDarkMode ? githubDark : githubLight}
          extensions={[javascript({ typescript: true })]}
          editable={false}
        />
      </div>

      <button
        onClick={() => {
          navigator.clipboard.writeText(snippets[selectedSnippet]);
        }}
        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        Copy to Clipboard
      </button>
    </div>
  );
};

export default CodeSnippets;