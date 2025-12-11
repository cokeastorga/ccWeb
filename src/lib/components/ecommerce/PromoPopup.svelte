<script lang="ts">
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    let isOpen = false;

    onMount(() => {
        // Verificamos si ya se mostró en esta sesión
        const hasSeenPromo = sessionStorage.getItem('cc-promo-seen');
        
        if (!hasSeenPromo) {
            // Pequeño delay para no abrumar al cargar la página
            setTimeout(() => {
                isOpen = true;
            }, 1500);
        }
    });

    function close() {
        isOpen = false;
        // Guardamos la "cookie" de sesión para no volver a mostrarlo
        sessionStorage.setItem('cc-promo-seen', 'true');
    }
</script>

{#if isOpen}
    <div 
        class="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        transition:fade={{ duration: 300 }}
        on:click|self={close}
    >
        <div 
            class="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative"
            transition:fly={{ y: 50, duration: 500, easing: cubicOut }}
        >
            <button 
                on:click={close}
                class="absolute top-4 right-4 z-20 bg-white/50 hover:bg-white text-black rounded-full p-2 transition-colors backdrop-blur-md"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            <div class="w-full md:w-1/1 h-64 md:h-auto relative bg-gray-100">
                <img 
                    src="/flayer_navi.jpg" 
                    alt="Promo Flyer"
                    class="absolute inset-0 w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:hidden">
                    <span class="text-white font-serif text-2xl">Soluciones Digitales</span>
                </div>
                
            </div>

            <div class="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center text-left">
                <span class="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">Plantilla Demo</span>
                
                <h2 class="text-3xl font-serif text-gray-900 mb-4 leading-tight">
                    Impulsa tu Pequeño Negocio
                </h2>
                
                <p class="text-gray-600 mb-6 leading-relaxed">
                    Esta tienda es una demostración de lo que podemos construir para ti. 
                    Diseñada específicamente para emprendedores que buscan **presencia digital profesional** sin la complejidad de grandes desarrollos.
                </p>

                <ul class="space-y-3 mb-8 text-sm text-gray-500">
                    <li class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        Catálogo autoadministrable
                    </li>
                    <li class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        Integración con WhatsApp y Pagos
                    </li>
                    <li class="flex items-center gap-2">
                        <svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                        Diseño optimizado para Móviles
                    </li>
                </ul>

                <div class="flex gap-3">
                    <button 
                        on:click={close}
                        class="flex-1 bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-transform active:scale-95"
                    >
                        Ver Demo
                    </button>
                    <a 
                        href="https://wa.me/..." 
                        target="_blank"
                        class="flex-1 border border-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:border-black hover:text-black transition-colors text-center"
                    >
                        Cotizar
                    </a>
                </div>
                
                <p class="text-[10px] text-gray-400 mt-6 text-center">
                    Developed by CokeAstorga © 2024
                </p>
            </div>
        </div>
    </div>
{/if}