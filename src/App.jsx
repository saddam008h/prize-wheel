import { useState } from 'react'

import Navbar from './components/Navbar'
import WheelEntriesInput from './components/WheelEntriesInput'
import WinnersList from './components/WinnersList';
function App() {
  const [winners, setWinners] = useState([]);

  return (
    <>
      <div id='app-wrapper' className='lg:px-16 px-2'>
        <Navbar />
        <WheelEntriesInput winners={winners} setWinners={setWinners} />
        <WinnersList winners={winners} />

      </div>
    </>
  )
}

export default App
