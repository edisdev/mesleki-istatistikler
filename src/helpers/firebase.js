import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyBTyzgHz_IyuaEBGsYB44orb_bTIubTSJ4',
  authDomain: 'meslekler-3555.firebaseapp.com',
  databaseURL: 'https://meslekler-3555.firebaseio.com',
  projectId: 'meslekler-3555',
  storageBucket: '',
  messagingSenderId: '1019433075350',
};

firebase.initializeApp(config);

export const DB = firebase.database();

export default { DB };
