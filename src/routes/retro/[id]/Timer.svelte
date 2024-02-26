<script lang="ts">
	import { onMount } from 'svelte';
	import { io } from '$lib/socket.js';

	export let retroId: string;
	let timerValue: number = 300;
	let isRunning: boolean = false;

	onMount(() => {
		io.emit('join', retroId);
		io.on('timer', (timer) => {
			timerValue = timer;
		});
	});

	const toggleTimer = () => {
		isRunning = !isRunning;
		io.emit(isRunning ? 'start' : 'pause', retroId);
	};

	const resetTimer = () => {
		isRunning = false;
		io.emit('reset', retroId);
	};
</script>

<div class="timer">
	<div class="container">
		{#if timerValue > 0}
			<p>
				{timerValue >= 0
					? `${Math.floor(timerValue / 60)}:${(timerValue % 60).toString().padStart(2, '0')}`
					: '0:00'}
			</p>
		{/if}

		<button
			class={timerValue <= 0 ? 'reset' : ''}
			on:click={timerValue > 0 ? toggleTimer : resetTimer}
		>
			{#if timerValue <= 0}
				<!-- Bell Icon -->
				&#128276;
			{:else if !isRunning}
				<!-- Play Icon -->
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path fill-rule="evenodd" clip-rule="evenodd" d="M8 5V19L19 12L8 5Z" fill="black" />
				</svg>
			{:else}
				<!-- Pause Icon -->
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect x="6" y="5" width="4" height="14" fill="black" />
					<rect x="14" y="5" width="4" height="14" fill="black" />
				</svg>
			{/if}
		</button>
	</div>
</div>

<style>
	.timer {
		display: inline-flex;
		background: #f6d459a1;
		color: #130e01;
		border-radius: 40px;
		padding: 10px 30px;
		margin: 0 5px;
		border: none;
		height: 40px;
		min-width: 130px;
		font-size: 1.2rem;
		box-shadow: 0px 1px 3px 1px #c0a02ead;
		transition: scale 0.5s var(--elastic-out);
		cursor: pointer;
		justify-content: center;
		align-items: center;
		transition: width 0.3s ease-out;
	}

	.timer:hover {
		scale: 0.97;
		transition: scale 0.5s ease;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	p {
		width: 40px;
	}

	button {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 3rem;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 0;
		margin: 0;
		margin-top: 1px;
	}

	.reset {
		font-size: 1.3rem;
	}
</style>
