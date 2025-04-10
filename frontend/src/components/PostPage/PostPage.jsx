// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { getPost } from '../../Actions/postActions'
// import './PostPage.css'

// const PostPage = () => {

//     const {id}=useParams()
//     const dispatch=useDispatch()
//     const {post,loading}=useSelector(state=>state.getPost)
//     let i=0;
// console.log(loading)
// console.log(id)
// console.log(post)
// let a=0
// useEffect(()=>{
// dispatch(getPost(id))
// },[])
// if(loading==false){
//     post.forEach((item)=>{

//         console.log(item)
//         if(item._id==id){
//             i=a
//         }
//         a++;
//     })
// }



//     return loading===undefined || loading===true? null:(
//         <div>
       
//            <div className="writingContainer">
//               <h1 style={{textAlign:"center"}}>{post[i].title}</h1>
//               <p className='author'>by {post[i].author.name}</p>
//               <img className='imageContainer' src={post[i].imageUrl.url}></img>
//               <p className='contentPP'>{post[i].content}</p>
//               </div>
     
//                 </div>
//     )
// }

// export default PostPage
