<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  // —— CONFIG ——
  const emailTo = 'cokeastorgac@gmail.com';
  const whatsapp = '+56985841810';
  const siteUrl = 'https://ccsolution.cl';
  const linkedin = 'https://www.linkedin.com/in/cokeastorga';

  // —— STATE ——
  let formStatus: 'idle' | 'submitting' | 'error' = 'idle';
  let formMessage = '';
  let showBackToTop = false;
  let reducedMotion = false;

  // —— HELPERS ——
  async function enviar(e: Event) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    if (formStatus === 'submitting') return;
    formStatus = 'submitting';
    formMessage = '';

    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
      if (res.ok) goto('/gracias');
      else throw new Error('Respuesta no fue OK');
    } catch (err) {
      console.error(err);
      formStatus = 'error';
      formMessage = 'Error al enviar, por favor intenta de nuevo.';
    }
  }

  function animateOnScroll(node: HTMLElement) {
    if (reducedMotion) return {};
    if (typeof IntersectionObserver !== 'undefined') {
      const io = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('is-visible');
            io.unobserve(node);
          }
        }
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
      io.observe(node);
      return { destroy() { io.unobserve(node); } };
    }
    node.classList.add('is-visible');
    return {};
  }

  function handleScroll() {
    if (typeof window !== 'undefined') showBackToTop = window.scrollY > 400;
  }
  function scrollToTop() { if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' }); }

  // —— ICONS (Ajustados para tema claro) ——
  const icons = {
    code: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'><path stroke-linecap='round' stroke-linejoin='round' d='M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5 0-4.5 16.5' /></svg>`,
    shield: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'><path stroke-linecap='round' stroke-linejoin='round' d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' /></svg>`,
    zap: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'><path stroke-linecap='round' stroke-linejoin='round' d='m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z' /></svg>`,
    cloud: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'><path stroke-linecap='round' stroke-linejoin='round' d='M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.758A3.75 3.75 0 0 0 12 3c-1.268 0-2.417.47-3.32 1.257A4.5 4.5 0 0 0 2.25 15Z' /></svg>`,
    chat: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'><path stroke-linecap='round' stroke-linejoin='round' d='M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-3.86 8.25-8.625 8.25a9.75 9.75 0 0 1-4.372-.991l-4.04 1.01a.75.75 0 0 1-.95-.95l1.01-4.04A9.75 9.75 0 0 1 3.375 12c0-4.556 3.86-8.25 8.625-8.25S21 7.444 21 12Z' /></svg>`,
    check: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'><path stroke-linecap='round' stroke-linejoin='round' d='m4.5 12.75 6 6 9-13.5' /></svg>`,
    file: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' class='w-6 h-6'><path stroke-linecap='round' stroke-linejoin='round' d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m-1.125 0H6.625A2.25 2.25 0 0 0 4.5 4.5v15A2.25 2.25 0 0 0 6.75 21.75h10.5A2.25 2.25 0 0 0 19.5 19.5v-1.5a2.25 2.25 0 0 0-2.25-2.25H9.75m-1.125 0-3.473 3.473m3.473-3.473 3.473 3.473m-3.473-3.473-3.473-3.473m3.473 3.473 3.473-3.473' /></svg>`,
    arrowUp: `<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' class='w-5 h-5'><path stroke-linecap='round' stroke-linejoin='round' d='M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75' /></svg>`
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      reducedMotion = m.matches;
      
      if (!localStorage.getItem('cookie_ok')) {
        const el = document.getElementById('cookiebar');
        if (el) el.hidden = false;
      }
    }
    const onScroll = () => handleScroll();
    window.addEventListener('scroll', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); };
  });
</script>

<svelte:window on:scroll={handleScroll} />
<svelte:head>
  <title>CC Solutions — Ingeniería de Software</title>
  <meta name="description" content="Desarrollo web con SvelteKit, arquitectura serverless y ciberseguridad." />
</svelte:head>

