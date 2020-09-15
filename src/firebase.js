import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBNH-zWcMiquiwBl_8V4yADrVcCTvMhyio",
    authDomain: "react-todo-28554.firebaseapp.com",
    databaseURL: "https://react-todo-28554.firebaseio.com",
    projectId: "react-todo-28554",
    storageBucket: "react-todo-28554.appspot.com",
    messagingSenderId: "18541927331",
    appId: "1:18541927331:web:af4d717f250b231efd5816",
    measurementId: "G-N0Q0DLCSZF"
  });

  const db = firebaseApp.firestore();

  export default db;