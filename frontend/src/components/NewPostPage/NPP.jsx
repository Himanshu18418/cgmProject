// import React from 'react'
// import './NPP.css'
// import {Button, Grid,Link,Paper, Typography} from '@mui/material'
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import { useDispatch,useSelector } from 'react-redux'
// import { loadUser } from '../../Actions/userActions';
// import { publishBlog } from '../../Actions/postActions';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
// import {Snackbar} from '@mui/material';
// import { useEffect } from 'react';


// const NPP = () => {

//   const [open, setOpen] = React.useState(false);
// const {loading}=useSelector(state=>state.like)

// const {message}=useSelector(state=>state.like)
// console.log(loading,message)
//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };
// const  dispatch = useDispatch()

// const vertical='top'
// const horizontal='center'
//     const [image,setImage]=React.useState(null);
//     const [caption,setCaption]=React.useState("")
// const [title, setTitle] =React.useState("")
//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
    
//         const Reader = new FileReader();
//         Reader.readAsDataURL(file);
    
//         Reader.onload = () => {
//           if (Reader.readyState === 2) {
//             setImage(Reader.result);
//           }
//         };
//       };

//       const submitHandler = async (e) => {

//         e.preventDefault();

//         await dispatch(publishBlog(title,caption, image));

//         dispatch(loadUser());
//         handleClick()

//       };

//     return (
//         <div>
// <div className="postContainer">
//        <form onSubmit={submitHandler}>
//        <h1>New Post</h1>

//     {image && <img src={image} alt='post'/>}
// <input type='file' accept='image/*' onChange={handleImageChange}  />

// <div className="title">
//     <input type="text" placeholder='Title'
// value={title} onChange={(e)=>setTitle(e.target.value)}
// />
// </div>

//     <div className="caption">
//     <input type="text" placeholder='Content'
// value={caption} onChange={(e)=>setCaption(e.target.value)}
// />
//     </div>
//     <Button disabled={loading} type="submit" variant='contained' sx={{backgroundColor:"#DE354C",':hover':{bgcolor: '#DE354C', // theme.palette.primary.main
//       color: 'white',}}} >
//           Publish
//         </Button>
//        </form>
//        {loading?null:<Stack>
//         <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
//           {message}
//         </Alert>
//       </Snackbar></Stack>}
// </div>
//         </div>
//     )
// }

// export default NPP
