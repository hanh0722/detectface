import React from 'react';
import './picture.css'
const recogitionFace = ({url, box}) =>{
    return (
        <div className = 'picture-center ma'>
            <div className='mt3 relative'>
                <img id='input-image' alt="" src = {url} width='500px' height='auto'/>
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}
export default recogitionFace;