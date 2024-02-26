<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import AuthorDot from './AuthorDot.svelte';
	import type { Card } from '../../../types';

	const dispatch = createEventDispatcher<{
		save: { content: string; isDefaultCard: boolean; id: string };
		publish: void;
		remove: void;
	}>();

	export let card: Card;
	export let isDefaultCard: boolean;
	export let isEditing: boolean = isDefaultCard;
	export let color: string;

	let textarea: HTMLTextAreaElement;
	let overlay: HTMLDivElement;
	let maxCharCount = 140;
	let charCount: number = card?.content?.length ?? 0;
	let fontSize: number = 16;
	let cardContent: string = card?.content ?? '';

	onMount(() => {
		if (isDefaultCard) {
			textarea.focus();
		}
		if (cardContent?.length > 0) adjustFontSize(cardContent);
	});

	function handleInput(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		charCount = target.value.length;
		if (charCount > 0) adjustFontSize(target.value);
	}

	function adjustFontSize(text: string): void {
		if (!textarea) return;
		if (text === '' || text === undefined) {
			fontSize = 16;
			return;
		}

		const maxLength = 140;
		const minFontSize = 6;
		const maxFontSize = 16;
		fontSize = Math.max(
			minFontSize,
			maxFontSize - (text.length / maxLength) * (maxFontSize - minFontSize)
		);
	}

	function handleMouseDown(event: MouseEvent): void {
		event.preventDefault();
	}

	function handleDoubleclick(event: MouseEvent): void {
		event.preventDefault();
		toggleEditable();
	}

	function handleBlur(withSave: boolean): void {
		adjustFontSize(cardContent);
		if (withSave) saveCard();
		if (isDefaultCard) cardContent = '';
	}

	function blurTextarea(): void {
		textarea.blur();
	}

	function toggleEditable(): void {
		isEditing = !isEditing;
		if (isEditing) {
			setTimeout(() => {
				textarea.focus();
			}, 0);
		}
	}

	function handleFocus(): void {
		if (cardContent !== undefined && cardContent !== '') {
			const textLength = textarea.value.length;
			textarea.setSelectionRange(textLength, textLength);
		}
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			if (isDefaultCard && cardContent.trim() === '') return;
			if (!isDefaultCard) blurTextarea();
			saveCard();
			if (isDefaultCard) cardContent = '';
		}
	}

	function saveCard(): void {
		dispatch('save', { content: cardContent, isDefaultCard: isDefaultCard, id: card.id });
	}

	function togglePublishCard(): void {
		dispatch('publish');
	}

	function removeCard(): void {
		dispatch('remove');
	}
</script>

<div
	data-testid="card"
	class="card {card?.isPublic ? 'is-public' : ''}"
	style="background-color: {color};"
	tabindex="0"
	role="button"
>
	{#if isEditing}
		<textarea
			data-testid="card-textarea"
			maxlength={maxCharCount}
			bind:this={textarea}
			disabled={!isEditing}
			bind:value={cardContent}
			on:input={handleInput}
			on:keydown={handleKeydown}
			on:focus={handleFocus}
			on:blur={() => handleBlur(true)}
			placeholder="Type here... Press Enter to save."
			style="font-size: {fontSize}px"
		/>
		<div class="char-count">{charCount}/{maxCharCount}</div>
	{:else}
		<div
			data-testid="card-overlay"
			class="overlay"
			role="button"
			tabindex={0}
			bind:this={overlay}
			on:dblclick={handleDoubleclick}
			on:mousedown={handleMouseDown}
			style="font-size: {fontSize}px"
		>
			{cardContent}
		</div>
	{/if}

	{#if cardContent !== undefined && cardContent !== ''}
		<button
			on:click={togglePublishCard}
			class="toggle-publish"
			title={card?.isPublic ? 'Unpublish' : 'Publish'}>&#128065;</button
		>
		<button on:click={removeCard} class="remove" title="Remove">&#9587;</button>
	{/if}

	{#if card?.isPublic}
		<AuthorDot name={card?.author?.name} />
	{/if}
</div>

<style>
	.card {
		width: 144px;
		height: 144px;
		max-width: 100%;
		padding: 8px;
		padding-bottom: 24px;
		position: relative;
		box-shadow: rgb(208 208 208) 0px 10px 20px -10px;
		transition: box-shadow 0.1s ease-in, transform 0.3s ease-in-out;
	}

	.card:hover {
		box-shadow: 0px 1px 3px 1px #e2e2e2;
	}

	textarea {
		border: none;
		outline: none;
		resize: none;
		user-select: text;
		word-wrap: normal;
		background: transparent;
	}

	.overlay,
	textarea {
		margin: 0;
		padding: 0;
		font-size: 1rem;
		line-height: 1.35;
		letter-spacing: normal;
		width: 100%;
		height: 100%;
		font-family: sans-serif;
		color: rgba(31, 31, 31, 0.6);
		overflow: hidden;
	}

	.char-count {
		position: absolute;
		bottom: 8px;
		right: 8px;
		font-size: 0.9rem;
		color: rgba(31, 31, 31, 0.4);
	}

	.is-public .toggle-publish {
		background: #e2e2e2;
	}

	button {
		position: absolute;
		padding: 0;
		border: 0;
		outline: 0;
		background: #fff;
		border-radius: 50%;
		width: 24px;
		height: 24px;
		line-height: 24px;
		vertical-align: middle;
		box-shadow: 0px 1px 3px 1px rgba(173, 173, 173, 0.7);
		cursor: pointer;
		transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out, scale 0.5s var(--elastic-out),
			background-color 0.3s;
		z-index: 1;
		opacity: 0;
		visibility: hidden;
	}

	button:hover {
		scale: 1.05;
		box-shadow: 0px 1px 3px 1px rgba(173, 173, 173, 0.9);
	}

	.toggle-publish {
		top: -12px;
		right: 8px;
	}

	.remove {
		color: #fff;
		background-color: #ff8787;
		font-weight: bold;
		font-size: 0.6rem;
		top: 20px;
		right: -12px;
	}

	.remove:hover {
		background-color: #ff5151;
	}

	.card:hover button {
		opacity: 1;
		visibility: visible;
	}
</style>
