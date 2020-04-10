import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDvtaC1Q5Olsb_xzB4XhtjllZ2tgeHD-4s',
  authDomain: 'reactnativefirebase-9e207.firebaseapp.com',
  databaseURL: 'https://reactnativefirebase-9e207.firebaseio.com',
  projectId: 'reactnativefirebase-9e207',
  storageBucket: 'reactnativefirebase-9e207.appspot.com',
  messagingSenderId: '369913273645',
  //   appId: '1:369913273645:web:cbd1ff2ac18c72d1ac47a4',
  appId: '1:369913273645:android:da8502625da9ae78ac47a4',
  measurementId: 'G-5SEEJPKEE2',
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
