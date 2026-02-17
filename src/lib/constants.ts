import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  if (!image) {
    // Return a default placeholder if not found, to avoid breaking the app
    return 'https://picsum.photos/seed/default/600/400';
  }
  return image.imageUrl;
}

export const LOGO_URL = findImage('logo-main');
export const SMALL_LOGO_URL = findImage('logo-small');
export const HERO_BG = findImage('hero-bg');
export const ORDER_BG = findImage('order-bg');

const COMMON_DESC = "Massa leve e delicadamente umedecida, recheada com o cremoso Ninho e pedaços de Sonho de Valsa, finalizado com morangos frescos selecionados. Uma combinação equilibrada, sofisticada e simplesmente irresistível!";

export interface Product {
  id: number;
  name: string;
  shortDesc: string;
  fullDesc: string;
  sizes: string;
  doughs: string;
  image: string;
  gallery: string[];
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "Sonho de Valsa", shortDesc: "Bolo de Sonho de valsa e ninho com morango", fullDesc: COMMON_DESC, sizes: "30 pedaços", doughs: "Branca", image: findImage('product-1-main'), gallery: [findImage('product-1-main'), findImage('product-1-gallery-1'), findImage('product-1-gallery-2'), findImage('product-1-gallery-3')] },
  { id: 2, name: "Sonho de Valsa", shortDesc: "Bolo de Sonho de valsa e ninho com morango", fullDesc: COMMON_DESC, sizes: "40 pedaços", doughs: "Preta", image: findImage('product-2-main'), gallery: [findImage('product-2-main'), findImage('product-2-gallery-1'), findImage('product-2-gallery-2'), findImage('product-2-gallery-3')] },
  { id: 3, name: "Sonho de Valsa", shortDesc: "Bolo de Sonho de valsa e ninho com morango", fullDesc: COMMON_DESC, sizes: "Personalizado", doughs: "Mista", image: findImage('product-3-main'), gallery: [findImage('product-3-main'), findImage('product-3-gallery-1'), findImage('product-3-gallery-2'), findImage('product-3-gallery-3')] },
  { id: 4, name: "Sonho de Valsa", shortDesc: "Bolo de Sonho de valsa e ninho com morango", fullDesc: COMMON_DESC, sizes: "40 pedaços", doughs: "Branca", image: findImage('product-4-main'), gallery: [findImage('product-4-main'), findImage('product-4-gallery-1'), findImage('product-4-gallery-2'), findImage('product-4-gallery-3')] },
  { id: 5, name: "Sonho de Valsa", shortDesc: "Bolo de Sonho de valsa e ninho com morango", fullDesc: COMMON_DESC, sizes: "30 pedaços", doughs: "Mista", image: findImage('product-5-main'), gallery: [findImage('product-5-main'), findImage('product-5-gallery-1'), findImage('product-5-gallery-2'), findImage('product-5-gallery-3')] },
  { id: 6, name: "Sonho de Valsa", fullDesc: COMMON_DESC, sizes: "50 pedaços", doughs: "Preta", image: findImage('product-6-main'), gallery: [findImage('product-6-main'), findImage('product-6-gallery-1'), findImage('product-6-gallery-2'), findImage('product-6-gallery-3')] }
];

export const ALL_GALLERY_IMAGES = PRODUCTS.flatMap(p => p.gallery || [p.image]);
export const GALLERY_CAROUSEL_IMAGES = PRODUCTS.map(p => p.image);

export const TESTIMONIALS_IMAGES = [
  findImage('testimonial-1'),
  findImage('testimonial-2'),
  findImage('testimonial-3'),
  findImage('testimonial-4'),
  findImage('testimonial-5'),
  findImage('testimonial-6'),
  findImage('testimonial-7')
];

export const MENU_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'Vitrine', id: 'vitrine' },
  { label: 'Galeria', id: 'galeria' },
  { label: 'Pedido', id: 'pedido' },
  { label: 'Depoimentos', id: 'depoimentos' }
];

export const WHATSAPP_NUMBER = "5547992861817";
