import React from 'react'
import first from '../../first.jpg'
import second from '../../second.jpg'
import third from '../../third.jpg'
import Footer from '../Footer/Footer'
import './body.css'
function Body() {
    const img1="https://img.freepik.com/free-vector/characters-people-their-social-network-illustration_53876-58967.jpg?w=2000"
   const img2="data:image/jpeg;base64,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"
   const img3="https://static.vecteezy.com/system/resources/previews/000/163/248/original/open-mind-concept-illustration-vector-illustration.jpg"
   
    return (
        <div>
           
            <div className="firstBox">
            <div className="boxContainer">
            <div className="firstHeading">Share your ideas with the world</div>
            <div className="firstContent">
We provide you a platform to unleash your creativity in writing.Our mission is to create the biggest platform for writers across the globe to express, collaborate and inspire others. Explore, Learn and have fun!</div>
            </div>
            <div className="firstImage">
<img className='firstimg' src={img1}></img>

            </div>
            </div>
            <div className="secondBox">
            <div className="boxContainer">
            <div className="secondHeading">Find all pieces of writings here</div>
            <div className="secondContent">
Crisp Essays? Lovely Poems? Letters? Stories that make you go WOW! We have got you covered. Our platform is a one stop solution for all your needs.</div>
            </div>
            <div className="secondImage">
            <img className='firstimg' src={img2}></img>
            </div>
            </div>
            <div className="thirdBox">
            <div className="boxContainer">
            <div className="thirdHeading">You write, You inspire</div>
            <div className="thirdContent">
<i>“Write what should not be forgotten”
Isabelle Allende</i><br></br>
<br></br>
When you write you inspire millions. Our platform gives you the opportunity to make a global impact
 .Your words create an impact on the world around you. Let your words speak louder than your actions. Let them inspire!</div>
            </div>
            <div className="thirdImage"></div>
            <img className='thirdimage' src={img3}></img>
            </div>

<Footer/>
        </div>
    )
}

export default Body
