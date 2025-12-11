// @ts-nocheck
import { error } from '@sveltejs/kit';
import { products } from '$lib/data/products';
import type { PageLoad } from './$types';

export const load = ({ params }: Parameters<PageLoad>[0]) => {
    const product = products.find((p) => p.id === params.id);

    // ✅ Validación Senior: Si no existe, lanzamos error 404
    if (!product) {
        throw error(404, {
            message: 'Producto no encontrado'
        });
    }

    return {
        product
    };
};