import React, { useState } from 'react';
import DynamicInputs from './DynamicInputs';
import PrizeWheel from './PrizeWheel';

function WheelEntriesInput({ setWinners}) {
  const [entries, setEntries] = useState([{ id: 1, value: 'John', color: '#FF7F50' }]);
  const [segments, setSegments] = useState(['john ']);
  const [segColors, setSegColors] = useState(['#FF7F50']);
  const [update, setUpdate] = useState(0);
  const [numberOfDraws, setNumberOfDraws] = useState(0);
  

  // Define a list of colors
  const goodColors = [
    '#FF7F50', '#F0CF50', '#815CD1', '#3DA5E0', '#34A24F',
    '#F9AA1F', '#EC3F3F', '#FF9000', '#FF7F50', '#6495ED',
    '#4682B4', '#FFD700', '#ADFF2F', '#32CD32', '#008080',
    '#87CEEB', '#00BFFF', '#20B2AA', '#BA55D3', '#9400D3'
  ];

  const handleInputChange = (index, value) => {
    const updatedEntries = [...entries];
    updatedEntries[index].value = value;
    setEntries(updatedEntries);

    const updatedSegments = updatedEntries.map(entry => entry.value);
    setSegments(updatedSegments);

    const updatedSegColors = updatedEntries.map(entry => entry.color);
    setSegColors(updatedSegColors);
  };

  const handleAddEntry = () => {
    const newId = entries.length + 1;
    const colorIndex = (newId - 1) % goodColors.length;
    const color = goodColors[colorIndex];
    setEntries([...entries, { id: newId, value: '', color }]);

    setUpdate(prev => prev + 1); // Trigger re-render to update PrizeWheel

  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);

    // Remove the segment and color at the specified index
    const updatedSegments = [...segments];
    updatedSegments.splice(index, 1);
    setSegments(updatedSegments);

    const updatedSegColors = [...segColors];
    updatedSegColors.splice(index, 1);
    setSegColors(updatedSegColors);

    setUpdate(prev => prev + 1); // Trigger re-render to update PrizeWheel
  };
  
  const handleReset = ()=>{
    setNumberOfDraws(0);
    setWinners([]);
  }

  return (
    <div>
      <div className='flex justify-center items-center mt-5'>
        <div id='numberOfDraws' className='py-2 px-5 lg:px-40 bg-blue-400 rounded-full text-white font-semibold'>
          Number of Draws: {numberOfDraws}
        </div>
        <div onClick={handleReset} className='hidden lg:block py-2 px-5 text-gray-600 border border-gray-300 ml-5 rounded-full font-semibold hover:bg-gray-200 cursor-pointer transition-all'>
          Reset Draws & Winners 
        </div>
        <div onClick={handleReset} className='lg:hidden py-2 px-5 text-gray-600 border border-gray-300 ml-5 rounded-full font-semibold hover:bg-gray-200 cursor-pointer transition-all'>
          Reset
        </div>
      </div>
      <div className='flex flex-col-reverse lg:flex-row w-full mt-14 gap-3 lg:h-[590px]'>
        <div className='lg:w-1/3 '>
          <div className='bg-gray-100 rounded-lg p-3'>
            <div className='px-6 py-2 bg-[#b9276e] rounded-lg text-white'>SPIN THE WHEEL</div>
            <div className='bg-white mt-3 p-3 rounded-lg'>
              <p className='py-2'>Entries <span className='px-1.5 py-1 ml-2 text-sm bg-gray-100 rounded '>{entries.length - 1}</span></p>
              <DynamicInputs entries={entries} handleInputChange={handleInputChange} handleAddEntry={handleAddEntry} handleDeleteEntry={handleDeleteEntry} />
            </div>
          </div>
        </div>

        <div className='lg:w-2/3 -mt-16'>
          <div className='!w-full overflow-x-hidden'>
            <PrizeWheel segments={segments} segColors={segColors} update={update} setNumberOfDraws={setNumberOfDraws} setWinners={setWinners} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default WheelEntriesInput;
