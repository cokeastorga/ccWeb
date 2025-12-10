<script>
    import { spring } from 'svelte/motion';
    import { pannable } from '$lib/actions/pannable'; // Ajusta la ruta según tu estructura

    export let data; // Recibe el objeto { icon, title, desc, bullets }

    // Estado para saber si estamos arrastrando (para el cursor y z-index)
    let isDragging = false;

    // Configuración del resorte
    const coords = spring({ x: 0, y: 0 }, {
        stiffness: 0.2,
        damping: 0.4
    });

    function handlePanStart() {
        isDragging = true;
        // Rigidez al máximo para respuesta inmediata al agarrar
        coords.stiffness = coords.damping = 1;
    }

    function handlePanMove(event) {
        coords.update($coords => ({
            x: $coords.x + event.detail.dx,
            y: $coords.y + event.detail.dy
        }));
    }

    function handlePanEnd() {
        isDragging = false;
        // Relajamos el resorte para que "rebote" al volver
        coords.stiffness = 0.2;
        coords.damping = 0.4;
        // ESTA LÍNEA hace que vuelvan a su posición original
        coords.set({ x: 0, y: 0 });
    }
</script>

<article 
    class="card-glass rounded-xl p-8 bg-white/80 backdrop-blur shadow-lg select-none touch-none
           {isDragging ? 'z-50 cursor-grabbing' : 'z-0 cursor-grab'}"
    use:pannable
    on:panstart={handlePanStart}
    on:panmove={handlePanMove}
    on:panend={handlePanEnd}
    style="transform: translate({$coords.x}px, {$coords.y}px) rotate({$coords.x * 0.1}deg)"
>
    <div class="flex items-center gap-4 pointer-events-none"> <div class="h-10 w-10 text-blue-300 flex items-center justify-center flex-shrink-0 bg-blue-50 rounded-lg">
            {@html data.icon}
        </div>
        <h3 class="text-xl font-bold text-gray-900">{data.title}</h3>
    </div>
    
    <p class="mt-4 text-gray-600 text-sm leading-relaxed pointer-events-none">
        {data.desc}
    </p>
    
    <ul class="mt-6 space-y-2 text-xs text-gray-600 font-mono list-disc pl-4 pointer-events-none">
        {#each data.bullets as b}
            <li>{b}</li>
        {/each}
    </ul>
</article>