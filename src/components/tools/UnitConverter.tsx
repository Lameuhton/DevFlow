import React, { useState, useEffect } from 'react';

type Unit = 'px' | 'rem' | 'em' | 'vh' | 'vw' | '%';

const UnitConverter = () => {
  const [baseValue, setBaseValue] = useState(16);
  const [inputValue, setInputValue] = useState(16);
  const [inputUnit, setInputUnit] = useState<Unit>('px');
  const [results, setResults] = useState<Record<Unit, number>>({
    px: 16,
    rem: 1,
    em: 1,
    vh: 0,
    vw: 0,
    '%': 0,
  });

  useEffect(() => {
    const calculateConversions = () => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      const pxValue = (() => {
        switch (inputUnit) {
          case 'px': return inputValue;
          case 'rem': return inputValue * baseValue;
          case 'em': return inputValue * baseValue;
          case 'vh': return (inputValue * viewportHeight) / 100;
          case 'vw': return (inputValue * viewportWidth) / 100;
          case '%': return (inputValue * baseValue) / 100;
          default: return inputValue;
        }
      })();

      setResults({
        px: pxValue,
        rem: pxValue / baseValue,
        em: pxValue / baseValue,
        vh: (pxValue / viewportHeight) * 100,
        vw: (pxValue / viewportWidth) * 100,
        '%': (pxValue / baseValue) * 100,
      });
    };

    calculateConversions();
    window.addEventListener('resize', calculateConversions);
    return () => window.removeEventListener('resize', calculateConversions);
  }, [inputValue, inputUnit, baseValue]);

  const units: Unit[] = ['px', 'rem', 'em', 'vh', 'vw', '%'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Base Font Size (px)
            </label>
            <input
              type="number"
              value={baseValue}
              onChange={(e) => setBaseValue(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg dark:bg-dark-100 dark:border-dark-100 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Input Value
            </label>
            <div className="flex space-x-2">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(Number(e.target.value))}
                className="flex-1 px-3 py-2 border rounded-lg dark:bg-dark-100 dark:border-dark-100 dark:text-white"
              />
              <select
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value as Unit)}
                className="px-3 py-2 border rounded-lg dark:bg-dark-100 dark:border-dark-100 dark:text-white"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {units.map((unit) => (
            <div
              key={unit}
              className="p-4 bg-gray-100 dark:bg-dark-100 rounded-lg"
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                {unit}
              </h3>
              <p className="text-lg font-mono dark:text-white">
                {results[unit].toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;