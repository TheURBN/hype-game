import firebase from 'firebase';
import auth from '../auth.js';
import config from '../config/config';
import store from 'store';
import Vue from 'vue';
import Dashboard from './Dashboard.vue';
import User from '../user.js';

window.store = store;

const socketEngine = {
  userLogin: (data) => {
    store.emitMessage(`${data.data.name} has joined the game`);
  },
  userLogout: (data) => {
    store.emitMessage(`${data.data.name} left the game`);
  },
  flagCaptured: (data) => {
    store.emitMessage(`${data.data.name} captured the flag "${data.data.flag}"`);
  },
};


const vueInit = () => {
  new Vue({ el: '#app', render: h => h(Dashboard) });
}

const connectDashboard = (accessToken) => {
	const socket = new WebSocket(`${config.ws}?token=${accessToken}`);
	socket.addEventListener('close', () => setTimeout(() => connectDashboard(store.user.accessToken), config.timeout));
	socket.addEventListener('message', (res) => {
    const data = JSON.parse(res.data);
    const type = _.get(data, 'meta.type', 'error');

    if (_.get(socketEngine, type)) socketEngine[type](data);
  });
};

async function initApp() {
  vueInit();	
	auth();

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			return user.getIdToken().then((accessToken) => {
				user.accessToken = accessToken;
				store.user = new User(user);

        connectDashboard(accessToken);
        store.section('sign-in').hide();
        store.section('sign-in').remove();
			});
		} else {
      store.section('sign-in').show();
    }
	});
};

window.addEventListener('load', initApp);