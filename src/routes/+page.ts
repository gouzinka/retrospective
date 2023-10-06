import { setCurrentUser } from '../utils/userManager.js';

export const csr = true;

export async function load() {
	if (typeof window !== 'undefined') await setCurrentUser();
	return {};
}
