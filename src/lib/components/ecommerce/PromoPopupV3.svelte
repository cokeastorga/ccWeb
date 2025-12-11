<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    let isOpen = false;

    onMount(() => {
        // Usamos una "key" diferente para que este popup salga aunque hayan cerrado el otro
        const hasSeenPromoV3 = sessionStorage.getItem('cc-promo-v3-seen');
        
        if (!hasSeenPromoV3) {
            setTimeout(() => {
                isOpen = true;
            }, 2000); // Aparece a los 2 segundos
        }
    });

    function close() {
        isOpen = false;
        sessionStorage.setItem('cc-promo-v3-seen', 'true');
    }
</script>

{#if isOpen}
    <div 
        class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        transition:fade={{ duration: 300 }}
        on:click|self={close}
    >
        <div 
            class="bg-white w-full max-w-sm md:max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
            transition:fly={{ y: 50, duration: 500, easing: cubicOut }}
        >
            <button 
                on:click={close}
                class="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-black rounded-full p-2 transition-colors backdrop-blur-md"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            <div class="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
                <img 
                    src="/flayer_navi2.jpg" 
                    alt="Oferta Navidad Enterprise"
                    class="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            <div class="w-full md:w-1/2 p-8 flex flex-col justify-center text-left">
                <span class="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2">Oferta Limitada</span>
                
                <h2 class="text-3xl font-serif text-gray-900 mb-2 leading-tight">
                    Pack Enterprise <br/> Navidad
                </h2>
                
                <div class="my-6">
                    <p class="text-gray-500 text-sm mb-1">Precio Normal: <span class="line-through">$450.000</span></p>
                    <div class="flex items-baseline gap-2">
                        <span class="text-4xl font-bold text-gray-900">$289.000</span>
                        <span class="text-sm text-gray-500">+ IVA</span>
                    </div>
                    <p class="text-amber-600 font-medium text-sm mt-1">+ $15.000 mensual (Soporte VIP)</p>
                </div>

                <p class="text-gray-600 text-sm mb-8 leading-relaxed">
                    Obtén la plantilla avanzada con filtros laterales, búsqueda inteligente y diseño 'Falabella Style'. Ideal para catálogos grandes.
                </p>

                <div class="flex gap-3">
                    <button 
                        on:click={close}
                        class="flex-1 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-transform active:scale-95"
                    >
                        Lo quiero
                    </button>
                    <button 
                        on:click={close}
                        class="flex-1 border border-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:border-black hover:text-black transition-colors"
                    >
                        Ver Demo
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}