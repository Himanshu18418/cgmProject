import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus";
import MenuBar from "./MenuBar";
import "./Navbar.css";
import { Button } from "@mui/material";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation(); // Track route changes

  // Re-check token whenever location (i.e. route) changes
  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, [location]);

  return (
    <div className="navMain">
      <div className="nav">
        <div className="home">
          <Link className="link" to="/" style={{ textDecoration: "none" }}>
            Home
          </Link>
        </div>
        <div className="explore">
          <Link className="link" to="/explore" style={{ textDecoration: "none" }}>
            Explore
          </Link>
        </div>
        <div className="about-us">
          <Link className="link" to="/about" style={{ textDecoration: "none" }}>
            About Us
          </Link>
        </div>
      </div>

      {isAuthenticated ? (
        <MenuBar className="menuBar" />
      ) : (
        <div className="login">
          <Link className="link" to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
