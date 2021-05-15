import React from 'react';
import './linkform.css';
const LinkForm = ({onInputChange, onSubmit}) =>{
    return (
        <div className="center-text-form">
            <p>This Magic Brain will detect faces in your picture. Give it a try!</p>
            <div className="centerForm">
                <div className="input shadow-2">
                {/* addEventListener onChange */}
                    <input onChange={onInputChange} type="text" placeholder="Enter your URL"/>
                    <button onClick={onSubmit} className="grow bg-light-purple">{'Detect'}</button>
                </div>
            </div>
        </div>
    )
}

export default LinkForm;