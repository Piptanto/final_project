import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';
import Header from './header';
import Footer from './footer';
import { ContextVin } from "./context";
import { FaSearchengin } from "react-icons/fa";


export default function Home() {
    
    const [buttonState, setButtonState] = useState(true);

    const {handleVin} = useContext(ContextVin);

    const [value, setValue] = useState('');

    const navigate = useNavigate();

    function handleInput(inputValue) {
    console.log(inputValue);
    setValue(inputValue);

    if (inputValue.length === 17) {
        setButtonState(false);
        }
    else {
        setButtonState(true);
    }
    }

    const handleClick = () => {
        handleVin(value);
        console.log('hello from button');
        navigate('/vehicle');
        }

    const handleKeyDown = (e) => {
        if (value.length === 17 && e.key === 'Enter') {
          handleClick();
        }
    }


    return (
<div className='homeBody'>
   <section tabIndex="1" id="section-one">
    <Header/>
    <p>Please type in your Vehicle Identification Number (VIN or FIN): </p>
    <div className="inputButton">
    <input type="text" className="inputVIN" placeholder="JH4NA1150RT000268" maxLength="17" value={value} onChange={e => handleInput(e.target.value)} onKeyDown={handleKeyDown}></input>
    {//<button id="findButton" disabled={buttonState} onClick={handleClick}><FaSearchengin /></button>
    }
    </div>
    <p id="hint">You can find the VIN in your vehicle documents <br/> and on the b-column of your vehicle chassis.</p>
    <p><a className="link" href="#section-two">About Headlights</a></p>
    <img src="mercedes-1568085.jpg" alt="300SL Headlights" className='homePicture'/>
    </section>
    <section tabIndex="2" id="section-two">
    <div className="aboutUs">
        <h2>About Headlights</h2>
        <p>We provide an advanced look-up tool for your vehicle identification number (VIN/ FIN). Based on your vehicle
            model, you will find useful information like repair manuals und interesting articles.</p>
        <p>For some models, we can even provide you with advanced vehicle status information like fuel level or mileage. </p>
        <p>In order to get your vehicle data, please enter your VIN in the above <a className="link" href="#section-one">search field</a>.
            You can find your VIN in your vehicle documents and on the b-column of your vehicle chassis.
        </p>
    </div>
    <Footer />
 </section>
</div>
    )}