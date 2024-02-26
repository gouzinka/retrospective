import { writable, type Writable } from 'svelte/store';
import { io } from '$lib/socket.js';
import { saveUserToLocalStorage } from '../utils/userManager.js';
import type { User } from '../types';

io.on('set-user', (user: User) => {
	currentUser.set(user);
	saveUserToLocalStorage(user);
});

export const currentUser: Writable<User | null> = writable(null);
