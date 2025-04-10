const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateMyProfile,
  updatePassword,
  
  sendOtp,
  verifyOtp,
  cgm,
  addReading,
  getReadings,
} = require("../controllers/userController");
const express = require("express");
const isAuthenticated = require("../middleware/auth");
const router = express.Router();
router.route("/cgm-reading").get(isAuthenticated, cgm);
router.route("/add-cgm-reading").post(isAuthenticated, addReading);
router.route("/register").post(registerUser);
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticated, getUser);
router.route("/updateMyProfile").put(isAuthenticated, updateMyProfile);
router.route("/updateMyPassword").put(isAuthenticated, updatePassword);
// router.route("/myPosts").get(isAuthenticated, getMyPosts);
// router.route("/user/:id").get(isAuthenticated, getUserProfile);
// router.route("/users").get(isAuthenticated, getAllUsers);
// router.route("/follow/:id").get(isAuthenticated, followUser);
router
  .route("/readings")
  .get(isAuthenticated, getReadings)
  // .post(isAuthenticated, addReading);

module.exports = router;
