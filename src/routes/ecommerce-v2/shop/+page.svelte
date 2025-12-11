<script lang="ts">
    import { page } from '$app/stores';
    import { fade, fly } from 'svelte/transition';
    import { products } from '$lib/data/products';
    import ProductCard from '$lib/components/ecommerce/ProductCard.svelte'; // ✅ Importamos el componente
    import { showToast, openCart } from '$lib/stores/ui'; // Mantenemos por si usas lógica extra aquí

    // Estado Local
    let searchQuery = '';
    let sortOption = 'default';

    // 1. Obtener la categoría activa de la URL
    $: activeCategory = $page.url.searchParams.get('cat') || 'all';

    // 2. Lógica de Filtrado y Búsqueda
    $: filteredProducts = products
        .filter(p => {
            const cat = activeCategory.toLowerCase();
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (!matchesSearch) return false;

            if (cat === 'all') return true;
            if (cat === 'novedades') return p.badge === 'New';
            if (cat === 'sillas') return p.name.toLowerCase().includes('silla') || p.category === 'Mobiliario';
            if (cat === 'lamparas' || cat === 'iluminacion') return p.category === 'Iluminación';
            
            return p.category.toLowerCase() === cat;
        })
        .sort((a, b) => {
            if (sortOption === 'price-asc') return a.price - b.price;
            if (sortOption === 'price-desc') return b.price - a.price;
            if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
            return 0; 
        })
        .map(p => ({
            ...p,
            image: p.images ? p.images[0] : p.image // Adaptador de imagen seguro
        }));
</script>

<svelte:head>
    <title>Tienda | AESTHETIC.CO</title>
</svelte:head>

<div class="min-h-screen bg-white pt-8 pb-24 px-6">
    <div class="max-w-7xl mx-auto">
        
        <div class="text-center mb-12 pt-10 animate-in slide-in-from-bottom-4 duration-700">
            <span class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Colección 2024</span>
            <h1 class="text-4xl md:text-5xl font-serif mb-6 capitalize text-gray-900">
                {activeCategory === 'all' ? 'Catálogo Completo' : activeCategory}
            </h1>
            <p class="text-gray-500 max-w-lg mx-auto leading-relaxed">
                Explore nuestra selección curada de diseño minimalista.
            </p>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 border-b border-gray-100 pb-8 sticky top-20 bg-white/95 backdrop-blur-sm z-30 py-4">
            <div class="flex flex-wrap justify-center gap-2">
                {#each ['all', 'novedades', 'sillas', 'lamparas', 'decoración'] as filter}
                    <a 
                        href="?cat={filter}"
                        on:click={() => searchQuery = ''} 
                        class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all border 
                        {activeCategory === filter 
                            ? 'bg-black text-white border-black' 
                            : 'bg-gray-50 text-gray-500 border-transparent hover:border-gray-300 hover:text-black'}"
                    >
                        {filter === 'all' ? 'Todo' : filter}
                    </a>
                {/each}
            </div>

            <div class="flex gap-4 w-full md:w-auto">
                <div class="relative flex-1 md:w-64">
                    <input 
                        type="text" 
                        bind:value={searchQuery}
                        placeholder="Buscar productos..." 
                        class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-lg outline-none transition-all text-sm"
                    />
                    <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                </div>

                <select 
                    bind:value={sortOption}
                    class="px-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-black rounded-lg outline-none text-sm cursor-pointer"
                >
                    <option value="default">Relevancia</option>
                    <option value="price-asc">Precio: Bajo a Alto</option>
                    <option value="price-desc">Precio: Alto a Bajo</option>
                    <option value="name-asc">Nombre (A-Z)</option>
                </select>
            </div>
        </div>

        <div class="mb-8 text-sm text-gray-500 font-medium">
            Mostrando {filteredProducts.length} productos
        </div>

        {#if filteredProducts.length > 0}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
                {#each filteredProducts as product, i (product.id)}
                    <div 
                        in:fly={{ y: 20, duration: 500, delay: (i % 10) * 50 }} 
                        class="h-full"
                    >
                        <ProductCard {product} />
                    </div>
                {/each}
            </div>
        {:else}
            <div class="py-32 text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 text-2xl">🕵️</div>
                <h3 class="text-xl font-medium text-gray-900 mb-2">No encontramos coincidencias</h3>
                <p class="text-gray-500 mb-6">Intenta ajustar tu búsqueda o los filtros.</p>
                <button 
                    on:click={() => { searchQuery = ''; activeCategory = 'all'; }}
                    class="text-black underline underline-offset-4 hover:text-gray-600"
                >
                    Limpiar todos los filtros
                </button>
            </div>
        {/if}
    </div>
</div>