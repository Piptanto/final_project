import React from 'react'
import './header.css';
import {NavLink} from 'react-router-dom'
import { FaUserLock } from "react-icons/fa";

export default function Header() {


    return (

<div className='header'>
    <p id="login">Login  <FaUserLock/></p>
    <h1><NavLink to='/' className="logo" activeclassname="activeLogo">Headlights</NavLink></h1>
</div>
    )}