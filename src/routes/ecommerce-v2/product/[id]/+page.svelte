<script lang="ts">
    import { addToCart } from '$lib/stores/cart';
    import { showToast, isCartOpen } from '$lib/stores/ui';
    import { toggleWishlist, wishlist } from '$lib/stores/wishlist';
    import { fade } from 'svelte/transition';
    import type { PageData } from './$types';

    export let data: PageData;

    // Reactividad: Actualiza 'product' si cambia la navegación
    $: product = data.product;

    // Reactividad: Verifica si el producto actual está en la wishlist
    $: isFavorite = $wishlist.some(item => item.id === product.id);

    let activeImage = 0;

    function handleAdd() {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.images[0] // Usamos la primera imagen para la miniatura del carrito
        });
        showToast('Producto añadido al carrito');
        isCartOpen.set(true); // Feedback inmediato: abrimos el carrito
    }
</script>

<svelte:head>
    <title>{product.name} | AESTHETIC.CO</title>
    <meta name="description" content={product.description} />
    <meta property="og:type" content="product" />
    <meta property="og:title" content={product.name} />
    <meta property="og:description" content={product.description} />
    <meta property="og:image" content={product.images[0]} />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="pt-10 pb-20 max-w-7xl mx-auto px-6 animate-in fade-in duration-700">
    <div class="text-sm text-gray-500 mb-8 font-medium">
        <a href="/ecommerce-v2" class="hover:text-black transition-colors">Home</a> / 
        <span class="text-black">{product.category}</span>
    </div>

    <div class="grid md:grid-cols-2 gap-12 lg:gap-20">
        
        <div class="space-y-4">
            <div class="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden relative shadow-sm">
                {#key activeImage}
                    <img 
                        src={product.images[activeImage]} 
                        alt={product.name}
                        transition:fade={{ duration: 300 }}
                        class="absolute inset-0 w-full h-full object-cover"
                    />
                {/key}
            </div>

            {#if product.images.length > 1}
                <div class="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {#each product.images as img, i}
                        <button 
                            on:click={() => activeImage = i}
                            class="w-20 aspect-square rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 {activeImage === i ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}"
                            aria-label="Ver imagen {i + 1}"
                        >
                            <img src={img} alt="" class="w-full h-full object-cover"/>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        <div class="flex flex-col justify-center">
            <h1 class="text-4xl md:text-5xl font-serif text-gray-900 mb-4 tracking-tight">{product.name}</h1>
            <p class="text-2xl font-medium text-gray-900 mb-8">${product.price}</p>
            
            <div class="prose prose-stone text-gray-600 mb-10 leading-relaxed">
                <p>{product.description}</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                    on:click={handleAdd}
                    class="flex-1 bg-black text-white py-4 px-8 rounded-full font-medium hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
                >
                    Añadir al Carrito
                </button>
                
                <button 
                    on:click={() => toggleWishlist({ ...product, image: product.images[0] })}
                    class="p-4 rounded-full border transition-all duration-300 active:scale-90 {isFavorite ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 hover:border-black text-gray-400 hover:text-black'}"
                    title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
                    aria-label="Toggle favoritos"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </button>
            </div>

            <div class="border-t border-gray-200 divide-y divide-gray-200">
                <details class="group py-4 cursor-pointer">
                    <summary class="flex justify-between font-medium list-none items-center text-gray-900">
                        Características
                        <span class="transition-transform duration-300 group-open:rotate-180 text-gray-400">↓</span>
                    </summary>
                    <div class="text-sm text-gray-500 mt-2 animate-in slide-in-from-top-2 duration-200">
                        <p>Materiales premium, hecho a mano, garantía de 2 años. Diseño exclusivo de nuestra colección 2024.</p>
                    </div>
                </details>
                
                <details class="group py-4 cursor-pointer">
                    <summary class="flex justify-between font-medium list-none items-center text-gray-900">
                        Envío y Devoluciones
                        <span class="transition-transform duration-300 group-open:rotate-180 text-gray-400">↓</span>
                    </summary>
                    <div class="text-sm text-gray-500 mt-2 animate-in slide-in-from-top-2 duration-200">
                        <p>Envío gratuito en pedidos superiores a $200. Devoluciones sin preguntas dentro de los primeros 30 días.</p>
                    </div>
                </details>
            </div>
        </div>
    </div>
</div>