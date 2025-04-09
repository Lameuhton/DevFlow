import React, { useState } from 'react';

const JsonViewer = () => {
  const [input, setInput] = useState('{\n  "example": "Paste your JSON here"\n}');
  const [formatted, setFormatted] = useState('');
  const [error, setError] = useState('');

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError('Invalid JSON');
      setFormatted('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input JSON
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-[400px] p-4 font-mono text-sm border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-dark-100 dark:border-dark-100 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Formatted Output
          </label>
          <pre className={`w-full h-[400px] p-4 font-mono text-sm border rounded-lg overflow-auto dark:bg-dark-100 dark:border-dark-100 dark:text-white ${
            error ? 'border-red-500' : ''
          }`}>
            {error ? error : formatted}
          </pre>
        </div>
      </div>

      <button
        onClick={formatJson}
        className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        Format JSON
      </button>
    </div>
  );
};

export default JsonViewer;