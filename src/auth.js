import firebase from 'firebase';
import firebaseui from 'firebaseui';
import { alert } from 'notie';
import store from 'store';


const uiConfig = {
  callbacks: {
    signInSuccess: function(currentUser, credential, redirectUrl) {
      store.section('loader').show();
      store.section('sign-in').hide();
      console.log('show');

      alert({
        type: 'success',
        text: 'You success autroization',
        position: 'bottom',
      });

      return true;
    },
    uiShown: () => {
      console.log('load');
    },
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  signInFlow: 'popup',
};

const config = {
  apiKey: "AIzaSyB27VzuEEpVN1dCjPcvDMAF9BB-Fi5yUGw",
  authDomain: "theurbngame.firebaseapp.com",
  databaseURL: "https://theurbngame.firebaseio.com",
  projectId: "theurbngame",
  storageBucket: "theurbngame.appspot.com",
  messagingSenderId: "942689880769"
};

const init = () => {
  // init firebase app;
  store.firebase = firebase.initializeApp(config);
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);
};

export default init;