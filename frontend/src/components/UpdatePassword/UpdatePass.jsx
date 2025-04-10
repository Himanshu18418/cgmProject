import { Typography } from '@mui/material'
import React,{useState,useEffect} from 'react'
import './UpdatePass.css'
import { useDispatch,useSelector } from 'react-redux'
import { updatePassword } from '../../Actions/userActions'

const UpdatePass = () => {
const [oldPass,setOldPass]=useState("")
const [newPass,setNewPass]=useState("")

const  dispatch = useDispatch();

const updatePassHandler=(e)=>{
e.preventDefault()
    dispatch(updatePassword(oldPass,newPass))
}



    return (
        <div>
           
            <form className='updatepassForm' onSubmit={updatePassHandler} >
            <Typography variant='h3'>Update Password</Typography>
            <Typography variant='h5'>Old Password</Typography>
<input className='' placeholder='Enter Old Password' type='password' value={oldPass} onChange={(e)=>{
    setOldPass(e.target.value)
}}/>
<Typography variant='h5'>New Password</Typography>
<input type='password' placeholder='Enter New Password' value={newPass} onChange={(e)=>{
    setNewPass(e.target.value)}}/>
<button type='submit'>Update Password</button>
            </form>
        </div>
    )
}

export default UpdatePass
