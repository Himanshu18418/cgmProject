// import axios from "axios";


// export const likePost = (id) => async (dispatch) => {
//     try {
//       dispatch({
//         type: "likeRequest",
//       });
  
//       const { data } = await axios.get(`/api/post/${id}`);
//       dispatch({
//         type: "likeSuccess",
//         payload: data.message,
//       });
//     } catch (error) {
//       dispatch({
//         type: "likeFailure",
//         payload: error.response.data.message,
//       });
//     }
//   };
  
//   export const addCommentOnPost = (id, comment) => async (dispatch) => {
//     try {
//       dispatch({
//         type: "addCommentRequest",
//       });
  
//       const { data } = await axios.put(
//         `/api/post/comments/${id}`,
//         {
//           comment,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
  
//       dispatch({
//         type: "addCommentSuccess",
//         payload: data.message,
//       });
//     } catch (error) {
//       console.log(error)
//       dispatch({
//         type: "addCommentFailure",
//         payload: error.response.data.message,
  
//       });
//     }
//   };

//   export const publishBlog=(title,content, image) => async (dispatch)=>{
//     try {
//       dispatch({
//         type: "newPostRequest",
//       });
  
//       const { data } = await axios.post(
//         `/api/publish/blog`,
//         {
//           title,
//           content,
//           image,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       dispatch({
//         type: "newPostSuccess",
//         payload: data.message,
//       });
//     } catch (error) {
//       dispatch({
//         type: "newPostFailure",
//         payload: error.response.data.message,
  
//       })
      
//     }
//   }

//   export const getAllPosts=(name="")=>async(dispatch)=>{
//     try {
  
//       dispatch({
//           type:"allPostsRequest"
//       })
  
//       const {data}=await axios.get(`/api/allPosts?title=${name}`)
      
//       dispatch({
//           type:"allPostsSuccess",
//           payload:data.posts,
//       })
      
//   } catch (error) {
//       console.log(error)
//       dispatch({
//           type:"allPostsFailure",
//           payload: error.response.data.message,
//       })
//   }
//   }

//   export const deletePost = (id) => async (dispatch) => {
//     try {
//       dispatch({
//         type: "deletePostRequest",
//       });
  
//       const { data } = await axios.delete(`/api/delete/blog/${id}`);
//       dispatch({
//         type: "deletePostSuccess",
//         payload: data.message,
//       });
//     } catch (error) {
//       dispatch({
//         type: "deletePostFailure",
//         payload: error.response.data.message,
//       });
//     }
//   };

//   export const getPost=(id)=>async(dispatch)=>{
//     try {
  
//       dispatch({
//           type:"getPostRequest"
//       })
  
//       const {data}=await axios.get(`/api/post/get/${id}`)
      
//       dispatch({
//           type:"getPostSuccess",
//           payload:data.post,
//       })
      
//   } catch (error) {

//       dispatch({
//           type:"getPostFailure",
//           payload: error.response.data.message,
//       })
//   }
//   }
