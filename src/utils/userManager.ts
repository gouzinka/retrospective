import { io } from '$lib/socket.js';
import type { User } from '../types';

export function getUserFromLocalStorage() {
	if (typeof window === 'undefined') return null;

	const userData = localStorage.getItem('user');

	if (userData) {
		return JSON.parse(userData);
	}

	return null;
}

export function saveUserToLocalStorage(user: User) {
	if (typeof window === 'undefined') return null;

	localStorage.setItem('user', JSON.stringify(user));
}

export async function setCurrentUser() {
	if (typeof window === 'undefined') return null;

	return new Promise((resolve, reject) => {
		const storedUser = getUserFromLocalStorage();

		if (storedUser) {
			io.emit('update-user', storedUser);
			io.once('set-user', (user) => {
				resolve(user);
			});
		} else {
			createUser().then(resolve).catch(reject);
		}
	});
}

export async function createUser() {
	return new Promise((resolve, reject) => {
		io.emit('create-user', {});
		io.once('set-user', (user) => {
			resolve(user);
		});
	});
}

export async function updateUserName(retroId: string, id: string, name: string) {
	io.emit('update-user', { retroId, id, name });
}
