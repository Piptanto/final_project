import React, {useEffect, useState} from 'react';
import axios from 'axios'


export default function DisplayMars(props) {
    
    const [photos, setPhotos] = useState()

    useEffect(() => loadMarsPhotos(), [])

    const url = 'https://api.nasa.gov/EPIC/api/natural/images?api_key=2DZgfzcjRg94wyP9Cn1cnrRad3CFiB9rzP4zge1g'

    const loadMarsPhotos = async () => {
        
        const response = await axios.get(url)

        console.log(response.data[0].image);

        setPhotos(response.data)
    }

    return (
        <div style={{
            height: '50vh',
            width: '100%',
            background: `url(${ photos ? photos[0].image : null})`,
        }}></div>
    )
}