import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBnRKH-tpjGoHJfGtuXxR7qk6e3gZbQNvc",
    authDomain: "weconnect-image.firebaseapp.com",
    databaseURL: "https://weconnect-image.firebaseio.com",
    projectId: "weconnect-image",
    storageBucket: "weconnect-image.appspot.com",
    messagingSenderId: "465125394331"
  };

firebase.initializeApp(config);

const firebaseApp = firebase.storage().ref();

export default firebaseApp;
