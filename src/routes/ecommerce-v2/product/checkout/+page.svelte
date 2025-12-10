<script lang="ts">
    import { cart, cartTotal } from '$lib/stores/cart';
    import { goto } from '$app/navigation';
    import { fade } from 'svelte/transition';

    let isLoading = false;

    // Simular pago
    async function handleSubmit() {
        isLoading = true;
        await new Promise(r => setTimeout(r, 2000)); // Esperar 2 segundos
        cart.set([]); // Limpiar carrito
        isLoading = false;
        goto('/ecommerce-v2/success');
    }
</script>

<div class="max-w-4xl mx-auto px-6 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4">
    <h1 class="text-3xl font-serif mb-10">Checkout</h1>

    <div class="grid md:grid-cols-12 gap-12">
        <div class="md:col-span-7 space-y-8">
            <section>
                <h2 class="text-lg font-medium mb-4">Contacto</h2>
                <input type="email" placeholder="Email" class="w-full p-3 bg-gray-50 border-b border-gray-300 focus:border-black focus:bg-white outline-none transition-all rounded-t-md" required />
            </section>

            <section>
                <h2 class="text-lg font-medium mb-4">Envío</h2>
                <div class="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Nombre" class="w-full p-3 bg-gray-50 border-b border-gray-300 focus:border-black focus:bg-white outline-none transition-all" required />
                    <input type="text" placeholder="Apellidos" class="w-full p-3 bg-gray-50 border-b border-gray-300 focus:border-black focus:bg-white outline-none transition-all" required />
                    <input type="text" placeholder="Dirección" class="col-span-2 w-full p-3 bg-gray-50 border-b border-gray-300 focus:border-black focus:bg-white outline-none transition-all" required />
                    <input type="text" placeholder="Ciudad" class="w-full p-3 bg-gray-50 border-b border-gray-300 focus:border-black focus:bg-white outline-none transition-all" required />
                    <input type="text" placeholder="Código Postal" class="w-full p-3 bg-gray-50 border-b border-gray-300 focus:border-black focus:bg-white outline-none transition-all" required />
                </div>
            </section>

            <section>
                <h2 class="text-lg font-medium mb-4">Pago (Simulado)</h2>
                <div class="p-4 border border-gray-200 rounded-lg flex items-center gap-3 bg-gray-50 text-gray-500 cursor-not-allowed">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-1-9h-4v2h4V9z"/></svg>
                    <span>Tarjeta de Crédito / Débito (Modo Demo)</span>
                </div>
            </section>
        </div>

        <div class="md:col-span-5">
            <div class="bg-gray-50 p-6 rounded-2xl sticky top-24">
                <h3 class="text-lg font-medium mb-6">Tu Orden</h3>
                <div class="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
                    {#each $cart as item}
                        <div class="flex justify-between items-center text-sm">
                            <div class="flex items-center gap-3">
                                <img src={item.image} alt="" class="w-12 h-12 object-cover rounded bg-white"/>
                                <div>
                                    <p class="font-medium text-gray-900">{item.name}</p>
                                    <p class="text-gray-500">x{item.quantity}</p>
                                </div>
                            </div>
                            <span class="font-medium">${item.price * item.quantity}</span>
                        </div>
                    {/each}
                    {#if $cart.length === 0}
                        <p class="text-sm text-gray-400 italic">No hay productos...</p>
                    {/if}
                </div>

                <div class="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600">
                    <div class="flex justify-between">
                        <span>Subtotal</span>
                        <span>${$cartTotal}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Envío</span>
                        <span>Gratis</span>
                    </div>
                </div>

                <div class="border-t border-gray-200 pt-4 mt-4 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>${$cartTotal}</span>
                </div>

                <button 
                    on:click={handleSubmit}
                    disabled={isLoading || $cart.length === 0}
                    class="w-full mt-8 bg-black text-white py-4 rounded-full font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 transition-all"
                >
                    {#if isLoading}
                        <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Procesando...
                    {:else}
                        Pagar Ahora
                    {/if}
                </button>
            </div>
        </div>
    </div>
</div>