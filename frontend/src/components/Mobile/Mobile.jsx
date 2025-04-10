import React, { Fragment, useState,useEffect, } from 'react'
// import './Login.css'
import CircularProgress from '@mui/material/CircularProgress';
import {Button, Grid,Link,Paper, Typography} from '@mui/material'
import { TextField } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useDispatch,useSelector } from 'react-redux'
import { loginUser } from '../../Actions/userActions'
import { loginWithOtp } from '../../Actions/userActions';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Loader from '../Loader/Loader'
import { useParams } from "react-router-dom";
import { Stack } from '@mui/system';




function Mobile() {
    const theme = createTheme({
        status: {
          danger: '#e53e3e',
        },
        palette: {
          primary: {
            main: '#0971f1',
            darker: '#053e85',
          },
          neutral: {
            main: '#087cfc',
            contrastText: '#fff',
          },
        },
      });
  
      const [number,setNumber]=useState("")
       const [password, setPassword] = useState("")
       const dispatch=useDispatch();
const [open, setOpen] = useState(false)
const {user,isAuthenticated,error} = useSelector(state => state.user)


const loading=useSelector(state=>state.loading)


async function verifyOtp() {
  // const mobile = document.getElementById("mobile").value;
  // const otp = document.getElementById("otp").value;

  // const response = await fetch("/api/verify-otp", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ mobile:number, otp:password}),
  // });

  // const data = await response.json();

  // if (response.ok) {
    await dispatch(loginWithOtp(number, password));
    alert("Login successful!");

    // localStorage.setItem('token', response.data.token);
        // Redirect to dashboard or home page
        window.location.href = '/'
  // } else {
  //   alert(data.error);
  // }
}

   
async function requestOtp() {
  // const mobile = document.getElementById("mobile").value;


  const response = await fetch("/api/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile:number }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("OTP sent!");
    // document.getElementById("verify-otp-form").style.display = "block";
  } else {
    alert(data.error);
    console.log(data.error)

  }
}

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(number))
        setOpen(true);

    }
    const [login, setLogin] = useState(false)
    const notificationHandler=()=>{
      if(user.user!=undefined){
        setOpen(true)
      }
  
      
    }
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };



    const paperStyle={padding:20,height:'70vh',width:450,margin:"20px auto"}

  return  ( loading?<Loader/>: 

      <Grid>
          <Paper elevation={10} style={paperStyle}>
              <Typography variant='h4' sx={{fontFamily:"Roboto",fontSize:"50px"}} mt={2} mb={4} ml={20}>Mobile</Typography>
          <Grid>
          <form onSubmit={requestOtp}>
          <TextField
          value={number}
        required
        id="outlined-required"
        label="Enter your Mobile Number"
        fullWidth
        mt={2} mb={4}
        onChange={(e) => { setNumber(e.target.value) }}
        
      />
       <TextField
        required
        value={password}
        id="outlined-required"
        label="Enter OTP"
        fullWidth
        type='password'
        sx={{marginTop:"5px"}}
        onChange={(e) => { setPassword(e.target.value) }}
        
      />
<ThemeProvider theme={theme}><Button color='neutral' variant="contained" fullWidth 
sx={{marginTop:"20px"}}
onClick={requestOtp}
>Send OTP</Button></ThemeProvider>
{isAuthenticated?
  <Stack>
    <Snackbar sx={{marginLeft:"35em"}} open={open} autoHideDuration={4000}  onClose={handleClose} >
  <Alert  onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Succesfully Logged In
        </Alert>
      </Snackbar>
  </Stack>:<Stack>
      <Snackbar sx={{marginLeft:"35em"}} open={open} autoHideDuration={4000}  onClose={handleClose} >
<Alert  onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {error}
      </Alert>
    </Snackbar>
      </Stack>
}


          </form>
          

          </Grid>
          <ThemeProvider theme={theme}>
          {/* <Typography mt={1}><Link underline="hover" color="#42a5f5">Forgot Password?</Link></Typography> */}
          <ThemeProvider theme={theme}><Button color='neutral' variant="contained" fullWidth
sx={{marginTop:"20px"}}
onClick={verifyOtp}
>Verify OTP</Button></ThemeProvider>
          {/* <Typography ml={14} mt={10}>Don't have an account? <Link href='/register' color="#42a5f5" underline="hover">Sign Up</Link></Typography> */}
          </ThemeProvider> 
          </Paper>
         
      </Grid>
  )
}

export default Mobile
