<script lang="ts">
	import { io } from '$lib/socket.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { currentUser } from '../stores/user.js';

	onMount(() => {
		io.on('retrospective-created', (retrospective) => {
			goto(`/retro/${retrospective.id}`);
		});

		io.on('retrospective-error', (errorData) => {
			console.error('Error creating new retrospective:', errorData.error);
		});
	});

	async function createNewRetro() {
		io.emit('create-retrospective', {
			title: 'New Retro',
			userId: $currentUser?.id
		});
	}
</script>

<div>
	<button on:click={createNewRetro}>Create new retro</button>
</div>

<style>
	button {
		padding: 18px 42px;
		margin-top: 44px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #ff4742;
		background-color: #ff4742;
		color: #ffffff;
		font-size: 1.1rem;
		font-weight: 700;
		transition: transform 0.5s var(--elastic-out);
		border-radius: 999px;
		cursor: pointer;
		will-change: transform;
		backface-visibility: hidden;
		text-rendering: geometricPrecision;
		box-shadow: #ff4742 0 10px 20px -10px;
	}

	button:hover {
		transform: scale3d(0.97, 0.97, 1);
		transition: transform 0.5s ease;
	}
</style>
