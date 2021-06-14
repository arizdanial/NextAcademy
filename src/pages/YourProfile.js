import { useState, useEffect, useImperativeHandle } from "react"
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { Button } from 'reactstrap'
import LoadingIndicator from '../components/LoadingIndicator'
import UploadPage from "./UploadPage";




const YourProfile = () => {

    const styleGrid = {
        display: "grid",
        textAlign: "center",
        justifyContent: "center",
        margin: "2rem"
    }

    const buttonSize = {
        width: '16rem',
        textAlign: 'center',
        margin: 'auto'
    }


    const history = useHistory()
    const [currentUser, updateCurrentUser] = useState(undefined)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        axios.get("https://insta.nextacademy.com/api/v1/users/me", {
            headers:
            {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then((resp) => {
                updateCurrentUser(resp.data)
                setLoading(false)
            })
            .catch(() => {
                alert(`Error: Please log in`)
                history.push('/signin')
            })
    }, [])


    // console.log(currentUser)

    if (loading === true) {
        return <LoadingIndicator />
    } else {
        // do nothing
    }


    return (
        <>
            <h1>Your Profile</h1>
            <div style={styleGrid}>
                <img style={{
                    width: '350px',
                    height: '350px',
                }} src={currentUser.profile_picture} />
                <h2>{currentUser.username}</h2>
                <h2>ID number: {currentUser.id}</h2>
                <h2>{currentUser.email}</h2>
                <Button style={buttonSize} color='primary' onClick={() => { history.push("/uploadimages") }}> Upload Images </Button>
            </div>
        </>
    )

};


export default YourProfile;