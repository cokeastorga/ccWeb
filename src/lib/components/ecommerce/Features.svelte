<script lang="ts">
    import { reveal } from '$lib/actions/reveal';
</script>

<section class="py-24 border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        
        <div use:reveal={{ threshold: 0.5, y: 30 }} class="flex flex-col items-center gap-4">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h3 class="font-serif text-xl">Envío Global</h3>
            <p class="text-gray-500 text-sm max-w-xs">Llevamos el diseño a cualquier rincón del mundo con packaging seguro.</p>
        </div>

        <div use:reveal={{ threshold: 0.5, y: 30 }} class="flex flex-col items-center gap-4 delay-100">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h3 class="font-serif text-xl">Soporte 24/7</h3>
            <p class="text-gray-500 text-sm max-w-xs">Resolvemos tus dudas de diseño e instalación en cualquier momento.</p>
        </div>

        <div use:reveal={{ threshold: 0.5, y: 30 }} class="flex flex-col items-center gap-4 delay-200">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 class="font-serif text-xl">Garantía Extendida</h3>
            <p class="text-gray-500 text-sm max-w-xs">3 años de cobertura en todos nuestros muebles y accesorios.</p>
        </div>

    </div>
</section>