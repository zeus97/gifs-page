import React, { useState, useEffect} from 'react'
import '../../styles/GifContainer.css';

//Components
import Browser from '../pures/Browser';
import Pagination from '../pures/Pagination';
import Gif from '../pures/Gif';

//API requests
import { getToken, getTrendingGifs, searchGifs } from '../../services'

import { IGif } from '../../interfaces';


interface Props{
  openModal: (url:string)=> void
}

function GifContainer({openModal}:Props) {


    //State variables
    const [gifs, setGifs] = useState<IGif[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [gifsPerPage] = useState<number>(10);
  

    //Pagination variables
    const indexOfLastGif = currentPage * gifsPerPage;
    const indexOfFirstGif = indexOfLastGif - gifsPerPage;
    const currentGifs = gifs.slice(indexOfFirstGif, indexOfLastGif);
    

    //Functions
    const handleSearchGifs = (gif:string)=>{
      let token = sessionStorage.getItem('token');
      if(token){
        searchGifs(gif,token).then((res)=>{
          let data = res.data.gfycats;
          let Gifs = data.map((el:any)=>{
            return  el = {
                        name:el.gfyName,
                        url:el.max1mbGif
                         }
          })
          setGifs(Gifs);
          setCurrentPage(1);}).catch((error)=>{`[Searching Gif ERROR]: ${error}`})

      }else{
        console.log('A token is required')
      }
    };



    const paginate = (pageNumber:number) => {
      setCurrentPage(pageNumber);
      
   };

    const previousPage = () => {
      if (currentPage !== 1) {
       setCurrentPage(currentPage - 1);
      }
    };

    const nextPage = () => {
      if (currentPage !== Math.ceil(gifs.length / gifsPerPage)) {
       setCurrentPage(currentPage + 1);
      }
   };

   //API Request
    useEffect(() => {
      getToken().then((res)=>{
        sessionStorage.setItem('token',res.data.access_token);
      }).then(()=>{
        let token = sessionStorage.getItem('token');
        if (token){
            getTrendingGifs(token).then((res)=>{
                let data = res.data.gfycats;
                let TrendingGifs = data.map((el:any)=>{
                  return  el = {
                        name:el.gfyName,
                        url:el.max1mbGif
                    }
                })
                setGifs(TrendingGifs)})
            .catch((error)=>{console.log(`[Trending Gifs ERROR]: ${error}`)})
            
        }
      }).catch((error)=>{`[Token ERROR]: ${error}`})
    
      return () => {
       
      }
    }, []);

  
    
    

  return (
    <>
        <Browser
        search={handleSearchGifs} />
        <div className='gifs-c'>

          <div className='gifs-box'>
            {gifs.length < 1 ?
                <h1>Loading...</h1>
                :
                currentGifs.map((gif,index)=>{
                    return (
                        <Gif
                        key={index}
                        title={gif.name}
                        img={gif.url}
                        openModal={openModal} />
                    )
                })
            }
          </div>

            <Pagination
                  gifsPerPage={gifsPerPage}
                  totalGifs={gifs.length}
                  activePage={currentPage}
                  paginate={paginate}
                  previousPage={previousPage}
                  nextPage={nextPage}
               />
        </div>
    
    </>
  )
}

export default GifContainer