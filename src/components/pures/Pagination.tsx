import React from 'react'
import '../../styles/Pagination.css';

interface Props{
    gifsPerPage:number,
    totalGifs:number,
    activePage:number,
    paginate: (pageNumber:number)=> void,
    previousPage: ()=> void,
    nextPage: ()=> void
}

function Pagination({ gifsPerPage, totalGifs, activePage, paginate, previousPage, nextPage }:Props) {
    const pageNumbers = [];

    if(totalGifs <=20){
        return null;
    }
 
    for (let i = 1; i <= Math.ceil(totalGifs / gifsPerPage); i++) {
       pageNumbers.push(i);
    }
  
    return (
       <div className="pagination-container">
          <ul className="pagination">
            <a href='#home'><li onClick={previousPage} className="page-number">
               {'<'}
            </li></a>
             {pageNumbers.map((number) => (
               <a href='#home'> <li
                   key={number}
                   onClick={() => paginate(number)}
                   className={activePage == number ? 'page-number active-page' : 'page-number'}
                >
                   {number}
                </li></a>
             ))}
             <a href='#home'><li onClick={nextPage} className="page-number">
               {'>'}
            </li></a>
          </ul>
       </div>
    );
}

export default Pagination