<style>
  :global(html) { scroll-behavior: smooth; font-family: 'Inter', sans-serif; }
  
  /* —— TEMA CLARO MODERNO —— */
  :global(body) { 
    background-color: #fafafa; 
    color: #18181b; 
    overflow-x: hidden;
  }

  /* —— UTILITIES —— */
  .glow-orb {
    position: absolute;
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(255,255,255,0) 70%);
    pointer-events: none;
    z-index: -5;
  }

  :global(.card-glass) {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    transition: all 0.3s ease;
  }
  :global(.card-glass:hover) {
    background: #ffffff;
    border-color: rgba(59, 130, 246, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.08);
  }

  :global(.animated-item){ opacity:0; transform:translateY(24px); transition:opacity .6s ease, transform .6s ease; }
  :global(.is-visible){ opacity:1; transform:translateY(0); }

  .back-to-top { position:fixed; right:1rem; bottom:1rem; opacity:0; transition:all .3s ease; z-index:50; pointer-events: none; }
  .back-to-top.is-visible { opacity:1; transform:translateY(0); pointer-events: auto; }
  
  :global(.btn) { padding:.75rem 1rem; border-radius:.75rem; font-weight:600; transition:all .2s ease; }
  :global(.btn-primary) { 
    background: #18181b; 
    color: white; 
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  }
  :global(.btn-primary:hover) { 
    background: #27272a; 
    transform: translateY(-1px); 
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.15); 
  }

  :global(.input) { 
    width:100%; border-radius:.75rem; 
    background: #ffffff; 
    border:1px solid #e4e4e7; 
    padding:.75rem 1rem; color:#18181b; 
  }
  :global(.input:focus) { 
    outline:none; border-color:#3b82f6; 
    box-shadow:0 0 0 3px rgba(59,130,246,0.1); 
  }
</style>

<section id="inicio" class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
  <div class="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-40 grayscale-[20%]"
       style="background-image: url('/hero.png');">
  </div>
  <div class="absolute inset-0 z-0 bg-gradient-to-b from-white/90 via-white/70 to-[#fafafa]"></div>
  <div class="glow-orb z-0 opacity-50"></div>

  <div class="mx-auto max-w-5xl px-4 text-center relative z-10">
    <div class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-3 py-1 text-xs text-gray-600 mb-8 animated-item" use:animateOnScroll>
      <span class="relative flex h-2 w-2">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      Disponibilidad para nuevos proyectos
    </div>

    <h1 class="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-gray-900 animated-item" use:animateOnScroll>
      Software seguro que<br/>
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">escala tu negocio.</span>
    </h1>

    <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed animated-item" use:animateOnScroll>
      Ingeniería de software de alto nivel. Desarrollo SvelteKit, ciberseguridad y automatización para empresas que valoran la calidad.
    </p>

    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animated-item" use:animateOnScroll>
      <a href="#contacto" class="btn btn-primary">Iniciar Proyecto</a>
      <a href="#casos" class="px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors">Ver Casos de Éxito</a>
    </div>

    <div class="mt-16 pt-8 border-t border-gray-200/60 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold tracking-wider text-gray-400 animated-item" use:animateOnScroll>
      <span>SVELTEKIT</span>
      <span>TYPESCRIPT</span>
      <span>FIREBASE</span>
      <span>PYTHON</span>
      <span>GCP</span>
    </div>
  </div>
</section>

<section class="py-12 border-y border-gray-100 bg-white/50">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <p class="text-center text-xs tracking-widest uppercase text-gray-400 mb-8 font-semibold animated-item" use:animateOnScroll>Portafolio de trabajo</p>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
      {#each [
        { href:'https://enfermeriasendo.cl', alt:'SENDO', src:'/logos/logosendo.jpg' },
        { href:'https://satplatform.vercel.app', alt:'SATPlatform', src:'/logos/logosat.jpg' },
        { href:'https://deliciasporteñas.cl', alt:'Delicias Porteñas', src:'/logos/logodelicias.jpg' },
        { href:'https://finderweb.vercel.app/', alt:'FinderApp', src:'/logos/logofinder.jpg' },
        { href:'https://asvipchile.cl', alt:'Asvip Chile', src:'/logos/logoasvip.jpg' }
      ] as c}
        <a href={c.href} target="_blank" rel="noopener" class="flex flex-col items-center space-y-2 group animated-item" use:animateOnScroll>
          <img loading="lazy" src={c.src} alt={c.alt} class="h-12 w-auto object-contain mix-blend-multiply" />
        </a>
      {/each}
    </div>
  </div>
</section>

