import firebase from "firebase";
 
let firebaseConfig = {
    apiKey: "AIzaSyAOPQOW9wAUN6c0kaK6dcJL6zXuGMTMrwk",
    authDomain: "vue-chat-a2d47.firebaseapp.com",
    projectId: "vue-chat-a2d47",
    storageBucket: "vue-chat-a2d47.appspot.com",
    messagingSenderId: "753545606232",
    appId: "1:753545606232:web:828d04b3001d78a9c0062d"
//   apiKey: "*********",
//   authDomain: "*********",
//   projectId: "*********",
//   storageBucket: "*********",
//   messagingSenderId: "*********",
//   appId: "*********",
//   databaseURL:"****"
};
 
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
 
 
export default firebase;


 