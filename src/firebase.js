import * as firebase from "firebase";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBeT559v1oZckgYadVBaSjDT2f6sVj9zJY",
  authDomain: "ecommercefs-ed4fe.firebaseapp.com",
  projectId: "ecommercefs-ed4fe",
  storageBucket: "ecommercefs-ed4fe.appspot.com",
  messagingSenderId: "671581820000",
  appId: "1:671581820000:web:40bdf3fba70dc8a6dddf05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export

export const auth = firebase.auth();
export const googleAuthProvider = firebase.auth.googleAuthProvider();
