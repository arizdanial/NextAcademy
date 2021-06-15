import React, { useEffect, useState } from "react";
import { useParams } from 'react-router';
import axios from 'axios';
import LoadingIndicator from '../components/LoadingIndicator'
import UserImages from '../components/UserImages'
import {
    Container,
    Row,
    Col,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function UserProfile() {
    const userID = useParams();
    // console.log(userID)
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)



    useEffect(() => {
        axios.get(`https://insta.nextacademy.com/api/v1/users/${userID.id}`)
            .then((resp) => {
                // console.log(resp.data)
                setUser(resp.data)
                setLoading(false)
            })
    }, [userID.id])

    if (isLoading) {
        return <LoadingIndicator />
    }

    return (
        <div>
            <Container fluid>
                <Container className='m-2'>
                    <Row>
                        <Col sm={5}><img className='profilePic2' src={user.profileImage} alt="profile pic 2" /></Col>
                        <Col sm={6}> <h3>@{user.username}</h3></Col>
                    </Row>
                </Container>
                <UserImages  userID={userID.id} />
            </Container>
        </div>

    )
}

export default UserProfile;