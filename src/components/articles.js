import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import Header from './header'
import './articles.css'
import Footer from './footer';
import axios from 'axios';
import {ARTICLE_SERVER} from '../utils/servers'


export default function Articles() {
    
    const [ showSpinner, setShowState] = useState(false)

    const [articles, setArticles] = useState([]);

    const [errorCode, setErrorCode] =useState(false);


    useEffect(() => loadEntries(), [])

    let  {id} = useParams();
  
    const loadEntries = async () => {
      setShowState(true) // show spinner
      try {
      const serverResponse = await axios.get(`${ARTICLE_SERVER}/findarticle/${id}`);
      setArticles(serverResponse.data);

      console.log(articles);

      setTimeout(() => {
        setShowState(false)}, 2000) // hide spinner after 2s

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
        errorCode  ?  
            <div>
                <h2>Page not found</h2>
                <img src="/desert-1913130_1920.jpg" alt="Car in the Desert" className='notFoundPicture'/>   
            </div>
            :
        <div className="mainBody">
            <div className="articleDetails">
                 <h3>{articles.title}</h3>
                 <h4>{articles.source}</h4>
                 <p>{articles.body}</p>
            </div> 
        </div>

            }
             <Footer />
        </div>
    )
}