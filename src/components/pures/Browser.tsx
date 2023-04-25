import React, { useState, useEffect } from 'react'
import '../../styles/Browser.css';

interface Props{
    search: (gif:string) => void 
}

function Browser({search}:Props) {

    const [gif, setGif] = useState<string>('');
    const [remove, setRemove] = useState<boolean>(false);

    useEffect(()=>{
        if(gif.length > 0){setRemove(true);}
        else{setRemove(false);}
    },[gif])

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

    const removeText = ()=>{
        setGif('');
    }
    

  return (
    <div className='browser-c'>
        <h1 id='home'>xGIFsx</h1>
        <form onSubmit={handleSubmit}>
            <input type='text'
             name='gif'
             id='gif'
             placeholder='Type something'
             value={gif}
             onChange={handleChange} />
            { remove ?
             <i className="bi bi-x-lg remove-icon"
             onClick={removeText}
             >
             </i> : null}
            <button type='submit'><i className="bi bi-search search-icon"></i></button>
        </form>
    </div>
  )
}

export default Browser