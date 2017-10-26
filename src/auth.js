import firebase from 'firebase';
import firebaseui from 'firebaseui';
import store from 'store';


const uiConfig = {
  callbacks: {
    signInSuccess: function(currentUser, credential, redirectUrl) {
      store.section('loader').show();
      store.section('sign-in').hide();

      return true;
    },
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
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
  store.firebase = firebase.initializeApp(config);
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);
};

export default init;