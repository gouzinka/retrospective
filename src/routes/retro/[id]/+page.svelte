<script>
	import { retrospective } from '../../../stores/retrospective.js';
	import { currentUser } from '../../../stores/user.js';
	import ActionPoints from './ActionPoints.svelte';
	import ExportData from './ExportData.svelte';
	import Board from './Board.svelte';
	import Header from '../../Header.svelte';
	import Timer from './Timer.svelte';
	import { updateUser } from '../../../utils/userManager.js';

	let actionsVisible = false;
	let isEditingName = false;
	$: userName = $currentUser?.name ?? '';
	let userNameTitle = $currentUser?.name ?? '';
	$: boards = $retrospective?.boards;

	function handleKeydown(event) {
		if (event.key === 'Enter' || event.keyCode === 13) {
			event.preventDefault();
			event.target.blur();
		}
	}

	function handleOnBlur() {
		isEditingName = false;
		updateUser($currentUser?.id, userNameTitle);
	}
</script>

<svelte:head>
	<title>
		Retro | {$retrospective ? new Date($retrospective?.createdAt).toLocaleDateString('en-GB') : ''}
	</title>
</svelte:head>

{#if $retrospective}
	<div class="navbar">
		<div class="header">
			<Header />

			<div class="title">
				<p>
					Vítej, koledníku! Též zván jako
					{#if isEditingName}
						<input
							maxlength="30"
							type="text"
							bind:value={userNameTitle}
							on:keydown={handleKeydown}
							on:blur={handleOnBlur}
						/>
					{:else}
						<button class="overlay" on:click={() => (isEditingName = true)}>{userName}</button>
					{/if}
				</p>
				<h5>Id: {$retrospective?.id}</h5>
			</div>
		</div>

		<div>
			<div>
				<Timer retroId={$retrospective?.id} />
				<ExportData retrospective={$retrospective} />
				<button on:click={() => (actionsVisible = !actionsVisible)}
					><strong>&#10229;</strong>&nbsp;&nbsp;Actions</button
				>
			</div>
		</div>
	</div>

	<div class="container">
		{#if boards?.length > 0}
			{#each boards as board (board.id)}
				<Board
					retroId={$retrospective?.id}
					title={board.title}
					boardId={board.id}
					cards={board.cards}
					color={$currentUser?.customColor}
					userId={$currentUser?.id}
				/>
			{/each}
		{:else}
			<p>No boards available.</p>
		{/if}
	</div>

	<ActionPoints
		actionPoints={$retrospective?.actionPoints}
		visible={actionsVisible}
		retroId={$retrospective?.id}
	/>
{:else}
	<p>Retrospective not found</p>
{/if}

<style>
	.header {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.title {
		margin-left: 15px;
	}

	.container {
		display: flex;
		gap: 20px;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
		align-items: stretch;
		flex: 1;
	}

	h5 {
		margin: 0;
		font-weight: 400;
		font-size: 1rem;
		color: #c6c6c6;
	}

	button {
		display: inline-block;
		background: #f6d459a1;
		color: #130e01;
		border-radius: 40px;
		padding: 10px 30px;
		margin: 0 5px;
		border: none;
		height: 40px;
		font-size: 1.2rem;
		box-shadow: 0px 1px 3px 1px #c0a02ead;
		transition: scale 0.5s var(--elastic-out);
		cursor: pointer;
		display: inline-flex;
		justify-content: center;
		align-items: center;
	}

	button:hover {
		scale: 0.97;
		transition: scale 0.5s ease;
	}

	.navbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		margin-bottom: 10px;
	}

	p {
		font-size: 1.4rem;
		margin: 0;
		color: #5e5e5e;
	}

	input {
		display: inline-block;
		background-color: transparent;
		padding: 0;
		margin: 0;
		border: none;
		outline: none;
		color: #5e5e5e;
	}

	.overlay {
		border: none;
		border-radius: 0;
		background-color: transparent;
		box-shadow: none;
		padding: 0;
		margin: 0;
		color: #5e5e5e;
		height: auto;
		transition: box-shadow 0.3s ease-in-out;
		font-size: 1.4rem;
		text-decoration: underline dotted;
		text-decoration-color: #e5e6e7;
	}

	.overlay:hover {
		scale: 1;
		box-shadow: 0 1px rgb(85, 85, 85);
	}
</style>
