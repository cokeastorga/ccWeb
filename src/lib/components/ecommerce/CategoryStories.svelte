<script lang="ts">
    export interface CategoryStory {
        id: string;
        name: string;
        image: string;
        href: string;
    }

    export let categories: CategoryStory[] = [];
</script>

<div class="w-full border-b border-gray-100 bg-white py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
            class="flex gap-8 overflow-x-auto pb-4 no-scrollbar items-center justify-start md:justify-center"
            role="navigation" 
            aria-label="Categorías destacadas"
        >
            {#each categories as cat}
                <a 
                    href={cat.href}
                    class="group flex flex-col items-center min-w-[90px] gap-4 cursor-pointer transition-transform hover:-translate-y-1 duration-300"
                >
                    <div class="relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 border-2 border-gray-100 group-hover:border-black transition-colors duration-300">
                        <div class="w-full h-full rounded-full overflow-hidden relative">
                            <img 
                                src={cat.image} 
                                alt={cat.name}
                                class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <span class="text-sm font-medium text-gray-600 group-hover:text-black tracking-wide transition-colors">
                        {cat.name}
                    </span>
                </a>
            {/each}
        </div>
    </div>
</div>

<style>
    .no-scrollbar::-webkit-scrollbar {
        display: none;
    }
    .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
</style>