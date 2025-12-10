<script lang="ts">
    import '../../app.css';
    import { fade, slide } from 'svelte/transition';
    import { page } from '$app/stores';
    
    // Componentes UI
    import CartDrawer from '$lib/components/ecommerce/CartDrawer.svelte';
    import Toast from '$lib/components/ecommerce/Toast.svelte';
    import { openCart } from '$lib/stores/ui';
    import { cartCount } from '$lib/stores/cart';

    let isMobileMenuOpen = false;
    let y = 0;

    $: $page.url.pathname, (isMobileMenuOpen = false);

    // Helper para saber si un link está activo
    // (Ahora verificamos si la URL contiene el parámetro de categoría)
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
            
            <button 
                class="md:hidden p-2 -ml-2 text-gray-500 hover:text-black focus:outline-none transition-colors"
                on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
                aria-label="Menu"
            >
                {#if isMobileMenuOpen}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                {:else}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                {/if}
            </button>

            <a href="/ecommerce-v2" class="text-xl font-bold tracking-tighter uppercase absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:left-auto hover:opacity-70 transition-opacity">
                AESTHETIC<span class="text-gray-400">.CO</span>
            </a>

            <div class="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                <a 
                    href="/ecommerce-v2/shop?cat=novedades" 
                    class="transition-colors hover:text-black {isActive('/ecommerce-v2/shop', 'novedades') ? 'text-black font-semibold' : ''}"
                >
                    Novedades
                </a>
                <a 
                    href="/ecommerce-v2/shop?cat=all" 
                    class="transition-colors hover:text-black {isActive('/ecommerce-v2/shop', 'all') ? 'text-black font-semibold' : ''}"
                >
                    Colección
                </a>
                <a 
                    href="/ecommerce-v2/shop?cat=decoración" 
                    class="transition-colors hover:text-black {isActive('/ecommerce-v2/shop', 'decoración') ? 'text-black font-semibold' : ''}"
                >
                    Decoración
                </a>
            </div>

            <div class="flex items-center gap-4">
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

        {#if isMobileMenuOpen}
            <div 
                class="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl flex flex-col p-6 gap-6 text-lg font-medium z-30"
                transition:slide={{ duration: 300, axis: 'y' }}
            >
                <a href="/ecommerce-v2/shop?cat=novedades" on:click={() => isMobileMenuOpen = false} class="hover:text-gray-600">Novedades</a>
                <a href="/ecommerce-v2/shop?cat=all" on:click={() => isMobileMenuOpen = false} class="hover:text-gray-600">Colección</a>
                <a href="/ecommerce-v2/shop?cat=decoración" on:click={() => isMobileMenuOpen = false} class="hover:text-gray-600">Decoración</a>
            </div>
        {/if}
    </nav>

    {#if isMobileMenuOpen}
        <div 
            class="fixed inset-0 bg-black/20 z-30 md:hidden"
            transition:fade
            on:click={() => isMobileMenuOpen = false}
        ></div>
    {/if}

    <main class="relative flex-1 pt-16">
        <slot />
    </main>

    <CartDrawer />
    <Toast />
</div>