<section id="servicios" class="relative py-20 lg:py-28 overflow-hidden">
  <div class="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-40 grayscale-[20%]"
       style="background-image: url('/fondo1.png');">
  </div>
  <div class="absolute inset-0 z-0 bg-gradient-to-b from-white/90 via-white/70 to-[#fafafa]"></div>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="max-w-3xl animated-item" use:animateOnScroll>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Servicios de Ingeniería</h2>
      <p class="mt-4 text-lg text-gray-600">Soluciones técnicas robustas para problemas de negocio complejos.</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each [
        { icon: icons.code, title:'Desarrollo Web & Apps', desc:'Landing pages y apps en SvelteKit. Código limpio y arquitectura serverless.', bullets:['SSR/SSG, rutas protegidas','Pasarelas de Pago','CI/CD automatizado'] },
        { icon: icons.shield, title:'Ciberseguridad', desc:'Hardenning de aplicaciones y auditorías de seguridad.', bullets:['Revisión de arquitectura','Threat modeling (OWASP)','Planes de respuesta'] },
        { icon: icons.zap, title:'Automatización & IA', desc:'Optimización de procesos con scripts y modelos de lenguaje (LLMs).', bullets:['Procesamiento de documentos','Asistentes virtuales','Análisis de datos'] },
        { icon: icons.cloud, title:'Cloud & DevOps', desc:'Infraestructura como código. Despliegues escalables.', bullets:['Pipelines CI/CD','Monitoreo y Logs','Optimización de costos'] },
        { icon: icons.chat, title:'Consultoría Técnica', desc:'Asesoramiento estratégico para líderes de proyecto.', bullets:['Evaluación de arquitectura','Revisión de código','Planificación de Roadmap'] }
      ] as s}
        <article class="card-glass rounded-xl p-8 animated-item" use:animateOnScroll>
          <div class="flex items-center gap-4">
            <div class="h-10 w-10 text-blue-600 flex items-center justify-center flex-shrink-0 bg-blue-50 rounded-lg">{@html s.icon}</div>
            <h3 class="text-xl font-bold text-gray-900">{s.title}</h3>
          </div>
          <p class="mt-4 text-gray-600 text-sm leading-relaxed">{s.desc}</p>
          <ul class="mt-6 space-y-2 text-xs text-gray-500 font-mono list-disc pl-4">
            {#each s.bullets as b}<li>{b}</li>{/each}
          </ul>
        </article>
      {/each}
    </div>
  </div>
</section>

<section id="casos" class="relative py-20 lg:py-28 border-t border-gray-200 overflow-hidden">
  
  <div class="absolute inset-0 -z-30 h-full w-full bg-gray-100">
    <video
      class="h-full w-full object-cover opacity-30 grayscale-[20%]"
      autoplay
      muted
      loop
      playsinline
      poster="/casos-poster.jpg"
    >
      <source src="/videos/fondohero.webm" type="video/webm" />
      <source src="/videos/fondohero.mp4" type="video/mp4" />
    </video>
  </div>

  <div class="absolute inset-0 -z-20 bg-gradient-to-b from-[#fafafa] via-white/40 to-[#fafafa]"></div>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="max-w-3xl animated-item" use:animateOnScroll>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Casos de Éxito</h2>
      <p class="mt-4 text-lg text-gray-600">Impacto real en negocios reales.</p>
    </div>
    
    <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each [
        { title:'SENDO · Salud', p:'Plataforma de gestión. Reducción del 40% en tiempos de coordinación.', bullets:['SvelteKit + Firebase','Panel admin en tiempo real'], src:'/logos/logosendo.jpg' },
        { title:'Delicias Porteñas', p:'E-commerce moderno y autogestionable para cadena de panaderías.', bullets:['Generación con IA','Pasarela de Pagos', 'Chat-Bot'], src:'/logos/logodelicias.jpg' },
        { title:'FinderApp · Logística', p:'Sistema de recuperación de activos mediante QR únicos.', bullets:['Seguridad Firestore','Interfaz móvil'], src:'/logos/logofinder.jpg' }
      ] as c}
        <article class="card-glass rounded-xl overflow-hidden group animated-item" use:animateOnScroll>
          <div class="h-48 bg-gray-100 border-b border-gray-200 relative group-hover:bg-gray-200 transition-colors flex items-center justify-center p-8">
            <img 
              src={c.src} 
              alt={c.title} 
              class="w-full h-full object-contain mix-blend-multiply opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
            />
          </div>
          
          <div class="p-8">
            <h3 class="font-bold text-gray-900 text-lg">{c.title}</h3>
            <p class="mt-2 text-sm text-gray-600">{c.p}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              {#each c.bullets as b}
                <span class="px-2 py-1 rounded border border-gray-200 bg-gray-50 text-[10px] uppercase tracking-wider text-gray-500 font-medium">{b}</span>
              {/each}
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="relative py-20 lg:py-28 border-t border-gray-200 overflow-hidden">
 <div class="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-40 grayscale-[20%]"
       style="background-image: url('/fondo3.png');">
  </div>
  <div class="absolute inset-0 z-0 bg-gradient-to-b from-white/90 via-white/70 to-[#fafafa]"></div>  <div class="absolute inset-0 z-0 bg-gradient-to-b from-[#fafafa] via-transparent to-[#fafafa]"></div>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="grid lg:grid-cols-2 gap-16 items-start">
      <div class="space-y-8">
        <div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 animated-item" use:animateOnScroll>Filosofía de Trabajo</h2>
          <p class="mt-4 text-lg text-gray-600 animated-item" use:animateOnScroll>Me integro como un socio estratégico. Priorizo la seguridad, la escalabilidad y la transparencia.</p>
        </div>
        
        <ul class="space-y-6">
          <li class="flex gap-4 animated-item" use:animateOnScroll>
            <div class="h-10 w-10 flex items-center justify-center border border-gray-200 rounded-full bg-white text-blue-600 shadow-sm">{@html icons.check}</div>
            <div>
              <h3 class="font-bold text-gray-900">Resultados Medibles</h3>
              <p class="text-sm text-gray-600">KPIs claros antes de escribir código.</p>
            </div>
          </li>
          <li class="flex gap-4 animated-item" use:animateOnScroll>
            <div class="h-10 w-10 flex items-center justify-center border border-gray-200 rounded-full bg-white text-blue-600 shadow-sm">{@html icons.shield}</div>
            <div>
              <h3 class="font-bold text-gray-900">Seguridad por Diseño</h3>
              <p class="text-sm text-gray-600">Mejores prácticas desde el día 1.</p>
            </div>
          </li>
          <li class="flex gap-4 animated-item" use:animateOnScroll>
            <div class="h-10 w-10 flex items-center justify-center border border-gray-200 rounded-full bg-white text-blue-600 shadow-sm">{@html icons.file}</div>
            <div>
              <h3 class="font-bold text-gray-900">Propiedad Total</h3>
              <p class="text-sm text-gray-600">Código y accesos 100% tuyos al finalizar.</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="card-glass rounded-2xl p-1 animated-item" use:animateOnScroll>
        <div class="bg-gray-50/80 backdrop-blur-sm rounded-xl p-8 border border-gray-100">
          <h3 class="text-xl font-bold text-gray-900 mb-6">Inversión Estimada</h3>
          <div class="grid gap-6 md:grid-cols-2">
            <div class="rounded-xl border border-gray-200 bg-white p-6 hover:border-blue-300 transition-colors shadow-sm">
              <div class="text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">Landing Page</div>
              <div class="text-2xl font-bold text-gray-900 mb-1">$550.000 <span class="text-sm font-normal text-gray-500">CLP</span></div>
              <ul class="mt-4 space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Diseño High-End</li>
                <li>Optimización SEO</li>
                <li>Hosting (1 año)</li>
              </ul>
            </div>
            <div class="rounded-xl border border-gray-200 bg-white p-6 hover:border-blue-300 transition-colors shadow-sm">
              <div class="text-xs uppercase tracking-widest text-gray-500 mb-2 font-semibold">MVP Aplicación</div>
              <div class="text-2xl font-bold text-gray-900 mb-1">$1.8M+ <span class="text-sm font-normal text-gray-500">CLP</span></div>
              <ul class="mt-4 space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Arquitectura Escalable</li>
                <li>Panel Admin</li>
                <li>Auth & BD</li>
              </ul>
            </div>
          </div>
          <p class="mt-6 text-xs text-center text-gray-500">* Valores referenciales.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="proceso" class="relative py-20 lg:py-28 border-t border-gray-200">
   <div class="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-40 grayscale-[20%]"
       style="background-image: url('/fondo4.png');">
  </div>
  <div class="absolute inset-0 z-0 bg-gradient-to-b from-white/90 via-white/70 to-[#fafafa]"></div>  <div class="absolute inset-0 z-0 bg-gradient-to-b from-[#fafafa] via-transparent to-[#fafafa]"></div>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl animated-item" use:animateOnScroll>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Metodología</h2>
      <p class="mt-4 text-lg text-gray-600">Un proceso estructurado para garantizar calidad.</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-4">
      {#each [
        {n:'01', t:'Descubrimiento', d:'Análisis de requerimientos y viabilidad técnica.'},
        {n:'02', t:'Estrategia', d:'Definición de arquitectura, stack tecnológico y cronograma.'},
        {n:'03', t:'Desarrollo', d:'Sprints iterativos con demos quincenales.'},
        {n:'04', t:'Entrega', d:'Despliegue a producción, capacitación y entrega de documentación.'}
      ] as step}
        <div class="card-glass rounded-xl p-6 animated-item" use:animateOnScroll>
          <div class="text-4xl font-bold text-gray-200 mb-4">{step.n}</div>
          <h3 class="font-bold text-gray-900 mb-2">{step.t}</h3>
          <p class="text-sm text-gray-600">{step.d}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section id="testimonios" class="py-20 lg:py-28 border-t border-gray-200">
  
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    
    <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-12 animated-item" use:animateOnScroll>Testimonios</h2>
    <div class="grid gap-6 md:grid-cols-3">
      {#each [
        {q:'“Pasamos de planillas a una app usable. El onboarding fue impecable.”', a:'EnfermeriaSENDO.cl'},
        {q:'“Nos dio una identidad en la web con un excelente producto.”', a:'DeliciasPorteñas.cl'},
        {q:'“Implementó sistema de cámaras y antivirus, ahora dormimos tranquilos.”', a:'Cliente Particular'},
        {q:'“Nos otorgó una solución cloud completa y profesional.”', a:'AsvipChile.cl'},
        {q:'“Trabajo serio, rápido y con excelente disposición.”', a:'AstorgayAsociados.com'},
        {q:'“Solución rápida y económica. Felices.”', a:'ContratistaMCR.cl'}
      ] as t}
        <blockquote class="card-glass rounded-xl p-6 animated-item" use:animateOnScroll>
          <p class="text-gray-700 italic mb-4 text-sm font-medium">"{t.q}"</p>
          <footer class="text-xs text-gray-500 font-bold uppercase tracking-wide">— {t.a}</footer>
        </blockquote>
      {/each}
    </div>
  </div>
