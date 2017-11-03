import { alert } from 'notie';
import MobileDetect from 'mobile-detect';
import firebase from 'firebase';
import auth from './auth.js';
import User from './user.js';
import store from 'store';
import config from 'config/config.js';
import connectGame from './connect.js';
import './assets/css/app.scss';


const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const errorHandeler = (error) => {
	store.user = {};

	store.section('loader').hide();
	store.section('app').hide();
	store.section('sign-in').show();

	if (error) alert({ type: 'error',	text: error, position: 'bottom' });
};


async function initApp() {	
	auth();

	store.section('loader').show();
	store.section('sign-in').hide();
	store.section('app').hide();
	
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
	.then(() => firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			return user.getIdToken().then((accessToken) => {
				user.token = accessToken;
				store.user = new User(user);
				
				return connectGame(accessToken);
			});
		}

		return errorHandeler();
	}, (error) => errorHandeler(error)));
};

if (!isMobile) {
	window.addEventListener('load', initApp);
} else {
	store.section('loader').hide();
	store.section('phone').show();
};
