import React from 'react'
import  { useState, useEffect } from 'react'
import style from './Home.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {getAllDogs, filterByWeight, getTemperaments,getMinAkita, filterByTemperaments, filterCreated, filterByAbc} from '../../Redux/actions/index'
import Card from '../Card/Card'
import Paginado from '../Paginado/Paginado'
import Nav from '../Nav/Nav'
  
function Home() {
    const dispatch = useDispatch();
   const dogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => { return state.temperaments})
    const [currentPage, setCurrentPage] = useState(1)
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const [orden, setOrden] = useState("")
    const indexLastDog = currentPage * dogsPerPage
    const indexFirstDog = indexLastDog - dogsPerPage
    const sliceDogs = dogs.slice(indexFirstDog, indexLastDog)


   const paginado= (pageNumber) =>  {
      setCurrentPage(pageNumber)
      setDogsPerPage(8)
      
    }

    useEffect(() => { 
     dispatch(getAllDogs())
     dispatch(getTemperaments());
    }, [dispatch] )

    function handleClick(e){
     e.preventDefault();
   dispatch(getMinAkita())
   }

    function handleFilterTemps(e){
        dispatch(filterByTemperaments(e.target.value))
        setCurrentPage(1)
    }
    function handlerFilterByWeight(e) {
      dispatch(filterByWeight(e.target.value))
      setCurrentPage(1)

    }
    function handleFilterCreate(e){
      dispatch(filterCreated(e.target.value))
      setCurrentPage(1)
  }

    function handleFilterByAbc(e){
    e.preventDefault();
    dispatch(filterByAbc(e.target.value))
    setOrden(`orden ${e.target.value}`)
    console.log(orden)
}
  
    

    return (
     <div className={style.background}>
        
      <Nav />
      
        
      <div>
      

       <button  onClick={e => handleClick(e)} >
         Recargar
       </button>
         <div className={style.cont} >
            <select onChange={e => handleFilterByAbc(e)}>
              <option >
                 Ordenar nombres
              </option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select> 


            <select onChange={e => handlerFilterByWeight(e)} >
                <option >
                  Ordenar por peso
                </option>
                <option key={1} value="pesados">Pesados</option>
                <option key={2} value="livianos">Livianos</option>
            </select>


            <select onChange={(e) => handleFilterCreate(e)}>
            <option > 
               Ordenar por creados o existentes
            </option>
            <option key={1} value="todos">Todos</option>
            <option key={2} value="creados">Creados</option>
            <option key={3} value="existentes">Existentes</option>
            </select>

            <select onChange={(e) => handleFilterTemps(e) } >
            <option >Ordenar por temperamento</option>
                    <option key={1+"e"} value='All'>All</option>
                    {
                        allTemperaments.map(temp => 
                         { return <option value={temp.name} key={temp.id}>{temp.name}</option>}
                        )
                    }
                </select> 
                </div> 
                </div> 
                <div>
                  <Paginado 
                    dogsPerPage={dogsPerPage}
                    allDogs={dogs.length}
                    paginado={paginado}
                  />
                </div>
                <div className={style.cards}>
                  { sliceDogs.map(dog => {
                   return <Card name={dog.name} weight={dog.weight} temperament={dog.temperament} image={dog.image} id= {dog.id}  createdInDb={dog.createdInDb ? dog.createdInDb : null}  />
                    }) 
                  } 
                </div>  
        </div>
    )
}

export default Home; 