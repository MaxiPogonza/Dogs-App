import React,{useEffect } from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetail} from "../../Redux/actions/index"
import style from "./Detail.module.css";


function Detail(props) {
   const dispatch = useDispatch()
   const id = props.match.params.id
   const detail = useSelector(state => state.detail)
   useEffect(()=>{
      dispatch(getDetail(id))
   }, [dispatch, id])
    return (
        <div className={style.back} >
             <Link to="/home">
                <button className={style.btn}>
                    Home
                </button>
            </Link>
            
            <div className={style.all} >
                <img src={detail.image} alt={detail.name} className={style.img} width="300px" height="300px" />
              <div className={style.details}>   
                <h2>Hola! yo soy un {detail.name} </h2>
                <p>Peso:  {detail.weight} {detail.createdInDb ? null : "kg" } </p>
                <p>Altura: {detail.height} {detail.createdInDb ? null : "cm" } </p>
                <p>Tiempo de vida: {detail.weight} años(aprox)</p>
                <p>Temperamentos: {detail.temperament}</p>
              </div>
            </div>
          
          </div>
    )
}
export default Detail ; 