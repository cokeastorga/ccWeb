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

  // —— THEME & MOBILE ——
  let theme: 'light' | 'dark' = 'dark';
  let mobileOpen = false;

  function applyTheme(t: 'light' | 'dark') {
    theme = t;
    const root = document.documentElement;
    root.classList.toggle('light', t === 'light');
    root.classList.toggle('dark', t === 'dark');
  }
  function toggleTheme() { applyTheme(theme === 'dark' ? 'light' : 'dark'); }
  function openMobile() { mobileOpen = true; }
  function closeMobile() { mobileOpen = false; }

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

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && mobileOpen) closeMobile();
  }

  // —— ICONS ——
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

  // —— ON MOUNT ——
  onMount(() => {
    if (typeof window !== 'undefined') {
      // Reduced motion
      const m = window.matchMedia('(prefers-reduced-motion: reduce)');
      reducedMotion = m.matches;
      const onChange = () => (reducedMotion = m.matches);
      m.addEventListener?.('change', onChange);

      // Cookie bar
      if (!localStorage.getItem('cookie_ok')) {
        const el = document.getElementById('cookiebar');
        if (el) el.hidden = false;
      }

      // Theme init
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (saved) applyTheme(saved);
      else if (window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');
    }

    // Scroll listener
    const onScroll = () => handleScroll();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('keydown', onKeydown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeydown);
    };
  });

  // persist theme
  $: if (typeof window !== 'undefined') localStorage.setItem('theme', theme);
</script>

<svelte:window on:scroll={handleScroll} />
<svelte:head>
  <title>CC Solutions — Desarrollo, Ciberseguridad y Automatización</title>
  <meta name="description" content="Desarrollo web con SvelteKit, arquitectura serverless, ciberseguridad aplicada e IA para automatizar y escalar tu negocio." />
  <meta property="og:title" content="CC Solutions — Desarrollo, Ciberseguridad y Automatización" />
  <meta property="og:description" content="Software seguro y automatizado que vende y escala." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={siteUrl} />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <link rel="canonical" href={siteUrl} />

  <!-- Organization -->
  <script type="application/ld+json">{JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CC Solutions',
    url: siteUrl,
    sameAs: [linkedin],
    contactPoint: [{ '@type': 'ContactPoint', email: emailTo, contactType: 'sales', areaServed: 'CL', availableLanguage: ['es','en'] }]
  })}</script>

  <!-- Professional Service -->
  <script type="application/ld+json">{JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'CC Solutions',
    url: siteUrl,
    areaServed: 'CL',
    serviceType: ['Desarrollo Web','Ciberseguridad','Automatización con IA','Cloud/DevOps'],
    sameAs: [linkedin]
  })}</script>

  <!-- FAQPage -->
  <script type="application/ld+json">{JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: '¿Trabajas con facturación?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Emisión de boleta o factura electrónica según corresponda.' } },
      { '@type': 'Question', name: '¿Plazos típicos?', acceptedAnswer: { '@type': 'Answer', text: 'Desde 1 semana para una landing hasta 6–8 semanas para un MVP.' } },
      { '@type': 'Question', name: '¿Tomas proyectos en curso?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Hago una auditoría inicial y propongo un plan de rescate por etapas.' } }
    ]
  })}</script>

  <!-- Breadcrumbs -->
  <script type="application/ld+json">{JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl + '#inicio' },
      { '@type': 'ListItem', position: 2, name: 'Servicios', item: siteUrl + '#servicios' },
      { '@type': 'ListItem', position: 3, name: 'Contacto', item: siteUrl + '#contacto' }
    ]
  })}</script>

  <!-- Analytics (activa el que uses) -->
  <!-- <script defer data-domain="ccsolution.cl" src="https://plausible.io/js/script.js"></script> -->
</svelte:head>

