import React from 'react';
import style from "../Paginado/Paginado.module.css"


export default function Paginado({dogsPerPage, allDogs, paginado}){

   const pageNumbers = [] ;

   for (let i = 0; i <= Math.ceil(allDogs/dogsPerPage); i++) {
   pageNumbers.push(i)
    }
  return (
    <nav className={style.nav}>
       <ul>
         {  pageNumbers && 
            pageNumbers.map(number => {
                return (
                  <li className={style.number} key={number}>
              { number ? <button onClick={() => paginado(number)}> {number} </button> : null}
                </li>
                )}
          )}
       </ul>
    </nav>
  )
}

