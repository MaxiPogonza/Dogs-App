import React,{useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory } from "react-router-dom"
import {postDog, getTemperaments } from "../../Redux/actions";
import style from './CreateDog.module.css';

export default function CreateDog (props) {

   
    
   const dispatch= useDispatch()
   const history = useHistory()
   const temps = useSelector((state) => state.temperaments)
   const [errors, setErrors] = useState({})
   const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    lifeTime: "",
    image: "",
    createInDb: true,
    temperament: [],
   })
  
   function validate(input) {
    let errors = {};
      if (!input.name  || !/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(input.name)) {
      errors.name = "Nombre invalido";
    } if (!input.height || !/^[0-9-]+$/.test(input.height) ) {
        input.height.includes("cm") ?errors.height = "" : errors.height = "Altura invalida";
    } if (!input.lifeTime || !/^[0-9-]+$/.test(input.lifeTime) ) {
        input.lifeTime.includes("years")? errors.lifeTime= "" : errors.lifeTime = "Tiempo de vida invalido";
    } if (!input.height ) {
        errors.weight = "Peso invalido";
    } if(!input.image || !/\.(|jpeg|jpg|png|gif)$/.test(input.image)) {
        errors.image = "Direccion de imagen invalida";
    }
    return errors;
  }

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);
    

    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }


    function handleSelect(e){
        if(!input.temperament.includes(e.target.value) && e.target.value !=="all" && input.temperament.length < 5){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        dispatch(postDog(input))

        alert("The dog was created")
        setInput({
            name: "",
            height: "",            
            weight: "",
            lifeTime: "",
            createInDb: true,
            temperament: []
        })
        history.push('/home')
    }

    const handleExit = (e) => {
           e.preventDefault(e)
            setInput({
                ...input,
                temperament : input.temperament.filter(temp => temp !== e.target.value)
            })
        }
    
    return (
        <div className={style.background} >
          <Link to="/home"><button className={style.btn} >Home</button></Link>
          <h1>Crea tu personaje</h1>
          <form className= {style.form}>
            <div className={style.input}>
                <label>Name:</label>
                <input  type="text" value={input.name} name="name" onChange={e => handleChange(e)}/>
                {errors.name ? <p className={style.error} >{errors.name}</p>: null}
            </div>
            <div className={style.input}>
                <label>Height:</label>
                <input type="text" value={input.height} name="height" onChange={e => handleChange(e)}/>
                {errors.height? <p className={style.error}>{errors.height}</p>: null}
            </div>
            <div className={style.input}>
                <label> Weight: </label>
                <input type="text"  value={input.weight} name="weight" onChange={e => handleChange(e)} />
                {errors.weight? <p className={style.error} >{errors.weight}</p>: null}
            </div>
            <div className={style.input}>
                <label> LifeTime: </label>
                <input type="text" value={input.lifeTime} name="lifeTime"  onChange={e => handleChange(e)}/>
                {errors.lifeTime? <p className={style.error} >{errors.lifeTime}</p>: null}
            </div>
            <div className={style.input}>
                <label>Image:</label>
                
                <input type="text" value={input.image} name="image" onChange={e => handleChange(e)} />
                {errors.image? <p className={style.error} >{errors.image}</p> : null}
            </div>
            <div >
                <h3>TEMPERAMENTS</h3>
                <select onClick={(e) => handleSelect(e)} >
                    <option value='all'>temperaments</option>
                    {
                        temps.map(e => {
                            return (
                                <option value={e.name} key={e.id}>{e.name}</option>
                                )
                            })
                        }
                </select>
               
            </div>
            <div>
                  {input.temperament.map((e , i) => {
                    return (
                        <div className={style.div}>
                        <p className={style.p} key={i++}> {e} </p>
                        <button value={e} className={style.btnExit} onClick={() => handleExit(e)}>X</button>
                        </div>
                       )
                     })
                  }
            </div>

            {errors && 
                (errors.name ||
                errors.height ||
                errors.weight||
                errors.image || 
                errors.lifeTime ||
                !input.image ||
                !input.temperament.length)
                ?
                <p className={style.error}  >EL PERRO NO PUEDE SER CREADO</p>
                :
                <button type='submit' className={style.btnSubmit} onClick={(e) => handleSubmit(e) }>CREATE</button>
        }
            
          </form>
        </div>
    )
 }