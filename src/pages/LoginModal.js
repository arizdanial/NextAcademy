import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginModal = (props) => {

    const styleWrap = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "1rem",
        width: '18rem'
    }
    const history = useHistory();
    const { closeModal, toggle, updateLogIn } = props
    const [username, changeUsername] = useState("");
    const [password, changePassword] = useState("");
    const [modal, setModal] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault()
        login()
    }

    const handleLogin = () => {
        if (localStorage.getItem("token")) {
            history.push("/yourprofile")
            toggle(false)
            updateLogIn()
        }else {
        }
    }

    useEffect(() => {
        handleLogin()
    }, [])

    const login = () => {
        axios.post('https://insta.nextacademy.com/api/v1/login', { username, password })
            .then((resp) => {
                // console.log(resp)
                changeUsername("")
                changePassword("")
                localStorage.setItem("token", resp.data.auth_token)
                handleLogin()
            })
            .catch(() => {
                alert(`Sorry! Something went wrong. Please try again.`)
            })
        closeModal()
    };

    return (
        <>
            < Modal isOpen={modal} toggle={toggle} >
                <ModalHeader>Sign In </ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <ModalBody className='ms-4 p-2'>
                        <p>Username:</p>
                        <Input style={styleWrap} type='text' value={username.trim()} onChange={(e) => { changeUsername(e.target.value) }} />
                        <p>Password: </p>
                        <Input style={styleWrap} type='password' value={password.trim()} onChange={(e) => { changePassword(e.target.value) }} />
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary" onClick={login}>Login</Button>
                        <Button color="danger" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    )

};

export default LoginModal;
