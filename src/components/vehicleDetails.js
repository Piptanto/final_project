import React, {useContext, useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import Header from './header'
import { ContextVin } from "./context";
import './vehicleDetails.css'
import Footer from './footer';
import axios from 'axios';
import {CUSTOMER_SERVER} from '../utils/servers'


export default function VehicleDetails() {

    const {vin} = useContext(ContextVin)
    
    const [ showSpinner, setShowState] = useState(false)

    const url = "https://api.vindecoder.eu/3.1/ad7b59a49533/102e012ca8/decode";

    const [entry, setEntry] = useState([]);

    const [articles, setArticles] = useState([]);
  
    useEffect(() => loadEntries(), [])
  
    const loadEntries = async () => {
      setShowState(true) // show spinner
      try {
      const response = await axios.get(`${url}/${vin}.json`);
      const balance = await axios.get("https://api.vindecoder.eu/3.1/ad7b59a49533/c234ddb824/balance.json");
      const model = response?.data?.decode[6].value;
      const serverResponse = await axios.get(`${CUSTOMER_SERVER}/find?model=${model}`);
      //https://auto.dev/api/vin/ZPBUA1ZL9KLA00848?apikey=LOGIN_FOR_FREE_API_KEY
      setEntry(response);
      setArticles(serverResponse.data);
      setTimeout(() => {
        setShowState(false)}, 2000) // hide spinner after 2s
        console.log(entry?.data?.decode);
        console.log(balance?.data);
    } catch(error){
        console.log(error)
        }
    }

    return (
        <div className="mainPage">
        <Header />
        {showSpinner ? 
        <div id="cssload-wrapper">
	    <div className="cssload-loader">
		<div className="cssload-line"></div>
		<div className="cssload-line"></div>
		<div className="cssload-line"></div>
		<div className="cssload-line"></div>
		<div className="cssload-line"></div>
		<div className="cssload-line"></div>
		<div className="cssload-subline"></div>
		<div className="cssload-subline"></div>
		<div className="cssload-subline"></div>
		<div className="cssload-subline"></div>
		<div className="cssload-subline"></div>
		<div className="cssload-loader-circle-1"><div className="cssload-loader-circle-2"></div></div>
		<div className="cssload-needle"></div>
		<div className="cssload-loading">loading</div>
	    </div>
        </div>
        :
        <div className="mainBody">
        <div className="vehicleStatus">
            {vin === false || entry?.data?.decode == null  ?  
            <div><NavLink to='/' className="link">Please enter a valid VIN/ FIN</NavLink>
            <img src="road-569044.jpg" alt="Unclear Road" className='unclearPicture'/>
            </div>
            :
            <div className="happyFlow">
            <div id="vehicleHeader">
            <h4>Your vehicle: {entry?.data?.decode[1].value} Model {entry?.data?.decode[6].value}</h4>
            {entry?.data?.decode[6]?.value === "A 180" ? 
            <img className="vehicleImage" src="w176 exterior 10.png" alt="W176 Exterior"/>
            :
            <img className="vehicleImage" src="C190 exterior 2.png" alt="C190 Exterior"/>
            }
            </div>
            <div className="vehicleDetails">
            <div className="vehicleLinkouts">
            Hello from Vehicle Links
            </div>
            <div className="apiDetails">
            <table id="vehicleTable">
                <tbody>
            <tr><th>VIN/FIN: </th><th>{vin}</th></tr>
                {entry?.data?.decode?.slice(1).map((element,id) => (
            <tr key={id}>
            <td>{element.label}: </td>
            <td>{element.value}</td>
            </tr>
             ))}
             </tbody>
             </table>
            </div>
             <div className="articles">
             {articles?.map((element,id) => (
            <div key={id}>
                 <h3>{element.title}</h3>
                 <h4>{element.source}</h4>
                 <p>{element.body}</p>
            </div>
             ))}
             </div>
            </div>
            </div>
            }
        </div>
        <Footer/>
        </div>
        }
        </div>
    )
}