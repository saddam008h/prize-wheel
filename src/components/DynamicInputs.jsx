import React, { useState, useEffect, useRef } from 'react';

export default function DynamicInputs({ entries, handleInputChange, handleAddEntry, handleDeleteEntry }) {
  const lastEntryHasValue = entries.length > 0 && entries[entries.length - 1].value.trim() !== '';
  const entriesSectionRef = useRef(null);

  useEffect(() => {
    if (entriesSectionRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = entriesSectionRef.current;
      const scrollTarget = Math.min(scrollHeight - clientHeight, scrollTop + 100); // Adjust as per your requirement
      animateScroll(entriesSectionRef.current, scrollTop, scrollTarget);
    }
  }, [entries]);

  const animateScroll = (element, from, to, duration = 300) => {
    let start = null;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      element.scrollTop = from + (to - from) * percentage;

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <div id="entries-section" className="max max-h-[400px] overflow-y-auto" ref={entriesSectionRef}>
      {entries.map((entry, index) => (
        <div key={entry.id} className='flex items-center mt-3'>
          <input
            type="text"
            className="bg-gray-100 border focus:border-gray-500 outline-none !ring-0 border-gray-300 text-gray-900 text-sm rounded-lg p-2"
            placeholder="John"
            value={entry.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            required
          />
          {index !== entries.length - 1 && ( // Render the delete button for entries except the last one
            <button
              className="ml-3 text-red-500 hover:text-red-600 cursor-pointer text-sm font-semibold"
              onClick={() => handleDeleteEntry(index)}
            >
              Delete
            </button>
          )}

          {index === entries.length - 1 && ( // Render the delete button for entries except the last one
            <button
              className={`px-4 py-1.5 ml-3 bg-gray-600 rounded-lg text-white ${lastEntryHasValue ? 'opacity-100 hover:bg-gray-700 ' : 'opacity-50 cursor-not-allowed'}`}
              onClick={lastEntryHasValue ? handleAddEntry : undefined}
              disabled={!lastEntryHasValue}
            >
              Add Entry
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
