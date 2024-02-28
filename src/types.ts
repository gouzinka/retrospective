export interface Card {
	id: string;
	content: string;
	authorId: string;
	isPublic: boolean;
	boardId: string;
	author?: User;
}

export interface User {
	id: string;
	name: string;
	customColor: string;
	createdAt: Date;
}

export interface Retrospective {
	id: string;
	title: string;
	creatorId: string;
	creator: User;
	createdAt: Date;
	boards: Board[];
	actionPoints: ActionPoint[];
}

export interface Board {
	id: string;
	title: string;
	retrospectiveId: string;
	createdAt: Date;
	cards: Card[];
}

export interface ActionPoint {
	id: string;
	description: string;
	retrospectiveId: string;
	createdAt: Date;
}
