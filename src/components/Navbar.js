import React, {useState} from 'react'
import {
    Navbar, Nav
} from 'react-bootstrap';
import { Link } from 'react-router-dom'

const loggedInUrls = [
    {
        name: "Reassesment",
        url: "/reassesment"
    },
    {
        name: "Redo Form",
        url: "/redo"
    },
    {
        name: "Formative Assesment",
        url: "/formative-assesment"
    },
]
const loggedOutUrls = [
    {
        name: "Login",
        url: "/login"
    },
]

export const CustomNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand>ARREARS</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    {(isLoggedIn ? loggedInUrls : loggedOutUrls).map((url, idx) => (
                        <Link to={url.url} key={idx}>
                            <Nav.Link href={url.url} key={idx}>{url.name}</Nav.Link>
                        </Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
