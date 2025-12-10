<script lang="ts">
    import { addToCart } from '$lib/stores/cart';
    import { showToast, isCartOpen } from '$lib/stores/ui';
    import { fade } from 'svelte/transition';
    import type { PageData } from '../../../../ecommerce-v1/product/[id]/$types';

    export let data: PageData;
    // Reactividad: si cambia el ID en la URL, actualizamos 'product'
    $: product = data.product; 

    let activeImage = 0;

    function handleAdd() {
        // Mapeamos al formato que espera el carrito
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.images[0]
        });
        showToast('Producto añadido al carrito');
        isCartOpen.set(true); // Opcional: abrir carrito automáticamente al comprar
    }
</script>

<div class="pt-10 pb-20 max-w-7xl mx-auto px-6 animate-in fade-in duration-700">
    <div class="text-sm text-gray-500 mb-8 font-medium">
        <a href="/ecommerce-v2" class="hover:text-black">Home</a> / 
        <span class="text-black">{product.category}</span>
    </div>

    <div class="grid md:grid-cols-2 gap-12 lg:gap-20">
        <div class="space-y-4">
            <div class="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden relative">
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
                <div class="flex gap-4">
                    {#each product.images as img, i}
                        <button 
                            on:click={() => activeImage = i}
                            class="w-20 aspect-square rounded-lg overflow-hidden border-2 transition-all {activeImage === i ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}"
                        >
                            <img src={img} alt="" class="w-full h-full object-cover"/>
                        </button>
                    {/each}
                </div>
            {/if}
        </div>

        <div class="flex flex-col justify-center">
            <h1 class="text-4xl md:text-5xl font-serif text-gray-900 mb-4">{product.name}</h1>
            <p class="text-2xl font-medium text-gray-900 mb-8">${product.price}</p>
            
            <div class="prose prose-stone text-gray-600 mb-10">
                <p>{product.description}</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                    on:click={handleAdd}
                    class="flex-1 bg-black text-white py-4 px-8 rounded-full font-medium hover:bg-gray-800 transition-transform active:scale-95"
                >
                    Añadir al Carrito
                </button>
                <button class="p-4 rounded-full border border-gray-200 hover:border-black transition-colors" title="Guardar en favoritos">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </button>
            </div>

            <div class="border-t border-gray-200 divide-y divide-gray-200">
                <details class="group py-4 cursor-pointer">
                    <summary class="flex justify-between font-medium list-none">
                        Características
                        <span class="transition group-open:rotate-180">↓</span>
                    </summary>
                    <p class="text-sm text-gray-500 mt-2">Materiales premium, hecho a mano, garantía de 2 años.</p>
                </details>
                <details class="group py-4 cursor-pointer">
                    <summary class="flex justify-between font-medium list-none">
                        Envío y Devoluciones
                        <span class="transition group-open:rotate-180">↓</span>
                    </summary>
                    <p class="text-sm text-gray-500 mt-2">Envío gratuito en pedidos superiores a $200. Devoluciones en 30 días.</p>
                </details>
            </div>
        </div>
    </div>
</div>