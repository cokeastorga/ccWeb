<script lang="ts">
    import { cartCount } from '$lib/stores/cart';
    import { openCart } from '$lib/stores/ui';
    import { scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    
    let isBumped = false;

    // Reactividad: Cada vez que $cartCount cambie, activamos la animación
    $: {
        // Accedemos a la variable para registrar la dependencia
        const count = $cartCount;
        if (count > 0) {
            isBumped = true;
            setTimeout(() => isBumped = false, 300); // Duración de la animación
        }
    }
</script>

<button 
    on:click={openCart}
    class:bump={isBumped}
    class="fixed bottom-8 right-8 z-40 bg-black text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group"
    aria-label="Abrir carrito"
>
    <div class="relative">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        
        {#if $cartCount > 0}
            <span 
                transition:scale={{ duration: 200, easing: cubicOut }}
                class="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black"
            >
                {$cartCount}
            </span>
        {/if}
    </div>
</button>

<style>
    /* Animación de "latido" o salto */
    .bump {
        animation: bump 300ms ease-out;
    }

    @keyframes bump {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
</style>