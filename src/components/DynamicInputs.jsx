import React, { useState, useEffect, useRef } from 'react';

export default function DynamicInputs({ entries, handleInputChange, handleAddEntry, handleDeleteEntry }) {
  const lastEntryHasValue = entries.length > 0 && entries[entries.length - 1].value.trim() !== '';
  const entriesSectionRef = useRef(null);
  const lastInputRef = useRef(null);

  useEffect(() => {
    if (entriesSectionRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = entriesSectionRef.current;
      const scrollTarget = Math.min(scrollHeight - clientHeight, scrollTop + 100); // Adjust as per your requirement
      animateScroll(entriesSectionRef.current, scrollTop, scrollTarget);
    }
    if (lastInputRef.current) {
      lastInputRef.current.focus();
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

  const handleKeyPress = (e, index) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (index === entries.length - 1 && lastEntryHasValue) {
        handleAddEntry();
      }
    }
  };

  return (
    <div id="entries-section" className="max-h-[350px] overflow-y-auto" ref={entriesSectionRef}>
      {entries.map((entry, index) => (
        <div key={entry.id} className='flex items-center mt-3'>
          <input
            ref={index === entries.length - 1 ? lastInputRef : null}
            type="text"
            className={`border focus:border-gray-500 outline-none !ring-0 border-gray-300 text-gray-900 text-sm rounded-lg p-2 ${index !== entries.length - 1 ? "bg-gray-200":"bg-gray-100"}`}
            placeholder="John"
            value={entry.value}
            onChange={(e) => handleInputChange(index, e.target.value)}
            disabled={index !== entries.length - 1}
            onKeyPress={(e) => handleKeyPress(e, index)}
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
