import React from 'react'
import '../../styles/Modal.css';

interface Props{
    url:string,
    closeModal: ()=> void,
    position: number
}

function Modal({url, position, closeModal}:Props) {
  return (
        <div className='modal-gif' style={{top : `${position}px`}}>
            <div className='modal-box'>
                <i className="bi bi-x-lg" onClick={closeModal}></i>
                <img src={url} alt='gifxxx' />
            </div>
        </div>
    
    
  )
}

export default Modal