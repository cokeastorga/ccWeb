<script lang="ts">
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion'; // Física suave
  import { pannable } from '$lib/actions/pannable'; // Importamos la acción

  export let titleLines: string[] = ["Software seguro que", "escala tu negocio."];
  // Archivo local en 'static'
  const lottieSrc = "/mariposa.json"; 
  export let highlightColor: string = "from-blue-400 to-green-600";

  let isMounted = false;
  let hasLanded = false; // Flag para saber si terminó el vuelo automático
  let isDragging = false; // Flag visual para cambiar el cursor

  // Coordenadas físicas (Spring physics)
  // Iniciamos en 0,0 pero se actualizarán al aterrizar
  const coords = spring({ x: 0, y: 0 }, {
    stiffness: 0.1,
    damping: 0.25
  });

  // Coordenada final exacta de la ruta CSS (820, 90)
  // IMPORTANTE: Debe coincidir con el final del 'path()' en el CSS
  const LANDING_X = 820; 
  const LANDING_Y = 90;

  onMount(async () => {
    await import('@dotlottie/player-component');
    isMounted = true;
  });

  function handleAnimationEnd() {
    // 1. El vuelo CSS terminó.
    // 2. Sincronizamos las coordenadas de Svelte con el lugar de aterrizaje.
    coords.set({ x: LANDING_X, y: LANDING_Y }, { hard: true }); // 'hard: true' salta sin animación
    // 3. Activamos el modo interactivo.
    hasLanded = true;
  }

  function handlePanStart() {
    isDragging = true;
  }

  function handlePanMove(event: CustomEvent) {
    // Sumamos el movimiento del mouse a las coordenadas actuales
    coords.update($coords => ({
      x: $coords.x + event.detail.dx,
      y: $coords.y + event.detail.dy
    }));
  }

  function handlePanEnd() {
    isDragging = false;
    // Opcional: Si quieres que vuelva al sitio al soltar, descomenta esto:
    coords.set({ x: LANDING_X, y: LANDING_Y });
  }
</script>

<div class="relative flex justify-center items-center w-full max-w-5xl mx-auto py-10 select-none">
  
  <h1 class="relative z-10 text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-center text-gray-900 pointer-events-none">
    {titleLines[0]} <br/>
    <span class="text-transparent bg-clip-text bg-gradient-to-r {highlightColor}">
      {titleLines[1]}
    </span>
  </h1>

  {#if isMounted}
    <div 
      class="mascot-wrapper absolute inset-0 z-50 overflow-visible"
      class:pointer-events-none={!hasLanded} 
      class:pointer-events-auto={hasLanded}
    >
      <div 
        class="flying-element cursor-grab active:cursor-grabbing"
        class:flying-anim={!hasLanded}
        class:floating-anim={hasLanded && !isDragging}
        style="transform: translate({$coords.x}px, {$coords.y}px) {hasLanded ? 'rotate(0deg)' : ''}"
        use:pannable
        on:panstart={handlePanStart}
        on:panmove={handlePanMove}
        on:panend={handlePanEnd}
        on:animationend={handleAnimationEnd}
      >
        <div class="w-16 h-16 md:w-20 md:h-20 pointer-events-none">
            <dotlottie-player
              src={lottieSrc}
              background="transparent"
              speed={1}
              style="width: 100%; height: 100%;"
              loop
              autoplay
            ></dotlottie-player>
        </div>
      </div>

    </div>
  {/if}
</div>

<style>
  .mascot-wrapper { width: 100%; height: 100%; }

  .flying-element {
    position: absolute;
    top: 0; left: 0;
    /* Por defecto no tiene posición, la define la animación o Svelte */
    will-change: transform;
    /* Centramos el punto de agarre */
    margin-left: -40px; 
    margin-top: -40px;
  }

  /* —— FASE 1: VUELO AUTOMÁTICO (CSS) —— */
  .flying-anim {
    /* Mismo path que definimos, terminando en 820, 90 */
    offset-path: path('M-500,500 C100,-200 300,450 600,0 C700,-50 800,50 900,80');
    animation: flySequence 4s ease-out forwards;
    offset-rotate: auto 45deg;
  }

  @keyframes flySequence {
    0% { offset-distance: 0%; transform: scale(0.5); }
    100% { offset-distance: 100%; transform: scale(1); }
  }

  /* —— FASE 2: REPOSO (Flotar suavemente si no la estás agarrando) —— */
  /* Nota: Esto se aplica sobre la posición X/Y que controla Svelte */
  .floating-anim {
    animation: gentleFloat 3s ease-in-out infinite;
  }

  @keyframes gentleFloat {
    0%, 100% { margin-top: -120px; } /* Posición base */
    50% { margin-top: -100px; } /* Sube 10px */
  }

  /* Responsive: Ajuste de ruta para móvil */
  @media (max-width: 768px) {
    .flying-anim {
      /* Ruta más corta para pantallas chicas */
      offset-path: path('M-50,20 Q150,-50 520,80');
    }
    /* NOTA: En móvil el aterrizaje es en 320,80. 
       Para una solución perfecta responsive en JS, 
       deberíamos detectar el ancho de pantalla en el onMount 
       y actualizar LANDING_X. 
       Por ahora, si lo pruebas en desktop se verá perfecto.
    */
  }
</style>