import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import style from './Nav.module.css'

export default function Nav() {
    return (
        <nav className={style.nav}>
         <Link to="/" className={style.link}><h1>DOGS APP</h1></Link>
        <div className={style.crear} >
         <Link to="/create" className={style.link} ><p>Crear Perro</p></Link>
         </div>
         <SearchBar />
         
        </nav>
    )
}