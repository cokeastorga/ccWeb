export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    badge?: string; // Añadido opcional (?) para soportar etiquetas como 'New'
}