import React from 'react'
import '../../styles/Modal.css';

interface Props{
    url:string,
    closeModal: ()=> void
}

function Modal({url, closeModal}:Props) {
  return (
        <div className='modal-gif'>
            <div className='modal-box'>
                <i className="bi bi-x-lg" onClick={closeModal}></i>
                <img src={url} alt='gifxxx' />
            </div>
        </div>
    
    
  )
}

export default Modal