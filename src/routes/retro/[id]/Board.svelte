<script lang="ts">
	import BoardSection from './BoardSection.svelte';
	import type { Card } from '../../../types';

	export let retroId: string;
	export let title: string;
	export let boardId: string;
	export let cards: Card[];
	export let color: string;
	export let userId: string;

	$: publicCards = cards?.filter((card) => card.isPublic) ?? [];
	$: privateCards = cards?.filter((card) => !card.isPublic && card.authorId === userId) ?? [];
</script>

<div class="board">
	<h2 class="board-title">{title}</h2>
	<BoardSection
		{retroId}
		{boardId}
		{userId}
		{color}
		type="public"
		title="Public"
		cards={publicCards}
	/>
	<BoardSection
		{retroId}
		{boardId}
		{userId}
		{color}
		type="private"
		title="Private"
		cards={privateCards}
	/>
</div>

<style>
	.board {
		background: #fff;
		padding: 20px;
		flex: 1;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		border: 1px solid #e3eadd;
		position: relative;
		box-shadow: #e5e6e7 0 10px 20px -10px;
	}

	.board-title {
		margin: 0;
		color: #cf4307;
		margin-top: -20px;
		background: #fff;
		align-self: center;
		padding: 8px 24px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		border-color: #dad3cc;
		color: #7b7b7b;
		font-weight: bold;
		box-shadow: #e5e6e7 0 10px 20px -10px;
		overflow: visible;
		z-index: 1;
	}
</style>
