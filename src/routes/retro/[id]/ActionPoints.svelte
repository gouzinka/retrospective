<script>
	import { io } from '$lib/socket.js';
	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	const [send, receive] = crossfade({
		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	export let visible = false;
	export let retroId;
	let newActionDescription = '';
	export let actionPoints;
	let input;

	function addNewActionPoint() {
		if (newActionDescription.trim()) {
			saveActionPoint(newActionDescription.trim());
			newActionDescription = '';
		}
	}
	function handleKeydown(event) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			addNewActionPoint();
		}
	}

	async function saveActionPoint(description) {
		io.emit('add-action-point-request', {
			description: description.trim(),
			retrospectiveId: retroId
		});
	}

	io.on('action-point-added', (actionPoint) => {
		actionPoints = [actionPoint, ...actionPoints];
	});

	io.on('action-point-error', (errorData) => {
		console.error('Failed to save action point:', errorData.error);
	});
</script>

<div class={`actions-panel ${visible ? 'visible' : ''}`}>
	<h2>Action points</h2>
	<button on:click={() => (visible = false)} class="close-button">&#9587;</button>

	<div class="content">
		<div class="new-action">
			<input
				on:keydown={handleKeydown}
				bind:value={newActionDescription}
				placeholder="Enter action point"
				bind:this={input}
			/>
			<button class="button-primary" on:click={addNewActionPoint}>&plus;</button>
		</div>
		{#if actionPoints?.length > 0}
			<ul>
				{#each actionPoints as actionPoint (actionPoint)}
					<li in:receive={{ key: actionPoint.id }} out:send={{ key: actionPoint.id }} animate:flip>
						{actionPoint.description}
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>

<style>
	h2 {
		font-size: 1.6rem;
	}

	.actions-panel {
		position: fixed;
		top: 0;
		right: -35%;
		width: 33.33%;
		height: 100%;
		color: #130e01;
		background-color: #f6f8fa;
		transition: right 0.3s ease-in-out;
		overflow: hidden;
		padding: 32px;
		box-shadow: -8px 0 15px -1px rgb(208 208 208);
		z-index: 2;
	}

	.actions-panel.visible {
		right: 0;
	}

	.close-button {
		background-color: transparent;
		border: none;
		cursor: pointer;
		position: absolute;
		top: 20px;
		right: 20px;
	}

	input {
		border: none;
		outline: none;
		resize: none;
		user-select: text;
		word-wrap: normal;
		overflow: hidden;
		background: transparent;
		margin: 0;
		padding: 8px;
		font-size: 1rem;
		line-height: 1.15;
		letter-spacing: normal;
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #d9ebb8;
		font-family: sans-serif;
		color: rgba(31, 31, 31, 0.6);
	}

	.button-primary {
		margin: 0;
		margin-left: 20px;
		padding: 0;
		width: 40px;
		height: 40px;
		color: #130e01;
		background: #f6d459a1;
		border: none;
		border-radius: 50%;
		outline: none;
		flex-shrink: 0;
		cursor: pointer;
	}

	.button-tertiary {
		background: none;
		padding: 3px 0;
		margin: 0;
		border: none;
		outline: none;
		transition: box-shadow 0.2s ease-in-out, color 0.2s ease-in-out;
		line-height: 1.1;
		color: gray;
	}

	.button-tertiary:hover {
		box-shadow: 0 1px rgb(85, 85, 85);
		color: rgb(85, 85, 85);
	}

	.content {
		overflow-y: auto;
	}

	.new-action {
		display: flex;
		width: 100%;
	}
</style>
