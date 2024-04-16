import { Button, Modal } from 'flowbite-react';
import { useEffect } from 'react';

import Confetti from 'react-confetti'
export default function WinnerModal({ openModal, setOpenModal, winner, audio }) {
  useEffect(() => {
    if (!openModal) {
      audio.pause()
    }
  }, [openModal, audio]);
return (
  <> 
    {openModal && <Confetti/> }
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            <p className='text-3xl m-2 font-bold'>Congratulations!!!!! </p> <br />
            Winner is <span className='font-semibold text-gray-700'>{winner} </span>
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              type="button"
              onClick={() => {
                setOpenModal(false);
               
              }}
              className="btn btn-primary"
            >
              Close
            </Button>
          
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </>
);
}

