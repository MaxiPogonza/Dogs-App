import React from 'react' ;
import {Link} from 'react-router-dom' ;
import style from './LandingPage.module.css'

const LandingPage = (props) => {
   return (
   
    <div className={style.background}>

     <div className={style.data}>
     <h1>Bienvenidos a DogsApp </h1>
     <p>"A un perro no le importa si eres rico o pobre, inteligente o tonto. Dale tu corazón y él te dará el suyo."</p>
     </div>
     <div >
     <Link to="/home" ><button className= {style.button}>Home</button> </Link> 
    </div>   
    </div> 
 

    )
}

export default LandingPage ; 
