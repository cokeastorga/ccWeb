// src/lib/stores/ui.ts
import { writable } from 'svelte/store';

// 1. ESTADO: Variable reactiva que controla si el carrito está abierto
export const isCartOpen = writable(false);

// Helpers del carrito
export const openCart = () => isCartOpen.set(true);
export const closeCart = () => isCartOpen.set(false);
export const toggleCart = () => isCartOpen.update(n => !n);

// 2. ESTADO: Variable reactiva para el mensaje del Toast
export const toast = writable({ 
    message: '', 
    visible: false, 
    type: 'info' 
});

// Helper para mostrar el Toast (ESTA es la función que usas en tus páginas)
export const showToast = (message: string, type = 'info') => {
    toast.set({ message, visible: true, type });
    
    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
        toast.update(t => ({ ...t, visible: false }));
    }, 3000);
};