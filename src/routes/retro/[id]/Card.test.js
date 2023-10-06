import { describe, it, expect } from 'vitest';
import { render, fireEvent, findByTestId } from '@testing-library/svelte';
import Card from './Card.svelte';
import { tick } from 'svelte';

describe('Card', () => {
	it('renders correctly', () => {
		const { getByText } = render(Card, {
			props: { card: { content: 'Test content' }, isDefaultCard: false }
		});
		expect(getByText('Test content')).toBeTruthy();
	});

	it('updates character count as user types', async () => {
		const { container, getByText } = render(Card, { card: { content: '' }, isDefaultCard: true });
		const textarea = await findByTestId(container, 'card-textarea');
		await fireEvent.input(textarea, { target: { value: 'Test' } });
		expect(getByText('4/140')).toBeTruthy();
	});

	it('adjusts font size based on content length', async () => {
		const content = 'This is a longer test content to check font size adjustment.';
		const { container } = render(Card, { card: { content }, isDefaultCard: false });
		const overlay = await findByTestId(container, 'card-overlay');
		const style = window.getComputedStyle(overlay);
		expect(style.fontSize).toBe('16px');
	});

	it('toggles editable state on double-click', async () => {
		const { getByText, container } = render(Card, {
			card: { content: 'Test' },
			isDefaultCard: false
		});
		const overlay = getByText('Test');
		await fireEvent.dblClick(overlay);
		const textarea = await findByTestId(container, 'card-textarea');
		expect(textarea).toBeTruthy();
	});
});
