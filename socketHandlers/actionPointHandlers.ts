import prisma from '../db.js';
import type { Socket, Server } from 'socket.io';

export function handleActionPointEvents(socket: Socket, io: Server) {
	socket.on('add-action-point-request', async (data) => {
		const { description, retrospectiveId } = data;

		try {
			const actionPoint = await prisma.actionPoint.create({
				data: {
					description,
					retrospective: { connect: { id: retrospectiveId } }
				}
			});

			io.to(`retro-${retrospectiveId}`).emit('action-point-added', actionPoint);
		} catch (error) {
			socket.emit('action-point-error', { error: error.message });
		}
	});
}
