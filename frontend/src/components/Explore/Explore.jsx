import { Typography,Button } from '@mui/material'

import React from 'react'
import './Explore.css'
import { useState } from 'react'
import { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'
import UserIcon from '../UserIcon/UserIcon'
import { getAllUsers } from '../../Actions/userActions'
import { getAllPosts } from '../../Actions/postActions'
import PostIcon from '../PostIcon/PostIcon'

function Explore() {
const dispatch=useDispatch();

    const [findUser, setFindUser] = useState("")

    const { users, loading } = useSelector((state) => state.allUsers);
    const {posts}=useSelector(state=>state.allPosts)

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Success")
        dispatch(getAllUsers(findUser));
        dispatch(getAllPosts(findUser))
      };
    const exploreImg="https://img.freepik.com/free-vector/business-team-looking-new-people-allegory-searching-ideas-staff-woman-with-magnifier-man-with-spyglass-flat-illustration_74855-18236.jpg"
useEffect(()=>{
    console.log(findUser)
},[findUser])
    return (
        <div>
<div className="exploreContainer">
    <div className="img">
    <img className='exploreImg' src={exploreImg}></img>
    </div>
    <div className="explore">
       
            <div className="Title">
            Explore
            </div>
            <div className="sub">
                Writers, Poems, Letters...Everything!
            </div>
            <div className="search">
            <form className="searchForm" onSubmit={submitHandler}>
        

        <input
          type="text"
          placeholder="Find amazing pieces and people"
          value={findUser}
          onChange={(e)=>{setFindUser(e.target.value)}}
          required

        />

        <Button type="submit" variant='contained' sx={{backgroundColor:"#DE354C",':hover':{bgcolor: '#DE354C', // theme.palette.primary.main
      color: 'white',}}}>
          Search
        </Button>
        <div className="searchResults">
          {users &&
            users.map((user) => (
              <UserIcon
                key={user._id}
                userId={user._id}
                name={user.name}
               avatar={user.avatar!=undefined?user.avatar.url:null}
              />
            ))}
            {posts &&
            posts.map((post) => (
              <PostIcon
                key={post._id}
                postId={post._id}
                title={post.title}

              />
            ))}
        </div>
        </form>
            </div>
       
    </div>
</div>

        </div>
    )
}

export default Explore
