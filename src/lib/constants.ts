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
export const ORDER_BG = findImage('hero-bg');

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
  { id: 1, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-18-main'), gallery: [findImage('product-18-main'), findImage('product-18-gallery-1'), findImage('product-18-gallery-2'), findImage('product-18-gallery-3')] },
  { id: 2, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-19-main'), gallery: [findImage('product-19-main'), findImage('product-19-gallery-1'), findImage('product-19-gallery-2'), findImage('product-19-gallery-3')] },
  { id: 3, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-20-main'), gallery: [findImage('product-20-main'), findImage('product-20-gallery-1'), findImage('product-20-gallery-2'), findImage('product-20-gallery-3')] },
  { id: 4, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-21-main'), gallery: [findImage('product-21-main'), findImage('product-21-gallery-1'), findImage('product-21-gallery-2'), findImage('product-21-gallery-3')] },
  { id: 5, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-22-main'), gallery: [findImage('product-22-main'), findImage('product-22-gallery-1'), findImage('product-22-gallery-2'), findImage('product-22-gallery-3')] },
  { id: 6, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-23-main'), gallery: [findImage('product-23-main'), findImage('product-23-gallery-1'), findImage('product-23-gallery-2'), findImage('product-23-gallery-3')] },
  { id: 7, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-24-main'), gallery: [findImage('product-24-main'), findImage('product-24-gallery-1'), findImage('product-24-gallery-2'), findImage('product-24-gallery-3')] },
  { id: 8, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-25-main'), gallery: [findImage('product-25-main'), findImage('product-25-gallery-1'), findImage('product-25-gallery-2'), findImage('product-25-gallery-3')] },
  { id: 9, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-26-main'), gallery: [findImage('product-26-main'), findImage('product-26-gallery-1'), findImage('product-26-gallery-2'), findImage('product-26-gallery-3')] },
  { id: 10, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-27-main'), gallery: [findImage('product-27-main'), findImage('product-27-gallery-1'), findImage('product-27-gallery-2'), findImage('product-27-gallery-3')] },
  { id: 11, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-28-main'), gallery: [findImage('product-28-main'), findImage('product-28-gallery-1'), findImage('product-28-gallery-2'), findImage('product-28-gallery-3')] },
  { id: 12, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-29-main'), gallery: [findImage('product-29-main'), findImage('product-29-gallery-1'), findImage('product-29-gallery-2'), findImage('product-29-gallery-3')] },
  { id: 13, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-30-main'), gallery: [findImage('product-30-main'), findImage('product-30-gallery-1'), findImage('product-30-gallery-2'), findImage('product-30-gallery-3')] },
  { id: 14, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-31-main'), gallery: [findImage('product-31-main'), findImage('product-31-gallery-1'), findImage('product-31-gallery-2'), findImage('product-31-gallery-3')] },
  { id: 15, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-32-main'), gallery: [findImage('product-32-main'), findImage('product-32-gallery-1'), findImage('product-32-gallery-2'), findImage('product-32-gallery-3')] },
  { id: 16, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-33-main'), gallery: [findImage('product-33-main'), findImage('product-33-gallery-1'), findImage('product-33-gallery-2'), findImage('product-33-gallery-3')] },
  { id: 17, name: "", shortDesc: "", fullDesc: "", sizes: "", doughs: "", image: findImage('product-34-main'), gallery: [findImage('product-34-main'), findImage('product-34-gallery-1'), findImage('product-34-gallery-2'), findImage('product-34-gallery-3')] },
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

    
