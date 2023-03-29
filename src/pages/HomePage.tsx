import React, { useState} from 'react'


//Components
import GifContainer from '../components/containers/GifContainer';
import Modal from '../components/pures/Modal'

function HomePage() {

  const [modal, setModal] = useState<boolean>(false);
  const [modalGif, setModalGif] = useState<string>('');

  const openModal = (url:string)=>{
    setModalGif(url);
    setModal(true);
  }

  const closeModal = ()=>{
    setModal(false);
  };

 

  return (
    <>
      <div className={modal ? 'blur-filter' : ''} style={{width: '100%'}}> 
        
          <GifContainer
          openModal={openModal}/>

      </div>
      {modal && <Modal url={modalGif} closeModal={closeModal} />}
     
    </>
  )
}

export default HomePage