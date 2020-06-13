import React from 'react';
import nittHeader from '../images/nitt.png';
import nittMob from '../images/nittmob.png';
import { Button } from 'react-bootstrap'
export const Landing = () => {
    return (
        <>
        <div className='landingContainer'>
            <picture>
                <source media="(min-width: 900px)" srcSet={nittHeader} />
                <img src={nittMob} alt="Nitt Header"  className='headerImage'/>
            </picture>
            <h1 className="headerText">ARREARS PORTAL</h1>
        </div>
        <div className="landingBody">
            <Button className="loginButton" variant="success">LOGIN</Button>
        </div>
            </>
    )
}