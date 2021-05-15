import React from 'react';
import './rank.css'
const Rank = ({name, rank}) =>{
    return (
        <div className='center-text'>
            <div className='white f3 tc text-top'>
                {`${name}, your current rank is...`}
            </div>
            <div className='white f2'>
                {`${rank}`}
            </div>
        </div>
    )
}

export default Rank;