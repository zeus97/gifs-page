import React from 'react'
import '../../styles/Gif.css';

interface Props{
  title:string,
  img:string,
  openModal: (url:string)=> void
};

function Gif({title,img,openModal}:Props) {
  return (
    <div className='gif'>
        <a href='#home'><img src={img} alt={title} onClick={()=>{openModal(img);}} /></a>
    </div>
  )
}

export default Gif