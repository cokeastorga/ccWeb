<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    // Definición de la estructura de una Oferta
    export interface Offer {
        id: string;
        title: string;
        description: string;
        cta: string;       // Call to Action (texto del botón)
        link: string;
        image: string;
        bgColor: string;   // Color de fondo para variar (ej. bg-blue-600)
        textColor: string; // Color de texto (ej. text-white)
    }

    export let offers: Offer[] = [];
    export let interval = 5000; // 5 segundos por defecto

    let currentIndex = 0;
    let timer: ReturnType<typeof setInterval>;
    let paused = false;
    let direction = 1; // 1 para derecha, -1 para izquierda

    function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            if (!paused) next();
        }, interval);
    }

    function next() {
        direction = 1;
        currentIndex = (currentIndex + 1) % offers.length;
    }

    function prev() {
        direction = -1;
        currentIndex = (currentIndex - 1 + offers.length) % offers.length;
    }

    function goTo(index: number) {
        direction = index > currentIndex ? 1 : -1;
        currentIndex = index;
    }

    // Pausar al hacer hover para mejorar UX
    function handleMouseEnter() { paused = true; }
    function handleMouseLeave() { paused = false; }

    onMount(() => {
        startTimer();
        return () => clearInterval(timer);
    });
</script>

<div 
    class="relative w-full overflow-hidden rounded-2xl shadow-xl h-[400px] md:h-[500px]"
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    role="region"
    aria-label="Carrusel de ofertas"
>
    {#each offers as offer, i (offer.id)}
        {#if i === currentIndex}
            <div 
                class="absolute inset-0 w-full h-full flex flex-col md:flex-row {offer.bgColor} {offer.textColor}"
                in:fly={{ x: 300 * direction, duration: 600, easing: cubicOut }}
                out:fly={{ x: -300 * direction, duration: 600, opacity: 0 }}
            >
                <div class="flex-1 p-8 md:p-16 flex flex-col justify-center items-start z-10 relative">
                    <span class="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-widest mb-4 border border-white/10">
                        Oferta Limitada
                    </span>
                    <h2 class="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight">
                        {offer.title}
                    </h2>
                    <p class="text-lg opacity-90 mb-8 max-w-md leading-relaxed">
                        {offer.description}
                    </p>
                    <a 
                        href={offer.link}
                        class="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-opacity-90 transition-transform hover:scale-105 active:scale-95 shadow-lg"
                    >
                        {offer.cta}
                    </a>
                </div>

                <div class="flex-1 h-64 md:h-full relative overflow-hidden">
                    <img 
                        src={offer.image} 
                        alt={offer.title}
                        class="absolute inset-0 w-full h-full object-cover transition-transform duration-[10s] ease-linear hover:scale-110"
                        style="transform: scale({paused ? 1.05 : 1});"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 via-transparent to-transparent md:from-black/20"></div>
                </div>
            </div>
        {/if}
    {/each}

    <button 
        class="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all z-20 opacity-0 group-hover:opacity-100"
        on:click={prev}
        aria-label="Anterior"
    >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
    <button 
        class="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white transition-all z-20 opacity-0 group-hover:opacity-100"
        on:click={next}
        aria-label="Siguiente"
    >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
    </button>

    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {#each offers as _, i}
            <button
                class="w-2.5 h-2.5 rounded-full transition-all duration-300 {i === currentIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'}"
                on:click={() => goTo(i)}
                aria-label="Ir a oferta {i + 1}"
            ></button>
        {/each}
    </div>
</div>

<style>
    /* Asegura que el carrusel tenga profundidad */
    div[role="region"] {
        perspective: 1000px;
    }
</style>