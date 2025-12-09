<script>
  import { spring } from 'svelte/motion';

  export let step; // Recibe el objeto { n, t, d }

  // Estado del resorte para la rotación
  let coords = spring({ x: 0, y: 0 }, {
    stiffness: 0.15,
    damping: 0.4
  });

  // Estado para la posición del brillo (glare) - respuesta inmediata
  let m = { x: 0, y: 0 };
  let isHovering = false;

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Calculamos la posición del mouse relativa a la tarjeta (0 a 1)
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    m.x = x;
    m.y = y;
    
    // Calculamos la rotación (limitada a 15 grados)
    // El centro es 0. Si estoy a la izquierda, roto negativo, etc.
    const rotateY = ((x - rect.width / 2) / rect.width) * 20; 
    const rotateX = ((y - rect.height / 2) / rect.height) * -20; // Invertido para que se sienta natural

    coords.set({ x: rotateX, y: rotateY });
    isHovering = true;
  }

  function handleMouseLeave() {
    isHovering = false;
    // Volver a posición plana
    coords.set({ x: 0, y: 0 });
  }
</script>

<div class="perspective-container" 
     on:mousemove={handleMouseMove} 
     on:mouseleave={handleMouseLeave}
     role="group">
     
  <div class="card-glass relative rounded-xl p-6 h-full transition-shadow duration-300
              {isHovering ? 'shadow-2xl' : 'shadow-lg'}"
       style="
         transform: rotateX({$coords.x}deg) rotateY({$coords.y}deg);
         transform-style: preserve-3d;
       ">
       
    <div class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300"
         style="
           opacity: {isHovering ? 0.4 : 0};
           background: radial-gradient(
             600px circle at {m.x}px {m.y}px, 
             rgba(255,255,255,0.4), 
             transparent 40%
           );
           z-index: 10;
         ">
    </div>

    <div style="transform: translateZ(30px);">
      <div class="text-5xl font-black text-gray-200/50 mb-4 select-none" 
           style="transform: translateZ(20px);"> {step.n}
      </div>
      
      <h3 class="font-bold text-gray-900 mb-2 text-xl relative z-20">
        {step.t}
      </h3>
      
      <p class="text-sm text-gray-600 relative z-20 leading-relaxed">
        {step.d}
      </p>
    </div>
    
  </div>
</div>

<style>
  .perspective-container {
    perspective: 1000px; /* Punto de fuga */
    height: 100%;
  }
</style>