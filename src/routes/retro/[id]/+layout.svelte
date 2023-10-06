<script>
	import '../../styles.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		flex: 1;
		width: 100%;
		height: 100%;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 10px;
		width: 100%;
		max-width: 99%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
