import prisma from '../db.js';

export function handleUserEvents(socket, io) {
	socket.on('create-user', async () => {
		const user = await prisma.user.create({
			data: { name: getRandomName(), customColor: getRandomColor() }
		});
		io.emit('set-user', user);
	});

	socket.on('update-user', async (data) => {
		const { id, name } = data;
		const updatedUser = await prisma.user.update({
			where: { id: parseInt(id) },
			data: { name }
		});
		io.emit('set-user', updatedUser);
	});
}

function getRandomName() {
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

	const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

	return `${randomAdjective} ${randomNoun}`;
}

function getRandomColor() {
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

	return colors[Math.floor(Math.random() * colors.length)];
}
