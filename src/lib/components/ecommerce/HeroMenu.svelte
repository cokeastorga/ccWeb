<script lang="ts">
    import { slide, fade } from 'svelte/transition';
    
    // Definimos la estructura de datos para que sea estricta y reutilizable
    export interface SubCategory {
        label: string;
        href: string;
    }

    export interface Category {
        id: string;
        label: string;
        href?: string;
        subcategories?: SubCategory[];
    }

    export let categories: Category[] = [];
    
    // Estado para saber qué menú está abierto
    let activeCategory: string | null = null;
    let timeoutId: any;

    function handleMouseEnter(id: string) {
        if (timeoutId) clearTimeout(timeoutId);
        activeCategory = id;
    }

    function handleMouseLeave() {
        // Un pequeño retraso para que no se cierre bruscamente si el mouse se mueve rápido
        timeoutId = setTimeout(() => {
            activeCategory = null;
        }, 100);
    }
</script>

<div 
    class="relative bg-black text-white border-b border-gray-800 z-30"
    on:mouseleave={handleMouseLeave}
    role="menubar"
>
    <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between md:justify-center overflow-x-auto no-scrollbar py-4 gap-8 md:gap-12">
            
            {#each categories as cat}
                <div 
                    class="relative group"
                    on:mouseenter={() => handleMouseEnter(cat.id)}
                >
                    <a 
                        href={cat.href || '#'} 
                        class="text-sm uppercase tracking-widest font-medium hover:text-gray-300 transition-colors whitespace-nowrap flex items-center gap-1 py-2"
                        aria-haspopup={!!cat.subcategories}
                        aria-expanded={activeCategory === cat.id}
                    >
                        {cat.label}
                        {#if cat.subcategories}
                            <svg class="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        {/if}
                    </a>

                    {#if activeCategory === cat.id}
                        <div class="absolute bottom-0 left-0 w-full h-0.5 bg-white" transition:fade={{ duration: 200 }}></div>
                    {/if}
                </div>
            {/each}

        </div>
    </div>

    {#if activeCategory}
        {@const activeCat = categories.find(c => c.id === activeCategory)}
        {#if activeCat?.subcategories?.length}
            <div 
                class="absolute left-0 top-full w-full bg-white text-gray-900 shadow-xl border-b border-gray-100 z-40"
                transition:slide={{ duration: 300, axis: 'y' }}
                on:mouseenter={() => handleMouseEnter(activeCat.id)} 
            >
                <div class="max-w-7xl mx-auto px-6 py-8">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 animate-in fade-in slide-in-from-top-2 duration-300">
                        
                        <div class="col-span-1 border-r border-gray-100 pr-8">
                            <h3 class="font-serif text-2xl mb-4">{activeCat.label}</h3>
                            <a href={activeCat.href} class="text-sm underline hover:text-gray-600">Ver todo en {activeCat.label} →</a>
                        </div>

                        <div class="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6">
                            {#each activeCat.subcategories as sub}
                                <a 
                                    href={sub.href} 
                                    class="group flex flex-col gap-1 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                >
                                    <span class="font-medium group-hover:text-black text-gray-700">{sub.label}</span>
                                    <span class="text-xs text-gray-400">Explorar colección</span>
                                </a>
                            {/each}
                        </div>

                    </div>
                </div>
            </div>
        {/if}
    {/if}
</div>

<style>
    /* Ocultar scrollbar en móvil pero permitir scroll */
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>