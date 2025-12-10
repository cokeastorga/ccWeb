<script lang="ts">
    import type { Product } from '$lib/stores/cart'; // Asegúrate de importar la interfaz correcta
    import { addToCart } from '$lib/stores/cart';
    import { showToast, isCartOpen } from '$lib/stores/ui';

    export let product: Product;

    function handleQuickAdd(e: MouseEvent) {
        // Detener propagación para evitar navegar al detalle del producto si haces click en el botón
        e.stopPropagation(); 
        
        addToCart(product);
        showToast(`Agregado: ${product.name}`);
        isCartOpen.set(true); // Feedback inmediato abriendo el carrito
    }
</script>

<a href="/ecommerce-v2/product/{product.id}" class="group relative flex flex-col gap-3 cursor-pointer block">
    <div class="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-100">
        {#if product.badge}
            <span class="absolute top-3 left-3 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider z-10 shadow-sm">
                {product.badge}
            </span>
        {/if}
        
        <img 
            src={product.image} 
            alt={product.name}
            class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
        />
        
        <div class="absolute inset-x-0 bottom-4 flex justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            <button 
                on:click|preventDefault={handleQuickAdd}
                class="bg-white/90 backdrop-blur-md text-black px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-black hover:text-white transition-colors flex items-center gap-2"
            >
                <span>+ Agregar</span>
            </button>
        </div>
    </div>

    <div class="flex justify-between items-start px-1">
        <div>
            <h3 class="text-sm font-medium text-gray-900 group-hover:underline decoration-1 underline-offset-4">{product.name}</h3>
            <p class="text-xs text-gray-500 mt-1">{product.category}</p>
        </div>
        <p class="text-sm font-semibold text-gray-900">${product.price}</p>
    </div>
</a>