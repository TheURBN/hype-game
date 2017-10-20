import Vue from 'vue';
import App from './components/App.vue';
import firebase from 'firebase';
import User from './user.js';
import auth from './auth.js';
import createGame from './game.js';
import store from 'store';

window.store = store; // debug

import './assets/css/app.scss';

const initApp = () => {	
	auth();

	store.section('loader').show();
	store.section('sign-in').hide();
	store.section('app').hide();

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			store.user = new User(user);
			store.section('app').show();
			store.section('loader').hide();

			store.game = createGame();
			store.section('sign-in').hide();

			new Vue({ el: '#control-panel', render: h => h(App) });
		} else {
			store.user = {};

			store.destroy();
			store.section('loader').hide();
			store.section('app').hide();
			store.section('sign-in').show();
		}
	}, function(error) {
		console.log(error);
	});
};


window.addEventListener('load', initApp);