<style>
  :global(html){ scroll-behavior:smooth; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, sans-serif; }
  :global(body){ background-color:#0f172a; color:#e2e8f0; }

  /* Animations */
  :global(.animated-item){ opacity:0; transform:translateY(24px); transition:opacity .6s ease, transform .6s ease; }
  :global(.is-visible){ opacity:1; transform:translateY(0); }
  @media (prefers-reduced-motion: reduce){ :global(.animated-item){ transition:none; opacity:1; transform:none; } }

  /* Cards */
  :global(.card-hover){ transition:transform .25s ease, border-color .25s ease, box-shadow .25s ease; border:1px solid #1e293b; }
  :global(.card-hover:hover){ transform:translateY(-6px); border-color:#3b82f6; box-shadow:0 18px 24px -12px rgba(59,130,246,.25); }

  /* Back-to-top */
  .back-to-top{ position:fixed; right:1rem; bottom:1rem; opacity:0; pointer-events:none; transform:translateY(10px); transition:all .2s ease; z-index:50; }
  .back-to-top.is-visible{ opacity:1; pointer-events:auto; transform:translateY(0); }

  /* Utilities */
  :global(.btn){ padding:.75rem 1rem; border-radius:.75rem; font-weight:600; transition:transform .15s ease, box-shadow .2s ease, background-color .2s ease; }
  :global(.btn-primary){ background:#2563eb; color:white; box-shadow:0 4px 14px rgba(37,99,235,.3); }
  :global(.btn-primary:hover){ background:#1d4ed8; transform:translateY(-1px); box-shadow:0 8px 20px rgba(37,99,235,.45); }
  :global(.btn-outline){ border:1px solid #334155; color:#e2e8f0; }
  :global(.btn-outline:hover){ background:#1e293b; border-color:#3b82f6; color:white; }
  :global(.input){ width:100%; border-radius:.75rem; background:#0b1220; border:1px solid #334155; padding:.75rem 1rem; color:#e2e8f0; }
  :global(.input:focus){ outline:none; border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,.25); }

  /* Header */
  .nav{ position:sticky; top:0; backdrop-filter:blur(10px); background:rgba(2,6,23,.6); border-bottom:1px solid rgba(30,41,59,.6); z-index:40; }

  /* Mobile menu */
  .mobile-nav{ position:fixed; inset:0; background:rgba(2,6,23,.65); backdrop-filter:blur(6px); display:none; }
  .mobile-nav.open{ display:block; }

  /* Cookie bar */
  .cookiebar{ position:fixed; left:1rem; right:1rem; bottom:1rem; z-index:60; }

  /* Theme toggle */
  :global(.theme-toggle){ display:inline-flex; align-items:center; gap:.5rem; padding:.5rem .75rem; border-radius:.5rem; border:1px solid #334155; color:#e2e8f0; }
  :global(.theme-toggle:hover){ background:#1e293b; }
</style>

<!-- —— NAVBAR —— -->
<header class="nav" role="banner">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <a href="#inicio" class="font-semibold tracking-tight text-slate-100" aria-label="Ir a inicio">
      CC <span class="text-blue-400">Solutions</span>
    </a>
    <nav class="hidden md:flex items-center gap-6 text-slate-300" aria-label="Navegación principal">
      <a href="#servicios" class="hover:text-white">Servicios</a>
      <a href="#casos" class="hover:text-white">Casos</a>
      <a href="#proceso" class="hover:text-white">Proceso</a>
      <a href="#faq" class="hover:text-white">FAQ</a>
      <button class="theme-toggle" on:click={toggleTheme} aria-label="Cambiar tema">🌓 <span class="hidden sm:inline">Tema</span></button>
      <a href="#contacto" class="btn btn-primary">Agenda</a>
    </nav>
    <button class="md:hidden btn btn-outline" on:click={openMobile} aria-label="Abrir menú">☰</button>
  </div>

  <!-- Mobile menu overlay -->
  <div class="mobile-nav {mobileOpen ? 'open' : ''}" role="dialog" aria-modal="true" aria-label="Menú móvil">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
      <div class="bg-slate-900/80 border border-slate-700 rounded-2xl p-6">
        <div class="flex justify-between items-center">
          <div class="font-semibold text-slate-100">Menú</div>
          <button class="btn btn-outline" on:click={closeMobile} aria-label="Cerrar menú">✕</button>
        </div>
        <div class="mt-4 grid gap-3 text-slate-200">
          <a href="#servicios" on:click={closeMobile} class="hover:text-white">Servicios</a>
          <a href="#casos" on:click={closeMobile} class="hover:text-white">Casos</a>
          <a href="#proceso" on:click={closeMobile} class="hover:text-white">Proceso</a>
          <a href="#faq" on:click={closeMobile} class="hover:text-white">FAQ</a>
          <button class="theme-toggle" on:click={() => { toggleTheme(); closeMobile(); }}>🌓 Tema</button>
          <a href="#contacto" on:click={closeMobile} class="btn btn-primary">Agenda</a>
        </div>
      </div>
    </div>
  </div>
</header>

<!-- —— HERO —— -->
<section id="inicio" class="relative overflow-hidden bg-slate-950">
  <div class="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/30 via-slate-950 to-slate-950" aria-hidden="true"></div>
  <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 min-h-[70svh] flex items-center">
    <div class="max-w-2xl">
      <span class="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300 animated-item" use:animateOnScroll>
        Disponibilidad limitada · Asesoría 1 a 1
      </span>
      <h1 class="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-100 animated-item" use:animateOnScroll>
        Transformo ideas en <span class="text-blue-400">software seguro</span> y <span class="text-blue-400">automatizado</span> que vende y escala
      </h1>
      <p class="mt-6 text-lg text-slate-300 animated-item" use:animateOnScroll>
        Desarrollo web con SvelteKit, integraciones serverless (Firebase), ciberseguridad aplicada y automatización con IA. Entrego rápido, mido impacto y dejo todo documentado.
      </p>
      <div class="mt-8 flex flex-col sm:flex-row gap-4 animated-item" use:animateOnScroll>
        <a href="#contacto" class="btn btn-primary" aria-label="Agendar una llamada">Agenda una llamada</a>
        <a href="#casos" class="btn btn-outline" aria-label="Ver casos de estudio">Ver casos</a>
        <a href={`https://wa.me/${whatsapp.replace('+','')}`} target="_blank" rel="noopener" class="btn btn-outline" aria-label="Hablar por WhatsApp">WhatsApp</a>
      </div>
      <div class="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-slate-400 animated-item" use:animateOnScroll>
        <div class="text-sm">+2 años en desarrollo</div>
        <div class="text-sm">Ing. Ciberseguridad · Univ. Mayor</div>
        <div class="text-sm">Analista Programador · Duoc UC</div>
        <div class="text-sm">Stack: SvelteKit · Firebase · GCP</div>
        <div class="text-sm">Automatizaciones con IA y Python</div>
        <div class="text-sm">Buenas prácticas ISO/IEC 27001</div>
        <div class="text-sm">OWASP · CWE/CVE awareness</div>
      </div>
    </div>
  </div>
</section>

<!-- —— TRUST BAR —— -->
<section class="py-12 bg-slate-950 border-y border-slate-800/60" aria-label="Clientes y proyectos">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <p class="text-center text-sm text-slate-400 mb-6 animated-item" use:animateOnScroll>Confían en mi trabajo</p>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-items-center opacity-90">
      {#each [
        { href:'https://enfermeriasendo.cl', alt:'SENDO', txt:'SENDO' },
        { href:'https://satplatform.vercel.app', alt:'SATPlatform', txt:'SATPlatform' },
        { href:'https://deliciasporteñas.cl', alt:'Delicias Porteñas', txt:'Delicias+Porteñas' },
        { href:'https://finderweb.vercel.app/', alt:'FinderApp', txt:'FinderApp' },
        { href:'https://asvipchile.cl', alt:'Asvip Chile', txt:'Asvip+Chile' }
      ] as c}
        <a href={c.href} target="_blank" rel="noopener" class="flex flex-col items-center space-y-2 group animated-item" use:animateOnScroll>
          <img loading="lazy" src={`https://placehold.co/112x56/f1f5f9/94a3b8?text=${c.txt}`} alt={c.alt} class="h-14 w-28 object-contain rounded-2xl bg-slate-100 p-2 transition group-hover:scale-105" />
          <span class="text-xs text-slate-400 group-hover:text-white transition-colors">{c.alt}</span>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- —— SERVICIOS —— -->
<section id="servicios" class="py-20 lg:py-28">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl animated-item" use:animateOnScroll>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">Servicios</h2>
      <p class="mt-4 text-lg text-slate-300">Puedo entrar como refuerzo táctico en un sprint o liderar proyectos de punta a punta.</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each [
        { icon: icons.code, title:'Desarrollo Web & Apps', desc:'Landing pages, dashboards y apps en SvelteKit con arquitectura serverless (Firebase/GCP). SEO técnico y performance A/AA.', bullets:['SSR/SSG, rutas protegidas, roles y permisos','Pagos e integración con APIs (Transbank/Mercado Pago)','CI/CD y despliegue en Vercel/Cloud Run'] },
        { icon: icons.shield, title:'Ciberseguridad Aplicada', desc:'Endurecimiento, pruebas de seguridad y buenas prácticas desde el diseño. Cumplimiento básico de marcos como ISO/IEC 27001 y NIST.', bullets:['Revisión de arquitectura, auth y reglas de Firestore','Threat modeling y checklist OWASP','Backups, logs y planes de respuesta'] },
        { icon: icons.zap, title:'Automatización & IA', desc:'Bots y flujos con LLMs para atención, generación de contenido y tareas repetitivas. Integración con tus datos y procesos.', bullets:['Clasificación, extracción y generación de documentos','Asistentes internos (FAQ, SOP, reportes)','Evaluación de ROI y control de costos'] },
        { icon: icons.cloud, title:'Cloud & DevOps', desc:'Infra mínima, eficiente y observable. Automatizo despliegues y monitoreo.', bullets:['Pipelines CI/CD y ambientes','Observabilidad (logs, métricas, alertas)','Cost-control y escalabilidad'] },
        { icon: icons.chat, title:'Consultorías Express', desc:'Sesiones de 60–90 minutos para desbloquear decisiones clave: arquitectura, seguridad, UX, costos o roadmap.', bullets:['Revisión de código y performance','Plan de acción priorizado','Resumen ejecutivo y próximos pasos'] }
      ] as s}
        <article class="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 card-hover animated-item" use:animateOnScroll>
          <div class="flex items-center gap-4">
            <div class="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">{@html s.icon}</div>
            <h3 class="text-xl font-semibold text-slate-100">{s.title}</h3>
          </div>
          <p class="mt-4 text-slate-300">{s.desc}</p>
          <ul class="mt-4 space-y-2 text-sm text-slate-300 list-disc pl-5">
            {#each s.bullets as b}<li>{b}</li>{/each}
          </ul>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- —— CASOS —— -->
<section id="casos" class="py-20 lg:py-28 border-t border-slate-800/60 bg-slate-950/70">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl animated-item" use:animateOnScroll>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">Casos seleccionados</h2>
      <p class="mt-4 text-lg text-slate-300">Resultados medibles en proyectos reales.</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {#each [
        { title:'SENDO · Plataforma de salud domiciliaria', p:'SvelteKit + Firebase + Auth. Mejoras UX y carga 45% más rápida. Roles, turnos y panel de gestión.', bullets:['Core Web Vitals en verde','Integración de correo y notificaciones'] },
        { title:'SATPlatform · Generación de preguntas con IA', p:'Motor de preguntas tipo SAT con JSON estandarizado y módulos adaptativos.', bullets:['Explicaciones automáticas','Panel de resultados y exportables'] },
        { title:'FinderApp · Objetos perdidos con QR', p:'Flujo de 3 pasos, almacenamiento con ubicación y generación de códigos QR.', bullets:['Reglas de seguridad en Firestore','Panel con filtros y estado'] }
      ] as c}
        <article class="group rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/50 card-hover animated-item" use:animateOnScroll>
          <div class="h-40 bg-slate-800"></div>
          <div class="p-6">
            <h3 class="font-semibold text-slate-100">{c.title}</h3>
            <p class="mt-2 text-sm text-slate-300">{c.p}</p>
            <ul class="mt-3 text-xs text-slate-400 list-disc pl-5 space-y-1">
              {#each c.bullets as b}<li>{b}</li>{/each}
            </ul>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- —— DIFERENCIALES + PAQUETES —— -->
<section class="py-20 lg:py-28">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
      <div>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 animated-item" use:animateOnScroll>¿Por qué trabajar conmigo?</h2>
        <p class="mt-4 text-lg text-slate-300 animated-item" use:animateOnScroll>No solo código: visión de negocio, seguridad desde el día 1 y obsesión por el detalle.</p>
        <ul class="mt-8 space-y-6">
          <li class="flex gap-4 animated-item" use:animateOnScroll>
            <div class="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">{@html icons.check}</div>
            <div>
              <h3 class="font-semibold text-slate-100">Entrega rápida y medible</h3>
              <p class="text-slate-300">Cierres quincenales con demo, métricas y próximos pasos.</p>
            </div>
          </li>
          <li class="flex gap-4 animated-item" use:animateOnScroll>
            <div class="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">{@html icons.shield}</div>
            <div>
              <h3 class="font-semibold text-slate-100">Seguridad práctica</h3>
              <p class="text-slate-300">Revisiones OWASP, mínimos privilegios y planes de contingencia.</p>
            </div>
          </li>
          <li class="flex gap-4 animated-item" use:animateOnScroll>
            <div class="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">{@html icons.file}</div>
            <div>
              <h3 class="font-semibold text-slate-100">Documentación clara</h3>
              <p class="text-slate-300">Readme, diagramas y SOP de operación para no depender de mí.</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 animated-item" use:animateOnScroll>
        <h3 class="text-xl font-semibold text-slate-100">Paquetes sugeridos</h3>
        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <div class="rounded-2xl bg-slate-800/70 border border-slate-700 p-6">
            <div class="text-sm text-slate-400">Desde</div>
            <div class="text-3xl font-bold text-slate-100">$550.000</div>
            <div class="mt-2 font-medium text-slate-100">Landing Pro</div>
            <ul class="mt-3 text-sm text-slate-300 list-disc pl-5 space-y-1">
              <li>3 páginas, menú y SEO</li>
              <li>Integración con RRSS</li>
              <li>100% responsive</li>
              <li>Hosting + dominio x 1 año</li>
              <li>Correo institucional</li>
              <li>Entrega en 15–21 días</li>
            </ul>
          </div>
          <div class="rounded-2xl bg-slate-800/70 border border-slate-700 p-6">
            <div class="text-sm text-slate-400">Desde</div>
            <div class="text-3xl font-bold text-slate-100">$1.800.000</div>
            <div class="mt-2 font-medium text-slate-100">MVP App móvil o web</div>
            <ul class="mt-3 text-sm text-slate-300 list-disc pl-5 space-y-1">
              <li>Auth, roles y panel</li>
              <li>Diseño seguro y moderno</li>
              <li>5 páginas</li>
              <li>Panel de usuario</li>
              <li>Solución cloud</li>
              <li>APIs y endpoints</li>
              <li>Serverless o SSR</li>
              <li>CI/CD y monitoreo</li>
            </ul>
          </div>
        </div>
        <p class="mt-4 text-xs text-slate-400">* Precios de referencia en CLP, varían según alcance.</p>
      </div>
    </div>
  </div>
</section>

<!-- —— PROCESO —— -->
<section id="proceso" class="py-20 lg:py-28 border-t border-slate-800/60 bg-slate-950/70">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl animated-item" use:animateOnScroll>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">Proceso simple, sin sorpresas</h2>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-4">
      {#each [
        {n:'01', t:'Descubrimiento', d:'Entiendo objetivos, restricciones y métricas de éxito.'},
        {n:'02', t:'Propuesta', d:'Alcance claro, entregables, hitos y presupuesto.'},
        {n:'03', t:'Implementación', d:'Ejecución iterativa con demos y feedback continuo.'},
        {n:'04', t:'Entrega & Soporte', d:'Documentación, traspaso y soporte opcional.'}
      ] as step}
        <div class="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 card-hover animated-item" use:animateOnScroll>
          <div class="text-4xl font-extrabold text-blue-400">{step.n}</div>
          <h3 class="mt-2 font-semibold text-slate-100">{step.t}</h3>
          <p class="text-sm text-slate-300">{step.d}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- —— TESTIMONIOS —— -->
<section id="testimonios" class="py-20 lg:py-28">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl animated-item" use:animateOnScroll>
      <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">Lo que dicen mis clientes</h2>
      <p class="mt-4 text-lg text-slate-300">Testimonios reales.</p>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-3">
      {#each [
        {q:'“Pasamos de planillas a una app usable. El onboarding fue impecable.”', a:'EnfermeriaSENDO.cl — Santiago, Región Metropolitana'},
        {q:'“Nos dio una identidad en la web con un excelente producto, aumentando nuestra visibilidad y clientes.”', a:'DeliciasPorteñas.cl — Valdivia, Región de Los Ríos'},
        {q:'“Implementó sistema de cámaras y antivirus, ahora dormimos más tranquilos.”', a:'Erika Cabalín — Particular / Iquique, Región de Tarapacá'},
        {q:'“Nos otorgó una solución cloud y plataforma web completa y profesional.”', a:'AsvipChile.cl — Santiago, Región Metropolitana'},
        {q:'“Trabajo serio y rápido.”', a:'AstorgayAsociados.com — Yumbel, Región del Biobío'},
        {q:'“Solución rápida y económica, ajustada a nuestras necesidades. Felices.”', a:'ContratistaMCR.cl — Colina, Región Metropolitana'}
      ] as t}
        <blockquote class="rounded-2xl bg-slate-900/50 border border-slate-800 p-6 card-hover animated-item" use:animateOnScroll>
          <p class="text-slate-100">{t.q}</p>
          <footer class="mt-4 text-sm text-slate-400">— {t.a}</footer>
        </blockquote>
      {/each}
    </div>
  </div>
</section>

<!-- —— FAQ —— -->
<section id="faq" class="py-20 lg:py-28 border-t border-slate-800/60 bg-slate-950/70">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 animated-item" use:animateOnScroll>Preguntas frecuentes</h2>
    <div class="mt-8 space-y-4 max-w-3xl">
      {#each [
        {q:'¿Trabajas con facturación?', a:'Sí. Emisión de boleta o factura electrónica según corresponda.'},
        {q:'¿Plazos típicos?', a:'Desde 1 semana para una landing hasta 6–8 semanas para un MVP.'},
        {q:'¿Tomas proyectos en curso?', a:'Sí. Hago una auditoría inicial y propongo un plan de rescate por etapas.'}
      ] as f}
        <details class="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 card-hover animated-item" use:animateOnScroll>
          <summary class="cursor-pointer font-medium text-slate-100 flex justify-between items-center list-none">
            {f.q}
            <span class="text-slate-400 group-open:rotate-180 group-open:text-blue-400 transition-transform duration-200" aria-hidden="true">⌄</span>
          </summary>
          <p class="mt-3 text-slate-300">{f.a}</p>
        </details>
      {/each}
    </div>
  </div>
</section>

<!-- —— CONTACTO —— -->
<section id="contacto" class="py-20 lg:py-28">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-10 xl:gap-16">
      <div class="animated-item" use:animateOnScroll>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100">Conversemos</h2>
        <p class="mt-4 text-lg text-slate-300">Cuéntame en una frase qué necesitas y en qué plazo. Respondo en 24–48 h.</p>
        <div class="mt-6 space-y-3 text-slate-300">
          <div>📍 Chile (remoto)</div>
          <div>✉️ Correo <a class="underline decoration-blue-400/30 hover:decoration-blue-400/70 text-blue-400 hover:text-blue-300 transition-colors" href={`mailto:${emailTo}`}>{emailTo}</a></div>
          <div>🔗 LinkedIn <a class="underline decoration-blue-400/30 hover:decoration-blue-400/70 text-blue-400 hover:text-blue-300 transition-colors" href={linkedin} target="_blank" rel="noopener">/in/cokeastorga</a></div>
          <div>💬 WhatsApp <a class="underline decoration-blue-400/30 hover:decoration-blue-400/70 text-blue-400 hover:text-blue-300 transition-colors" href={`https://wa.me/${whatsapp.replace('+','')}`} target="_blank" rel="noopener">{whatsapp}</a></div>
        </div>
      </div>

      <form class="rounded-3xl border border-slate-800 bg-slate-900/50 p-8 space-y-4 animated-item" use:animateOnScroll
            action={`https://formsubmit.co/${emailTo}`}
            method="POST"
            on:submit={enviar}
            aria-label="Formulario de contacto">
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_subject" value="Nueva consulta desde el sitio" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_autoresponse" value="¡Gracias! Recibí tu mensaje y te respondo en breve." />
        <input type="text" name="_honey" tabindex="-1" autocomplete="off" class="sr-only" aria-hidden="true" />

        <div>
          <label class="block text-sm mb-1.5 font-medium text-slate-200" for="nombre">Nombre</label>
          <input id="nombre" name="name" type="text" required class="input" autocomplete="name" />
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm mb-1.5 font-medium text-slate-200" for="email">Email</label>
            <input id="email" name="email" type="email" required class="input" autocomplete="email" />
          </div>
          <div>
            <label class="block text-sm mb-1.5 font-medium text-slate-200" for="telefono">Teléfono <span class="text-slate-400">(Opcional)</span></label>
            <input id="telefono" name="telefono" type="tel" class="input" autocomplete="tel" inputmode="tel" />
          </div>
        </div>
        <div>
          <label class="block text-sm mb-1.5 font-medium text-slate-200" for="servicio">Servicio de interés</label>
          <select id="servicio" name="servicio" class="input">
            <option>Desarrollo Web</option>
            <option>Ciberseguridad</option>
            <option>Automatización / IA</option>
            <option>Cloud / DevOps</option>
            <option>Consultoría Express</option>
          </select>
        </div>
        <div>
          <label class="block text-sm mb-1.5 font-medium text-slate-200" for="mensaje">Mensaje</label>
          <textarea id="mensaje" name="message" rows={5} required class="input" placeholder="Cuéntame brevemente tu idea, plazos y presupuesto si lo tienes."></textarea>
        </div>
        {#if formStatus === 'error'}
          <div class="rounded-md bg-red-500/10 p-3 text-sm text-red-400" role="alert">{formMessage}</div>
        {/if}
        <button type="submit" class="btn btn-primary w-full" disabled={formStatus === 'submitting'}>
          {#if formStatus === 'submitting'} Enviando... {:else} Enviar consulta {/if}
        </button>
        <p class="text-xs text-slate-400 text-center">Al enviar aceptas recibir una respuesta por email.</p>
      </form>
    </div>
  </div>
</section>

<!-- Cookie consent (simple) -->
<div class="cookiebar" id="cookiebar" hidden>
  <div class="mx-auto max-w-7xl">
    <div class="bg-slate-900/95 border border-slate-700 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
      <p class="text-sm text-slate-300">Usamos cookies básicas para métricas anónimas y mejorar tu experiencia.</p>
      <div class="flex gap-2">
        <button class="btn btn-outline" on:click={() => { localStorage.setItem('cookie_ok','1'); (document.getElementById('cookiebar') as HTMLElement).hidden = true; }}>Aceptar</button>
        <a href="/privacidad" class="btn btn-outline">Ver detalles</a>
      </div>
    </div>
  </div>
</div>

<!-- Floating WhatsApp CTA -->
<a href={`https://wa.me/${whatsapp.replace('+','')}`} target="_blank" rel="noopener" aria-label="Abrir WhatsApp"
   class="fixed bottom-20 right-4 md:right-6 p-3 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-lg z-40">💬</a>

<!-- —— BACK TO TOP —— -->
<button on:click={scrollToTop} class="back-to-top bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg {showBackToTop ? 'is-visible' : ''}" aria-label="Volver arriba">{@html icons.arrowUp}</button>

<!-- —— CTA FINAL —— -->
<section class="py-20">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="rounded-3xl bg-gradient-to-br from-blue-700 to-blue-900 p-10 text-center animated-item" use:animateOnScroll>
      <h2 class="text-3xl sm:text-4xl font-extrabold text-white">¿Listo para despegar tu proyecto?</h2>
      <p class="mt-3 text-blue-100/90 max-w-xl mx-auto">Agenda una llamada de 20 minutos para ver si encajamos.</p>
      <a href="#contacto" class="mt-6 inline-block btn bg-white text-slate-900 font-semibold hover:bg-slate-200">Agendar ahora</a>
    </div>
  </div>
</section>


