<script lang="ts">
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    duration: 5 + Math.random() * 10,
    delay: Math.random() * -20,
    size: 2 + Math.random() * 4
  }));
</script>

<div class="snow-container pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
  {#each snowflakes as flake (flake.id)}
    <div 
      class="snowflake absolute bg-white rounded-full opacity-80 shadow-[0_0_10px_white]"
      style:left="{flake.left}%"
      style:width="{flake.size}px"
      style:height="{flake.size}px"
      style:animation-duration="{flake.duration}s"
      style:animation-delay="{flake.delay}s"
    ></div>
  {/each} 
</div>

<style>
  .snowflake {
    top: -10px;
    animation: fall linear infinite;
  }

  @keyframes fall {
    0% { transform: translateY(0) translateX(0); }
    100% { transform: translateY(110vh) translateX(20px); }
  }
</style>