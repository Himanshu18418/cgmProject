import axios from 'axios'
export const loginWithOtp = (mobile, otp) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });

    const { data } = await axios.post(
      "/api/verify-otp",
      { mobile, otp }
    );

    
    console.log(data.token)
    dispatch({
      type: "loginSuccess",
      payload: data.user,
    });

    // Store the token (if using JWT)
    // localStorage.setItem("token", data.token

  } catch (error) {
    dispatch({
      type: "loginFailure",
      payload: error.response.data.message,
    });
  }
};


export const loginUser=(email,password)=>async (dispatch )=>{
    try {

        dispatch({
            type:"loginRequest"
        })

        const {data}=await axios.post("/api/login",{email,password},{
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        dispatch({
            type:"loginSuccess",
            payload:data.user,
        })
        
    } catch (error) {

        dispatch({
            type:"loginFailure",
            payload: error.response.data.message,
        })
    }
}
export const registerUser = (name, email, password,avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "registerRequest",
      });

      const { data } = await axios.post(
        "/api/register",
        { name, email, password,avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "registerSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "registerFailure",
        payload: error.response.data.message,
      });
    }
  };

export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "loadUserRequest",
      });
  
      const { data } = await axios.get("/api/me");
  
      dispatch({
        type: "loadUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "loadUserFailure",
        payload: error.response.data.message,
      });
    }
  };

export const logoutUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "logoutUserRequest",
      });
  
      await axios.get("/api/logout");
  
      dispatch({
        type: "logoutUserSuccess",

      });
    } catch (error) {
      dispatch({
        type: "logoutUserFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const getMyPosts = () => async (dispatch) => {
    try {
      dispatch({
        type: "myPostsRequest",
      });
  
      const { data } = await axios.get("/api/myPosts");
      dispatch({
        type: "myPostsSuccess",
        payload: data.posts,
      });
      console.log(data.posts)
    } catch (error) {
      console.log(error)
      dispatch({
        type: "myPostsFailure",
        payload: error.response.data.message,
      });
    }
  };

export const likeAndUnlikePost=(id)=>async(dispatch)=>{
  try {
    dispatch({
      type: "likePostRequest",
    });

    const { data } = await axios.get(`/api/post/${id}`);
console.log(data.message)
    dispatch({
      type: "likePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.log(error)
    dispatch({
      type: "likePostFailure",
      payload: error.response.data.message,
    });
  }
}

export const getOtherProfile=(id)=>async(dispatch)=>{
  try {
    dispatch({
      type: "loadOtherProfileRequest",
    });

    const { data } = await axios.get(`/api/user/${id}`);
console.log(data.user)
    dispatch({
      type: "loadOtherProfileSuccess",
      payload: data.user,
    });
  } catch (error) {
    console.log(error.response.data.message,)

    dispatch({
      type: "loadOtherProfileFailure",
      payload: error.response.data.message,
    });
  }
}

export const followUser=(id)=>async(dispatch)=>{
  try {
    dispatch({
      type: "followProfileRequest",
    });

    const { data } = await axios.get(`/api/follow/${id}`);

    dispatch({
      type: "followProfileSuccess",
      payload: data.message,
    });
  } catch (error) {
    console.log(error.response.data.message,)

    dispatch({
      type: "followProfileFailure",
      payload: error.response.data.message,
    });
  }
}

export const getUserFollowingPosts=()=>async(dispatch)=>{
  try {
    dispatch({
      type: "getUserFollowingPostsRequest",
    });

    const { data } = await axios.get(`/api/posts`);

    dispatch({
      type: "getUserFollowingPostsSuccess",
      payload: data.posts,
    });
    
  } catch (error) {
    console.log(error.response.data.message,)

    dispatch({
      type: "getUserFollowingPostsFailure",
      payload: error.response.data.message,
    });
  }
}

export const updatePassword=(oldPass,newPass)=>async (dispatch )=>{
  try {

      dispatch({
          type:"updatePasswordRequest"
      })

      const {data}=await axios.put("/api/updateMyPassword",{oldPass,newPass},{
          headers:{
              "Content-Type":"application/json"
          }
      })
      
      dispatch({
          type:"updatePasswordSuccess",
          payload:data.message,
      })
      
  } catch (error) {
      console.log(error)
      dispatch({
          type:"updatePasswordFailure",
          payload: error.response.data.message,
      })
  }
}

export const getAllUsers=(name="")=>async(dispatch)=>{
  try {

    dispatch({
        type:"allUsersRequest"
    })

    const {data}=await axios.get(`/api/users?name=${name}`)
    
    dispatch({
        type:"allUsersSuccess",
        payload:data.users,
    })
    
} catch (error) {
    console.log(error)
    dispatch({
        type:"allUsersFailure",
        payload: error.response.data.message,
    })
}
}