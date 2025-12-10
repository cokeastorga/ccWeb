import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

// Definición de Tipos
export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    badge?: string; // Nuevo: Para etiquetas "New", "Sale"
}

export interface CartItem extends Product {
    quantity: number;
}

// Inicialización Segura (Evita el error de "window is not defined")
const initialCart: CartItem[] = browser && localStorage.getItem('cc-cart-v2')
    ? JSON.parse(localStorage.getItem('cc-cart-v2') || '[]')
    : [];

export const cart = writable<CartItem[]>(initialCart);

// Persistencia automática
if (browser) {
    cart.subscribe((value) => {
        localStorage.setItem('cc-cart-v2', JSON.stringify(value));
    });
}

// Cálculos derivados (Getters)
export const cartTotal = derived(cart, ($cart) => 
    $cart.reduce((total, item) => total + (item.price * item.quantity), 0)
);

export const cartCount = derived(cart, ($cart) => 
    $cart.reduce((count, item) => count + item.quantity, 0)
);

// Acciones
export const addToCart = (product: Product) => {
    cart.update(items => {
        const existing = items.find(i => i.id === product.id);
        if (existing) {
            return items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
        }
        return [...items, { ...product, quantity: 1 }];
    });
    // Aquí dispararemos una notificación UI en el futuro
};

export const removeFromCart = (id: string) => {
    cart.update(items => items.filter(i => i.id !== id));
};