// src/lib/actions/pannable.ts
export function pannable(node: HTMLElement) {
	let x = 0;
	let y = 0;

	function handleMousedown(event: MouseEvent | TouchEvent) {
		// Evitamos conflicto con clicks normales
		// event.preventDefault(); 
		
		const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
		const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

		x = clientX;
		y = clientY;

		node.dispatchEvent(new CustomEvent('panstart', {
			detail: { x, y }
		}));

		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseup', handleMouseup);
		window.addEventListener('touchmove', handleMousemove, { passive: false });
		window.addEventListener('touchend', handleMouseup);
	}

	function handleMousemove(event: MouseEvent | TouchEvent) {
		const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
		const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

		const dx = clientX - x;
		const dy = clientY - y;
		x = clientX;
		y = clientY;

		node.dispatchEvent(new CustomEvent('panmove', {
			detail: { dx, dy, x, y }
		}));
	}

	function handleMouseup(event: MouseEvent | TouchEvent) {
		const clientX = 'changedTouches' in event ? event.changedTouches[0].clientX : event.clientX;
		const clientY = 'changedTouches' in event ? event.changedTouches[0].clientY : event.clientY;

		x = clientX;
		y = clientY;

		node.dispatchEvent(new CustomEvent('panend', {
			detail: { x, y }
		}));

		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseup', handleMouseup);
		window.removeEventListener('touchmove', handleMousemove);
		window.removeEventListener('touchend', handleMouseup);
	}

	node.addEventListener('mousedown', handleMousedown);
	node.addEventListener('touchstart', handleMousedown, { passive: true });

	return {
		destroy() {
			node.removeEventListener('mousedown', handleMousedown);
			node.removeEventListener('touchstart', handleMousedown);
		}
	};
}