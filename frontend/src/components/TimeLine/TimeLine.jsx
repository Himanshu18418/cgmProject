import React,{useEffect} from 'react'
import PostBox from '../PostBox/PostBox'
import UserIcon from '../UserIcon/UserIcon'
import './TimeLine.css'
import { useDispatch,useSelector } from 'react-redux'
import { getUserFollowingPosts } from '../../Actions/userActions'
import { Typography } from '@mui/material'


const TimeLine = () => {
    const dispatch = useDispatch();
    /**
     Get user's following
     post following's posts
     populate the timeline with those posts
     */

const {user,loading}=useSelector((state)=>state.userFollowingPosts)
const {user:me,loading:meLoading}=useSelector((state)=>state.user)






    useEffect(() => {
        dispatch(getUserFollowingPosts())
    }, [dispatch])

    
    return loading===false && meLoading===false? (
        <div className='sectionsContainer'>
            <div className="leftSection">
            <div className="parent">


   {user? user.map((item)=>(
    
    <div>

<PostBox
    key={item._id}
    id={item._id}
    title={item.title}
    content={item.content}
    likeArray={item.likes}
    likes={item.likes.length}
    comments={item.comments.length}
    commentArray={item.comments}
    name={item.author.name}

    inTL={true}
    />
    </div>
   )):null}
   </div>
            </div>
            <div className="rightSection2">
                <Typography variant='h5'>You're Following</Typography>
            {me.following.map((item)=>(
                <UserIcon inPg={true} avatar={item.avatar==undefined?null:item.avatar.url} inTl={true} userId={item._id} name={item.name} />
            ))}
            </div>
        </div>
    ):<div>Hi</div>
}

export default TimeLine
