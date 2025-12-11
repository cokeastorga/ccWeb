<script lang="ts">
    import '../../app.css';
    import { fade, slide } from 'svelte/transition';
    import { page } from '$app/stores';
    import { onNavigate } from '$app/navigation'; // ✅ Importar esto
    
    // Componentes UI
    import CartDrawer from '$lib/components/ecommerce/CartDrawer.svelte';
    import Toast from '$lib/components/ecommerce/Toast.svelte';
    import { openCart } from '$lib/stores/ui';
    import { cartCount } from '$lib/stores/cart';
    import PromoPopupV3 from '$lib/components/ecommerce/PromoPopupV3.svelte';

    let isMobileMenuOpen = false;
    let y = 0;

    // ✅ Lógica de View Transitions
    onNavigate((navigation) => {
        // Verificar soporte del navegador
        if (!document.startViewTransition) return;

        return new Promise((resolve) => {
            document.startViewTransition(async () => {
                resolve();
                await navigation.complete;
            });
        });
    });

    $: $page.url.pathname, (isMobileMenuOpen = false);
    $: isActive = (path: string, param?: string) => {
        if (param) {
            return $page.url.searchParams.get('cat') === param;
        }
        return $page.url.pathname === path;
    };
</script>

<svelte:window bind:scrollY={y} />

<div class="min-h-screen bg-white text-gray-900 font-sans selection:bg-black selection:text-white flex flex-col relative">
    
    <nav 
        class="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300"
        class:shadow-sm={y > 10}
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/ecommerce-v3" class="text-xl font-bold tracking-tighter uppercase absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:left-auto hover:opacity-70 transition-opacity">
                AESTHETIC<span class="text-gray-400">.CL</span>
            </a>
            
            <div class="flex items-center gap-4 ml-auto">
                 <button 
                    class="relative hover:bg-gray-100 p-2 rounded-full transition-colors group"
                    on:click={openCart}
                    aria-label="Abrir carrito"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="group-hover:scale-110 transition-transform"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    {#if $cartCount > 0}
                        <span class="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full animate-in zoom-in">
                            {$cartCount}
                        </span>
                    {/if}
                </button>
            </div>
        </div>
    </nav>

    <main class="relative flex-1 pt-16">
        <slot />
    </main>

    <CartDrawer />
    <Toast />

    <PromoPopupV3 />
</div>