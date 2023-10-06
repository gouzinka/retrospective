<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import Card from './Card.svelte';
	import { io } from '$lib/socket.js';
	const flipDurationMs = 200;
	export let retroId;
	export let title;
	export let type;
	export let cards = [];
	export let color;
	export let boardId;
	export let userId;

	function handleSave(event) {
		const { content, isDefaultCard, id } = event.detail;

		if (content?.trim() === '' && isDefaultCard) return;
		if (isDefaultCard) {
			// Optimistically add the new card to the UI
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

	function handleRemove(removedCard) {
		// Optimistically remove the card from the UI
		cards = cards.filter((card) => card.id !== removedCard.id);
		io.emit('delete-card', { retroId, cardId: removedCard.id });
	}

	function handlePublish(cardId, isPublic) {
		io.emit('toggle-publish-card', { cardId, isPublic, retroId });
	}

	function handleDndConsiderCards(e) {
		cards = e.detail.items;
	}

	function handleDndFinalizeCards(e) {
		cards = e.detail.items;
		const droppedCardId = e.detail.info.id;

		if (cards.some((card) => card.id === droppedCardId)) {
			io.emit('save-card', {
				boardId,
				cardId: droppedCardId,
				isPublic: type === 'public' ? true : false
			});
		}
	}

	function transformDraggedElement(draggedEl, data, index) {
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
			<div animate:flip={{ duration: flipDurationMs }}>
				<Card
					on:remove={() => handleRemove(card)}
					on:publish={() => handlePublish(card.id, false)}
					{card}
					{color}
					isDefaultCard={false}
				/>
			</div>
		{/each}

		{#if type === 'private'}
			<Card
				card={{ id: Date.now().toString(), content: '', isPublic: false, boardId }}
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
		flex: 1;
	}

	.private-section {
		background-color: #fff;
		border-top: 2px solid #e5e6e7;
	}

	.cards {
		height: 280px;
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		flex-wrap: wrap;
		gap: 9px;
		padding-top: 15px;
	}
</style>
