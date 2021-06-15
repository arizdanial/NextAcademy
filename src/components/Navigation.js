import React, { useEffect, useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from './images/insta-logo.png';
import LoginModal from '../pages/LoginModal';
import SignUpModal from '../pages/SignUpModal';
import { useHistory } from 'react-router';


const Navigation = () => {

    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginModal, changeLoginModal] = useState(true);
    const [isLoggedIn, changeLoggedIn] = useState(false)


    const toggle = () => {
        setIsOpen(!isOpen) ?
            setIsOpen(true)
            :
            setIsOpen(!isOpen)
    }

    const openLoginModal = () => {
        toggle()
        changeLoginModal(true)
    }
    const openSignUpModal = () => {
        toggle()
        changeLoginModal(false)
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    const updateLogIn = () => {
        changeLoggedIn(true)
    }

    const removeSession = () => {
        localStorage.removeItem('token')
        history.push('/')
        changeLoggedIn(false)
    }

    const checkSiteLogIn = () => {
        if (localStorage.getItem('token')) {
            return changeLoggedIn(true)
        } else {
        }
    }


    useEffect(() => {
        checkSiteLogIn()
    }, [])


    return (
        <div>
            <Navbar color="light" light expand="md" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <img style={{ width: "32px", margin: "0px 10px 0px 40px", cursor: 'pointer' }} onClick={() => { history.push("/") }} src={Logo} />
                    <NavbarBrand className="pointerStyle" onClick={() => { history.push("/") }}>Nextagram</NavbarBrand>
                </div>
                <div style={{ marginRight: '40px', color: 'blue' }}>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="" >Users</NavLink>
                            </NavItem>
                            {
                                isOpen ?
                                    isLoginModal ?
                                        <LoginModal closeModal={closeModal} toggle={toggle} updateLogIn={updateLogIn} />
                                        :
                                        <SignUpModal closeModal={closeModal} toggle={toggle} updateLogIn={updateLogIn} />
                                    :
                                    null
                            }
                            {
                                isLoggedIn ?
                                    <>
                                        <NavItem>
                                            <NavLink className="pointerStyle" onClick={() => { history.push('/yourprofile') }}>Your Profile</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="pointerStyle" onClick={removeSession}>Log Out</NavLink>
                                        </NavItem>
                                    </>
                                    :
                                    <>
                                        <NavItem>
                                            <NavLink className="pointerStyle" onClick={openLoginModal}>Sign In</NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink className="pointerStyle" onClick={openSignUpModal}>Sign Up</NavLink>
                                        </NavItem>
                                    </>
                            }

                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        </div >
    );
}

export default Navigation;

