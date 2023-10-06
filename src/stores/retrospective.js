import { writable } from 'svelte/store';
import { io } from '$lib/socket.js';

function updateCard(retrospective, updatedCard, boardId) {
	if (retrospective.boards.some((board) => board.id === boardId)) {
		retrospective.boards = retrospective.boards.map((board) => {
			if (board.id === boardId) {
				const cardIndex = board.cards.findIndex((card) => card.id === updatedCard.id);
				if (cardIndex !== -1) {
					// Update existing card
					board.cards[cardIndex] = updatedCard;
				} else {
					// Add new card
					board.cards = [...board.cards, updatedCard];
				}
			}
			return board;
		});
	}

	return retrospective;
}

function deleteCard(retrospective, cardId) {
	retrospective.boards.forEach((board) => {
		board.cards = board.cards.filter((card) => card.id !== cardId);
	});
	return retrospective;
}

function updateBoard(retrospective, updatedBoard) {
	retrospective.boards = retrospective.boards.map((board) =>
		board.id === updatedBoard.id ? updatedBoard : board
	);
	return retrospective;
}

function addActionPointToRetro(retrospective, newActionPoint) {
	if (retrospective.id === newActionPoint.retrospectiveId) {
		retrospective.actionPoints = [newActionPoint, ...retrospective.actionPoints];
	}
	return retrospective;
}

function toggleCardPublish(retrospective, cardId, isPublic) {
	retrospective.boards = retrospective.boards.map((board) => {
		const cardIndex = board.cards.findIndex((card) => card.id === cardId);
		if (cardIndex !== -1) {
			board.cards[cardIndex].isPublic = isPublic;
		}
		return board;
	});
	return retrospective;
}

io.on('action-point-added', (newActionPoint) => {
	retrospective.update((retro) => addActionPointToRetro(retro, newActionPoint));
});

io.on('card-updated', (updatedCard) => {
	retrospective.update((retro) => updateCard(retro, updatedCard, updatedCard.boardId));
});

io.on('card-deleted', ({ cardId }) => {
	retrospective.update((retro) => deleteCard(retro, cardId));
});

io.on('card-saved', ({ card }) => {
	retrospective.update((retro) => updateCard(retro, card, card.boardId));
});

io.on('card-publish-toggled', (card) => {
	retrospective.update((retro) => toggleCardPublish(retro, card.id, card.isPublic));
});

io.on('retrospective-response', (newRetrospective) => {
	retrospective.set(newRetrospective);
});

io.on('board-updated', (updatedBoard) => {
	retrospective.update((retro) => updateBoard(retro, updatedBoard));
});

export const retrospective = writable({});
