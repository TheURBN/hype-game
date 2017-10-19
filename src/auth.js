import firebase from 'firebase';
import firebaseui from 'firebaseui';

const uiConfig = {
  callbacks: {
    signInSuccess: function(currentUser, credential, redirectUrl) {
      console.log(currentUser, credential, redirectUrl);
      return true;
    },
    uiShown: function() {
      console.log('uiShown');
      // document.getElementById('loader').style.display = 'none';
    }
  },
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  signInSuccessUrl: '/?mode=signin',
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
  firebase.initializeApp(config);

  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  ui.start('#firebaseui-auth-container', uiConfig);
};

export default init;