<script lang="ts">
    import { onMount } from 'svelte';
    import { scale, fade } from 'svelte/transition';
    import { elasticOut } from 'svelte/easing';

    let visible = false;

    onMount(() => {
        visible = true;
    });
</script>

<div class="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
    
    {#if visible}
        <div 
            in:scale={{ duration: 1000, easing: elasticOut, start: 0.5 }}
            class="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8"
        >
            <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
            </svg>
        </div>

        <div in:fade={{ delay: 300, duration: 800 }}>
            <h1 class="text-4xl md:text-5xl font-serif mb-4 text-gray-900">¡Gracias por tu compra!</h1>
            <p class="text-lg text-gray-500 max-w-md mx-auto mb-10 leading-relaxed">
                Hemos recibido tu pedido correctamente. Te hemos enviado un correo con los detalles de seguimiento.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                    href="/ecommerce-v2" 
                    class="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-transform hover:-translate-y-1 shadow-lg w-full sm:w-auto"
                >
                    Volver a la tienda
                </a>
                <button class="px-8 py-3 text-gray-600 font-medium hover:text-black transition-colors w-full sm:w-auto">
                    Descargar Recibo
                </button>
            </div>
        </div>
    {/if}

</div>