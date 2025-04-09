import React, { useState } from 'react';

type Pattern = 'waves' | 'circles' | 'grid' | 'dots';

const SvgGenerator = () => {
  const [pattern, setPattern] = useState<Pattern>('waves');
  const [color1, setColor1] = useState('#3B82F6');
  const [color2, setColor2] = useState('#EC4899');
  const [size, setSize] = useState(20);

  const generatePattern = () => {
    switch (pattern) {
      case 'waves':
        return `
          <path d="M0 ${size * 2}c${size / 2} 0 ${size / 2} -${size} ${size} -${size}s${size / 2} ${size} ${size} ${size} ${size / 2} ${size}" 
                fill="none" stroke="${color1}" stroke-width="1" />
          <path d="M0 ${size * 3}c${size / 2} 0 ${size / 2} -${size} ${size} -${size}s${size / 2} ${size} ${size} ${size} ${size / 2} ${size}" 
                fill="none" stroke="${color2}" stroke-width="1" />
        `;
      case 'circles':
        return `
          <circle cx="${size}" cy="${size}" r="${size / 2}" fill="${color1}" />
          <circle cx="${size * 3}" cy="${size * 3}" r="${size / 2}" fill="${color2}" />
        `;
      case 'grid':
        return `
          <path d="M${size} 0v${size * 4}" stroke="${color1}" stroke-width="1" />
          <path d="M${size * 2} 0v${size * 4}" stroke="${color1}" stroke-width="1" />
          <path d="M${size * 3} 0v${size * 4}" stroke="${color1}" stroke-width="1" />
          <path d="M0 ${size}h${size * 4}" stroke="${color2}" stroke-width="1" />
          <path d="M0 ${size * 2}h${size * 4}" stroke="${color2}" stroke-width="1" />
          <path d="M0 ${size * 3}h${size * 4}" stroke="${color2}" stroke-width="1" />
        `;
      case 'dots':
        return `
          <circle cx="${size}" cy="${size}" r="2" fill="${color1}" />
          <circle cx="${size * 2}" cy="${size * 2}" r="2" fill="${color2}" />
          <circle cx="${size * 3}" cy="${size}" r="2" fill="${color1}" />
          <circle cx="${size}" cy="${size * 3}" r="2" fill="${color2}" />
          <circle cx="${size * 3}" cy="${size * 3}" r="2" fill="${color1}" />
        `;
      default:
        return '';
    }
  };

  const svgCode = `<svg width="100" height="100" viewBox="0 0 ${size * 4} ${size * 4}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="pattern" width="${size * 4}" height="${size * 4}" patternUnits="userSpaceOnUse">
      ${generatePattern()}
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#pattern)" />
</svg>`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pattern
            </label>
            <select
              value={pattern}
              onChange={(e) => setPattern(e.target.value as Pattern)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-dark-100 dark:border-dark-100 dark:text-white"
            >
              <option value="waves">Waves</option>
              <option value="circles">Circles</option>
              <option value="grid">Grid</option>
              <option value="dots">Dots</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color 1
              </label>
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color 2
              </label>
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Size: {size}
            </label>
            <input
              type="range"
              min="10"
              max="40"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="w-full aspect-square rounded-lg border dark:border-dark-100"
            dangerouslySetInnerHTML={{ __html: svgCode }}
          />
          
          <button
            onClick={() => {
              navigator.clipboard.writeText(svgCode);
            }}
            className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            Copy SVG Code
          </button>
        </div>
      </div>

      <div className="p-4 bg-gray-100 dark:bg-dark-100 rounded-lg">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">SVG Code</h3>
        <pre className="p-4 bg-white dark:bg-dark-200 rounded-lg overflow-auto">
          <code className="text-sm font-mono dark:text-white">{svgCode}</code>
        </pre>
      </div>
    </div>
  );
};

export default SvgGenerator;