<script lang="ts">
    import CartDrawer from '$lib/components/ecommerce/CartDrawer.svelte';
    import Toast from '$lib/components/ecommerce/Toast.svelte';
    import { cartCount } from '$lib/stores/cart';
    import { isCartOpen } from '$lib/stores/ui';
    import '../../app.css'; // Asegúrate de importar Tailwind
</script>

<div class="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white">
    
    <nav class="fixed top-0 w-full z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            <a href="/ecommerce-v2" class="text-xl font-bold tracking-tighter uppercase">
                AESTHETIC<span class="text-gray-400">.CO</span>
            </a>

            <div class="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                <a href="#new" class="hover:text-black transition-colors">Novedades</a>
                <a href="#shop" class="hover:text-black transition-colors">Colección</a>
                <a href="#editorial" class="hover:text-black transition-colors">Editorial</a>
            </div>

            <div class="flex items-center gap-4">
                <button class="hover:bg-gray-100 p-2 rounded-full transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
                
                <button 
                    class="relative hover:bg-gray-100 p-2 rounded-full transition-colors"
                    on:click={() => isCartOpen.set(true)}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    
                    {#if $cartCount > 0}
                        <span class="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                            {$cartCount}
                        </span>
                    {/if}
                </button>
                <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
    <h2 class="text-xl font-serif font-medium">Tu Bolsa</h2>
    <button aria-label="Cerrar carrito" on:click={close} class="p-2 hover:bg-gray-100 rounded-full transition-colors">
        ✕
    </button>
</div>

<button aria-label="Eliminar item" on:click={() => removeFromCart(item.id)} class="text-gray-300 hover:text-red-500 self-start p-1">✕</button>
            </div>
        </div>
    </nav>

    <main class="pt-16">
        <slot />
    </main>

    <footer class="bg-black text-white py-12 px-6 mt-20">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h4 class="font-bold mb-4">AESTHETIC.CO</h4>
                <p class="text-gray-400 text-sm">Diseño para la vida moderna.</p>
            </div>
            </div>
    </footer>

    <CartDrawer />
    <Toast />
</div>