const express = require("express");
const app = require("./app");
// const mongoose = require("mongoose");
var cors = require("cors");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();

// cloudinary.config({
//   cloud_name: "dj1kcdfqj",
//   api_key: "935833654696171",
//   api_secret: "R6O2VnfOwmYvjgOCX3VAndPOg90",
// });

app.use(cors());

app.use(express.json());

// mongoose
//   .connect(
//     "mongodb+srv://hgoel:lbC9u8FlovMmS40t@spotify.r7rwbna.mongodb.net/",
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   )
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log("Error: ", err.message);
//   });

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
