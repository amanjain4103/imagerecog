import React from 'react';
import './NavigationBar.css';

const NavigationBar = ({onRouteChange,isSignedIn}) =>{
   
    if(isSignedIn){
        return (
            <div className="navbar">
                <section onClick={() => onRouteChange('signout')} className="ml-auto fw7 f3 sign" id="signOut" >Sign Out</section>
            </div>
        )
    }else {
        return (
            <div className="navbar">
                <section onClick={() => onRouteChange('refister')} className="ml-auto fw7 f3 sign" id="Register" >Register</section>
                <section onClick={() => onRouteChange('signin')} className="fw7 f3 sign" id="signIn" >Sign In</section>
            </div>
        )
    }
}

export default NavigationBar;