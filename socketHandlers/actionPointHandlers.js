import prisma from '../db.js';

export function handleActionPointEvents(socket, io) {
	socket.on('add-action-point', async (data) => {
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
