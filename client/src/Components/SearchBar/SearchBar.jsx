import React, {useState} from 'react';
import style from './SearchBar.module.css';
import {useDispatch} from 'react-redux'
import { getName } from '../../Redux/actions';





export default function SearchBar () {
  const dispatch = useDispatch()
  const [name, setName] = useState('');

  function handleInputChange(e){
    e.preventDefault();
    setName(e.target.value)
     }
  function handleGetName(e){
    e.preventDefault();
    dispatch(getName(name));
    setName('');
    
  }
return (
<div className={style.input}>

  <input type="text" className={style.input} value={name} onChange={(e) => handleInputChange(e)}  placeholder='Buscar perro'></input>
  <button type='submit' className={style.btn} onClick={(e) => handleGetName(e) }>Buscar</button>

</div>

)}