import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import Header from './header'
import './articles.css'
import Footer from './footer';
import axios from 'axios';
import {CUSTOMER_SERVER} from '../utils/servers'


export default function Articles() {
    
    const [ showSpinner, setShowState] = useState(false)

    const [article, setArticle] = useState([]);

    const [errorCode, setErrorCode] =useState(false);


    useEffect(() => loadEntries(), [])

    let  {id} = useParams();
  
    const loadEntries = async () => {
      setShowState(true) // show spinner
      console.log(id);
      try {
      const serverResponse = await axios.get(`${CUSTOMER_SERVER}/find?_id=${id}`);
      setArticle(serverResponse.data);
      console.log(serverResponse.data);

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
                <Footer />
            </div>
            :
        <div className="mainBody">
            <div className="articleDetails">
                 <h2>{article.title}</h2>
                 <h4>Quelle: {article.source}</h4>
                 <p>{article.body}</p>
            </div> 
            <Footer />
        </div>

            }
        </div>
    )
}