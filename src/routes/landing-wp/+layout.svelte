<script lang="ts">
    import '../../app.css';
    import { page } from '$app/stores';
    import { fade } from 'svelte/transition';
import PromoPopupLanding from '$lib/components/landing/PromoPopupLanding.svelte';

    let isMobileMenuOpen = false;
</script>

<div class="min-h-screen bg-white text-gray-800 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
    
    <nav class="fixed top-0 w-full z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            
            <a href="/landing-wp" class="text-2xl font-bold tracking-tight text-blue-900 flex items-center gap-2">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">B</div>
                Business<span class="text-blue-600">.Pro</span>
            </a>

            <div class="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                <a href="#servicios" class="hover:text-blue-600 transition-colors">Servicios</a>
                <a href="#nosotros" class="hover:text-blue-600 transition-colors">Nosotros</a>
                <a href="#testimonios" class="hover:text-blue-600 transition-colors">Clientes</a>
            </div>

            <div class="hidden md:block">
                <a href="#contacto" class="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                    Cotizar Ahora
                </a>
            </div>

            <button class="md:hidden p-2 text-gray-600" on:click={() => isMobileMenuOpen = !isMobileMenuOpen}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
        </div>

        {#if isMobileMenuOpen}
            <div class="md:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl" transition:fade>
                <a href="#servicios" class="block text-gray-600 font-medium" on:click={() => isMobileMenuOpen = false}>Servicios</a>
                <a href="#nosotros" class="block text-gray-600 font-medium" on:click={() => isMobileMenuOpen = false}>Nosotros</a>
                <a href="#contacto" class="block text-blue-600 font-bold" on:click={() => isMobileMenuOpen = false}>Cotizar</a>
            </div>
        {/if}
    </nav>

    <main class="flex-1 pt-20">
        <slot />
    </main>

    <PromoPopupLanding />

    <footer class="bg-gray-900 text-gray-400 py-12 px-6">
        <div class="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8 border-b border-gray-800 pb-8">
            <div class="col-span-1 md:col-span-2">
                <span class="text-white text-xl font-bold mb-4 block">Business.Pro</span>
                <p class="text-sm leading-relaxed max-w-xs">Soluciones digitales estratégicas para empresas que buscan crecimiento real y medible.</p>
            </div>
            <div>
                <h4 class="text-white font-medium mb-4">Empresa</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="#" class="hover:text-white">Sobre Nosotros</a></li>
                    <li><a href="#" class="hover:text-white">Casos de Éxito</a></li>
                    <li><a href="#" class="hover:text-white">Contacto</a></li>
                </ul>
            </div>
            <div>
                <h4 class="text-white font-medium mb-4">Legal</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="#" class="hover:text-white">Privacidad</a></li>
                    <li><a href="#" class="hover:text-white">Términos</a></li>
                </ul>
            </div>
        </div>
        <div class="max-w-6xl mx-auto text-center md:text-left text-xs">
            &copy; 2024 Business Pro SpA. Todos los derechos reservados.
        </div>
    </footer>
</div>