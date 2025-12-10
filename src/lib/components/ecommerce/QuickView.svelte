<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import type { Product } from '$lib/types'; // Usamos tu definición centralizada
    import { addToCart } from '$lib/stores/cart';
    import { showToast } from '$lib/stores/ui';

    export let product: Product | null = null;
    export let isOpen = false;

    const dispatch = createEventDispatcher();

    function close() {
        dispatch('close');
    }

    function handleAddToCart() {
        if (product) {
            addToCart(product);
            showToast(`Agregado: ${product.name}`);
            close();
        }
    }
</script>

{#if isOpen && product}
    <div 
        class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        on:click|self={close}
        transition:fade={{ duration: 200 }}
    >
        <div 
            class="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative"
            transition:fly={{ y: 50, duration: 300 }}
        >
            <button 
                on:click={close}
                class="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-black hover:text-white transition-colors"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <div class="relative h-64 md:h-full bg-gray-100">
                <img 
                    src={product.image} 
                    alt={product.name}
                    class="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <div class="p-8 md:p-12 flex flex-col justify-center items-start space-y-6">
                <div>
                    <span class="text-sm text-gray-500 uppercase tracking-widest">{product.category}</span>
                    <h2 class="text-3xl md:text-4xl font-serif mt-2">{product.name}</h2>
                    <p class="text-2xl font-medium mt-4">${product.price}</p>
                </div>

                <p class="text-gray-600 leading-relaxed">
                    Diseño minimalista que combina funcionalidad y estética. Ideal para espacios modernos que buscan calidez y sofisticación.
                </p>

                <div class="w-full pt-4 border-t border-gray-100">
                    <button 
                        on:click={handleAddToCart}
                        class="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-transform active:scale-95"
                    >
                        Agregar al Carrito — ${product.price}
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}