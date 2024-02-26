import prisma from '../db.js';
import type { Socket, Server } from 'socket.io';

export function handleRetrospectiveEvents(socket: Socket, io: Server) {
	socket.on('join-retrospective', (retroId: string) => {
		socket.join(`retro-${retroId}`);
	});

	socket.on('create-retrospective-request', async (data: { title: string; userId: string }) => {
		const { title, userId } = data;
		try {
			const creator = await prisma.user.findUnique({
				where: { id: userId }
			});

			if (!creator) {
				socket.emit('retrospective-error', { error: 'User not found' });
				return;
			}

			const retrospective = await prisma.retrospective.create({
				data: {
					title,
					creator: { connect: { id: creator.id } },
					actionPoints: {
						create: []
					},
					boards: {
						create: [
							{
								title: 'The Good',
								cards: {
									create: []
								}
							},
							{
								title: 'The Bad',
								cards: {
									create: []
								}
							}
						]
					}
				},
				include: {
					creator: true,
					actionPoints: true,
					boards: {
						include: {
							cards: {
								include: {
									author: true
								}
							}
						}
					}
				}
			});

			io.emit('retrospective-response', retrospective);
		} catch (error) {
			io.emit('retrospective-error', { error: error.message });
		}
	});

	socket.on('set-retrospective', async (retroId: string) => {
		try {
			const retrospective = await prisma.retrospective.findUnique({
				where: { id: retroId },
				include: {
					creator: true,
					actionPoints: true,
					boards: {
						include: {
							cards: {
								include: {
									author: true
								}
							}
						}
					}
				}
			});

			if (!retrospective) {
				socket
					.to(`retro-${retroId}`)
					.emit('retrospective-error', { error: 'Retrospective not found' });
				return;
			}

			socket.emit('retrospective-response', retrospective);
		} catch (error) {
			console.error('Failed to fetch retrospective:', error);
			socket.emit('retrospective-error', { error: error.message });
		}
	});
}
