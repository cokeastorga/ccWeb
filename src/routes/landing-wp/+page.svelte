<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { reveal } from '$lib/actions/reveal'; // Reusamos tu acción de reveal que ya tienes

    // Datos estáticos (Simulando lo que el cliente editaría en WP)
    const services = [
        { title: 'Asesoría Legal', desc: 'Protección integral para tu patrimonio y empresa.', icon: '⚖️' },
        { title: 'Contabilidad', desc: 'Balances precisos y gestión tributaria eficiente.', icon: '📊' },
        { title: 'Recursos Humanos', desc: 'Gestión de talento y desarrollo organizacional.', icon: '👥' },
        { title: 'Auditoría', desc: 'Revisión exhaustiva de procesos internos.', icon: '🔍' },
    ];
</script>

<svelte:head>
    <title>Servicios Profesionales | Business Pro</title>
    <meta name="description" content="Soluciones corporativas integrales para PYMEs en crecimiento." />
</svelte:head>

<section class="relative bg-gradient-to-br from-gray-50 to-blue-50 py-20 md:py-32 px-6">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div class="order-2 md:order-1 animate-in slide-in-from-left duration-700">
            <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-6 inline-block">
                Expertos Consultores
            </span>
            <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Impulsamos el <br/> <span class="text-blue-600">futuro de tu empresa</span>
            </h1>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Deja la complejidad operativa en nuestras manos. Nos especializamos en optimizar procesos para que tú te enfoques en crecer.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
                <a href="#contacto" class="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 hover:-translate-y-1">
                    Solicitar Asesoría
                </a>
                <a href="#servicios" class="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-center hover:border-blue-600 hover:text-blue-600 transition-all">
                    Ver Servicios
                </a>
            </div>
            
            <div class="mt-10 flex items-center gap-4 text-sm text-gray-500">
                <div class="flex -space-x-2">
                    <div class="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                    <div class="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                    <div class="w-8 h-8 rounded-full bg-gray-500 border-2 border-white"></div>
                </div>
                <p>Confían en nosotros +200 empresas</p>
            </div>
        </div>

        <div class="order-1 md:order-2 relative animate-in zoom-in duration-700">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80" 
                    alt="Reunión de negocios" 
                    class="w-full h-auto object-cover"
                />
            </div>
            <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg max-w-xs hidden md:block animate-bounce delay-1000">
                <div class="flex items-center gap-3 mb-2">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span class="font-bold text-gray-900">Resultados Garantizados</span>
                </div>
                <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div class="bg-green-500 w-[85%] h-full rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="servicios" class="py-20 px-6 bg-white">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16 max-w-2xl mx-auto" use:reveal>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Nuestras Soluciones</h2>
            <p class="text-gray-500">Diseñamos estrategias a la medida de tus necesidades, combinando experiencia técnica con visión de negocio.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each services as service, i}
                <div 
                    class="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100 group cursor-pointer"
                    use:reveal={{ delay: i * 100 }}
                >
                    <div class="text-4xl mb-6 bg-white w-16 h-16 flex items-center justify-center rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                        {service.icon}
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
            {/each}
        </div>
    </div>
</section>

<section id="nosotros" class="py-20 px-6 bg-gray-900 text-white overflow-hidden">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div class="relative" use:reveal={{ x: -50 }}>
            <div class="absolute inset-0 bg-blue-600 rounded-2xl transform translate-x-4 translate-y-4"></div>
            <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" 
                alt="Equipo" 
                class="relative rounded-2xl shadow-lg w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
        </div>
        <div use:reveal={{ x: 50 }}>
            <h2 class="text-3xl font-bold mb-6">Más que consultores, somos tus socios estratégicos</h2>
            <p class="text-gray-400 mb-6 leading-relaxed">
                Fundada en 2015, Business Pro nació con la misión de democratizar el acceso a consultoría de alto nivel. Entendemos los desafíos de las PYMEs modernas porque también fuimos una.
            </p>
            <ul class="space-y-4 mb-8">
                <li class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Atención personalizada 24/7
                </li>
                <li class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Metodología ágil probada
                </li>
                <li class="flex items-center gap-3">
                    <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                    Reportes mensuales transparentes
                </li>
            </ul>
            <button class="text-blue-400 font-bold hover:text-white transition-colors flex items-center gap-2">
                Conoce al equipo <span>→</span>
            </button>
        </div>
    </div>
</section>

<section id="contacto" class="py-20 px-6 bg-blue-600">
    <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        <div class="w-full md:w-1/2 p-12 bg-gray-50 flex flex-col justify-center">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Hablemos de tu proyecto</h2>
            <p class="text-gray-600 mb-8">Déjanos tus datos y un especialista te contactará en menos de 24 horas.</p>
            
            <div class="space-y-4">
                <div class="flex items-center gap-4 text-gray-600">
                    <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">📞</div>
                    <span>+56 9 1234 5678</span>
                </div>
                <div class="flex items-center gap-4 text-gray-600">
                    <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">✉️</div>
                    <span>contacto@business.pro</span>
                </div>
                <div class="flex items-center gap-4 text-gray-600">
                    <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">📍</div>
                    <span>Av. Providencia 1234, Of. 601</span>
                </div>
            </div>
        </div>

        <div class="w-full md:w-1/2 p-12">
            <form class="space-y-4" on:submit|preventDefault={() => alert('¡Mensaje enviado! (Demo)')}>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Tu nombre" required />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="tu@empresa.com" required />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                    <textarea rows="3" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="¿En qué podemos ayudarte?"></textarea>
                </div>
                <button class="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors shadow-lg">
                    Enviar Mensaje
                </button>
            </form>
        </div>

    </div>
</section>