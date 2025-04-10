// import React,{useState} from 'react'
// import './PostBox.css'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import DeleteIcon from '@mui/icons-material/Delete';
// import {
//     MoreVert,
//     Favorite,
//     FavoriteBorder,
//     ChatBubbleOutline,
//     DeleteOutline,
//     Delete,
//     ConnectingAirportsOutlined,
//   } from "@mui/icons-material";
// import { Button } from '@mui/material';
// import {useSelector,useDispatch} from 'react-redux'
// import { likeAndUnlikePost } from '../../Actions/userActions';
// import UserIcon from '../UserIcon/UserIcon';
// import { Typography,Dialog } from '@mui/material';
// import { addCommentOnPost, deletePost } from '../../Actions/postActions';
// import CC from '../CommentCards/CC';
// import { Stack } from '@mui/system';
// import { Alert } from '@mui/material';
// import Snackbar from '@mui/material/Snackbar';
// import { Link } from 'react-router-dom';


// const PostBox = ({id,avatar,title,content,likes,comments,commentArray,likeArray,isAccount,inTL,isDelete,name}) => {
//     const {user,loading:userLoading}=useSelector((state)=>state.user)
// const [commentValue,setCommentValue]=useState("")
// const dispatch=useDispatch()

// const [open, setOpen] = useState(false)
// const [commentToggle,setCommentToggle]=useState(false)
// const {loading,error,posts}=useSelector((state)=>state.myPosts)
// const { isAuthenticated } = useSelector((state) => state.user);
// const {user:otherUser,loading:otherUserLoading}=useSelector((state)=>state.otherUser)
// const {loading:deleteLoading,message,error:deleteError}=useSelector(state=>(state.like))
// let postsOfOtherUser=[]
// if(otherUser!=undefined){
//      postsOfOtherUser=otherUser.posts
// }
// let likedPostsOfOtherUser=[]

// if(postsOfOtherUser.length>0){
//     for (let i = 0; i < postsOfOtherUser.length; i++) {
//         likedPostsOfOtherUser=postsOfOtherUser[i].likes
            
//         }
// }
// const deleteHandler=async()=>{
// await dispatch(deletePost(id))
// setOpen(true);
// }
// const handleClose = (event, reason) => {
//   if (reason === 'clickaway') {
//     return;
//   }

//   setOpen(false);
// };


// const addCommentHandler=async (e)=>{
// e.preventDefault();
// await dispatch(addCommentOnPost(id,commentValue))

// }

//     const [liked, setLiked] = useState(false);
//     const handleLike = async () => {
//         setLiked(!liked);
//   await  dispatch(likeAndUnlikePost(id))
//     }


//     React.useEffect(() => {
//         likeArray.forEach((item) => {

//             if (item._id === user._id) {

//               setLiked(true);

//             }
//           });
//       }, [likeArray,user._id]);
    
//         React.useEffect(()=>{

//             likedPostsOfOtherUser.forEach((item)=>{
//                 if(item===user._id){
//                     setLiked(true)
//                 }
//             })
    
//           },[likedPostsOfOtherUser])
     

     
//     return (
//         <div>
//             <div className="box">
//                {inTL?  <UserIcon name={name} inTl={inTL} /> :null}
//                <Link to={`/post/get/${id}` } style={{ textDecoration: 'none' }}> <h1>{title}</h1></Link>
//                 <p>{content}</p>
//             <div className="icons">
//             <div className="like">
            
//             <Button onClick={handleLike}>
//         {liked? <Favorite style={{ color: "red" }} />: <FavoriteBorder/>}
// {likes}
//         </Button>
        
//             </div>
//             <Button onClick={() => setCommentToggle(!commentToggle)} >
//           <ChatBubbleOutline />
//         </Button>
//         <Dialog   open={commentToggle}
//         onClose={() => setCommentToggle(!commentToggle)}>
//         <div className="DialogBox">
//           <Typography variant="h4">Comments</Typography>

//           <form className="commentForm" onSubmit={addCommentHandler}>
//             <input
//               type="text"
//               value={commentValue}
//               onChange={(e) => setCommentValue(e.target.value)}
//               placeholder="Comment Here..."
//               required
//             />

//             <Button type="submit" variant="contained">
//               Add
//             </Button>
//           </form>

//           {commentArray.length > 0 ? (
//             commentArray.map((item) => (
//              <CC id={item._id} comment={item.comment} />

//             ))
//           ) : (
//             <Typography variant='h6'>No comments Yet</Typography>
//           )}
//         </div>
//       </Dialog> 
//             {/* <div className="comment"><Button onClick={commentHandler} >
//           <ChatBubbleOutline style={{color:"green"}} />
//           {comments}
//         </Button></div> */}
//        {isDelete? <div className="delete">
//                <Button onClick={deleteHandler}>
//                 <DeleteIcon style={{color:"red"}}></DeleteIcon>
//                </Button>
//             </div>:null}
//             {message=="Blog deleted successfully"?
//   <Stack>
//     <Snackbar sx={{marginLeft:"35em"}} open={open} autoHideDuration={4000}  onClose={handleClose} >
//   <Alert  onClose={handleClose} severity="success" sx={{ width: '100%' }}>
// {message}
//         </Alert>
//       </Snackbar>
//   </Stack>:<Stack>
//       <Snackbar sx={{marginLeft:"35em"}} open={open} autoHideDuration={4000}  onClose={handleClose} >
// <Alert  onClose={handleClose} severity="error" sx={{ width: '100%' }}>
// Error occured
//       </Alert>
//     </Snackbar>
//       </Stack>
// }
//             </div>
            
//             </div>
//         </div>
//     )
// }

// export default PostBox


// {/* <Dialog
//         open={commentToggle}
//         onClose={() => setCommentToggle(!commentToggle)}
//       >
//         <div className="DialogBox">
//           <Typography variant="h4">Comments</Typography>

//           <form className="commentForm" onSubmit={addCommentHandler}>
//             <input
//               type="text"
//               value={commentValue}
//               onChange={(e) => setCommentValue(e.target.value)}
//               placeholder="Comment Here..."
//               required
//             />

//             <Button type="submit" variant="contained">
//               Add
//             </Button>
//           </form>

//           {comments.length > 0 ? (
//             comments.map((item) => (
//               <CommentCard
//                 userId={item.user._id}
//                 name={item.user.name}

//                 comment={item.comment}
//                 commentId={item._id}
//                 key={item._id}
//                 postId={postId}
// isAccount={isAccount}
//               />
//             ))
//           ) : (
//             <Typography>No comments Yet</Typography>
//           )}
//         </div>
//       </Dialog> */}