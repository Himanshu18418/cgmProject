import { Typography } from '@mui/material'
import React from 'react'
import websiteBackground from '../../websiteBackground.png'
import './Background.css'
function Background() {
    const imgbg="https://img.freepik.com/free-vector/notebook-concept-illustration_114360-387.jpg?w=2000"
    return (
        <div className='bg'>
<img src={imgbg} ></img>
           <div className="centered">CGM Monitor</div>
           {/* <div className='centered2'>A place where your words make a difference</div> */}
        </div>
    )
}

export default Background
