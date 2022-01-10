import React, {useContext, useState, useEffect} from 'react'
import {NavLink} from 'react-router-dom'
import Header from './header'
import { ContextVin } from "./context";
import './vehicleDetails.css'
import Footer from './footer';
import axios from 'axios';
import {CUSTOMER_SERVER} from '../utils/servers'
import {IMAGES_SERVER} from '../utils/servers'


export default function VehicleDetails() {

    const {vin} = useContext(ContextVin)
    
    const [ showSpinner, setShowState] = useState(false)

    const url = "https://api.vindecoder.eu/3.1/ad7b59a49533/102e012ca8/decode";

    //How this is done properly:
    //Images in serverFolder: controlsum and vindecode
    //const url = "https://api.vindecoder.eu/3.1/ad7b59a49533";
    //https://onecompiler.com/php/3xpyj34fa
    //Your API key: ad7b59a49533
    //Your Secret key: 13511f5136

    const [entry, setEntry] = useState([]);

    const [articles, setArticles] = useState([]);

    const [image, setImage] = useState();

    const [errorCode, setErrorCode] = useState(false);
  
    useEffect(() => loadEntries(), [])
  
    const loadEntries = async () => {
      setShowState(true) // show spinner
      try {
      const response = await axios.get(`${url}/${vin}.json`);
      //const controlsum = substr(sha1("{$vin}|decode|ad7b59a49533|13511f5136"), 0, 10);
      //const response = await axios.get(`${url}/${controlsum}/decode/${vin}.json`);
      const balance = await axios.get("https://api.vindecoder.eu/3.1/ad7b59a49533/c234ddb824/balance.json");
      const model = response?.data?.decode[6].value;
      const serverResponse = await axios.get(`${CUSTOMER_SERVER}/find?model=${model}`);
      //https://auto.dev/api/vin/ZPBUA1ZL9KLA00848?apikey=LOGIN_FOR_FREE_API_KEY
      const serverImage = await axios.get(`${IMAGES_SERVER}/find?model=${model}`);
      setEntry(response);
      setArticles(serverResponse?.data);
      setImage(serverImage?.data[0].img);

      setTimeout(() => {
        setShowState(false)}, 2000) // hide spinner after 2s

        console.log(entry?.data?.decode);
        console.log(balance?.data);
        console.log(articles);
    } catch(error){
        console.log(error)
        setErrorCode(true);
        setShowState(false);
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
            {vin === false || errorCode  ?  
            <div><NavLink to='/' className="link">Please enter a valid VIN/ FIN</NavLink>
            <img src="road-569044.jpg" alt="Unclear Road" className='unclearPicture'/>
            </div>
            :
            <div className="happyFlow">
            <div id="vehicleHeader">
            <h4>Your vehicle: {entry?.data?.decode[1].value} Model {entry?.data?.decode[6].value}</h4>
            { image ? 
            <img className="vehicleImage" src={`/${image}`} alt="Your Vehicle"/>
            :
            <img className="vehicleImage" src="/default_image.png" alt="Your Vehicle"/>
            }
            </div>
            <div className="vehicleDetails">
            <div className="vehicleLinkouts">
            <h4>Useful links</h4>
            <a href="https://suchen.mobile.de/fahrzeuge/search.html?dam=0&isSearchRequest=true&ms=17200;6&ref=quickSearch&sfmr=false&vc=Car" target="_blank" rel="noreferrer"><img className="logoLink" src="/mobile.png" alt="mobile.de" /></a>
            <a href="https://www.adac.de/rund-ums-fahrzeug/auto-kaufen-verkaufen/gebrauchtwagenkauf/gebrauchtwageninfos/details/276/mercedes-a-klasse-2012-2018-benziner/" target="_blank" rel="noreferrer"><img className="logoLink" src="/ADAC-Logo.png" alt="adac.de" /></a>
            <a href="https://angebote.carwow.de/showroom/builds/12046191" target="_blank"rel="noreferrer"><img className="logoLink" src="/carwow.jpg" alt="carwow.de" /></a>
            <a href="https://www.wirkaufendeinauto.de/?utm_expid=.czbEjnOxSPutsf2K4NXtEw.0&ref=https%3A%2F%2Fwww.wirkaufendeinauto.de%2Fautoverkauf%2F" target="_blank" rel="noreferrer"><img className="logoLink" src="/wirkaufendeinautode.jpg" alt="wirkaufendeinauto.de" /></a>
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
             {articles?.map((element,idkey) => (
            <div key={idkey}>
                 <h3><NavLink to={`/article/${element._id}`} target="_blank" className="linkout" activeClassName="activeLinkout">{element.title}</NavLink></h3>
                 <h4>{element.source}</h4>
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