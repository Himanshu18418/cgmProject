import "./App.css";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Explore from "./components/Explore/Explore";
import AboutUs from "./components/AboutUs/AboutUs";
import User from "./components/User/User";
// import NPP from "./components/NewPostPage/NPP";
// import OtherProfile from "./components/OtherProfile/OtherProfile";
// import TimeLine from "./components/TimeLine/TimeLine";
import UpdatePass from "./components/UpdatePassword/UpdatePass";
// import PostPage from "./components/PostPage/PostPage";
import Mobile from "./components/Mobile/Mobile";
// import CgmChart from "./components/CgmChart/CgmChart";
import Graph from "./components/Graph/Graph";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token)
    console.log(!!token)
    setIsAuthenticated(!!token); // convert to true/false
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/account"
            element={isAuthenticated ? <Home /> : <Login />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Home /> : <Login />}
          />
          <Route
            path="/mobile"
            element={isAuthenticated ? <Home /> : <Mobile />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <User /> : <Register />}
          />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<AboutUs />} />
          {/* <Route path="/newPost" element={<NPP />} /> */}
          {/* <Route
            path="/user/:id"
            element={isAuthenticated ? <OtherProfile /> : <Login />}
          /> */}
          <Route
            path="/timeline"
            element={isAuthenticated ? <Graph/> : <Login />}
          />
          {/* <Route
            path="/post/get/:id"
            element={isAuthenticated ? <PostPage /> : <Login />}
          /> */}
          <Route
            path="/updatePassword"
            element={isAuthenticated ? <UpdatePass /> : <Login />}
          />
          {/* <Route path="/graph" element={<Graph />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
