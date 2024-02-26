import prisma from '../db.js';
import type { Socket, Server } from 'socket.io';

export function handleUserEvents(socket: Socket, io: Server) {
	socket.on('create-user', async () => {
		const user = await prisma.user.create({
			data: { name: getRandomName(), customColor: getRandomColor() }
		});
		io.emit('set-user', user);
	});

	socket.on('update-user', async (data: { id: string; name: string }) => {
		const { id, name } = data;
		const updatedUser = await prisma.user.update({
			where: { id: id },
			data: { name }
		});
		io.emit('set-user', updatedUser);
	});
}

function getRandomName(): string {
	const adjectives = [
		'Zádumčivý',
		'Unavený',
		'Pochroumaný',
		'Pomatený',
		'Šílený',
		'Noblesní',
		'Opožděný',
		'Rozšafný',
		'Speciální',
		'Dumající',
		'Sečtělý',
		'Hladový'
	];
	const nouns = ['Bulbasaur', 'Cubone', 'Pikachu', 'Mimikyu', 'Bambula'];

	const randomAdjective = getRandomItem(adjectives);
	const randomNoun = getRandomItem(nouns);

	return `${randomAdjective} ${randomNoun}`;
}

function getRandomColor(): string {
	const colors = [
		'#e2ffbf',
		'#ffe5da',
		'#ded4bb',
		'#d1d1d1',
		'#d3eaff',
		'#ced4a2',
		'#edc9ff',
		'#ffd8a5',
		'#c8fff3',
		'#d6bbb9',
		'#cfdee3',
		'#c5d4a1',
		'#ffd3ea',
		'#efca9c'
	];

	return getRandomItem(colors);
}

function getRandomItem(options: string[]): string {
	return options[Math.floor(Math.random() * options.length)];
}
