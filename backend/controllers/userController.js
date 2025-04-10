const sendToken = require("../utils/jwtToken"); // if you want to keep your custom token helper
const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt= require("bcrypt")
const cloudinary = require("cloudinary");
const express = require("express");
const db = require("../firebaseConfig"); // Your firebase admin/Firestore instance
// app.use(express.json())
const accountSid = process.env.ACCOUNTS_ID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Temporary storage for OTPs
const otpStore = new Map();

/** 
 * GET cgm data from Firestore (samples collection)
 */
exports.cgm = async (req, res) => {
  try {
    // Assume samples are stored in a "samples" collection with a sampleNumber field.
    const snapshot = await db
      .collection("samples")
      .orderBy("date", "asc")
      .get();
    const data = [];
    snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

/**
 * POST add a reading to the Firestore "readings" collection.
 */
exports.addReading = async (req, res) => {
  try {
    const {  reading } = req.body;
    const timestamp = new Date();

    await db.collection("samples").add({
      reading,
      date:timestamp
    });

    res.status(201).json({ message: "Reading added successfully" });
  } catch (error) {
    console.error("Error adding reading:", error);
    res.status(500).json({
      success: false,
      message: "Error adding reading",
      error: error.message,
    });
  }
};

/**
 * POST send an OTP via Twilio to the provided mobile number.
 */
exports.sendOtp = async (req, res) => {
  let { mobile } = req.body;
  // mobile=Number(mobile)
  if (!mobile)
    return res.status(400).json({ error: "Mobile number required" });

  const otp = crypto.randomInt(100000, 999999).toString();
  const expiry = Date.now() + 5 * 60 * 1000; // Valid for 5 minutes

  otpStore.set(String(mobile), { otp, expiry });

  try {
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.MOBILE, // update with your Twilio number
      to: mobile,
    });
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

/**
 * POST verify the OTP and sign in or create a new user in Firestore.
 */
exports.verifyOtp = async (req, res) => {
  let { mobile, otp } = req.body;
  // mobile=Number(mobile)
  // console.log(typeof mobile)
  const storedOtp = otpStore.get(mobile);
  console.log("Stored OTP is",storedOtp,"for OTP ",otp)
  if (!storedOtp)
    return res.status(400).json({ error: "OTP not found" });

  const { otp: validOtp, expiry } = storedOtp;

  if (Date.now() > expiry)
    return res.status(400).json({ error: "OTP expired" });

  if (otp !== validOtp)
    return res.status(400).json({ error: "Invalid OTP" });

  // Query for an existing user with this mobile number
  const userSnapshot = await db
    .collection("users")
    .where("mobile", "==", mobile)
    .get();

  let user;
  if (userSnapshot.empty) {
    // Create a new user if one does not exist
    const newUser = { mobile };
    const docRef = await db.collection("users").add(newUser);
    user = { id: docRef.id, ...newUser };
  } else {
    // Get the first matching user document
    const doc = userSnapshot.docs[0];
    user = { id: doc.id, ...doc.data() };
  }

  otpStore.delete(mobile); // Delete OTP after successful verification

  // Generate a JWT token (adjust secret and expiration as needed)
  const token = jwt.sign({ id: user.id, mobile: user.mobile }, "Himanshu", {
    expiresIn: "90d",
  });

  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: false,
  };

  return res
    .status(201)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

/**
 * POST register a new user.
 */
// const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, avatar } = req.body;

    // Check if user exists by email
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!userSnapshot.empty) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Upload avatar image to Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(avatar, {
      folder: "avatars",
    });

    const newUser = {
      name,
      email,
      password: hashedPassword, // Store hashed password
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("users").add(newUser);
    newUser.id = docRef.id;

    res.status(200).json({
      user: newUser,
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/**
 * POST login an existing user.
 */
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query user by email
    const userSnapshot = await db
      .collection("users")
      .where("email", "==", email)
      .get();

    if (userSnapshot.empty) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const doc = userSnapshot.docs[0];
    const user = { id: doc.id, ...doc.data() };

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, "Himanshu", {
      expiresIn: "90d",
    });

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.status(201).cookie("token", token, options).json({
      success: true,
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/**
 * GET logout the user by clearing the cookie.
 */
exports.logoutUser = async (req, res) => {
  try {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET current user data from Firestore.
 * Assumes req.user has been set by an authentication middleware.
 */
exports.getUser = async (req, res) => {
  try {
    const userRef = db.collection("users").doc(req.user.id);
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user: { id: doc.id, ...doc.data() },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * PUT update the current user’s profile.
 */
exports.updateMyProfile = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    const userRef = db.collection("users").doc(req.user.id);
    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;

    /* If updating avatar:
    if (avatar) {
      // Optionally delete the old avatar from Cloudinary here.
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
      });
      updates.avatar = { public_id: myCloud.public_id, url: myCloud.secure_url };
    }
    */

    await userRef.update(updates);

    res.status(200).json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * PUT update the user’s password.
 */
exports.updatePassword = async (req, res) => {
  try {
    const userRef = db.collection("users").doc(req.user.id);
    const doc = await userRef.get();
    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const user = doc.data();

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide old and new password",
      });
    }

    if (user.password !== oldPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Old password",
      });
    }

    await userRef.update({ password: newPassword });
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET readings with optional query filters for month and date.
 */
// exports.getReadings = async (req, res) => {
//   try {
//     const { sortBy = "date", order = "asc" } = req.query;
//     let query = db.collection("samples");

//     // Add filters if provided
//     // if (month && month !== "All Months") {
//     //   query = query.where("month", "==", parseInt(month));
//     // }
//     // if (date && date !== "All Dates") {
//     //   query = query.where("date", "==", parseInt(date));
//     // }

//     // Sort data (Firestore requires an index if combining filters and orderBy)
//     const snapshot = await query.orderBy(sortBy, order).get();
//     const readings = snapshot.docs.map(doc => doc.data());

//     res.status(200).json(readings);
//   } catch (error) {
//     console.error("Error fetching readings:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching readings",
//       error: error.message,
//     });
//   }
// };
exports.getReadings = async (req, res) => {
  try {
    const { sortBy = "date", order = "asc" } = req.query;
    let query = db.collection("samples");

    const snapshot = await query.orderBy(sortBy, order).get();

    const readings = snapshot.docs.map(doc => {
      const data = doc.data();

      // Convert Firestore Timestamp to JavaScript Date
      const timestamp = new Date(data.date._seconds * 1000); // Firestore _seconds is UNIX time in seconds

      // Format: dd/mm/yyyy hh:mm (24-hour clock)
      const formattedDate = timestamp.toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      return {
        ...data,
        date: formattedDate, // Replace with formatted string
      };
    });

    res.status(200).json(readings);
  } catch (error) {
    console.error("Error fetching readings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching readings",
      error: error.message,
    });
  }
};

/**
 * GET user by id.
 */
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const userRef = db.collection("users").doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).send("User not found");
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

/**
 * POST create a new user.
 */
exports.createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const userRef = db.collection("users").doc();
    await userRef.set(newUser);

    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
