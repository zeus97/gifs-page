import React, { useState } from 'react'
import '../../styles/Browser.css';

interface Props{
    search: (gif:string) => void 
}

function Browser({search}:Props) {

    const [gif, setGif] = useState<string>('');

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(gif.length > 0){
            search(gif);
        }

    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        setGif(e.target.value);
    }
    

  return (
    <div className='browser-c'>
        <h1 id='home'>xGIFsx</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' name='gif' id='gif' placeholder='Type something' value={gif} onChange={handleChange} />
            <button><i className="bi bi-search"></i></button>
        </form>
    </div>
  )
}

export default Browser