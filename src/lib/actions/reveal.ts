export function reveal(node: HTMLElement, { threshold = 0.2, y = 20 } = {}) {
    // Estado inicial: invisible y desplazado
    node.style.opacity = '0';
    node.style.transform = `translateY(${y}px)`;
    node.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Estado final: visible y en su lugar
                node.style.opacity = '1';
                node.style.transform = 'translateY(0)';
                observer.unobserve(node); // Solo animar una vez
            }
        });
    }, { threshold });

    observer.observe(node);

    return {
        destroy() {
            observer.disconnect();
        }
    };
}