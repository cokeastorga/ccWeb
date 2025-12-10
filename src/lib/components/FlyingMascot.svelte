<script lang="ts">
  import { onMount } from 'svelte';
  import { spring } from 'svelte/motion';
  import { pannable } from '$lib/actions/pannable';

  export let titleLines: string[] = ["Software seguro que", "escala tu negocio."];
  const lottieSrc = "/mariposa.json"; 
  export let highlightColor: string = "from-blue-400 to-green-600";

  let isMounted = false;
  let hasLanded = false;
  let isDragging = false;
  
  // Variables para recordar "casa" (el punto de aterrizaje)
  let landingX = 0;
  let landingY = 0;
  
  let containerRef: HTMLElement;
  let butterflyRef: HTMLElement;

  // Física del resorte (Stiffness bajo = regreso lento y suave)
  const coords = spring({ x: 0, y: 0 }, {
    stiffness: 0.05, 
    damping: 0.25
  });

  onMount(async () => {
    await import('@dotlottie/player-component');
    isMounted = true;
  });

  function handleAnimationEnd() {
    if (!butterflyRef || !containerRef) return;

    // 1. Calcular posición real de aterrizaje
    const bRect = butterflyRef.getBoundingClientRect();
    const cRect = containerRef.getBoundingClientRect();

    // 2. Guardar estas coordenadas como "Home Base"
    landingX = (bRect.left - cRect.left) + 40;
    landingY = (bRect.top - cRect.top) + 40;

    // 3. Fijar al resorte ahí sin movimiento inicial
    coords.set({ x: landingX, y: landingY }, { hard: true });
    
    hasLanded = true;
  }

  function handlePanStart() {
    isDragging = true;
    // Opcional: Aumentar la rigidez mientras arrastras para que responda rápido
    // coords.stiffness = 0.2; 
  }

  function handlePanMove(event: CustomEvent) {
    coords.update($coords => ({
      x: $coords.x + event.detail.dx,
      y: $coords.y + event.detail.dy
    }));
  }

  function handlePanEnd() {
    isDragging = false;
    // EL TRUCO: Le decimos que vuelva a las coordenadas guardadas
    // Al no usar { hard: true }, volverá animada por el spring
    coords.set({ x: landingX, y: landingY });
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
      bind:this={containerRef}
      class="mascot-wrapper absolute inset-0 z-50 overflow-visible"
      class:pointer-events-none={!hasLanded} 
      class:pointer-events-auto={hasLanded}
    >
      <div 
        bind:this={butterflyRef}
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
    will-change: transform;
    margin-left: -40px; 
    margin-top: -40px;
    touch-action: none; 
  }

  .flying-anim {
    offset-path: path('M-100,50 C100,-100 300,150 500,0 C600,-50 700,50 820,90');
    animation: flySequence 4s ease-out forwards;
    offset-rotate: auto 45deg;
  }

  @keyframes flySequence {
    0% { offset-distance: 0%; transform: scale(0.5); }
    100% { offset-distance: 100%; transform: scale(1); }
  }

  /* Animación de flotar (se detiene si arrastras) */
  .floating-anim {
    animation: gentleFloat 3s ease-in-out infinite;
  }

  @keyframes gentleFloat {
    0%, 100% { margin-top: -40px; }
    50% { margin-top: -50px; }
  }

  @media (max-width: 768px) {
    .flying-anim {
      offset-path: path('M-20,500 Q100,-50 390,70');
    }
  }
</style>