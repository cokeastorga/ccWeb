<script lang="ts">
    import { page } from '$app/stores';
    import { fade, fly } from 'svelte/transition';
    import { products } from '$lib/data/products'; // Tus datos centrales
    import ProductCard from '$lib/components/ecommerce/ProductCard.svelte';
    import { addToCart } from '$lib/stores/cart';
    import { showToast, openCart } from '$lib/stores/ui';
    import type { Product } from '$lib/types'; // Asegúrate de importar la interfaz correcta

    // 1. Obtener la categoría activa de la URL
    $: activeCategory = $page.url.searchParams.get('cat') || 'all';

    // 2. Lógica de Filtrado "Senior" (Flexible)
    $: filteredProducts = products.filter(p => {
        const cat = activeCategory.toLowerCase();
        
        // Caso: Mostrar todo
        if (cat === 'all') return true;

        // Caso: Novedades (Busca por badge)
        if (cat === 'novedades') return p.badge === 'New';

        // Caso: Sillas (Busca por texto en el nombre O categoría exacta)
        if (cat === 'sillas') {
            return p.name.toLowerCase().includes('silla') || p.category === 'Mobiliario';
        }

        // Caso: Lámparas (Mapeo a categoría técnica 'Iluminación')
        if (cat === 'lamparas' || cat === 'iluminacion') {
            return p.category === 'Iluminación';
        }

        // Caso por defecto: Coincidencia exacta de categoría
        return p.category.toLowerCase() === cat;
    }).map(p => ({
        // 3. Adaptador de Tipos:
        // Convertimos 'ProductData' (con images[]) a 'Product' (con image string)
        // para que el componente ProductCard lo entienda.
        ...p,
        image: p.images[0] // Usamos la primera imagen como principal
    }));

    // Acción de añadir al carrito
    function handleAdd(product: any) {
        // Adaptamos el producto al formato del carrito si es necesario
        const cartItem = { ...product, image: product.images ? product.images[0] : product.image };
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
        
        <div class="text-center mb-16 pt-10 animate-in slide-in-from-bottom-4 duration-700">
            <span class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">Colección 2024</span>
            <h1 class="text-4xl md:text-5xl font-serif mb-6 capitalize text-gray-900">
                {activeCategory === 'all' ? 'Catálogo Completo' : activeCategory}
            </h1>
            <p class="text-gray-500 max-w-lg mx-auto leading-relaxed">
                {#if activeCategory === 'novedades'}
                    Descubre las últimas piezas que acaban de llegar a nuestro estudio. Diseño fresco y vanguardista.
                {:else if activeCategory === 'iluminacion' || activeCategory === 'lamparas'}
                    Luz cálida y escultural para transformar la atmósfera de cualquier espacio.
                {:else}
                    Explora nuestra selección curada de diseño minimalista, donde cada objeto cuenta una historia.
                {/if}
            </p>
        </div>

        <div class="flex justify-center flex-wrap gap-3 mb-18">
            {#each ['all', 'novedades', 'sillas', 'lamparas', 'decoración'] as filter}
                <a 
                    href="?cat={filter}"
                    class="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border 
                    {activeCategory === filter 
                        ? 'bg-black text-white border-black shadow-lg transform scale-105' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black'}"
                >
                    {filter === 'all' ? 'Ver Todo' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </a>
            {/each}
        </div>

        {#if filteredProducts.length > 0}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8">
                {#each filteredProducts as product, i (product.id)}
                    <div 
                        in:fly={{ y: 20, duration: 500, delay: i * 50 }} 
                        class="h-full"
                    >
                        <div class="group relative flex flex-col gap-4 cursor-pointer h-full">
                            <div class="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition-shadow hover:shadow-xl">
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                
                                {#if product.badge}
                                    <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider z-10 shadow-sm">
                                        {product.badge}
                                    </span>
                                {/if}

                                <button 
                                    on:click|stopPropagation={() => handleAdd(product)}
                                    class="absolute bottom-4 right-4 bg-white text-black p-4 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white z-20"
                                    aria-label="Añadir al carrito"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                                </button>
                            </div>

                            <div class="flex justify-between items-start px-1">
                                <div>
                                    <h3 class="font-medium text-lg text-gray-900 group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
                                    <p class="text-sm text-gray-500 mt-1">{product.category}</p>
                                </div>
                                <p class="font-serif text-lg font-medium text-gray-900">${product.price}</p>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="flex flex-col items-center justify-center py-32 text-center animate-in fade-in zoom-in duration-500">
                <div class="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-4xl">
                    🔍
                </div>
                <h3 class="text-2xl font-serif mb-2 text-gray-900">Sin resultados</h3>
                <p class="text-gray-500 max-w-md mb-8">
                    No encontramos productos en la categoría "{activeCategory}". Intenta con otra selección.
                </p>
                <a 
                    href="?cat=all" 
                    class="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-all"
                >
                    Volver al Catálogo
                </a>
            </div>
        {/if}
    </div>
</div>