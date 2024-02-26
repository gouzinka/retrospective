<script>
	import CreateRetro from './CreateRetro.svelte';
	import logo from '$lib/images/logo.svg';
	import bg1 from '$lib/images/background.png';
</script>

<svelte:head>
	<title>Retrospective</title>
	<meta name="description" content="Retrospective" />
</svelte:head>
<div class="page-wrapper">
	<div class="card">
		<div class="card-content">
			<div>
				<span class="text-reveal">Terka is an amazing teammate&nbsp;</span>
			</div>
			<div>
				<span class="text-reveal-line-2">And she didn't bark as much&nbsp;</span>
			</div>
		</div>
	</div>
	<div class="animated-bg">
		<div class="bg">
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
		</div>
		<div class="bg">
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
		</div>
		<div class="bg">
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
		</div>
		<div class="bg">
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
		</div>
		<div class="bg">
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
			<div class="bg-item"><img width="520" height="351" src={bg1} alt="background" /></div>
		</div>
	</div>
	<section>
		<h1>
			<span class="welcome">
				<img class="logo" width="140" height="70" src={logo} alt="Retro time!" />
			</span>
		</h1>

		<CreateRetro />
	</section>
</div>

<style>
	section {
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		z-index: 1;
	}

	h1 {
		margin: 0;
	}

	.logo {
		max-width: 100%;
	}
	.welcome {
		display: flex;
		position: relative;
		background: #f6d459a1;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		padding: 30px;
		justify-content: center;
		align-items: center;
	}
	.page-wrapper {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.animated-bg {
		position: fixed;
		height: 100%;
		transform: translate(-50%, -50%);
		filter: grayscale(0.5);
		top: 30%;
		left: 50%;
	}
	.bg {
		transform: rotateX(20deg) rotate(-20deg) skew(20deg);
		display: flex;
	}

	.bg-item {
		display: inline-block;
	}

	.page-wrapper:after {
		content: '';
		position: absolute;
		background: #f6f8fa90;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}

	.card {
		position: absolute;
		text-align: left;
		padding: 48px 16px 32px 16px;
		font-size: 16px;
		background: #c6ffa6;
		top: 15%;
		left: 5%;
		width: 300px;
		max-width: 90%;
		height: 200px;
		border-radius: 18px;
		z-index: 1;
		box-shadow: #72e830 0 10px 20px -10px;
	}

	@media (min-width: 400px) {
		.card {
			left: 15%;
			max-width: 70%;
		}
	}

	.card:before {
		content: '';
		position: absolute;
		top: 20px;
		right: 20px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: rgb(122, 255, 162);
		animation: pulse 2s infinite;
	}

	.card:after {
		content: 'everyone';
		position: absolute;
		bottom: 20px;
		right: 20px;
		text-transform: uppercase;
		font-weight: 700;
		font-size: 12px;
	}

	.card-content {
		background-color: #ffffffa6;
		padding: 8px 16px;
		border-radius: 8px;
		color: #333c2b;
	}

	@keyframes caret {
		0%,
		100% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
	}

	.text-reveal,
	.text-reveal-line-2 {
		overflow: hidden;
		white-space: nowrap;
		display: inline-block;
		position: relative;
		animation-fill-mode: forwards;
		animation-duration: 10s;
		animation-timing-function: steps(30, end);
	}

	.text-reveal {
		animation-name: typewriter;
	}

	.text-reveal::after,
	.text-reveal-line-2::after {
		content: '|';
		position: absolute;
		right: 0;
		animation: caret infinite;
		animation-duration: 1s;
		animation-timing-function: steps(1, end);
		color: black;
		font-weight: bold;
	}

	.text-reveal-line-2 {
		width: 0;
		animation-name: typewriter-line-2;
		animation-delay: 3s;
		animation-fill-mode: forwards;
	}

	@keyframes typewriter-line-2 {
		0% {
			width: 0;
		}
		20%,
		80%,
		100% {
			width: 205px;
		}
	}

	@keyframes typewriter {
		0% {
			width: 0;
		}
		20%,
		80% {
			width: 222px;
		}
	}

	@-webkit-keyframes pulse {
		0% {
			-webkit-box-shadow: 0 0 0 0 rgba(122, 255, 162, 0.4);
		}
		70% {
			-webkit-box-shadow: 0 0 0 5px rgba(122, 255, 162, 0);
		}
		100% {
			-webkit-box-shadow: 0 0 0 0 rgba(122, 255, 162, 0);
		}
	}
	@keyframes pulse {
		0% {
			-moz-box-shadow: 0 0 0 0 rgba(122, 255, 162, 0.4);
			box-shadow: 0 0 0 0 rgba(122, 255, 162, 0.4);
		}
		70% {
			-moz-box-shadow: 0 0 0 5px rgba(122, 255, 162, 0);
			box-shadow: 0 0 0 5px rgba(122, 255, 162, 0);
		}
		100% {
			-moz-box-shadow: 0 0 0 0 rgba(122, 255, 162, 0);
			box-shadow: 0 0 0 0 rgba(122, 255, 162, 0);
		}
	}
</style>
