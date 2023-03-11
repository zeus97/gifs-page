import React, { useState, useEffect } from 'react'


//Components
import GifContainer from '../components/containers/GifContainer'
import Modal from '../components/pures/Modal'

function HomePage() {

  const [modal, setModal] = useState<boolean>(false);
  const [modalGif, setModalGif] = useState<string>('');
  const [modalPosition, setModalPosition] = useState<number>(0);

  const openModal = (url:string)=>{
    setModalGif(url);
    setModal(true);
  }

  const closeModal = ()=>{
    setModal(false);
  };

  const positionModal = () => {
    setModalPosition(window.scrollY);
  }

  useEffect(()=>{
    window.addEventListener('scroll',positionModal);

    return () => window.removeEventListener('scroll',positionModal);
  },[])

  return (
    <>
      <div className={modal ? 'blur-filter' : ''}> 
        <GifContainer
        openModal={openModal}/>
      </div>
      {modal && <Modal url={modalGif} position={modalPosition} closeModal={closeModal} />}
     
    </>
  )
}

export default HomePage