import prisma from '../db.js';

export function handleCardEvents(socket, io) {
	socket.on('save-card', async (data) => {
		const { retroId, boardId, cardId, content, authorId, isPublic } = data;

		try {
			let card;
			const updateData = {
				boardId,
				isPublic: !!isPublic
			};
			if (content !== undefined) {
				updateData.content = content;
			}

			if (cardId) {
				// Update existing card
				card = await prisma.card.update({
					where: { id: cardId },
					data: updateData,
					include: {
						author: true
					}
				});
			} else {
				// Create new card
				card = await prisma.card.create({
					data: {
						content,
						boardId,
						authorId,
						isPublic: !!isPublic
					},
					include: {
						author: true
					}
				});
			}

			io.to(`retro-${retroId}`).emit('card-saved', { card });
		} catch (error) {
			console.error(error);
			io.to(`retro-${retroId}`).emit('card-error', { error: error.message });
		}
	});

	socket.on('delete-card', async (data) => {
		const { retroId, cardId } = data;

		try {
			const card = await prisma.card.delete({
				where: { id: cardId }
			});
			io.to(`retro-${retroId}`).emit('card-deleted', { cardId: card.id });
		} catch (error) {
			console.error(error);
			io.to(`retro-${retroId}`).emit('card-error', { error: error.message });
		}
	});

	socket.on('toggle-publish-card', async (data) => {
		const { cardId, isPublic, retroId } = data;

		try {
			const card = await prisma.card.update({
				where: { id: cardId },
				data: { isPublic }
			});

			io.to(`retro-${retroId}`).emit('card-publish-toggled', card);
		} catch (error) {
			console.error(error);
			io.to(`retro-${retroId}`).emit('card-error', { error: error.message });
		}
	});
}
