import React, { Component, useEffect, useState } from 'react'

import WheelComponent from 'react-wheel-of-prizes'
import WinnerModal from './WinnerModal'
import winningSound from './winner.wav';

const PrizeWheel = ({segments, segColors, update, setNumberOfDraws, setWinners}) => {
  const [openModal, setOpenModal] = useState(false)
  const [winner, setWinner] = useState('')
  const [audio] = useState(new Audio(winningSound));

  const onFinished = (winner2) => {
    setOpenModal(true);
    setWinner(winner2);
    // Increment number of draws
    setNumberOfDraws(prevDraws => prevDraws + 1);

    setWinners(prevWinners => [...prevWinners, winner2]);
    playWinningSound(); // Play winning sound
};


const playWinningSound = () => {
  audio.play();
};

  return (
    <>
    <WinnerModal openModal={openModal} setOpenModal={setOpenModal} winner={winner} audio={audio} />
    <WheelComponent
      key={update}
      segments={segments}
      segColors={segColors}
      onFinished={(winner) => onFinished(winner)}
      primaryColor='white'
      contrastColor='black'
      buttonText='Spin'
      isOnlyOnce={false}
      size={ 250}
      upDuration={500} // Adjust according to your preference
      downDuration={1000} // Adjust to slow down the stop
      fontFamily='Arial'
      className="ml-[90px]"
    />
    </>
  )
}

export default PrizeWheel