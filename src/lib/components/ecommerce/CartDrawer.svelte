<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { cart, removeFromCart, cartTotal } from '$lib/stores/cart';
    import { isCartOpen, closeCart } from '$lib/stores/ui';
    import { goto } from '$app/navigation';

    function handleCheckout() {
        console.log("Navegando al checkout...");
        closeCart();
        goto('/ecommerce-v2/checkout'); 
    }
</script>

{#if $isCartOpen}
    <div 
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
        transition:fade={{ duration: 200 }}
        on:click={closeCart}
    ></div>

    <div 
        class="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
        transition:fly={{ x: 400, duration: 400, opacity: 1 }}
    >
        <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <h2 class="font-serif text-xl">Tu Carrito ({$cart.length})</h2>
            <button on:click={closeCart} class="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Cerrar">
                <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
        </div>

        <div class="flex-1 overflow-y-auto p-6 space-y-6">
            {#if $cart.length === 0}
                <div class="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                    <span class="text-4xl">🛒</span>
                    <p>Tu carrito está vacío.</p>
                    <button on:click={closeCart} class="text-black underline text-sm">Seguir comprando</button>
                </div>
            {:else}
                {#each $cart as item (item.id)}
                    <div class="flex gap-4 animate-in slide-in-from-right-4 duration-300">
                        <div class="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                            <img src={item.image} alt={item.name} class="w-full h-full object-cover" />
                        </div>
                        <div class="flex-1 flex flex-col justify-between py-1">
                            <div>
                                <h3 class="font-medium text-gray-900">{item.name}</h3>
                                <p class="text-xs text-gray-500">{item.category}</p>
                            </div>
                            <div class="flex justify-between items-end">
                                <p class="text-sm font-semibold">${item.price}</p>
                                <button 
                                    on:click={() => removeFromCart(item.id)}
                                    class="text-xs text-red-500 hover:text-red-700 underline"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>

        {#if $cart.length > 0}
            <div class="p-6 border-t border-gray-100 bg-gray-50">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="font-serif text-xl font-bold">${$cartTotal}</span>
                </div>
                <p class="text-xs text-gray-400 mb-6 text-center">Envío e impuestos calculados en el checkout.</p>
                <button 
                    on:click={handleCheckout}
                    class="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 transition-transform active:scale-[0.98] shadow-lg"
                >
                    Finalizar Compra
                </button>
            </div>
        {/if}
    </div>
{/if}