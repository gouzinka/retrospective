import { writable, type Writable } from 'svelte/store';
import { io } from '$lib/socket.js';
import type { Retrospective, Board, Card, ActionPoint } from '../types';

function updateCard(retrospective: Retrospective, updatedCard: Card, boardId: string) {
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

function deleteCard(retrospective: Retrospective, cardId: string) {
	retrospective.boards.forEach((board) => {
		board.cards = board.cards.filter((card) => card.id !== cardId);
	});
	return retrospective;
}

function updateBoard(retrospective: Retrospective, updatedBoard: Board) {
	retrospective.boards = retrospective.boards.map((board) =>
		board.id === updatedBoard.id ? updatedBoard : board
	);
	return retrospective;
}

function addActionPointToRetro(retrospective: Retrospective, newActionPoint: ActionPoint) {
	if (retrospective.id === newActionPoint.retrospectiveId) {
		retrospective.actionPoints = [newActionPoint, ...retrospective.actionPoints];
	}
	return retrospective;
}

function toggleCardPublish(retrospective: Retrospective, cardId: string, isPublic: boolean) {
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

export const retrospective: Writable<Retrospective> = writable({} as Retrospective);
