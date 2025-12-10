<script lang="ts">
    import { page } from '$app/stores';
    import { fade, fly } from 'svelte/transition';
    import { products } from '$lib/data/products';
    import ProductCard from '$lib/components/ecommerce/ProductCard.svelte';
    import { addToCart } from '$lib/stores/cart';
    import { showToast, openCart } from '$lib/stores/ui';
    import type { Product } from '$lib/types';

    // Estado Local
    let searchQuery = '';
    let sortOption = 'default'; // 'default', 'price-asc', 'price-desc', 'name-asc'

    // 1. Obtener la categoría activa de la URL
    $: activeCategory = $page.url.searchParams.get('cat') || 'all';

    // 2. Lógica de Filtrado y Búsqueda Combinada
    $: filteredProducts = products
        .filter(p => {
            const cat = activeCategory.toLowerCase();
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            
            // Si la búsqueda no coincide, descartamos inmediatamente
            if (!matchesSearch) return false;

            // Filtros de Categoría
            if (cat === 'all') return true;
            if (cat === 'novedades') return p.badge === 'New';
            if (cat === 'sillas') return p.name.toLowerCase().includes('silla') || p.category === 'Mobiliario';
            if (cat === 'lamparas' || cat === 'iluminacion') return p.category === 'Iluminación';
            
            return p.category.toLowerCase() === cat;
        })
        .sort((a, b) => {
            // Lógica de Ordenamiento
            if (sortOption === 'price-asc') return a.price - b.price;
            if (sortOption === 'price-desc') return b.price - a.price;
            if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
            return 0; // Default
        })
        .map(p => ({
            ...p,
            image: p.images ? p.images[0] : p.image // Adaptador de imagen seguro
        }));

    // Acción de añadir al carrito
    function handleAdd(product: any) {
        // Aseguramos formato correcto para el carrito
        const cartItem = { 
            ...product, 
            image: product.image 
        };
        addToCart(cartItem);
        showToast(`Agregado: ${product.name}`);
        openCart();
    }
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
                {#if activeCategory === 'novedades'}
                    Descubre las últimas piezas que acaban de llegar a nuestro estudio.
                {:else}
                    Explora nuestra selección curada de diseño minimalista.
                {/if}
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
                        <div class="group relative flex flex-col gap-4 cursor-pointer h-full">
                            <div class="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-lg">
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                
                                {#if product.badge}
                                    <span class="absolute top-3 left-3 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider z-10">
                                        {product.badge}
                                    </span>
                                {/if}

                                <button 
                                    on:click|stopPropagation={() => handleAdd(product)}
                                    class="absolute bottom-3 right-3 bg-white text-black p-3 rounded-full shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white hover:scale-110 z-20"
                                    aria-label="Añadir al carrito"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                </button>
                            </div>

                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="font-medium text-gray-900 group-hover:underline underline-offset-4 decoration-1">{product.name}</h3>
                                    <p class="text-xs text-gray-500 mt-1 uppercase tracking-wide">{product.category}</p>
                                </div>
                                <p class="font-medium text-gray-900">${product.price}</p>
                            </div>
                        </div>
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