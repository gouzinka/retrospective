import { io } from '$lib/socket.js';
import { setCurrentUser } from '../../../utils/userManager.js';

export const csr = true;

export async function load({ params }) {
	const { id } = params;

	io.emit('set-retrospective-data', id);

	if (typeof window !== 'undefined') {
		await setCurrentUser();
		io.emit('join-retrospective', id);
	}
}
