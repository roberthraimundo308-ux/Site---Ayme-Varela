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
export const HERO_BG_MOBILE = findImage('hero-bg-mobile');
export const ORDER_BG = findImage('order-bg');

const COMMON_DESC = "Bolo de Sonho de valsa e ninho com morango";
const FULL_DESC = "Massa leve e delicadamente umedecida, recheada com o cremoso Ninho e pedaços de Sonho de Valsa, finalizado com morangos frescos selecionados. Uma combinação equilibrada, sofisticada e simplesmente irresistível!";

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
  { id: 1, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "30 pedaços", doughs: "Branca", image: findImage('product-1-main'), gallery: [findImage('product-1-main'), findImage('product-1-gallery-1'), findImage('product-1-gallery-2'), findImage('product-1-gallery-3')] },
  { id: 2, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "40 pedaços", doughs: "Preta", image: findImage('product-2-main'), gallery: [findImage('product-2-main'), findImage('product-2-gallery-1'), findImage('product-2-gallery-2'), findImage('product-2-gallery-3')] },
  { id: 3, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "Personalizado", doughs: "Mista", image: findImage('product-3-main'), gallery: [findImage('product-3-main'), findImage('product-3-gallery-1'), findImage('product-3-gallery-2'), findImage('product-3-gallery-3')] },
  { id: 4, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "40 pedaços", doughs: "Branca", image: findImage('product-4-main'), gallery: [findImage('product-4-main'), findImage('product-4-gallery-1'), findImage('product-4-gallery-2'), findImage('product-4-gallery-3')] },
  { id: 5, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "30 pedaços", doughs: "Mista", image: findImage('product-5-main'), gallery: [findImage('product-5-main'), findImage('product-5-gallery-1'), findImage('product-5-gallery-2'), findImage('product-5-gallery-3')] },
  { id: 6, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "50 pedaços", doughs: "Preta", image: findImage('product-6-main'), gallery: [findImage('product-6-main'), findImage('product-6-gallery-1'), findImage('product-6-gallery-2'), findImage('product-6-gallery-3')] },
  { id: 7, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "Variado", doughs: "Variada", image: findImage('product-7-main'), gallery: [findImage('product-7-main'), findImage('product-7-gallery-1'), findImage('product-7-gallery-2'), findImage('product-7-gallery-3')] },
  { id: 8, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "Variado", doughs: "Variada", image: findImage('product-8-main'), gallery: [findImage('product-8-main'), findImage('product-8-gallery-1'), findImage('product-8-gallery-2'), findImage('product-8-gallery-3')] },
  { id: 9, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "Variado", doughs: "Variada", image: findImage('product-9-main'), gallery: [findImage('product-9-main'), findImage('product-9-gallery-1'), findImage('product-9-gallery-2'), findImage('product-9-gallery-3')] },
  { id: 10, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "Variado", doughs: "Variada", image: findImage('product-10-main'), gallery: [findImage('product-10-main'), findImage('product-10-gallery-1'), findImage('product-10-gallery-2'), findImage('product-10-gallery-3')] },
  { id: 11, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "Variado", doughs: "Variada", image: findImage('product-11-main'), gallery: [findImage('product-11-main'), findImage('product-11-gallery-1'), findImage('product-11-gallery-2'), findImage('product-11-gallery-3')] },
  { id: 12, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "Variado", doughs: "Variada", image: findImage('product-12-main'), gallery: [findImage('product-12-main'), findImage('product-12-gallery-1'), findImage('product-12-gallery-2'), findImage('product-12-gallery-3')] },
  { id: 13, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "Variado", doughs: "Variada", image: findImage('product-13-main'), gallery: [findImage('product-13-main'), findImage('product-13-gallery-1'), findImage('product-13-gallery-2'), findImage('product-13-gallery-3')] },
  { id: 14, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "Variado", doughs: "Variada", image: findImage('product-14-main'), gallery: [findImage('product-14-main'), findImage('product-14-gallery-1'), findImage('product-14-gallery-2'), findImage('product-14-gallery-3')] },
  { id: 15, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "Variado", doughs: "Variada", image: findImage('product-15-main'), gallery: [findImage('product-15-main'), findImage('product-15-gallery-1'), findImage('product-15-gallery-2'), findImage('product-15-gallery-3')] },
  { id: 16, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "Variado", doughs: "Variada", image: findImage('product-16-main'), gallery: [findImage('product-16-main'), findImage('product-16-gallery-1'), findImage('product-16-gallery-2'), findImage('product-16-gallery-3')] },
  { id: 17, name: "", shortDesc: COMMON_DESC, fullDesc: FULL_DESC, sizes: "Variado", doughs: "Variada", image: findImage('product-17-main'), gallery: [findImage('product-17-main'), findImage('product-17-gallery-1'), findImage('product-17-gallery-2'), findImage('product-17-gallery-3')] }
];

export const OTHER_PRODUCTS: Product[] = [
  { id: 101, name: "Pudim de Leite", shortDesc: "Pudim de leite condensado cremoso com calda de caramelo.", fullDesc: "Um clássico irresistível, nosso pudim de leite é feito com os melhores ingredientes para uma textura perfeitamente cremosa e uma calda de caramelo no ponto.", sizes: "Serve 8-10 pessoas", doughs: "Não se aplica", image: findImage('pudim-main'), gallery: [findImage('pudim-main'), findImage('pudim-gallery-1'), findImage('pudim-gallery-2'), findImage('pudim-gallery-3')] },
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

    
