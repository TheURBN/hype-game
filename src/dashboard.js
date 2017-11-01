import firebase from 'firebase';
import auth from './auth.js';
import User from './user.js';
import store from 'store';
import config from 'config/config.js';
import Vue from 'vue';
import Dashboard from '@/Dashboard.vue';
import './assets/css/app.scss';


const initDashboard = () => {
	store.section('sign-in').hide();
	store.section('loader').hide();
	new Vue({ el: '#app', render: h => h(Dashboard) });
};

const connectGame = (user) => {
	const socket = new WebSocket(`${config.ws}?token=${user.token}`);

	socket.addEventListener('message', (res) => {
    const data = JSON.parse(res.data);
		const meta = _.get(data.meta, 'type');
	
		if (meta === 'userLogin') store.emitMessage(`${data.data.name} has joined the game`);
		if (meta === 'userLogout') store.emitMessage(`${data.data.name} left the game`);
  });

  socket.addEventListener('close', () => setTimeout(() => connectGame(store.user), config.timeout));
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

				connectGame(user);
				initDashboard();
			});
		}

		return errorHandeler();
	}, (error) => errorHandeler(error));
};


window.addEventListener('load', initApp);