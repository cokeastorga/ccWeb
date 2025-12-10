<script lang="ts">
    import { addToCart } from '$lib/stores/cart';
    import { showToast } from '$lib/stores/ui';
    import type { Product } from '$lib/types'; 
    import { openCart } from '$lib/stores/ui';

    // Nuevos componentes
    import QuickView from '$lib/components/ecommerce/QuickView.svelte';
    import Features from '$lib/components/ecommerce/Features.svelte';
    import { reveal } from '$lib/actions/reveal';
    import OfferCarousel, { type Offer } from '$lib/components/ecommerce/OfferCarousel.svelte';
import HeroMenu, { type Category } from '$lib/components/ecommerce/HeroMenu.svelte';
import CategoryStories, { type CategoryStory } from '$lib/components/ecommerce/CategoryStories.svelte';
    // Datos Mock (Asegúrate de que tu interfaz Product tenga 'badge?')
    const featuredProducts: Product[] = [
        { 
            id: '1', 
            name: 'Lámpara Akari', 
            price: 120, 
            category: 'Lighting', 
            image: 'https://images.unsplash.com/photo-1513506003013-953a45bf4817?auto=format&fit=crop&w=800', 
            badge: 'New' 
        },
        { 
            id: '2', 
            name: 'Silla Eames', 
            price: 350, 
            category: 'Furniture', 
            image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800' 
        },
        { 
            id: '3', 
            name: 'Cerámica Raw', 
            price: 45, 
            category: 'Decor', 
            image: 'https://images.unsplash.com/photo-1578749556935-ef88814b29c3?auto=format&fit=crop&w=800' 
        },
        { 
            id: '4', 
            name: 'Mesa de Café', 
            price: 290, 
            category: 'Furniture', 
            image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800' 
        },
    ];

    const categories = [
        { name: 'Iluminación', img: 'https://images.unsplash.com/photo-1507473888900-52e1adad5462?auto=format&fit=crop&w=600' },
        { name: 'Mobiliario', img: 'https://images.unsplash.com/photo-1538688536322-a27b7de78e90?auto=format&fit=crop&w=600' },
        { name: 'Objetos', img: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600' },
    ];

    // Lógica para el Modal
    let selectedProduct: Product | null = null;
    let isQuickViewOpen = false;

    function openQuickView(product: Product) {
        selectedProduct = product;
        isQuickViewOpen = true;
    }

    function handleAdd(product: Product) {
    addToCart(product);
    showToast(`Agregado: ${product.name}`);
    openCart(); // <--- Añade esta línea para mejor UX
}

//menu
const menuCategories: Category[] = [
        {
            id: 'bedroom',
            label: 'Dormitorio',
            href: '#shop',
            subcategories: [
                { label: 'Sábanas de Lino', href: '#linen' },
                { label: 'Fundas Nórdicas', href: '#duvet' },
                { label: 'Almohadas', href: '#pillows' },
                { label: 'Mantas', href: '#throws' },
                { label: 'Juegos Completos', href: '#sets' }
            ]
        },
        {
            id: 'bath',
            label: 'Baño',
            href: '#shop',
            subcategories: [
                { label: 'Toallas', href: '#towels' },
                { label: 'Albornoces', href: '#robes' },
                { label: 'Alfombras de Baño', href: '#mats' },
                { label: 'Accesorios', href: '#accessories' }
            ]
        },
        {
            id: 'kitchen',
            label: 'Cocina & Mesa',
            href: '#shop',
            subcategories: [
                { label: 'Manteles', href: '#tablecloths' },
                { label: 'Servilletas', href: '#napkins' },
                { label: 'Delantales', href: '#aprons' },
                { label: 'Cerámica', href: '#ceramics' }
            ]
        },
        {
            id: 'decor',
            label: 'Decoración',
            href: '#shop',
            // Esta categoría no tiene subcategorías, funcionará como enlace directo
        },
        {
            id: 'sale',
            label: 'Ofertas',
            href: '#sale',
            subcategories: [
                { label: 'Últimas Unidades', href: '#last-chance' },
                { label: 'Descuentos de Temporada', href: '#seasonal' }
            ]
        }
    ];

const activeOffers: Offer[] = [
        {
            id: 'offer-1',
            title: 'Semana del Diseño',
            description: '50% de descuento en nuestra colección de iluminación minimalista. Solo por tiempo limitado.',
            cta: 'Ver Iluminación',
            link: '#shop',
            image: 'https://images.unsplash.com/photo-1513506003013-953a45bf4817?auto=format&fit=crop&w=1200',
            bgColor: 'bg-stone-900',
            textColor: 'text-white'
        },
        {
            id: 'offer-2',
            title: 'Espacios de Trabajo',
            description: 'Renueva tu oficina en casa con sillas ergonómicas de diseño suizo.',
            cta: 'Explorar Sillas',
            link: '#shop',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200',
            bgColor: 'bg-blue-900', // Un cambio de color para dar dinamismo
            textColor: 'text-white'
        },
        {
            id: 'offer-3',
            title: 'Artesanía Japonesa',
            description: 'Cerámica Wabi-Sabi importada directamente de Kyoto.',
            cta: 'Descubrir Colección',
            link: '#shop',
            image: 'https://images.unsplash.com/photo-1616489953121-7788755743a5?auto=format&fit=crop&w=1200',
            bgColor: 'bg-amber-900',
            textColor: 'text-white'
        }
    ];

    // 2. Definir los datos para las "Historias" (Imágenes 1:1 funcionan mejor)
    const storyCategories: CategoryStory[] = [
        
        { 
            id: '1', 
            name: 'Novedades', 
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&h=300', 
            href: '/ecommerce-v2/shop?cat=all' // <--- Apunta a la nueva página
        },
        { 
            id: '2', 
            name: 'Sillas', 
            image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=300&h=300', 
            href: '/ecommerce-v2/shop?cat=Sillas' 
        },
        { 
            id: '3', 
            name: 'Iluminación', 
            image: 'https://tse2.mm.bing.net/th/id/OIP.SkGdgA9y4K_CeKEQDxN3ogHaHo?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', 
            href: '/ecommerce-v2/shop?cat=Iluminación' ,
            subcategories: [
            // También puedes ser específico si tu lógica lo soporta
            { label: 'Lámparas de Pie', href: '/ecommerce-v2/shop?cat=lamparas' }, 
        ]
        },
        { 
            id: '4', 
            name: 'Mesas', 
            image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=300&h=300', 
            href: '#tables' 
        },
        { 
            id: '5', 
            name: 'Cerámica', 
            image: 'https://149562642.v2.pressablecdn.com/wp-content/uploads/precios-ceramicas-02.jpg', 
            href: '#ceramics' 
        },
        { 
            id: '6', 
            name: 'Textiles', 
            image: 'https://th.bing.com/th/id/OIP.f0TkkF6oCjwcQYpTVpw8bwHaHa?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3', 
            href: '#textile' 
        },
        { 
            id: '7', 
            name: 'Ofertas', 
            image: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&w=300&h=300', 
            href: '#sale' 
        }
    ];
</script>

<svelte:head>
    <title>AESTHETIC.CO | Minimalismo & Diseño</title>
    <meta name="description" content="Colección 2024 de mobiliario minimalista y diseño sostenible." />
</svelte:head>

<section class="relative h-[80vh] w-full bg-gray-100 overflow-hidden flex items-end pb-20 px-6 md:px-12">
    <img 
        src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2000" 
        alt="Hero" 
        class="absolute inset-0 w-full h-full object-cover"
    />
    <div class="absolute inset-0 bg-black/10"></div> 
    
    <div class="relative z-10 max-w-2xl animate-in slide-in-from-bottom-10 duration-1000">
        <span class="bg-white text-black px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4 inline-block">Colección 2024</span>
        <h1 class="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            Esta Pagina para tiendas pequeñas <br/> Podria ser tuya.
        </h1>
        <button class="bg-white text-black px-8 py-3 rounded-full hover:bg-black hover:text-white transition-colors duration-300 font-medium">
            Simula tu visita
        </button>
    </div>
</section>

<HeroMenu categories={menuCategories} />

<CategoryStories categories={storyCategories} />



<section class="py-20 px-6 max-w-7xl mx-auto">
    <div class="flex justify-between items-end mb-10">
        <h2 class="text-3xl font-serif">Categorías</h2>
        <a href="#all" class="text-sm underline hover:text-gray-600 transition-colors">Ver todas</a>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        {#each categories as cat}
            <div class="group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer">
                <img 
                    src={cat.img} 
                    alt={cat.name} 
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                <h3 class="absolute bottom-6 left-6 text-white text-2xl font-serif tracking-wide">{cat.name}</h3>
            </div>
        {/each}
    </div>
</section>


<div class="bg-black text-white py-4 overflow-hidden whitespace-nowrap border-b border-gray-800">
    <div class="inline-block animate-[marquee_20s_linear_infinite]">
        <span class="mx-8 text-sm uppercase tracking-widest">Envío gratis internacional</span> • 
        <span class="mx-8 text-sm uppercase tracking-widest">30 días de garantía</span> • 
        <span class="mx-8 text-sm uppercase tracking-widest">Diseño Sostenible</span> • 
        <span class="mx-8 text-sm uppercase tracking-widest">Artesanía Local</span> • 
        <span class="mx-8 text-sm uppercase tracking-widest">Envío gratis internacional</span> • 
        <span class="mx-8 text-sm uppercase tracking-widest">30 días de garantía</span>
    </div>
</div>

<section class="py-10 px-6 max-w-7xl mx-auto">
    <OfferCarousel offers={activeOffers} />
</section>


<section id="shop" class="py-20 px-6 max-w-7xl mx-auto border-t border-gray-100">
    <h2 use:reveal class="text-3xl font-serif mb-12 text-center">Selección del Mes</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
        {#each featuredProducts as product}
            <div use:reveal class="group flex flex-col gap-3">
                <div class="relative aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden cursor-pointer" 
                     on:click={() => openQuickView(product)}>
                    
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

                    <div class="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span class="bg-white text-black px-4 py-2 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                            Vista Rápida
                        </span>
                    </div>

                    <button 
                        on:click|stopPropagation={() => handleAdd(product)}
                        class="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white z-20"
                        aria-label="Agregar al carrito"
                    >
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    </button>
                </div>
                
                <div class="text-center md:text-left">
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
        <form class="flex gap-2" on:submit|preventDefault={() => { /* Lógica futura */ }}>
            <input 
                type="email" 
                placeholder="tu@email.com" 
                class="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors bg-white placeholder:text-gray-400"
                required
            />
            <button class="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Suscribirse
            </button>
        </form>
    </div>
</section>

<Features />

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