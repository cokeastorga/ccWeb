<script>
  export let data; // Recibe { q, a }

  let x = 0;
  let y = 0;
  let opacity = 0;

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
    opacity = 1; // Encendemos la luz
  }

  function handleMouseLeave() {
    opacity = 0; // Apagamos la luz suavemente
  }
</script>

<div 
  class="card-glass relative rounded-xl p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
  on:mousemove={handleMouseMove}
  on:mouseleave={handleMouseLeave}
>
  <div 
    class="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
    style="
      opacity: {opacity};
      background: radial-gradient(
        600px circle at {x}px {y}px, 
        rgba(80, 250, 246, 0.15), 
        transparent 40%
      );
    "
  ></div>

  <blockquote class="relative z-10">
    <div class="text-4xl text-blue-200 absolute -top-4 -left-2 font-serif opacity-50 select-none">“</div>
    
    <p class="text-gray-700 italic mb-4 text-sm font-medium relative pt-2">
      {data.q.replace(/“|”/g, '')} </p>
    
    <footer class="flex items-center gap-2">
      <div class="h-px w-4 bg-blue-300"></div>
      <span class="text-xs text-gray-500 font-bold uppercase tracking-wide">{data.a}</span>
    </footer>
  </blockquote>
</div>