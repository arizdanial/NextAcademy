import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import LoadingIndicator from "../components/LoadingIndicator";
import UserImages from "../components/UserImages";

function Homepage() {

    const [user, updateUser] = useState([]);
    const [isLoading, setLoading] = useState(true)



    useEffect(() => {
        axios.get("https://insta.nextacademy.com/api/v1/users/")
            .then((resp) => {
                // console.log(resp.data)
                updateUser(resp.data)
                setLoading(false)
            })
    }, [])

    if (isLoading) {
        return <LoadingIndicator />
    }

    return (
        <div>
            {
                user.map((p) => {
                    return (
                        <div className="userBoard" key={p.id}>
                            <div className="userInfo" >
                                <Link to={`/profile/${p.id}`} className="userLink">{p.username}</Link>
                                <img className="profilePic" src={p.profileImage} alt="profile picture" />
                            </div>
                            <UserImages  userID={p.id}/>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Homepage;