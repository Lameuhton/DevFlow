import React, { useState } from 'react';

const GradientGenerator = () => {
  const [color1, setColor1] = useState('#3B82F6');
  const [color2, setColor2] = useState('#EC4899');
  const [angle, setAngle] = useState(45);

  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
  };

  return (
    <div className="space-y-6">
      <div 
        className="h-48 rounded-xl shadow-lg"
        style={gradientStyle}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Color 1</span>
            <input
              type="color"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="block w-full mt-1"
            />
          </label>
          <input
            type="text"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-dark-100 dark:border-dark-100 dark:text-white"
          />
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Color 2</span>
            <input
              type="color"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="block w-full mt-1"
            />
          </label>
          <input
            type="text"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-dark-100 dark:border-dark-100 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Angle: {angle}°
        </label>
        <input
          type="range"
          min="0"
          max="360"
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="p-4 bg-gray-100 dark:bg-dark-100 rounded-lg">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">CSS Code</h3>
        <code className="block p-4 bg-white dark:bg-dark-200 rounded-lg text-sm font-mono dark:text-white">
          background: linear-gradient({angle}deg, {color1}, {color2});
        </code>
      </div>
    </div>
  );
};

export default GradientGenerator;