</section>

<section id="faq" class="relative py-20 lg:py-28 border-t border-gray-200 overflow-hidden">
 <div class="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-40 grayscale-[20%]"
       style="background-image: url('/fondo2.png');">
  </div>
  <div class="absolute inset-0 z-0 bg-gradient-to-b from-white/90 via-white/70 to-[#fafafa]"></div>  <div class="absolute inset-0 -z-20 bg-gradient-to-b from-[#fafafa] via-white/60 to-[#fafafa]"></div>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
    <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-8 animated-item" use:animateOnScroll>Preguntas Frecuentes</h2>
    <div class="max-w-3xl space-y-4">
      {#each [
        {q:'¿Trabajas con facturación?', a:'Sí. Emisión de boleta o factura electrónica.'},
        {q:'¿Cuáles son los plazos típicos?', a:'Desde 1 semana para una landing page hasta 6–8 semanas para un MVP funcional.'},
        {q:'¿Tomas proyectos en curso?', a:'Sí. Realizo una auditoría inicial para evaluar el estado del código.'}
      ] as f}
        <details class="group card-glass rounded-xl p-6 animated-item" use:animateOnScroll>
          <summary class="cursor-pointer font-bold text-gray-900 flex justify-between items-center list-none">
            {f.q}
            <span class="text-gray-400 group-open:rotate-180 transition-transform duration-200">↓</span>
          </summary>
          <p class="mt-4 text-gray-600 text-sm leading-relaxed">{f.a}</p>
        </details>
      {/each}
    </div>
  </div>
