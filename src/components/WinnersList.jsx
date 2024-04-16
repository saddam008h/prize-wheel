import React from 'react';

export default function WinnersList({ winners }) {
  function getWinningFrequency(winners) {
    // Count the frequency of each winner
    const frequencyMap = {};
    winners.forEach(winner => {
        frequencyMap[winner] = (frequencyMap[winner] || 0) + 1;
    });

    // Sort winners by frequency
    const sortedWinners = Object.entries(frequencyMap).sort((a, b) => b[1] - a[1]);

    // Generate array of objects with rank, winner name, and winning frequency
    let currentRank = 0;
    let previousFrequency = null;
    const result = sortedWinners.map((winner) => {
        const frequency = winner[1];
        if (frequency !== previousFrequency) {
            // Update rank if frequency is different from previous winner
            currentRank = currentRank + 1;
        }
        previousFrequency = frequency;
        return {
            rank: currentRank,
            name: winner[0],
            frequency: frequency
        };
    });

    return result;
}



  const winningFrequency = getWinningFrequency(winners);

  return (
    <>
      <div class="relative overflow-x-auto rounded-lg border border-gray-200 mb-28 mt-10 lg:mt-0">
        <table class="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="uppercase bg-[#d44b8d] text-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                # Rank
              </th>
              <th scope="col" class="px-6 py-3">
                Winner Name
              </th>
              <th scope="col" class="px-6 py-3">
                Winning Frequency
              </th>
            </tr>
          </thead>
          <tbody>
            {winningFrequency.length === 0 ?
              <tr>
                <td colspan="3" className='p-5 text-center'>No data Available</td>
              </tr>
              :
              winningFrequency.map((winner, index) => (
                <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {winner.rank}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                    {winner.name}
                  </td>
                  <td class="px-6 py-4 text-gray-500 whitespace-nowrap ">
                    {winner.frequency}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
