<script lang="ts">
  import '../app.css';
  let year = new Date().getFullYear();
  let mobileOpen = false;
</script>

<svelte:head>
  <title>Jorge Astorga — Ingeniería de Software</title>
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
      </div>

      <div class="flex items-center gap-3">
        <a href="/#contacto" class="hidden md:block text-xs font-bold bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-brand-600 hover:shadow-lg hover:shadow-brand-500/20 transition-all transform hover:-translate-y-0.5">
          Agendar
        </a>
        <button class="md:hidden text-gray-500 hover:text-brand-600" on:click={() => (mobileOpen = !mobileOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </nav>

    {#if mobileOpen}
      <div class="absolute top-full mt-4 w-[90%] max-w-sm glass rounded-2xl p-4 flex flex-col gap-2 text-center border border-gray-100 shadow-xl">
        <a href="/#servicios" class="text-sm font-medium text-gray-600 py-3 hover:bg-gray-50 rounded-xl transition-colors" on:click={() => (mobileOpen=false)}>Servicios</a>
        <a href="/#casos" class="text-sm font-medium text-gray-600 py-3 hover:bg-gray-50 rounded-xl transition-colors" on:click={() => (mobileOpen=false)}>Casos</a>
        <a href="/#contacto" class="text-sm font-bold text-white bg-brand-600 py-3 rounded-xl shadow-md mt-2" on:click={() => (mobileOpen=false)}>Agendar llamada</a>
      </div>
    {/if}
  </header>

  <main class="flex-1">
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