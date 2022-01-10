import React from 'react'
import Header from './header'
import Footer from './footer'
import './notfound.css';


export default function NotFound() {

    return (
        <div className="mainPage">
        <Header />
        <div className="notFound">
        <h2>Page not found</h2>
        <img src="/desert-1913130_1920.jpg" alt="Car in the Desert" className='notFoundPicture'/>
        </div>
        < Footer />
        </div>
    )
}