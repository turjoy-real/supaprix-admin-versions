import * as firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyBwo56YgfFAA4oyb3sRTxtktPkHmKGHkCQ",
  authDomain: "supaprix-94a84.firebaseapp.com",
  databaseURL: "https://supaprix-94a84-default-rtdb.firebaseio.com",
  projectId: "supaprix-94a84",
  storageBucket: "supaprix-94a84.appspot.com",
  messagingSenderId: "392347918670",
  appId: "1:392347918670:web:06686529b4496bf65ebe1f",
  measurementId: "G-M19BGSLRJV",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
