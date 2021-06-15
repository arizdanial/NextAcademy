import axios from 'axios';
import React, { useState } from 'react';
import {
    Form,
    FormGroup,
    Input,
    FormText,
    Button,
    Card

} from 'reactstrap';
import LoadingIndicator from '../components/LoadingIndicator'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';




const UploadPage = () => {
    const [imageFile, setImageFile] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [message, setMessage] = useState('')
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();


    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        let JWT = localStorage.getItem('token')
        let formData = new FormData();
        formData.append('image', imageFile);

        axios.post('https://insta.nextacademy.com/api/v1/images/', formData, {
            headers: { Authorization: `Bearer ${JWT}` }
        })
            .then(resp => {
                if (resp.data.success) {
                    setMessage("Image Uploaded Successfully!")
                    setPreviewImage(null)
                    setImageFile(null)
                    setLoading(false)
                }
            })
            .catch(error => {
                console.log(error.response);
                alert(`Error: Image Upload Failed`)
                setLoading(false)
            });
    };

    const handleNotLoggedIn = () => {
        if (!localStorage.getItem("token")) {
            history.push("/")
        } else {
        }
    }

    useEffect(() => {
        handleNotLoggedIn()
    })

    const removePic = () => {
        setPreviewImage(null)
        setImageFile(null)
        setMessage('')

    }

    return (
        <>
            <h3 >Image Upload</h3>
            <div className='uploadPage'>
                <Card className="previewImage">
                    
                    {previewImage ? isLoading ? 
                    <LoadingIndicator/> 
                    : (
                        <img
                        src={previewImage}
                        width="100%"
                        height="100%"
                        
                                alt='preview'/>
                        ) : (
                            <h3 className="livePreview">
                            {message ? message : "Live Preview"}
                        </h3>
                    )}
                </Card>
                <div className="UploadForm">
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="FormGroup">
                            <Input
                                type="file"
                                name="image-file"
                                onChange={(e) => {
                                    setPreviewImage(URL.createObjectURL(e.target.files[0]))
                                    setImageFile(e.target.files[0])
                                }} />
                            <Button type="submit" color="primary">Upload</Button>
                            <Button onClick={removePic} color='danger'>Remove</Button>
                        </FormGroup>
                        <FormText color="muted">Make sure the image being uploaded is a supported format.</FormText>
                    </Form >
                </div>
            </div>
        </>
    )
}

export default UploadPage;