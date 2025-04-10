// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin");
const serviceAccount=require("../../../cgmp-27a20-firebase-adminsdk-fbsvc-963d302353.json")

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId:process.env.MESSSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://<your-database-name>.firebaseio.com",
});

// Initialize Firestore
const db = admin.firestore();

// Export the Firestore database
module.exports = db;
