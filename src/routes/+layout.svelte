<script lang="ts">
  import { injectAnalytics } from '@vercel/analytics/sveltekit'
  import { dev } from '$app/environment';
  import '../app.css';
  import ChristmasTheme from '$lib/components/ChristmasTheme.svelte';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import Snowfall from '$lib/components/Snowfall.svelte';
  let isDropdownOpen = false;
  let year = new Date().getFullYear();
  let mobileOpen = false;

  if (!dev) {
    injectAnalytics();
  }
  onMount(async () => {
    // Importación dinámica del player para evitar errores de SSR
    await import('@dotlottie/player-component');
  });
</script>

<svelte:head>
  <title>Jorge Astorga — Ingeniería en Software</title>
</svelte:head>

<div class="fixed inset-0 z-[-1] pointer-events-none bg-dark-950">
  <div class="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60"></div>
</div>

<div class="min-h-dvh flex flex-col relative">
  
  <header class="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
    <nav class="glass rounded-full px-6 py-3 flex items-center justify-between gap-8 shadow-lg shadow-gray-200/50 transition-all duration-300">
      
      <a href="/#inicio" class="flex items-center gap-2.5 font-medium tracking-tight hover:opacity-70 transition-opacity">
        <div class="h-6 w-6 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-400 text-white flex items-center justify-center text-[10px] font-bold shadow-md shadow-brand-500/20">CC</div>
        <span class="text-sm font-semibold text-gray-900">Solutions</span>
      </a>

      <div class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
        <a href="/#servicios" class="hover:text-brand-600 transition-colors">Servicios</a>
        <a href="/#casos" class="hover:text-brand-600 transition-colors">Casos</a>
        <a href="/#proceso" class="hover:text-brand-600 transition-colors">Proceso</a>
         <a href="/#contacto" class="hover:text-brand-600 transition-colors">Agendar</a>
      </div>

      <div class="flex items-center gap-3">
       <div class="w-full flex flex-col mt-2">
    <button 
        on:click={() => isDropdownOpen = !isDropdownOpen}
        class="flex justify-between items-center w-full text-left text-sm font-bold text-white bg-brand-600 py-2 px-3 rounded-xl shadow-md transition-colors hover:bg-brand-700"
    >
        <span>Plantillas Web</span>
        <svg 
            class="w-4 h-4 transition-transform duration-300 {isDropdownOpen ? 'rotate-180' : ''}" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    </button>

    {#if isDropdownOpen}
        <div transition:slide={{ duration: 300 }} class="flex flex-col gap-2 pl-4 mt-2 border-l-2 border-brand-600/20">
            
            <a 
                href="/ecommerce-v2" 
                class="block p-2 text-sm text-gray-600 hover:text-brand-600 font-medium transition-colors"
                on:click={() => mobileOpen = false} 
            >
                • Tienda Boutique (V2)
            </a>

            <a 
                href="/ecommerce-v3/shop" 
                class="block p-2 text-sm text-gray-600 hover:text-brand-600 font-medium transition-colors"
                on:click={() => mobileOpen = false}
            >
                • Tienda Enterprise (V3)
            </a>
            <a 
                href="/landing-wp" 
                class="block p-2 text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
                on:click={() => mobileOpen = false}
            >
                • Landing Corporativa (WP)
            </a>
            
        </div>
    {/if}
</div>
        <button 
  aria-label="Abrir menú"
  class="md:hidden text-gray-500 hover:text-brand-600" 
  on:click={() => (mobileOpen = !mobileOpen)}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
</button>

      </div>
    </nav>

    {#if mobileOpen}
      <div class="absolute top-full mt-4 w-[90%] max-w-sm glass rounded-2xl p-4 flex flex-col gap-2 text-center border border-gray-100 shadow-xl">
        <a href="/#servicios" class="text-sm font-medium text-gray-600 py-3 hover:bg-gray-50 rounded-xl transition-colors" on:click={() => (mobileOpen=false)}>Servicios</a>
        <a href="/#casos" class="text-sm font-medium text-gray-600 py-3 hover:bg-gray-50 rounded-xl transition-colors" on:click={() => (mobileOpen=false)}>Casos</a>
        <a href="/#contacto" class="text-sm font-medium text-gray-600 py-3 hover:bg-gray-50 rounded-xl transition-colors" on:click={() => (mobileOpen=false)}>Agendar llamada</a>
<div class="w-full flex flex-col mt-2">
    <button 
        on:click={() => isDropdownOpen = !isDropdownOpen}
        class="flex justify-between items-center w-full text-left text-sm font-bold text-white bg-brand-600 py-3 px-4 rounded-xl shadow-md transition-colors hover:bg-brand-700"
    >
        <span>Plantillas E-commerce</span>
        <svg 
            class="w-4 h-4 transition-transform duration-300 {isDropdownOpen ? 'rotate-180' : ''}" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    </button>

    {#if isDropdownOpen}
        <div transition:slide={{ duration: 300 }} class="flex flex-col gap-2 pl-4 mt-2 border-l-2 border-brand-600/20">
            
            <a 
                href="/ecommerce-v2" 
                class="block p-2 text-sm text-gray-600 hover:text-brand-600 font-medium transition-colors"
                on:click={() => mobileOpen = false} 
            >
                • Tienda Boutique (V2)
            </a>

            <a 
                href="/ecommerce-v3/shop" 
                class="block p-2 text-sm text-gray-600 hover:text-brand-600 font-medium transition-colors"
                on:click={() => mobileOpen = false}
            >
                • Tienda Enterprise (V3)
            </a>
            <a 
                href="/landing-wp" 
                class="block p-2 text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
                on:click={() => mobileOpen = false}
            >
                • Landing Corporativa (WP)
            </a>
            
        </div>
    {/if}
</div>      </div>
      
    {/if}
  </header>

  <main class="flex-1">
    <ChristmasTheme />
    <Snowfall />
    <slot />
  </main>

  <footer class="py-12 border-t border-gray-200 bg-white/50 backdrop-blur-sm mt-20">
    <div class="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-10 grayscale-[20%]"
       style="background-image: url('/fondo1.png');">
  </div>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-800">
      <p>© {year} Jorge Astorga — CC Solutions.</p>
      <div class="flex gap-6">
        <a href="/terminos" class="hover:text-brand-600 transition-colors">Términos</a>
        <a href="/privacidad" class="hover:text-brand-600 transition-colors">Privacidad</a>
      </div>
    </div>
  </footer>
</div>