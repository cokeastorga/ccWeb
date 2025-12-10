<script lang="ts">
    import { toast } from '$lib/stores/ui'; // Importamos el STORE, no la función
    import { fade, fly } from 'svelte/transition';
</script>

{#if $toast.visible}
    <div 
        class="fixed bottom-24 right-6 z-50 bg-black text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
        transition:fly={{ y: 20, duration: 300 }}
    >
        <span class="text-xl">✨</span>
        <p class="text-sm font-medium">{$toast.message}</p>
    </div>
{/if}