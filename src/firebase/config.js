import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import "@react-native-firebase/database"

const firebaseConfig = {
  apiKey: 'AIzaSyBDDSJIYVMu1sQxZ9cEEOJoCtfS1kWpOFE',
  //authDomain: 'your-auth-domain-b1234.firebaseapp.com',
  databaseURL: 'https://tutor-3116e-default-rtdb.firebaseio.com',
  projectId: 'tutor-3116e',
  appId: '1:599219003922:ios:7db565145ce64bd1736ecb',
  messagingSenderId : '599219003922',
  storageBucket: '',
  //messagingSenderId: '12345-insert-yourse',
  //appId: '1:599219003922:android:b0f729a79c66bb9c736ecb',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };