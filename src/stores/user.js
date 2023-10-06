import { writable } from 'svelte/store';
import { io } from '$lib/socket.js';
import { saveUserToLocalStorage } from '../utils/userManager.js';

io.on('set-user', (user) => {
	currentUser.set(user);
	saveUserToLocalStorage(user);
});

export const currentUser = writable(null);
