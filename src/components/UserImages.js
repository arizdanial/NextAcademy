import axios from 'axios';
import React, { useEffect, useState } from "react";
import LoadingIndicator from './LoadingIndicator';

function UserImages(props) {
    const { userID } = props
    // console.log(userID)
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userID}`)
            .then((resp) => {
                // console.log(resp)
                setImages(resp.data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <LoadingIndicator />
    }


    return (
        <div className='imageContainer'>
            {
                images.map((t) => {
                    return (
                        <img style={{
                            width: '30%',
                            maxWidth: '100%',
                            height: '250px',
                            objectFit: 'cover',
                            margin: '1rem 1rem 1rem 2rem',
                        }} src={t} />
                    )
                })

            }
        </div >

    )
}

export default UserImages;