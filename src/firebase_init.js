const firebaseConfig = {
    apiKey: "AIzaSyBQzMpnhYj9FU4WfUr4DKcRhNAlREoqfgU",
    authDomain: "dscwebapp.firebaseapp.com",
    databaseURL: "https://dscwebapp.firebaseio.com",
    projectId: "dscwebapp",
    storageBucket: "dscwebapp.appspot.com",
    messagingSenderId: "931632361764",
    appId: "1:931632361764:web:58b762c94f76f8554383b1",
    measurementId: "G-97X3YHDC97"
  };

  import firebase from 'firebase'
  import 'firebase/firestore'
  firebase.initializeApp(firebaseConfig)

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  export default {db,auth,storage}