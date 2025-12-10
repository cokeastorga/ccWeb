// @ts-nocheck
import { error } from '@sveltejs/kit';
import { getProductById } from '$lib/data/products';
import type { PageLoad } from './$types';

export const load = ({ params }: Parameters<PageLoad>[0]) => {
    const product = getProductById(params.id);
    if (!product) throw error(404, 'Producto no encontrado');
    return { product };
};