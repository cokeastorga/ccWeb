<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    let isOpen = false;

    onMount(() => {
        // Key única para no mezclar con las otras promos
        const hasSeenPromo = sessionStorage.getItem('cc-promo-landing-seen');
        
        if (!hasSeenPromo) {
            setTimeout(() => {
                isOpen = true;
            }, 1500); // Aparece rápido (1.5s)
        }
    });

    function close() {
        isOpen = false;
        sessionStorage.setItem('cc-promo-landing-seen', 'true');
    }
</script>

{#if isOpen}
    <div 
        class="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        transition:fade={{ duration: 300 }}
        on:click|self={close}
    >
        <div 
            class="bg-white w-full max-w-sm md:max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
            transition:fly={{ y: 50, duration: 500, easing: cubicOut }}
        >
            <button 
                on:click={close}
                class="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-black rounded-full p-2 transition-colors backdrop-blur-md shadow-sm"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            <div class="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
                <img 
                    src="/promo-landing.jpg" 
                    alt="Oferta Landing Page"
                    class="absolute inset-0 w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden"></div>
            </div>

            <div class="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center text-left bg-white">
                <span class="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 w-fit">
                    Solo por Diciembre
                </span>
                
                <h2 class="text-3xl font-bold text-gray-900 mb-2 leading-tight font-serif">
                    Tu Empresa Online <br/> <span class="text-blue-600">Profesional</span>
                </h2>
                
                <div class="my-6 border-l-4 border-blue-600 pl-4 py-1">
                    <p class="text-gray-400 text-xs mb-1 line-through">Precio Normal: $350.000</p>
                    <div class="flex items-baseline gap-2">
                        <span class="text-4xl font-extrabold text-gray-900">$120.000</span>
                    </div>
                    <p class="text-gray-500 font-medium text-sm mt-1">+ $10.000 mensual (Hosting)</p>
                </div>

                <ul class="space-y-2 mb-8 text-sm text-gray-600">
                    <li class="flex items-center gap-2">
                        <span class="text-green-500">✓</span> Diseño One-Page Corporativo
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="text-green-500">✓</span> Formulario & WhatsApp Integrado
                    </li>
                    <li class="flex items-center gap-2">
                        <span class="text-green-500">✓</span> Entrega en 48 Horas
                    </li>
                </ul>

                <div class="flex flex-col gap-3">
                    <button 
                        on:click={close}
                        class="w-full bg-blue-600 text-white py-3.5 px-6 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
                    >
                        Reservar Oferta
                    </button>
                    <button 
                        on:click={close}
                        class="w-full text-gray-500 py-2 text-sm font-medium hover:text-gray-800 transition-colors"
                    >
                        No, gracias. Prefiero pagar precio normal.
                    </button>
                </div>
            </div>
        </div>
    </div>
{/if}
