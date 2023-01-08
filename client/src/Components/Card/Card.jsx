import React from 'react';	
import {Link} from 'react-router-dom';
import style from './Card.module.css'

export default function Card ({name, weight, temperament, image, id, createdInDb}) {
    
return (
   <div className= {style.back}>
      <div className={style.image}>
         <img src={image} alt= "Img not found" />
      </div>
      <div className={style.info}>
         <Link to={`/home/${id}`} className= {style.link} >
           <h3>{name}</h3>
         </Link> 
         <p><b>Weight:</b> {weight} {createdInDb ? null : "kg" } </p>
         <p><b>Temperament:</b> {temperament} </p>
      </div>
   </div>
)
}


