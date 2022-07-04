import firebase from 'firebase';
var mode = "test";
var firebaseConfig = {};

 firebaseConfig = {
    apiKey: "AIzaSyBW4EQtK0UfiqcSKu3ej_AHVjoVm5K3qjg",
  authDomain: "nfcapp-5495e.firebaseapp.com",
  projectId: "nfcapp-5495e",
  storageBucket: "nfcapp-5495e.appspot.com",
  messagingSenderId: "44712465681",
  appId: "1:44712465681:web:0e87729fefa70a6965a8b0",
  measurementId: "G-PWTN5MMEN3"
  };


  const firebaseApp =  firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  


  export { auth , firebaseApp };
  export default db;