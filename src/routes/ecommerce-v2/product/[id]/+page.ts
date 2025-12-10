import { error } from '@sveltejs/kit';
import { getProductById } from '$lib/data/products';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    const product = getProductById(params.id);
    if (!product) throw error(404, 'Producto no encontrado');
    return { product };
};