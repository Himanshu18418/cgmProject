import {configureStore} from '@reduxjs/toolkit' 
import { getPostReducer, manyOperationReducer, } from './Reducers/postReducer';
import { userReducer,myPostsReducer, OtherUserReducer, allUsersReducer, userFollowingPostsReducer, allPostsReducer } from './Reducers/userReducer';


const initialState={}
const store=configureStore(
{
reducer:{
    user:userReducer,
    like:manyOperationReducer,
myPosts:myPostsReducer,
otherUser:OtherUserReducer,
allUsers:allUsersReducer,
userFollowingPosts:userFollowingPostsReducer,
allPosts:allPostsReducer,
getPost:getPostReducer
   
}

})

export default store;