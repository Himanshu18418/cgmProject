import React,{Fragment} from 'react'
import './AboutUs.css'
import docsImage from '../../docsImage.png'
import collab from '../../collaborate.png'
import Footer from '../Footer/Footer'

function AboutUs() {
    const image='https://img.freepik.com/free-vector/happy-young-couple-having-fun-girl-guy-dancing-party-celebrating-good-news-flat-illustration_74855-10820.jpg?w=2000'
    const bgimg="https://img.freepik.com/free-vector/creative-writing-concept-illustration_114360-8317.jpg?w=2000"
    return (
        <div>
<Fragment>
<div className="headBox">
    <img src={bgimg}></img>
<div className="bigTitle">
Creating Impact through Writing
</div>
</div>
<div className="contentBox">
We are WritersZinga!
<br />

</div>
<div className="cb">
<div className="image1">
<img src={docsImage}></img>
</div>
<div className="content1">
We believe the best way to create impact is through writing. So our team has created the world’s biggest platform for writers to express their thoughts . No this is not another blogging platform. WritersZinga is a platform built by people, for the people. Crispy Essays? Lovely Poems? Formatted Letters? Resume templates?
We have got you covered!</div>
</div>
<div className="contentBox">
Connect, Collaborate, Create!
<br />

</div>
<div className="cb">

<div className="content2">
The best way to create awesome writings is through collaboration with awesome creators.
Our platform is specially built to help connect creators.<br></br><br></br> CONNECT,INNOVATE and INSPIRE
</div>
<div className="image2">
    <img src={collab}></img>
</div>
</div>

<div className="contentBox">
Inspire Millions
<br />

</div>
<div className="cb">
<div className="image3">
    <img src={image}></img>
</div>

<div className="content3">
Our platform enables you to create awesome writings to inspire people.<br></br><br></br> CONNECT,INNOVATE and INSPIRE
</div>

</div>
</Fragment>
<Footer/>
        </div>
    )
}

export default AboutUs
//Creating Impact through words