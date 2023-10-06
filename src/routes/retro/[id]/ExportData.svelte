<script>
	export let retrospective;

	function exportData() {
		const formattedData = formatDataAsString();

		const blob = new Blob([formattedData], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);

		const link = document.createElement('a');
		link.download = 'retrospective.txt';
		link.href = url;

		document.body.appendChild(link);

		link.click();

		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}

	function formatDataAsString() {
		const date = new Date(retrospective?.createdAt).toLocaleString();

		const boardsString = (retrospective?.boards || [])
			.map((board) => {
				const boardTitle = board.title;
				const cardsString = (board.cards || [])
					.filter((card) => card.content?.length > 0)
					.map((card) => card.content)
					.join('\n');
				return `${boardTitle}:\n${cardsString}`;
			})
			.join('\n\n');

		const actionsString = (retrospective.actionPoints || [])
			.map((actionPoint) => actionPoint.description)
			.join('\n');

		const formattedString = `Retrospective ${date}\n\n${boardsString}\n\nAction points:\n${actionsString}`;

		return formattedString;
	}
</script>

<button on:click={exportData}><strong>&#10515;</strong></button>

<style>
	button {
		display: inline-block;
		background: #f6d459a1;
		color: #130e01;
		border-radius: 50%;
		padding: 0;
		margin: 0 5px;
		border: none;
		height: 40px;
		width: 40px;
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
</style>
