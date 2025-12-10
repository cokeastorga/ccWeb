<script lang="ts">
    import { addToCart } from '$lib/stores/cart';
    import { showToast } from '$lib/stores/ui';
    import type { Product } from '$lib/stores/cart';

    // Datos Mock (Imagina que vienen de una API)
    const featuredProducts: Product[] = [
        { id: '1', name: 'Lámpara Akari', price: 120, category: 'Lighting', image: 'https://images.unsplash.com/photo-1513506003013-953a45bf4817?auto=format&fit=crop&w=800', badge: 'New' },
        { id: '2', name: 'Silla Eames', price: 350, category: 'Furniture', image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800' },
        { id: '3', name: 'Cerámica Raw', price: 45, category: 'Decor', image: 'https://images.unsplash.com/photo-1578749556935-ef88814b29c3?auto=format&fit=crop&w=800' },
        { id: '4', name: 'Mesa de Café', price: 290, category: 'Furniture', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800' },
    ];

    const categories = [
        { name: 'Iluminación', img: 'https://images.unsplash.com/photo-1507473888900-52e1adad5462?auto=format&fit=crop&w=600' },
        { name: 'Mobiliario', img: 'https://images.unsplash.com/photo-1538688536322-a27b7de78e90?auto=format&fit=crop&w=600' },
        { name: 'Objetos', img: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600' },
    ];

    function handleAdd(product: Product) {
        addToCart(product);
        showToast(`Agregado: ${product.name}`);
    }
</script>

<section class="relative h-[80vh] w-full bg-gray-100 overflow-hidden flex items-end pb-20 px-6 md:px-12">
    <img 
        src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2000" 
        alt="Hero" 
        class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black/10"></div> <div class="relative z-10 max-w-2xl animate-in slide-in-from-bottom-10 duration-1000">
        <span class="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4 inline-block">Colección 2024</span>
        <h1 class="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            Minimalismo <br/> que inspira calma.
        </h1>
        <button class="bg-white text-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300">
            Explorar Colección
        </button>
    </div>
</section>

<div class="bg-black text-white py-4 overflow-hidden whitespace-nowrap">
    <div class="inline-block animate-[marquee_20s_linear_infinite]">
        <span class="mx-8 text-sm uppercase tracking-widest">Envío gratis internacional</span> • 
        <span class="mx-8 text-sm uppercase tracking-widest">30 días de garantía</span> • 
        <span class="mx-8 text-sm uppercase tracking-widest">Diseño Sostenible</span> • 
        <span class="mx-8 text-sm uppercase tracking-widest">Artesanía Local</span> • 
        <span class="mx-8 text-sm uppercase tracking-widest">Envío gratis internacional</span> • 
        <span class="mx-8 text-sm uppercase tracking-widest">30 días de garantía</span>
    </div>
</div>

<section class="py-20 px-6 max-w-7xl mx-auto">
    <div class="flex justify-between items-end mb-10">
        <h2 class="text-3xl font-serif">Categorías</h2>
        <a href="#all" class="text-sm underline">Ver todas</a>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each categories as cat}
            <div class="group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer">
                <img 
                    src={cat.img} 
                    alt={cat.name} 
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                <h3 class="absolute bottom-6 left-6 text-white text-2xl font-serif">{cat.name}</h3>
            </div>
        {/each}
    </div>
</section>

<section id="shop" class="py-20 px-6 max-w-7xl mx-auto border-t border-gray-100">
    <h2 class="text-3xl font-serif mb-12 text-center">Selección del Mes</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
        {#each featuredProducts as product}
            <div class="group flex flex-col gap-3">
                <div class="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
                    {#if product.badge}
                        <span class="absolute top-3 left-3 bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider z-10">
                            {product.badge}
                        </span>
                    {/if}
                    
                    <img 
                        src={product.image} 
                        alt={product.name}
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    <button 
                        on:click={() => handleAdd(product)}
                        class="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white"
                        aria-label="Agregar al carrito"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    </button>
                </div>
                
                <div>
                    <h3 class="font-medium text-gray-900">{product.name}</h3>
                    <p class="text-sm text-gray-500">${product.price}</p>
                </div>
            </div>
        {/each}
    </div>
</section>

<section class="bg-gray-50 py-24 px-6 text-center">
    <div class="max-w-xl mx-auto">
        <h2 class="text-3xl font-serif mb-4">Únete al club</h2>
        <p class="text-gray-500 mb-8">Recibe acceso anticipado a nuevas colecciones y descuentos exclusivos.</p>
        <form class="flex gap-2">
            <input 
                type="email" 
                placeholder="tu@email.com" 
                class="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors bg-white"
            />
            <button class="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Suscribirse
            </button>
        </form>
    </div>
</section>

<style>
    /* Definición de animación para el Marquee si no usas plugin de tailwind */
    @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
</style>