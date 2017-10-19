import Vue from 'vue';
import App from './components/App.vue';
import firebase from 'firebase';
import User from './user.js';
import auth from './auth.js';
import createGame from './game.js';
import store from 'store';

window.store = store;

import './assets/css/app.scss';


const section = (name) => {
	const element = document.getElementById(name);

	const actions = {
		show: () => element.style.display = '',
		hide: () => element.style.display = 'none',
	};

	 return actions;
};

const initApp = () => {	
	auth();

	section('loader').show();
	section('sign-in').hide();
	section('app').hide();

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			store.user = new User(user);
			section('app').show();
			section('loader').hide();

			store.game = createGame();
			section('sign-in').hide();

			new Vue({ el: '#control-panel', render: h => h(App) });
		} else {
			section('loader').hide();
			section('sign-in').show();
		}
	}, function(error) {
		console.log(error);
	});
};


window.addEventListener('load', initApp);