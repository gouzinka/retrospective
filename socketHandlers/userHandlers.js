import prisma from '../db.js';

export function handleUserEvents(socket, io) {
	socket.on('create-user', async () => {
		const user = await prisma.user.create({
			data: { name: getRandomName(), customColor: getRandomColor() }
		});
		socket.emit('set-user', user);
	});

	socket.on('update-user', async (data) => {
		const { id, name } = data;
		const updatedUser = await prisma.user.update({
			where: { id: id },
			data: { name }
		});
		socket.emit('set-user', updatedUser);
	});

	socket.on('update-user-name', async (data) => {
		const { retroId, id, name } = data;
		const updatedUser = await prisma.user.update({
			where: { id: id },
			data: { name }
		});
		socket.to(`retro-${retroId}`).emit('set-user', updatedUser);
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

	const randomAdjective = getRandomItem(adjectives);
	const randomNoun = getRandomItem(nouns);

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

	return getRandomItem(colors);
}

function getRandomItem(options) {
	return options[Math.floor(Math.random() * options.length)];
}
