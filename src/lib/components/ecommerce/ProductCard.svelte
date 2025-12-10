<script lang="ts">
    import type { Product } from '$lib/types';
    import { fade } from 'svelte/transition';

    export let product: Product;
</script>

<div class="group relative flex flex-col gap-3 cursor-pointer">
    <div class="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100">
        <img 
            src={product.image} 
            alt={product.name}
            class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
        />
        
        <div class="absolute inset-x-0 bottom-4 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button class="bg-white/90 backdrop-blur-md text-black px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-black hover:text-white transition-colors">
                Añadir al Carrito
            </button>
        </div>
    </div>

    <div class="flex justify-between items-start px-1">
        <div>
            <h3 class="text-sm font-medium text-gray-900">{product.name}</h3>
            <p class="text-xs text-gray-500 mt-1">{product.category}</p>
        </div>
        <p class="text-sm font-semibold text-gray-900">${product.price}</p>
    </div>
</div>