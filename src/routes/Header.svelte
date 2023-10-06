<script>
	import logo from '$lib/images/logo.svg';
</script>

<header>
	<a href="/" class="logo">
		<img width="120" src={logo} alt="Retro logo" />
	</a>
</header>

<style>
	.logo {
		display: inline-block;
		position: relative;
	}

	.logo:before {
		content: '';
		position: absolute;
		background: #f6d459a1;
		border-radius: 50%;
		width: 70px;
		height: 70px;
		z-index: -1;
	}
</style>
