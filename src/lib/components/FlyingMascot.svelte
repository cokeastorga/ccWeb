<script lang="ts">
  import { onMount } from 'svelte';

  export let titleLines: string[] = ["Software seguro que", "escala tu negocio."];
  
  // REFERENCIA LOCAL: Esto buscará el archivo en tu carpeta 'static'
  const lottieSrc = "/mariposa.json"; 
  
  export let highlightColor: string = "from-blue-400 to-green-600";

  let isMounted = false;

  onMount(async () => {
    // Usamos el player genérico que instalaste previamente
    await import('@dotlottie/player-component');
    isMounted = true;
  });
</script>

<div class="relative flex justify-center items-center w-full max-w-5xl mx-auto py-10">
  
  <h1 class="relative z-10 text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-center text-gray-900">
    {titleLines[0]} <br/>
    <span class="text-transparent bg-clip-text bg-gradient-to-r {highlightColor}">
      {titleLines[1]}
    </span>
  </h1>

  {#if isMounted}
    <div class="mascot-wrapper absolute inset-0 pointer-events-none z-20 overflow-visible">
      <div class="flying-element">
        <div class="w-16 h-16 md:w-20 md:h-20">
            <dotlottie-player
              src={lottieSrc}
              background="transparent"
              speed="1"
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
  .mascot-wrapper {
    width: 100%;
    height: 100%;
    /* Aseguramos que el contenedor no bloquee clics */
    pointer-events: none; 
  }

  .flying-element {
    position: absolute;
    top: 0;
    left: 0;
    
    /* CORRECCIÓN TÉCNICA:
       Las rutas SVG (path) NO aceptan porcentajes (%). 
       Debemos usar números (pixels relativos al viewBox o contexto).
       
       Ruta: (Inicio Izquierda) -> (Curvas) -> (Final Derecha en el punto 'negocio')
    */
    offset-path: path('M-500,50 C500,-500 200,850 600,200 C850,-50 690,10 1200,90');
    
    /* Animación:
       - flyAndLand: El movimiento a lo largo de la línea.
       - floatWhileLanded: Un movimiento suave infinito una vez que llega (para que parezca viva).
    */
    animation: 
      flyAndLand 4s ease-out forwards,
      floatWhileLanded 3s ease-in-out infinite 4s; /* Empieza después de los 4s del vuelo */
    
    /* Orientación automática */
    offset-rotate: auto 45deg;
    will-change: offset-path, transform;
  }

  /* 1. Fase de Vuelo */
  @keyframes flyAndLand {
    0% {
      offset-distance: 0%;
      transform: scale(0.8); /* Viene de lejos/pequeña */
    }
    80% {
      transform: scale(1.6); /* Se agranda un poco antes de aterrizar */
    }
    100% {
      offset-distance: 86%;
      transform: scale(1) rotate(0deg); /* Aterrizaje final */
    }
  }

  /* 2. Fase de Reposo (Efecto "Respiración") */
  @keyframes floatWhileLanded {
    0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
    50% { transform: translateY(5px) scale(1.20) rotate(0deg); }
  }

  /* Ajuste para Celulares (Ruta más corta) */
  @media (max-width: 768px) {
    .flying-element {
      /* Ruta simplificada para pantallas angostas */
      offset-path: path('M-50,20 Q150,-50 455,68');
    }
  }
</style>