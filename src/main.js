import { alert } from 'notie';
import firebase from 'firebase';
import auth from './auth.js';
import User from './user.js';
import store from 'store';
import config from 'config/config.js';
import connectGame from './connect.js';
import './assets/css/app.scss';

window.store = store; // debu

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

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			return user.getIdToken().then((accessToken) => {
				user.token = accessToken;
				store.user = new User(user);
				
				return connectGame(user);
			});
		}

		return errorHandeler();
	}, (error) => errorHandeler(error));
};


window.addEventListener('load', initApp);