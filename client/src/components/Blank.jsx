
import React from 'react'
import empty from "../assets/empty.png"
const Blank = ({ label }) => {
    return (
        <div className=''>
            <div className=' h-72 w-72'>
                <img className='fill' src={empty} />
            </div>
            <p className='text-xl font-semibold text-center text-gray-500'>
                {label}
            </p>
        </div>
    )
}

export default Blank