<script lang="ts">
    import { slide } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';

    // Props que vienen del padre (estado actual)
    export let activeCategory: string;
    export let minPrice: number;
    export let maxPrice: number;
    export let priceRange: [number, number]; // [0, 1000] (Rango global)

    const dispatch = createEventDispatcher();
    
    // Categorías Hardcoded (en un sistema real vendrían de una API)
    const categories = [
        { id: 'all', label: 'Todo el Catálogo' },
        { id: 'Mobiliario', label: 'Muebles' },
        { id: 'Iluminación', label: 'Iluminación' },
        { id: 'Decor', label: 'Decoración' },
        { id: 'Sillas', label: 'Sillas & Asientos' } // Subcategoría virtual
    ];

    function updateCategory(cat: string) {
        dispatch('changeCategory', cat);
    }
</script>

<aside class="w-full h-full bg-white md:pr-6 flex flex-col gap-6 overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar">
    
    <div class="md:hidden flex justify-between items-center pb-4 border-b border-gray-100">
        <h3 class="font-serif text-xl">Filtros</h3>
        <button on:click={() => dispatch('close')} class="text-sm underline">Cerrar</button>
    </div>

    <div class="border-b border-gray-100 pb-6">
        <h4 class="font-bold text-sm uppercase tracking-wide mb-4">Departamentos</h4>
        <ul class="space-y-3 text-sm text-gray-600">
            {#each categories as cat}
                <li class="flex items-center gap-2">
                    <button 
                        on:click={() => updateCategory(cat.id)}
                        class="hover:text-black hover:underline transition-colors text-left w-full
                        {activeCategory === cat.id ? 'font-bold text-black' : ''}"
                    >
                        {cat.label}
                    </button>
                </li>
            {/each}
        </ul>
    </div>

    <div class="border-b border-gray-100 pb-6">
        <details open class="group">
            <summary class="font-bold text-sm uppercase tracking-wide mb-4 list-none flex justify-between cursor-pointer">
                Precio
                <span class="rotate-0 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            
            <div class="space-y-4 pt-2">
                <div class="flex gap-4 items-center">
                    <div class="relative">
                        <span class="absolute left-3 top-2 text-gray-400 text-xs">$</span>
                        <input 
                            type="number" 
                            bind:value={minPrice} 
                            min={priceRange[0]}
                            class="w-full bg-gray-50 border rounded p-2 pl-6 text-sm outline-none focus:border-black"
                            placeholder="Min"
                        />
                    </div>
                    <span class="text-gray-400">-</span>
                    <div class="relative">
                        <span class="absolute left-3 top-2 text-gray-400 text-xs">$</span>
                        <input 
                            type="number" 
                            bind:value={maxPrice} 
                            max={priceRange[1]}
                            class="w-full bg-gray-50 border rounded p-2 pl-6 text-sm outline-none focus:border-black"
                            placeholder="Max"
                        />
                    </div>
                </div>
                <input 
                    type="range" 
                    min={priceRange[0]} 
                    max={priceRange[1]} 
                    bind:value={maxPrice}
                    class="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
            </div>
        </details>
    </div>

    <div class="pb-6">
        <details open class="group">
            <summary class="font-bold text-sm uppercase tracking-wide mb-4 list-none flex justify-between cursor-pointer">
                Estado
                <span class="rotate-0 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div class="space-y-3 pt-2 text-sm text-gray-600">
                <label class="flex items-center gap-3 cursor-pointer hover:text-black">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300 accent-black focus:ring-black"/>
                    <span>Solo Ofertas</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer hover:text-black">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300 accent-black focus:ring-black"/>
                    <span>Nuevos Lanzamientos</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer hover:text-black">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300 accent-black focus:ring-black" checked/>
                    <span>Entrega Inmediata</span>
                </label>
            </div>
        </details>
    </div>
</aside>

<style>
    /* Ocultar flecha por defecto de details */
    details > summary { list-style: none; }
    details > summary::-webkit-details-marker { display: none; }
    
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
</style>