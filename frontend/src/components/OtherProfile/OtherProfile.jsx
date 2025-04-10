// import React,{useState,useEffect} from 'react'

// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import {Avatar, Button, Dialog, Typography } from '@mui/material';
// import PostBox from '../PostBox/PostBox';
// import {FaInstagram} from '@react-icons/all-files/fa/FaInstagram'
// import {FaFacebook} from '@react-icons/all-files/fa/FaFacebook'
// import {FaTwitter} from '@react-icons/all-files/fa/FaTwitter'
// import {useSelector,useDispatch} from 'react-redux'
// import { useParams } from "react-router-dom";
// import './OtherProfile.css'
// import { getOtherProfile,followUser } from '../../Actions/userActions';
// import UserIcon from '../UserIcon/UserIcon';



// const OtherProfile = () => {

// const {user,loading:userLoading}=useSelector((state)=>state.user)
// const params=useParams()
// const dispatch=useDispatch()
// let myProfile=false
// useEffect(()=>{

//     dispatch(getOtherProfile(params.id))


//     if(params.id==user._id){
//         myProfile=true;
//     }


// },[dispatch,params.id])






// const [followersToggle, setFollowersToggle] = useState(false)
// const [following, setFollowingToggle] = useState(false)
// const [follow,setFollow]=useState(false)
// const {loading,error,posts}=useSelector((state)=>state.myPosts)
// const {user:otherUser,loading:otherUserLoading,avatar}=useSelector((state)=>state.otherUser)

// let otherUserPosts=[]
// let otherUserId=null;

// let otherUserImage="";

// if(otherUser!=undefined){
//     otherUserPosts=otherUser.posts
// otherUserId=otherUser._id
// if(otherUser.avatar!=undefined){
//     otherUserImage=otherUser.avatar.url;
// }
// }
// let followingArray=[]
// followingArray=user.following


// useEffect(()=>{
// followingArray.forEach((item)=>{
//     if(item._id===otherUserId){

//         setFollow(true)

//     }
// })
// },[followingArray,otherUserId])

// const followHandler=()=>{
//     dispatch(followUser(otherUserId))
//     setFollow(!follow)
// }


// const followersHandler=()=>{
//     setFollowersToggle(!followersToggle)
// }


// const followingHandler=()=>{
//     setFollowingToggle(!following)
// }
//     return  userLoading === true || otherUserLoading === true ? (
//     <div>Hi</div>
//       ) :(
//         <div>
//  <div className='containerBox'>
// <div className="card">
// {otherUserImage!=undefined? <Avatar   sx={{ width: 250, height: 250, marginLeft:"6rem",marginTop:"2rem" }} src={otherUserImage}/>:<AccountCircleIcon sx={{fontSize:210,marginTop:"2rem",marginLeft:"8rem"}} className='account-icon'/> }
// <Typography variant='h2' className='name'>{otherUser!=undefined?otherUser.name:user.name}</Typography>

// {follow?<Button onClick={followHandler} className='follow' variant='contained' sx={{backgroundColor:"red",marginTop:"2rem",marginLeft:"2rem",':hover':{bgcolor: '#DE354C', // theme.palette.primary.main
//       color: 'white',}}}>Unfollow</Button>:<Button onClick={followHandler} className='follow' variant='contained' sx={{backgroundColor:"blue",marginTop:"2rem",marginLeft:"2rem",':hover':{bgcolor: '#DE354C', // theme.palette.primary.main
//       color: 'white',}}}>Follow</Button>}
// <div className="desc"><Typography sx={{marginLeft:"1rem"}}>{otherUser!=undefined?otherUser.bio:user.bio}</Typography></div>

// <div className="follows">
// <button className='followersBtn' onClick={followersHandler}>
// <div className="followers">
// <p>Followers</p>
// <p className='countFollowers'>{otherUser!=undefined?otherUser.followers.length:user.followers.length}</p>
// </div>
// <Dialog
//               open={followersToggle}
//               onClose={() => setFollowersToggle(!followersToggle)}
//             >
//                 <div className="db"> <Typography variant="h4">Followers</Typography>
//                 {otherUser!=undefined? otherUser.followers.map((item)=>(
//                     <UserIcon userId={item._id} name={item.name} inPg={true} avatar={item.avatar==undefined?null:item.avatar.url}/>
//                 )):null}</div>
//             </Dialog>
// </button>
// <button className='followingsBtn' onClick={followingHandler} >
// <div className="following"><p>Following</p>
// <p className='countFollowing'>{otherUser!=undefined?otherUser.following.length:user.following.length}</p>
// </div>
// <Dialog
//               open={following}
//               onClose={() => setFollowingToggle(!following)}
//             >
//                 <div className="db"> <Typography variant="h4">Following</Typography>
//                 { otherUser!=undefined? otherUser.following.map((item)=>(
//                     <UserIcon userId={item._id} name={item.name} inPg={true} avatar={item.avatar==undefined?null:item.avatar.url}/>
//                 )):null}
                

//                 </div>
//             </Dialog>
// </button>

// </div>


// </div>
// <div className="rightSection">
// <h1>{otherUser!=undefined?otherUser.name:"Posts"}'s Writings</h1>
// {otherUserPosts && otherUserPosts.length>0? (


// otherUserPosts.map((post) => (
//     <PostBox
//       key={post._id}
//       id={post._id}
//      title={post.title}
//      content={post.content}
//      likeArray={post.likes}
//      likes={post.likes.length}
//      comments={post.comments.length}
//      commentArray={post.comments}
//     />
//   ) ,

// ))
// :
//           <Typography variant="h6">User has not made any post</Typography>
//         }


// </div>

//         </div>
//         </div>
//     )
// }

// export default OtherProfile



