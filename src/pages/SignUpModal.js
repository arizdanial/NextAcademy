import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const SignUpModal = (props) => {


    const modal = true
    const { closeModal, toggle, updateLogIn } = props


    const history = useHistory();
    const [username, changeUsername] = useState('')
    const [password, changePassword] = useState('')
    const [email, changeEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        submit()

    }

    const handleLogin = () => {
        if (localStorage.getItem("token")) {
            history.push("/yourprofile")
            toggle(false)
            updateLogIn()
        } else {

        }

    }

    useEffect(() => {
        handleLogin()
    })


    const submit = () => {
        axios.post('https://insta.nextacademy.com/api/v1/users/', { email, username, password })
            .then(resp => {
                localStorage.setItem("token", resp.data.auth_token)
                handleLogin()
            })
            .catch(() =>
                alert(`Sorry! Something went wrong. Please try again.`)
            )
        closeModal()

    }

    return (
        <>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Sign Up </ModalHeader>
                <Form onSubmit={handleSubmit}>
                    <ModalBody className='ms-2 mb-2 '>
                        <p>Please register your details below.</p>
                        <p>Email:</p>
                        <Input type="email" placeholder="email@example.com" value={email} onChange={(e) => { changeEmail(e.target.value) }} />
                        <p>Username:</p>
                        <Input type="text" placeholder="username" value={username} onChange={(e) => { changeUsername(e.target.value) }} />
                        <p>Password:</p>
                        <Input type="password" placeholder="password" value={password} onChange={(e) => { changePassword(e.target.value) }} />
                    </ModalBody>
                    <ModalFooter>
                        <Button type="submit" color="primary" onClick={submit}>Submit</Button>
                        <Button color="danger" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    )
}


export default SignUpModal;