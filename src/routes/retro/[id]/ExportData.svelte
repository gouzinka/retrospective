<script lang="ts">
	import type { ActionPoint, Card, Board, Retrospective } from '../../../types';

	export let retrospective: Retrospective;

	function formatDataAsString(retrospective: Retrospective): string {
		const formatDate = (dateString: string) => new Date(dateString).toLocaleString();
		const formatBoard = (board: Board) =>
			`${board.title}:\n${board.cards
				.filter((card: Card) => card.content.length > 0)
				.map((card) => card.content)
				.join('\n')}`;
		const formatActionPoints = (actionPoints: ActionPoint[]) =>
			actionPoints.map((actionPoint) => actionPoint.description).join('\n');

		const date = formatDate(retrospective.createdAt.toLocaleString());
		const boardsString = retrospective.boards.map(formatBoard).join('\n\n');
		const actionsString = formatActionPoints(retrospective.actionPoints);

		return `Retrospective ${date}\n\n${boardsString}\n\nAction points:\n${actionsString}`;
	}

	function triggerFileDownload(filename: string, content: string) {
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');

		link.download = filename;
		link.href = url;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}

	function exportData() {
		const formattedData = formatDataAsString(retrospective);
		triggerFileDownload('retrospective.txt', formattedData);
	}
</script>

<button data-testid="download-btn" on:click={exportData}><strong>&#10515;</strong></button>

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
