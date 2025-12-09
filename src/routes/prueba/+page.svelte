<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo: Parallax + Trigger + Driven</title>
    <style>
        body, html { margin: 0; padding: 0; font-family: sans-serif; overflow-x: hidden; }
        
        /* Estilos generales para las secciones */
        section {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            position: relative;
        }

        h1, h2 { background: rgba(0,0,0,0.6); color: white; padding: 20px; border-radius: 10px; }
        p { max-width: 600px; font-size: 1.2rem; line-height: 1.6; margin: 20px auto; }

        /* --- 1. EFECTO PARALLAX (CSS PURO) --- */
        .parallax-section {
            /* La imagen se queda 'fija' mientras el contenido se mueve */
            background-image: url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop');
            background-attachment: fixed; /* <--- LA CLAVE DEL PARALLAX */
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        /* Sección de relleno para dar espacio */
        .spacer { background: #333; color: white; }

        /* --- 2. SCROLL TRIGGER (APARECER AL VER) --- */
        .trigger-section { background: #f4f4f4; color: #333; }
        
        .caja-sorpresa {
            width: 200px;
            height: 200px;
            background: tomato;
            margin-top: 20px;
            border-radius: 10px;
            
            /* Estado inicial: Invisible y desplazado hacia abajo */
            opacity: 0;
            transform: translateY(100px);
            transition: all 1s ease-out; /* Suavizado de la animación */
        }

        /* Clase que agregaremos con JS cuando el elemento entre en pantalla */
        .caja-sorpresa.activo {
            opacity: 1;
            transform: translateY(0);
        }

        /* --- 3. SCROLL DRIVEN (CONTROLADO POR EL SCROLL) --- */
        .driven-section { 
            background: #222; 
            color: white; 
            height: 150vh; /* Más larga para notar el efecto */
        }

        .puerta-container {
            width: 300px;
            height: 300px;
            border: 2px solid white;
            position: relative;
            overflow: hidden;
            margin-top: 30px;
        }

        .puerta {
            width: 50%;
            height: 100%;
            background: #4caf50;
            position: absolute;
            top: 0;
            transition: width 0.1s linear; /* Transición muy corta para respuesta inmediata */
        }
        
        .puerta-izq { left: 0; background: #66bb6a; }
        .puerta-der { right: 0; background: #81c784; }

    </style>
</head>
<body>

    <section class="parallax-section">
        <h1>1. Efecto Parallax</h1>
        <p>Observa cómo la imagen de fondo de las montañas parece estar quieta o lejos mientras este texto se desliza sobre ella.</p>
    </section>

    <section class="spacer">
        <h2>Sigue bajando...</h2>
    </section>

    <section class="trigger-section">
        <h2>2. Scroll Triggered Animation</h2>
        <p>El cuadro rojo aparecerá suavemente solo cuando esta sección sea visible en tu pantalla.</p>
        <div class="caja-sorpresa" id="triggerBox"></div>
    </section>

    <section class="driven-section" id="drivenSection">
        <div style="position: fixed; top: 20px; right: 20px; background:white; color:black; padding:5px;">
            Progreso Scroll: <span id="debug">0%</span>
        </div>
        
        <h2>3. Scroll Driven Animation</h2>
        <p>Aquí tú tienes el control. Las puertas se abrirán **exactamente** al ritmo que bajes el scroll. Si subes, se cierran.</p>
        
        <div class="puerta-container">
            <div class="puerta puerta-izq" id="pIzq"></div>
            <div class="puerta puerta-der" id="pDer"></div>
        </div>
    </section>
    
    <section class="spacer">
        <h2>Fin del ejemplo</h2>
    </section>

    <script>
        // --- LOGICA PARA EL EFECTO 2: TRIGGER (Intersection Observer) ---
        // Detecta si el elemento es visible o no
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if(entrada.isIntersecting){
                    // Si entra en pantalla, agrega la clase
                    entrada.target.classList.add('activo');
                } else {
                    // Opcional: Si sale, quitamos la clase para que se repita la animación
                    entrada.target.classList.remove('activo');
                }
            });
        });

        // Le decimos al observador qué vigilar
        observador.observe(document.getElementById('triggerBox'));


        // --- LOGICA PARA EL EFECTO 3: DRIVEN (Cálculo matemático) ---
        window.addEventListener('scroll', () => {
            const section = document.getElementById('drivenSection');
            const puertaIzq = document.getElementById('pIzq');
            const puertaDer = document.getElementById('pDer');
            const debugText = document.getElementById('debug');

            // Obtenemos la posición de la sección respecto a la ventana
            const rect = section.getBoundingClientRect();
            const ventanaAlto = window.innerHeight;

            // Calculamos cuánto de la sección hemos recorrido
            // Cuando rect.top es igual a ventanaAlto, empieza a entrar.
            // Queremos un valor entre 0 y 1.
            
            let porcentaje = (ventanaAlto - rect.top) / (ventanaAlto + rect.height);
            
            // Limitamos el valor entre 0 y 1
            if (porcentaje < 0) porcentaje = 0;
            if (porcentaje > 1) porcentaje = 1;

            // Actualizamos visualmente el porcentaje para debug
            debugText.innerText = Math.round(porcentaje * 100) + '%';

            // APLICAMOS LA MAGIA:
            // Queremos que las puertas empiecen al 50% de ancho (cerradas) 
            // y terminen al 0% de ancho (abiertas).
            // Mapeamos el porcentaje (0 a 1) a un ancho (50% a 0%)
            
            const anchoPuerta = 50 - (porcentaje * 50); 
            
            puertaIzq.style.width = `${anchoPuerta}%`;
            puertaDer.style.width = `${anchoPuerta}%`;
        });

        // tooltip.js (La lógica de la acción)
export function tooltip(node, params) {
	// 1. 'node' es el elemento HTML (ej: un <div>)
    // 2. 'params' son los datos que le pasas (ej: el texto del tooltip)

	// Lógica inicial (Montaje)
	let title = params.text;
    node.setAttribute('title', title); // Ejemplo simple

	return {
		// UPDATE: Se ejecuta si 'params' cambia en el componente padre
		update(newParams) {
			title = newParams.text;
            node.setAttribute('title', title);
            console.log("El texto cambió a:", title);
		},

		// DESTROY: Se ejecuta cuando el elemento desaparece del DOM
		destroy() {
			// Aquí limpias event listeners, timers, o instancias de GSAP
            console.log("Elemento eliminado, limpieza lista.");
		}
	};
}
    </script>
</body>
</html>