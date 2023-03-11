import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/NotFoundPage.css';
import NotFoundImage from '../images/error.svg';

function NotFoundPage() {

    const navigate = useNavigate();

  return (
    <div className='Notfound-page'>
        <div className='Notfound-page-box'>
            <img src={NotFoundImage} />
            <h2>This page doesn't exist.</h2>
            <button onClick={()=>{navigate('/')}}>Go back home</button>
        </div>
    </div>
  )
}

export default NotFoundPage