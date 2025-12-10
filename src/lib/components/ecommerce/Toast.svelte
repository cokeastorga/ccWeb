<script>
    import { toast } from '$lib/stores/ui';
    import { fly } from 'svelte/transition';
</script>

{#if $toast}
    <div 
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-black text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3"
        transition:fly={{ y: 20, duration: 300 }}
    >
        <span class="w-2 h-2 rounded-full bg-green-400"></span>
        {$toast.message}
    </div>
{/if}