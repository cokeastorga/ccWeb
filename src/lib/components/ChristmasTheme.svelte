<script lang="ts">
    import { onMount } from 'svelte';
  // Configuración de nieve avanzada
  const snowflakes = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    char: ['❄', '❅', '❆', '•'][Math.floor(Math.random() * 4)],
    left: Math.random() * 100,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * -20,
    size: 0.8 + Math.random() * 1.5
  }));

  const lights = Array.from({ length: 20 });
  onMount(() => {
    // Forzamos al reproductor a buscar el archivo si hay retraso
    const player = document.querySelector('dotlottie-player');
    if (player) {
      player.addEventListener('ready', () => {
        console.log("Santa listo para repartir regalos");
      });
    }
  });
</script>

<div class="fixed top-0 left-0 w-full z-[100] flex justify-around pointer-events-none overflow-hidden h-10">
  {#each lights as _, i}
    <div 
      class="light-bulb"
      style:animation-delay="{i * 0.2}s"
      class:bg-red-500={i % 3 === 0}
      class:bg-green-500={i % 3 === 1}
      class:bg-yellow-400={i % 3 === 2}
    ></div>
  {/each}
</div>

<div class="fixed inset-0 z-[99] pointer-events-none overflow-hidden">
  {#each snowflakes as flake (flake.id)}
    <span 
      class="absolute text-white/70 select-none animate-fall"
      style:left="{flake.left}%"
      style:font-size="{flake.size}rem"
      style:animation-duration="{flake.duration}s"
      style:animation-delay="{flake.delay}s"
      style:filter="blur({flake.size * 0.5}px)"
    >
      {flake.char}
    </span>
  {/each}
</div>

<div class="fixed bottom-4 left-4 z-[101] w-40 md:w-56 pointer-events-none opacity-95">
    <dotlottie-player
        src="/SantaClaus.lottie" 
        background="transparent"
        speed="1.2"
        direction="1"
        playMode="normal"
        loop={true}
        autoplay={true}
    ></dotlottie-player>
</div>

<style>
  .light-bulb {
    width: 10px;
    height: 15px;
    border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
    animation: glow 1.5s ease-in-out infinite alternate;
  }

  @keyframes glow {
    from { opacity: 0.4; filter: brightness(0.8); }
    to { opacity: 1; filter: brightness(1.3); transform: scale(1.1); }
  }

  @keyframes fall-sway {
    0% { transform: translateY(-10vh) translateX(0) rotate(0deg); }
    100% { transform: translateY(110vh) translateX(20px) rotate(360deg); }
  }

  :global(.animate-fall) {
    top: -50px;
    animation: fall-sway linear infinite;
  }
</style>