import React from 'react'
import './header.css';
import {NavLink} from 'react-router-dom'

export default function Header() {


    return (

<div className='header'>
    <h1><NavLink to='/' className="logo" activeclassname="activeLogo">Headlights</NavLink></h1>
</div>
    )}