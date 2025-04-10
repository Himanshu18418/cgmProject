require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../firebaseConfig");

const isAuthenticated = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    console.log("Verifying token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "Himanshu");

    const userDoc = await db.collection("users").doc(decoded.id).get();

    if (!userDoc.exists) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: userDoc.id,
      ...userDoc.data(),
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = isAuthenticated;