</section>

<section id="contacto" class="relative py-20 lg:py-28 border-t border-gray-200 overflow-hidden">
 <div class="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat opacity-100 grayscale-[20%]"
       style="background-image: url('/fondo5.png');">
  </div>
  <div class="absolute inset-0 z-0 bg-gradient-to-b from-white/90 via-white/70 to-[#fafafa]"></div>  <div class="absolute inset-0 z-0 bg-gradient-to-b from-[#fafafa] via-transparent to-[#fafafa]"></div>

  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="grid lg:grid-cols-2 gap-16">
      <div class="animated-item" use:animateOnScroll>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">Hablemos de tu Proyecto</h2>
        <p class="mt-4 text-lg text-gray-600">Si buscas ingeniería de calidad y visión de largo plazo, estás en el lugar correcto.</p>
        
        <div class="mt-8 space-y-4 text-gray-600 font-medium">
          <div class="flex items-center gap-3">
            <span>✉️</span> 
            <a class="hover:text-blue-600 transition-colors border-b border-gray-200 hover:border-blue-600" href={`mailto:${emailTo}`}>{emailTo}</a>
          </div>
          <div class="flex items-center gap-3">
            <span>🔗</span> 
            <a class="hover:text-blue-600 transition-colors border-b border-gray-200 hover:border-blue-600" href={linkedin} target="_blank" rel="noopener">/in/cokeastorga</a>
          </div>
          <div class="flex items-center gap-3">
            <span>💬</span> 
            <a class="hover:text-blue-600 transition-colors border-b border-gray-200 hover:border-blue-600" href={`https://wa.me/${whatsapp.replace('+','')}`} target="_blank" rel="noopener">WhatsApp Directo</a>
          </div>
        </div>
      </div>

      <form class="card-glass rounded-2xl p-8 space-y-6 animated-item" use:animateOnScroll
            action={`https://formsubmit.co/${emailTo}`}
            method="POST"
            on:submit={enviar}
            aria-label="Formulario de contacto">
        
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value={`${siteUrl}/gracias`} />

        <div>
          <label class="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2" for="nombre">Nombre Completo</label>
          <input id="nombre" name="name" type="text" required class="input" autocomplete="name" />
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2" for="email">Correo</label>
            <input id="email" name="email" type="email" required class="input" autocomplete="email" />
          </div>
          <div>
            <label class="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2" for="telefono">Teléfono</label>
            <input id="telefono" name="telefono" type="tel" class="input" autocomplete="tel" inputmode="tel" />
          </div>
        </div>
        
        <div>
          <label class="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2" for="servicio">Interés</label>
          <select id="servicio" name="servicio" class="input">
            <option>Desarrollo Web</option>
            <option>Ciberseguridad</option>
            <option>Automatización</option>
            <option>Cloud / DevOps</option>
            <option>Consultoría</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs uppercase tracking-wider font-bold text-gray-500 mb-2" for="mensaje">Mensaje</label>
          <textarea id="mensaje" name="message" rows={4} required class="input" placeholder="Cuéntame brevemente tu idea."></textarea>
        </div>
        
        {#if formStatus === 'error'}
          <div class="rounded-lg bg-red-50 border border-red-100 p-4 text-sm text-red-600 text-center">{formMessage}</div>
        {/if}
        
        <button type="submit" class="btn btn-primary w-full py-4 text-sm uppercase tracking-widest" disabled={formStatus === 'submitting'}>
          {#if formStatus === 'submitting'} Procesando... {:else} Enviar Solicitud {/if}
        </button>
      </form>
    </div>
  </div>
</section>

<div class="cookiebar" id="cookiebar" hidden>
  <div class="mx-auto max-w-7xl">
    <div class="bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-2xl">
      <p class="text-sm text-gray-600">Este sitio utiliza cookies para métricas anónimas.</p>
      <div class="flex gap-3">
        <button class="px-4 py-2 text-xs font-bold rounded-lg bg-gray-900 text-white" on:click={() => { localStorage.setItem('cookie_ok','1'); (document.getElementById('cookiebar') as HTMLElement).hidden = true; }}>Aceptar</button>
      </div>
    </div>
  </div>
</div>

<a href={`https://wa.me/${whatsapp.replace('+','')}`} target="_blank" rel="noopener" aria-label="WhatsApp"
   class="fixed bottom-16 right-3 md:right-3 p-4 rounded-full bg-green-500 text-white shadow-xl z-40 hover:scale-110 transition-transform">
   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
</a>

<button on:click={scrollToTop} class="back-to-top bg-black text-white p-3 rounded-full shadow-lg {showBackToTop ? 'is-visible' : ''}">
  {@html icons.arrowUp}
</button>