import React, { useState, useCallback } from 'react';

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

const ColorConverter = () => {
  const [color, setColor] = useState('#3B82F6');
  
  const rgb = hexToRgb(color);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const handleColorChange = useCallback((value: string) => {
    const formattedColor = value.startsWith('#') ? value : `#${value}`;
    setColor(formattedColor);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div 
          className="w-full sm:w-20 h-20 rounded-lg shadow-lg" 
          style={{ backgroundColor: color }}
          aria-label="Color preview"
        />
        <div className="w-full sm:w-auto space-y-2">
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-full"
            aria-label="Color picker"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg dark:bg-dark-100 dark:border-dark-100 dark:text-white"
            aria-label="Hex color input"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-100 dark:bg-dark-100 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">HEX</h3>
          <p className="text-base sm:text-lg font-mono dark:text-white break-all">{color}</p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-dark-100 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">RGB</h3>
          <p className="text-base sm:text-lg font-mono dark:text-white break-all">
            {rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'Invalid color'}
          </p>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-dark-100 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">HSL</h3>
          <p className="text-base sm:text-lg font-mono dark:text-white break-all">
            {hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : 'Invalid color'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;