<script lang="ts">
    import { page } from '$app/stores';
    import { fade, fly } from 'svelte/transition';
    import { addToCart } from '$lib/stores/cart';
    import { showToast, openCart } from '$lib/stores/ui';
    import { reveal } from '$lib/actions/reveal';
    
    // --- Datos y Componentes Reales ---
    import { products } from '$lib/data/products'; // Usamos la BDD completa, no mocks
    import type { Product } from '$lib/types';
    
    // Componentes UI
    import ProductCard from '$lib/components/ecommerce/ProductCard.svelte';
    import FilterSidebar from '$lib/components/ecommerce/FilterSidebar.svelte'; // Tu componente sidebar
    import QuickView from '$lib/components/ecommerce/QuickView.svelte';
    import Features from '$lib/components/ecommerce/Features.svelte';
    import OfferCarousel, { type Offer } from '$lib/components/ecommerce/OfferCarousel.svelte';
    import HeroMenu, { type Category } from '$lib/components/ecommerce/HeroMenu.svelte';
    import CategoryStories, { type CategoryStory } from '$lib/components/ecommerce/CategoryStories.svelte';

    // --- 1. CONFIGURACIÓN VISUAL (Datos de la Landing) ---
    const categoriesDisplay = [
        { name: 'Iluminación', img: 'https://i.pinimg.com/736x/57/3b/81/573b813935c105600e55b1cbeedc45c4.jpg' },
        { name: 'Mobiliario', img: 'https://www.lavoz.com.ar/resizer/qPe5c1Lmv0s9OdVkJXCEM_PSnh4=/980x640/smart/filters:quality(75):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/Y4SNUNB4C5DQHI3FGR25Y2LSGU.jpg' },
        { name: 'Objetos', img: 'https://tse3.mm.bing.net/th/id/OIP.g3Dz-MlT6sZb-rVoCfUGRAHaE7?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3' },
    ];

    const menuCategories: Category[] = [
        { id: 'bedroom', label: 'Dormitorio', href: '#shop', subcategories: [{ label: 'Ver Todo', href: '?cat=all' }] },
        { id: 'bath', label: 'Baño', href: '#shop', subcategories: [{ label: 'Toallas', href: '?cat=textiles' }] },
        { id: 'kitchen', label: 'Cocina', href: '#shop', subcategories: [{ label: 'Cerámica', href: '?cat=decor' }] },
        { id: 'sale', label: 'Ofertas', href: '?cat=sale', subcategories: [] }
    ];

    const storyCategories: CategoryStory[] = [
        { id: '1', name: 'Novedades', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300', href: '?cat=novedades' },
        { id: '2', name: 'Sillas', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=300', href: '?cat=sillas' },
        { id: '3', name: 'Iluminación', image: 'https://tse2.mm.bing.net/th/id/OIP.SkGdgA9y4K_CeKEQDxN3ogHaHo?w=300', href: '?cat=iluminacion' },
        { id: '4', name: 'Ofertas', image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=300', href: '?cat=sale' }
    ];

    const activeOffers: Offer[] = [
        {
            id: 'offer-1',
            title: 'Semana del Diseño',
            description: '50% OFF en iluminación.',
            cta: 'Ver Ofertas',
            link: '?cat=iluminacion',
            image: 'https://tse1.mm.bing.net/th/id/OIP.Sc2YRc5WxKIN_W9qFU8DmwHaE7?rs=1&pid=ImgDetMain',
            bgColor: 'bg-stone-900',
            textColor: 'text-white'
        }
    ];

    // --- 2. LÓGICA DE TIENDA (Filtros y Grid) ---
    
    // Estado de filtros
    let searchQuery = '';
    let sortOption = 'default';
    let isMobileFilterOpen = false;
    
    // Rango de precios
    const maxProductPrice = Math.max(...products.map(p => p.price));
    let minPrice = 0;
    let maxPrice = maxProductPrice;

    // Categoría activa desde URL
    $: activeCategory = $page.url.searchParams.get('cat') || 'all';

    // Algoritmo de filtrado
    $: filteredProducts = products
        .filter(p => {
            const cat = activeCategory.toLowerCase();
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            const inPriceRange = p.price >= minPrice && p.price <= maxPrice;

            if (!matchesSearch || !inPriceRange) return false;

            // Lógica de Categorías
            if (cat === 'all') return true;
            if (cat === 'sale' || cat === 'ofertas') return p.price < 100; // Ejemplo de lógica 'sale'
            if (cat === 'novedades') return p.badge === 'New';
            if (cat === 'sillas') return p.name.toLowerCase().includes('silla') || p.category === 'Mobiliario';
            if (cat === 'iluminacion') return p.category === 'Iluminación';
            
            return p.category.toLowerCase() === cat || cat.includes(p.category.toLowerCase());
        })
        .sort((a, b) => {
            if (sortOption === 'price-asc') return a.price - b.price;
            if (sortOption === 'price-desc') return b.price - a.price;
            if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
            return 0; 
        })
        .map(p => ({ ...p, image: p.images ? p.images[0] : p.image }));

    // --- 3. Lógica Auxiliar (Modal QuickView) ---
    let selectedProduct: Product | null = null;
    let isQuickViewOpen = false;

    function openQuickView(product: Product) {
        selectedProduct = product;
        isQuickViewOpen = true;
    }

    function handleCategoryChange(event: CustomEvent) {
        const newCat = event.detail;
        const url = new URL(window.location.href);
        url.searchParams.set('cat', newCat);
        window.history.pushState({}, '', url);
        activeCategory = newCat;
        isMobileFilterOpen = false;
        
        // Scroll suave hacia el grid al cambiar categoría
        document.getElementById('catalog-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
</script>

<svelte:head>
    <title>Tienda Oficial | AESTHETIC.CO</title>
</svelte:head>

<section class="relative h-[60vh] md:h-[70vh] w-full bg-gray-100 overflow-hidden flex items-end pb-12 px-6 md:px-12">
    <img 
        src="https://i.pinimg.com/originals/41/d2/55/41d255f5703c4f7af055c46d1a99e5ac.jpg" 
        alt="Hero Shop" 
        class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div> 
    
    <div class="relative z-10 max-w-4xl animate-in slide-in-from-bottom-10 duration-1000">
        <span class="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4 inline-block">Nueva Temporada</span>
        <h1 class="text-4xl md:text-6xl font-serif text-white mb-4 leading-tight">
            Colección {activeCategory === 'all' ? 'Otoño / Invierno' : activeCategory}
        </h1>
        <p class="text-gray-200 text-lg max-w-lg mb-6">Descubre piezas únicas diseñadas para transformar tus espacios con elegancia minimalista.</p>
    </div>
</section>

<HeroMenu categories={menuCategories} />
<CategoryStories categories={storyCategories} />

<div class="bg-black text-white py-3 overflow-hidden whitespace-nowrap border-b border-gray-800">
    <div class="inline-block animate-[marquee_20s_linear_infinite]">
        <span class="mx-8 text-xs uppercase tracking-widest">Envíos a todo Chile</span> • 
        <span class="mx-8 text-xs uppercase tracking-widest">3 cuotas sin interés</span> • 
        <span class="mx-8 text-xs uppercase tracking-widest">Garantía extendida</span>
    </div>
</div>

<div id="catalog-grid" class="min-h-screen bg-white py-12 px-4 md:px-8 max-w-[1600px] mx-auto">
    
    <div class="flex flex-col lg:flex-row gap-8 relative">
        
        <div class="hidden lg:block w-64 flex-shrink-0 sticky top-24 h-fit z-10">
            <FilterSidebar 
                {activeCategory}
                bind:minPrice 
                bind:maxPrice 
                priceRange={[0, maxProductPrice]}
                on:changeCategory={handleCategoryChange}
            />
        </div>

        {#if isMobileFilterOpen}
            <div 
                class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
                transition:fade
                on:click={() => isMobileFilterOpen = false}
            ></div>
            <div 
                class="fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs bg-white p-6 shadow-2xl lg:hidden"
                transition:fly={{ x: -300, duration: 300 }}
            >
                <FilterSidebar 
                    {activeCategory}
                    bind:minPrice 
                    bind:maxPrice 
                    priceRange={[0, maxProductPrice]}
                    on:changeCategory={handleCategoryChange}
                    on:close={() => isMobileFilterOpen = false}
                />
            </div>
        {/if}

        <div class="flex-1">
            
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div class="flex items-center gap-2">
                    <button 
                        class="lg:hidden px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 text-sm font-medium"
                        on:click={() => isMobileFilterOpen = true}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M7 12h10"/><path d="M10 18h4"/></svg>
                        Filtros
                    </button>
                    <span class="text-sm font-medium text-gray-500 hidden sm:block">Mostrando {filteredProducts.length} productos</span>
                </div>

                <div class="flex gap-3 w-full sm:w-auto">
                    <div class="relative flex-1 sm:w-64">
                        <input 
                            type="text" 
                            bind:value={searchQuery}
                            placeholder="Buscar en la tienda..." 
                            class="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 focus:border-black rounded-lg outline-none text-sm transition-all"
                        />
                        <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>

                    <select 
                        bind:value={sortOption}
                        class="px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none text-sm cursor-pointer hover:border-black transition-colors"
                    >
                        <option value="default">Relevancia</option>
                        <option value="price-asc">Precio: Menor a Mayor</option>
                        <option value="price-desc">Precio: Mayor a Menor</option>
                    </select>
                </div>
            </div>

            {#if filteredProducts.length > 0}
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6">
                    {#each filteredProducts as product, i (product.id)}
                        <div in:fly={{ y: 20, duration: 400, delay: (i % 8) * 50 }}>
                            <div class="relative group">
                                <ProductCard {product} />
                                <button 
                                    on:click|preventDefault|stopPropagation={() => openQuickView(product)}
                                    class="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:scale-110"
                                    title="Vista Rápida"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="py-32 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <div class="text-4xl mb-4 opacity-20">📦</div>
                    <p class="text-gray-900 font-medium mb-2">Sin resultados</p>
                    <p class="text-gray-500 mb-6 text-sm">Prueba ajustando los filtros o la búsqueda.</p>
                    <button 
                        on:click={() => { minPrice = 0; maxPrice = maxProductPrice; searchQuery = ''; activeCategory = 'all'; }}
                        class="text-black underline text-sm hover:text-gray-600"
                    >
                        Limpiar todo
                    </button>
                </div>
            {/if}

            {#if filteredProducts.length > 0}
                <div class="mt-16 flex justify-center">
                    <button class="px-8 py-3 border border-gray-200 text-gray-600 rounded-full hover:border-black hover:text-black transition-colors text-sm font-medium">
                        Cargar más productos
                    </button>
                </div>
            {/if}
        </div>
    </div>
</div>

<section class="py-12 bg-gray-50 border-t border-gray-200">
    <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-2xl font-serif mb-8">Ofertas Relámpago</h2>
        <OfferCarousel offers={activeOffers} />
    </div>
</section>



<div class="bg-black text-white py-3 overflow-hidden whitespace-nowrap border-b border-gray-800">
    <div class="inline-block animate-[marquee_20s_linear_infinite]">
        <span class="mx-8 text-xs uppercase tracking-widest">Envíos a todo Chile</span> • 
        <span class="mx-8 text-xs uppercase tracking-widest">3 cuotas sin interés</span> • 
        <span class="mx-8 text-xs uppercase tracking-widest">Garantía extendida</span>
    </div>
</div>

<div id="catalog-grid" class="min-h-screen bg-white py-12 px-4 md:px-8 max-w-[1600px] mx-auto">
    
    <div class="flex flex-col lg:flex-row gap-8 relative">
        
        <div class="hidden lg:block w-64 flex-shrink-0 sticky top-24 h-fit z-10">
            <FilterSidebar 
                {activeCategory}
                bind:minPrice 
                bind:maxPrice 
                priceRange={[0, maxProductPrice]}
                on:changeCategory={handleCategoryChange}
            />
        </div>

        {#if isMobileFilterOpen}
            <div 
                class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
                transition:fade
                on:click={() => isMobileFilterOpen = false}
            ></div>
            <div 
                class="fixed inset-y-0 left-0 z-50 w-4/5 max-w-xs bg-white p-6 shadow-2xl lg:hidden"
                transition:fly={{ x: -300, duration: 300 }}
            >
                <FilterSidebar 
                    {activeCategory}
                    bind:minPrice 
                    bind:maxPrice 
                    priceRange={[0, maxProductPrice]}
                    on:changeCategory={handleCategoryChange}
                    on:close={() => isMobileFilterOpen = false}
                />
            </div>
        {/if}

        <div class="flex-1">
            
            <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                <div class="flex items-center gap-2">
                    <button 
                        class="lg:hidden px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 text-sm font-medium"
                        on:click={() => isMobileFilterOpen = true}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M7 12h10"/><path d="M10 18h4"/></svg>
                        Filtros
                    </button>
                    <span class="text-sm font-medium text-gray-500 hidden sm:block">Mostrando {filteredProducts.length} productos</span>
                </div>

                <div class="flex gap-3 w-full sm:w-auto">
                    <div class="relative flex-1 sm:w-64">
                        <input 
                            type="text" 
                            bind:value={searchQuery}
                            placeholder="Buscar en la tienda..." 
                            class="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 focus:border-black rounded-lg outline-none text-sm transition-all"
                        />
                        <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </div>

                    <select 
                        bind:value={sortOption}
                        class="px-3 py-2 bg-white border border-gray-200 rounded-lg outline-none text-sm cursor-pointer hover:border-black transition-colors"
                    >
                        <option value="default">Relevancia</option>
                        <option value="price-asc">Precio: Menor a Mayor</option>
                        <option value="price-desc">Precio: Mayor a Menor</option>
                    </select>
                </div>
            </div>

            {#if filteredProducts.length > 0}
                <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-6">
                    {#each filteredProducts as product, i (product.id)}
                        <div in:fly={{ y: 20, duration: 400, delay: (i % 8) * 50 }}>
                            <div class="relative group">
                                <ProductCard {product} />
                                <button 
                                    on:click|preventDefault|stopPropagation={() => openQuickView(product)}
                                    class="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:scale-110"
                                    title="Vista Rápida"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else}
                <div class="py-32 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <div class="text-4xl mb-4 opacity-20">📦</div>
                    <p class="text-gray-900 font-medium mb-2">Sin resultados</p>
                    <p class="text-gray-500 mb-6 text-sm">Prueba ajustando los filtros o la búsqueda.</p>
                    <button 
                        on:click={() => { minPrice = 0; maxPrice = maxProductPrice; searchQuery = ''; activeCategory = 'all'; }}
                        class="text-black underline text-sm hover:text-gray-600"
                    >
                        Limpiar todo
                    </button>
                </div>
            {/if}

            {#if filteredProducts.length > 0}
                <div class="mt-16 flex justify-center">
                    <button class="px-8 py-3 border border-gray-200 text-gray-600 rounded-full hover:border-black hover:text-black transition-colors text-sm font-medium">
                        Cargar más productos
                    </button>
                </div>
            {/if}
        </div>
    </div>
</div>

<Features />

<section class="bg-black text-white py-24 px-6 text-center">
    <div class="max-w-xl mx-auto">
        <h2 class="text-3xl font-serif mb-4">Únete al club AESTHETIC</h2>
        <p class="text-gray-400 mb-8">Recibe acceso anticipado a nuevas colecciones y descuentos exclusivos.</p>
        <form class="flex gap-2 max-w-sm mx-auto">
            <input 
                type="email" 
                placeholder="jor.astorga@ccsolution.cl" 
                class="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:border-white transition-colors placeholder:text-gray-500 text-white"
            />
            <button class="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                →
            </button>
        </form>
    </div>
</section>

<QuickView 
    isOpen={isQuickViewOpen} 
    product={selectedProduct} 
    on:close={() => isQuickViewOpen = false} 
/>

<style>
    @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
</style>