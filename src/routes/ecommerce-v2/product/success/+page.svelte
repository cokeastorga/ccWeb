<script>
    import { onMount } from 'svelte';
    import confetti from 'canvas-confetti'; // npm install canvas-confetti (o usa el CDN)

    onMount(() => {
        // Efecto visual simple de celebración
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#000000', '#555555', '#aaaaaa'] // Confeti en escala de grises aesthetic
        });
    });
</script>

<div class="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 animate-in zoom-in duration-500">
    <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
        <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
    </div>
    
    <h1 class="text-4xl md:text-5xl font-serif mb-4">¡Gracias por tu pedido!</h1>
    <p class="text-gray-500 max-w-md mx-auto mb-10">
        Hemos recibido tu orden correctamente. Recibirás un correo electrónico con los detalles de seguimiento en breve.
    </p>

    <div class="flex gap-4">
        <a href="/ecommerce-v2" class="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
            Volver a la tienda
        </a>
    </div>
</div>