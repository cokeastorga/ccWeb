<script lang="ts">
    import { cart, cartTotal } from '$lib/stores/cart';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';

    let processing = false;

    // Campos del formulario
    let email = '';
    let name = '';
    let address = '';
    let city = '';
    let zip = '';

    // Simular proceso de pago
    async function handleSubmit() {
        processing = true;
        
        // 1. Simulamos latencia de red/API de pago (2 segundos)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 2. Limpiamos el carrito (usando el método set del store writable)
        cart.set([]);

        // 3. Redirigimos a la página de éxito
        goto('/ecommerce-v2/success');
    }
</script>

<div class="min-h-screen bg-gray-50 pt-10 pb-20 px-6 font-sans">
    
    <div class="max-w-6xl mx-auto mb-10 flex items-center justify-between">
        <h1 class="text-2xl font-serif tracking-wide">Finalizar Compra</h1>
        <a href="/ecommerce-v2" class="text-sm text-gray-500 hover:text-black transition-colors">
            ← Seguir comprando
        </a>
    </div>

    {#if $cart.length === 0}
        <div class="max-w-md mx-auto text-center py-20" in:fade>
            <div class="text-6xl mb-4 grayscale">🛒</div>
            <h2 class="text-2xl font-serif mb-2">Tu carrito está vacío</h2>
            <p class="text-gray-500 mb-8">Parece que aún no has elegido tus piezas de diseño favoritas.</p>
            <a href="/ecommerce-v2" class="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Volver a la tienda
            </a>
        </div>
    {:else}
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24" in:fade>
            
            <div>
                <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-8">
                    
                    <div class="space-y-4">
                        <h2 class="text-lg font-medium border-b border-gray-200 pb-2">Contacto</h2>
                        <input 
                            bind:value={email}
                            type="email" 
                            required 
                            placeholder="Email para confirmación" 
                            class="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    <div class="space-y-4">
                        <h2 class="text-lg font-medium border-b border-gray-200 pb-2">Dirección de Envío</h2>
                        <div class="grid grid-cols-2 gap-4">
                            <input bind:value={name} type="text" required placeholder="Nombre" class="col-span-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors" />
                            <input type="text" required placeholder="Apellidos" class="col-span-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors" />
                            <input bind:value={address} type="text" required placeholder="Dirección y número" class="col-span-2 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors" />
                            <input bind:value={city} type="text" required placeholder="Ciudad" class="col-span-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors" />
                            <input bind:value={zip} type="text" required placeholder="Código Postal" class="col-span-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors" />
                        </div>
                    </div>

                    <div class="space-y-4">
                        <h2 class="text-lg font-medium border-b border-gray-200 pb-2">Pago</h2>
                        <div class="p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-center gap-3">
                            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            <span class="text-sm text-gray-600">Transacción segura (Modo Demo: No se cobrará nada).</span>
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={processing}
                            class="w-full bg-black text-white py-4 rounded-full font-medium hover:bg-gray-900 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-4"
                        >
                            {#if processing}
                                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                Procesando...
                            {:else}
                                Pagar ${$cartTotal}
                            {/if}
                        </button>
                    </div>
                </form>
            </div>

            <div class="relative hidden lg:block">
                <div class="sticky top-10 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 class="font-serif text-xl mb-6">Resumen del Pedido</h3>
                    
                    <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {#each $cart as item}
                            <div class="flex gap-4 items-start py-2">
                                <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={item.image} alt={item.name} class="w-full h-full object-cover" />
                                </div>
                                <div class="flex-1">
                                    <p class="font-medium text-sm">{item.name}</p>
                                    <p class="text-xs text-gray-500">{item.category}</p>
                                    <p class="text-xs text-gray-500 mt-1">Cant: {item.quantity}</p>
                                </div>
                                <p class="font-medium text-sm">${item.price * item.quantity}</p>
                            </div>
                        {/each}
                    </div>

                    <div class="border-t border-gray-100 mt-6 pt-4 space-y-2">
                        <div class="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>${$cartTotal}</span>
                        </div>
                        <div class="flex justify-between text-sm text-gray-600">
                            <span>Envío</span>
                            <span class="text-green-600 font-medium">Gratis</span>
                        </div>
                        <div class="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-100">
                            <span>Total</span>
                            <span>${$cartTotal}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="lg:hidden mt-8 border-t pt-8">
                 <h3 class="font-serif text-xl mb-4">Resumen</h3>
                 <div class="flex justify-between text-lg font-bold">
                    <span>Total a pagar</span>
                    <span>${$cartTotal}</span>
                </div>
            </div>

        </div>
    {/if}
</div>

<style>
    /* Estilo sutil para scrollbar */
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
</style>