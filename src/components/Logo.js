import React from 'react';
import Tilt from 'react-parallax-tilt';
import Logo1 from '../logo1.png'
import './Logo.css';

const Logo = () =>{
    return (
        <Tilt className="w-20 h-10 pa2 ma2">
            <div id="logo" className="h-10  shadow-2" >
               <img src={Logo1} alt="" />
            </div>
        </Tilt>
    )
}

export default Logo ;