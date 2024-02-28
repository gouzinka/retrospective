<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import CardComponent from './Card.svelte';
	import { io } from '$lib/socket.js';
	import type { Card as CardType } from '../../../types';

	const flipDurationMs = 200;
	export let retroId: string;
	export let title: string;
	export let type: 'private' | 'public';
	export let cards: CardType[] = [];
	export let color: string;
	export let boardId: string;
	export let userId: string;

	function handleSave(event: any): void {
		const { content, isDefaultCard, id } = event.detail;

		if (content?.trim() === '' && isDefaultCard) return;
		if (isDefaultCard) {
			const newCard = {
				id: Date.now().toString(),
				content,
				isPublic: false,
				boardId,
				authorId: userId
			};
			cards = [...cards, newCard];
		}

		io.emit('save-card', {
			retroId,
			boardId,
			content,
			authorId: userId,
			cardId: isDefaultCard ? null : id
		});
	}

	function handleRemove(removedCard: CardType): void {
		cards = cards.filter((card) => card.id !== removedCard.id);
		io.emit('delete-card', { retroId, cardId: removedCard.id });
	}

	function handlePublish(cardId: string, isPublic: boolean): void {
		io.emit('toggle-publish-card', { cardId, isPublic, retroId });
	}

	function handleDndConsiderCards(e: CustomEvent): void {
		cards = e.detail.items;
	}

	function handleDndFinalizeCards(e: CustomEvent): void {
		cards = e.detail.items;
		const droppedCardId = e.detail.info.id;

		if (cards.some((card) => card.id === droppedCardId)) {
			handlePublish(droppedCardId, type === 'public' ? true : false);
		}
	}

	function transformDraggedElement(draggedEl: HTMLElement): void {
		if (!draggedEl) return;
		draggedEl.querySelector('.card').style.transform = 'rotate(-3deg) scale(.9)';
	}
</script>

<div class="section {type === 'public' ? 'public-section' : 'private-section'}">
	<h3 class="section-title">{title}</h3>
	<div
		class="cards"
		use:dndzone={{
			items: cards,
			flipDurationMs,
			transformDraggedElement,
			dropTargetStyle: {
				border: 'none',
				backgroundColor: 'rgb(255 255 255 / 30%)'
			}
		}}
		on:consider={handleDndConsiderCards}
		on:finalize={handleDndFinalizeCards}
	>
		{#each cards as card (card.id)}
			<div class="card-wrapper" animate:flip={{ duration: flipDurationMs }}>
				<CardComponent
					on:remove={() => handleRemove(card)}
					on:publish={() => handlePublish(card.id, false)}
					{card}
					color={card?.author?.customColor || color}
					isDefaultCard={false}
				/>
			</div>
		{/each}

		{#if type === 'private'}
			<CardComponent
				card={{
					id: Date.now().toString(),
					content: '',
					isPublic: false,
					boardId,
					authorId: userId
				}}
				on:save={handleSave}
				{color}
				isDefaultCard={true}
			/>
		{/if}
	</div>
</div>

<style>
	.section {
		padding: 10px 0;
	}

	.section-title {
		text-align: center;
		margin: 0 0 10px 0;
		padding-top: 8px;
		font-size: 16px;
	}

	.public-section {
		background: #fff;
		height: 700px;
	}

	.private-section {
		background-color: #fff;
		border-top: 2px solid #e5e6e7;
	}

	.cards {
		height: calc(100% - 33px);
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		flex-wrap: wrap;
		gap: 9px;
		padding-top: 15px;
		align-content: flex-start;
	}

	.card-wrapper {
		align-self: flex-start;
		border: none !important;
		background: none !important;
	}
</style>
