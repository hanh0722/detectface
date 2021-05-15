import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt';
import logo from './logo.png'
const Logo = () =>{
    return (
        <div>
            <Tilt className="Tilt shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner">
                    <img alt="logo" className="logo" src ={logo}/>
                </div>
            </Tilt>
        </div>
    )
}
export default Logo;