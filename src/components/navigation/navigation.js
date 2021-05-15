import React from 'react';
import './navigation.css';
const Navigation = ({onSignin, isSignedIn}) =>{
    if(isSignedIn === false){
        return(
            <nav>
                <p onClick={() => onSignin('signin')} className="text-sign">Sign out</p>
            </nav>
        )
    }
    else{
        return(
            <nav>
                <p onClick={() => onSignin('signin')} className="text-sign">Sign in</p>
                <p onClick={() => onSignin('register')} className="text-sign">Register</p>
            </nav>
        )
    }
};
export default Navigation