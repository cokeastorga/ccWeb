import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';
import type { Product } from '$lib/stores/cart';

// Persistencia en localStorage
const initialWishlist: Product[] = browser && localStorage.getItem('cc-wishlist')
    ? JSON.parse(localStorage.getItem('cc-wishlist') || '[]')
    : [];

export const wishlist = writable<Product[]>(initialWishlist);

if (browser) {
    wishlist.subscribe((value) => {
        localStorage.setItem('cc-wishlist', JSON.stringify(value));
    });
}

// Acción Toggle (Agregar/Quitar)
export const toggleWishlist = (product: Product) => {
    wishlist.update(items => {
        const exists = items.some(i => i.id === product.id);
        if (exists) {
            return items.filter(i => i.id !== product.id);
        }
        return [...items, product];
    });
};

// Helper para verificar si está en favoritos desde la UI
export const isInWishlist = (id: string) => derived(wishlist, $w => $w.some(i => i.id === id));