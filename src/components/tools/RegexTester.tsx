import React, { useState, useEffect } from 'react';

const RegexTester = () => {
  const [pattern, setPattern] = useState('^[A-Za-z0-9]+$');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Test123\nABC456\n123');
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const regex = new RegExp(pattern, flags);
      const found = text.match(regex) || [];
      setMatches(found);
      setError('');
    } catch (e) {
      setError('Invalid regular expression');
      setMatches([]);
    }
  }, [pattern, flags, text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pattern
            </label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-dark-100 dark:border-dark-100 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Flags
            </label>
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-dark-100 dark:border-dark-100 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Test Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-48 p-4 font-mono text-sm border rounded-lg dark:bg-dark-100 dark:border-dark-100 dark:text-white"
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Matches {matches.length > 0 && `(${matches.length})`}
          </h3>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="p-4 bg-gray-100 dark:bg-dark-100 rounded-lg min-h-[200px]">
              {matches.map((match, index) => (
                <div
                  key={index}
                  className="mb-2 p-2 bg-white dark:bg-dark-200 rounded border dark:border-dark-100"
                >
                  <code className="font-mono dark:text-white">{match}</code>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegexTester;