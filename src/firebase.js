import firebase from "firebase"
import "firebase/auth"

var app = firebase.initializeApp({
  apiKey: "AIzaSyAzVjcyCoNVzJZMyuovHhu8Mb8iNe_KMVU",
  authDomain: "terappia-61759.firebaseapp.com",
  projectId: "terappia-61759",
  storageBucket: "terappia-61759.appspot.com",
  messagingSenderId: "847766036865",
  appId: "1:847766036865:web:c00eedf7f35ca4d2c70880",
  measurementId: "G-ZC2Z2W95PR"
})

var db =app.firestore();
export{db};
export const auth = app.auth()
export default app
