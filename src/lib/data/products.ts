export interface ProductData {
    id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    description: string;
    badge?: string;
}

export const products: ProductData[] = [
    {
        id: '1',
        name: 'Lámpara Akari 1A',
        price: 120,
        category: 'Iluminación',
        images: [
            'https://images.unsplash.com/photo-1513506003013-953a45bf4817?auto=format&fit=crop&w=1000',
            'https://images.unsplash.com/photo-1540932296774-3bedde0475a9?auto=format&fit=crop&w=1000' // Segunda imagen simulada
        ],
        description: 'Una escultura de luz hecha a mano. Papel washi tradicional sobre una estructura de bambú irregular. Proporciona una luz cálida y difusa ideal para momentos de reflexión.',
        badge: 'New'
    },
    {
        id: '2',
        name: 'Silla Lounge Eames',
        price: 350,
        category: 'Mobiliario',
        images: [
            'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1000',
             'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000'
        ],
        description: 'Icono del diseño moderno. Madera contrachapada moldeada y cuero de primera calidad. Ergonomía estudiada para el máximo confort sin sacrificar la estética.',
    },
    {
        id: '3',
        name: 'Jarrón Wabi-Sabi',
        price: 45,
        category: 'Decoración',
        images: ['https://images.unsplash.com/photo-1578749556935-ef88814b29c3?auto=format&fit=crop&w=1000'],
        description: 'Cerámica artesanal con acabado texturizado. Cada pieza es única, celebrando la belleza de la imperfección.',
    },
    {
        id: '4',
        name: 'Mesa de Café Oak',
        price: 290,
        category: 'Mobiliario',
        images: ['https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=1000'],
        description: 'Roble macizo tratado con aceites naturales. Diseño bajo y robusto, perfecto para salones contemporáneos.',
    }
];

// Helper para buscar
export const getProductById = (id: string) => products.find(p => p.id === id);