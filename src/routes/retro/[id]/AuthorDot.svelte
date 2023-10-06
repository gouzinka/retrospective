<script>
	import { onMount } from 'svelte';

	export let name;
	let author;
	let fullNameWidth;
	let displayName = name ?? '';

	onMount(() => {
		fullNameWidth = `${author?.scrollWidth}px`;
		displayName = getShortName();
	});

	function getShortName() {
		if (!name) return '';

		const words = name.split(' ');

		if (words.length >= 2) {
			// If there are two or more words, return the first character of the first two words.
			return words[0].charAt(0) + words[1].charAt(0);
		} else if (words.length === 1 && words[0].length >= 2) {
			// If there's one word, return the first two characters of the word.
			return words[0].substring(0, 2);
		} else if (words.length === 1) {
			// If there's one word, but it's a single character, return that character.
			return words[0].charAt(0);
		}

		return '';
	}

	function handleMouseOver() {
		displayName = name;
	}

	function handleMouseOut() {
		displayName = getShortName();
	}
</script>

<div
	class="author-dot"
	role="note"
	on:mouseover={handleMouseOver}
	on:mouseout={handleMouseOut}
	on:focus={handleMouseOver}
	on:blur={handleMouseOut}
	style="--full-width: {fullNameWidth};"
>
	<p bind:this={author}>
		{displayName}
	</p>
</div>

<style>
	.author-dot {
		position: absolute;
		bottom: -12px;
		right: 8px;
		border-radius: 4px;
		background-color: rgb(241, 241, 241);
		white-space: nowrap;
		transition: width 0.2s ease-out;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 24px;
		height: 24px;
		font-size: 0.75rem;
		line-height: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 9999px;
		margin: 0;
		cursor: default;
		z-index: 1;
	}

	.author-dot:hover {
		width: calc(var(--full-width) + 1em);
		padding: 0 0.5em;
	}
</style>
