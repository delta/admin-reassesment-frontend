import React, {useState} from 'react'
import {
    Navbar, Nav
} from 'react-bootstrap';
import { Link } from 'react-router-dom'
import {isLogin} from '../utils/authUtils'
import axios from "axios";
import { unsetToken } from '../utils/authUtils'

const loggedInUrls = [
    {
        name: "Reassessment",
        url: "/forms/reassesment"
    },
    {
        name: "Redo Form",
        url: "/forms/redo"
    },
    {
        name: "Formative Assessment",
        url: "/forms/formative-assesment"
    },
]
const loggedOutUrls = [
    {
        name: "Login",
        url: "/login"
    },
]

export const CustomNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(isLogin())
    const handleLogout = async () => {
        let res = await axios({
            method: 'post',
            url: '/auth/logout',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': true
            }
        })
        if(res.data.success) {
            unsetToken();
            window.location.href = '/';
        }
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand><Link to='/' style={{ textDecoration: 'none', color:'#ffffff'}}>ARREARS</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    {(isLoggedIn ? loggedInUrls : loggedOutUrls).map((url, idx) => (
                            <Nav.Link as={Link} to={url.url} key={idx}>{url.name}</Nav.Link>
                    ))}
                    {
                        isLoggedIn?(<Nav.Link onClick={handleLogout}>Logout</Nav.Link>):''
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
