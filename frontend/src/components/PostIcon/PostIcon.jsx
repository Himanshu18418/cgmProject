import React from 'react'
import { Link } from 'react-router-dom'
import './PostIcon.css'


const PostIcon = ({postId,title}) => {
    return (

             <div className="postIconBox">

<Link to={`/post/get/${postId}`}  style={{ textDecoration: 'none' }}>
    {/* <AccountCircleIcon sx={inPg?{fontSize:50,marginTop:"2rem"}:{fontSize:30,marginTop:"0"}}/>  */}


<p>{title}</p>


</Link>
        </div>
    )
}

export default PostIcon
