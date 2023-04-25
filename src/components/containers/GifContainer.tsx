import React, { useState, useEffect, Suspense} from 'react'
import '../../styles/GifContainer.css';

//Components
import Browser from '../pures/Browser';
import Pagination from '../pures/Pagination';
import Gif from '../pures/Gif';
import Spinner from 'react-bootstrap/Spinner';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { setGifs } from '../../features/gifs/gifsSlice';
import { RootState } from '../../app/store';

//API requests
import { getToken, getTrendingGifs, searchGifs } from '../../services'

import { IGif } from '../../interfaces';


interface Props{
  openModal: (url:string)=> void
}

function GifContainer({openModal}:Props) {

  const gifs = useSelector((state: RootState) => state.gifs.value)
  const dispatch = useDispatch()


    //State variables
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [gifsPerPage] = useState<number>(10);
    const [search, setSearch] = useState<string>('Trending')
  

    //Pagination variables
    const indexOfLastGif = currentPage * gifsPerPage;
    const indexOfFirstGif = indexOfLastGif - gifsPerPage;
    const currentGifs: IGif[] = gifs.slice(indexOfFirstGif, indexOfLastGif);
    

    //Functions
    const handleSearchGifs  = (gif:string)=>{
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
          setSearch(gif);
          dispatch(setGifs([]));
          setTimeout(()=>{dispatch(setGifs(Gifs));},700); 
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
              dispatch(setGifs(TrendingGifs));})
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
          <h1 className='gifs-search-title'>Results: <span>{search}</span></h1>
          <div className='gifs-box'>
            <Suspense fallback={<h1>Cargando....</h1>}>
            {gifs.length < 1 ?
                <Spinner className='loading-spinner' animation="border" variant="light" />
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
            </Suspense>
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