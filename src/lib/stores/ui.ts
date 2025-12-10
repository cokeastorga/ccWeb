import { writable } from 'svelte/store';

// Controla si el carrito lateral está visible o no
export const isCartOpen = writable(false);

// Controla notificaciones flotantes (Toasts)
export const toast = writable<{message: string, type: 'success' | 'error'} | null>(null);

export const showToast = (message: string) => {
    toast.set({ message, type: 'success' });
    setTimeout(() => toast.set(null), 3000);
};