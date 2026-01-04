// Cricket Helmets Collection Data - One helmet per brand

export const helmetBrands = [
  { id: 'all', name: 'All Brands', count: 6 },
  { id: 'gray-nicolls', name: 'Gray Nicolls', count: 1 },
  { id: 'forma', name: 'Forma', count: 1 },
  { id: 'dsc', name: 'DSC', count: 1 },
  { id: 'shrey', name: 'Shrey', count: 1 },
  { id: 'kookaburra', name: 'Kookaburra', count: 1 },
  { id: 'moonwalkr', name: 'Moonwalkr', count: 1 }
];

export const cricketHelmets = [
  {
    id: 'ch-1',
    brand: 'Gray Nicolls',
    brandId: 'gray-nicolls',
    name: 'Gray Nicolls Atomic 360 Cricket Helmet',
    price: 3299,
    originalPrice: 3699,
    discount: 11,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/5507904HelmetAtomic360NavyMain_64ea7245-1b3f-4359-9bdd-3f836682fd4a.webp?v=1724587426&width=608',
      'https://crickstore.com/cdn/shop/files/5507904HelmetAtomic360Navy_Rear_311d47e0-2160-498b-b4e6-0f587abba1af.webp?v=1724587426&width=608'
    ],
    features: ['360 Degree Protection', 'Lightweight Design', 'Adjustable Fit', 'Steel Grille'],
    description: 'Gray Nicolls Atomic 360 offers complete head protection with 360-degree coverage. Lightweight yet durable construction for maximum comfort during long innings.',
    reviews: 0
  },
  {
    id: 'ch-2',
    brand: 'Forma',
    brandId: 'forma',
    name: 'Forma Pro Axis Cricket Helmet With Mild Steel Visor',
    price: 3200,
    originalPrice: 3799,
    discount: 16,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/IMG_4603_copy.webp?v=1724583662&width=608',
      'https://crickstore.com/cdn/shop/files/IMG_4600_copy.webp?v=1724583661&width=608'
    ],
    features: ['Mild Steel Visor', 'Pro Axis Design', 'Superior Ventilation', 'Comfortable Padding'],
    description: 'Forma Pro Axis helmet features a mild steel visor for excellent visibility and protection. Pro-level design trusted by cricketers worldwide.',
    reviews: 0
  },
  {
    id: 'ch-3',
    brand: 'DSC',
    brandId: 'dsc',
    name: 'DSC Edge Pro Cricket Helmet',
    price: 1600,
    originalPrice: 1899,
    discount: 16,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/edge-pro-navy-new_3.jpg?v=1724155086&width=608',
      'https://crickstore.com/cdn/shop/files/edge-pro-navy-new-1_3.jpg?v=1724155086&width=608'
    ],
    features: ['Edge Pro Technology', 'Lightweight Shell', 'Quick Dry Lining', 'Secure Chin Strap'],
    description: 'DSC Edge Pro delivers professional-grade protection at an accessible price. Perfect for club and league cricketers seeking reliable head protection.',
    reviews: 0
  },
  {
    id: 'ch-4',
    brand: 'Shrey',
    brandId: 'shrey',
    name: 'Shrey Prime Steel Cricket Helmet',
    price: 2000,
    originalPrice: 2299,
    discount: 14,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/SHREY_PRIME_STEEL_3207_NAVY_1_HD_1R3Alb486c.webp?v=1724584964&width=608',
      'https://crickstore.com/cdn/shop/files/SHREY_PRIME_STEEL_3207_NAVY_2_HD_biKwgG_CN.webp?v=1724584964&width=608'
    ],
    features: ['Steel Grille', 'Prime Series', 'Shock Absorption', 'Ergonomic Fit'],
    description: 'Shrey Prime Steel helmet offers excellent protection with a steel grille. Prime series quality at a mid-range price point.',
    reviews: 0
  },
  {
    id: 'ch-5',
    brand: 'Kookaburra',
    brandId: 'kookaburra',
    name: 'Kookaburra Pro 200 Cricket Helmet',
    price: 2067,
    originalPrice: 2349,
    discount: 13,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/616fbSREKgL._SL1500.jpg?v=1724854478&width=608',
      'https://crickstore.com/cdn/shop/files/61Y4dDKR-JL._SL1500.jpg?v=1724854478&width=608'
    ],
    features: ['Pro 200 Series', 'Australian Design', 'Impact Resistant', 'Ventilation Holes'],
    description: 'Kookaburra Pro 200 brings Australian cricket heritage to head protection. Designed for serious cricketers who demand quality.',
    reviews: 0
  },
  {
    id: 'ch-6',
    brand: 'Moonwalkr',
    brandId: 'moonwalkr',
    name: 'Moonwalkr Mind 2.0 Cricket Helmet',
    price: 21950,
    originalPrice: 21950,
    discount: 0,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/SHREY_KOROYD_STAINLESS_STEEL_HK842_NAVY_2_HD_nUB_nbR3dd.webp?v=1724999918&width=608',
      'https://crickstore.com/cdn/shop/files/SHREY_KOROYD_STAINLESS_STEEL_HK842_NAVY_2_HD_nUB_nbR3dd.webp?v=1724999918&width=608'
    ],
    features: ['Mind 2.0 Technology', 'Premium Protection', 'Advanced Materials', 'Pro Player Choice'],
    description: 'Moonwalkr Mind 2.0 represents the pinnacle of cricket helmet technology. Used by international players for maximum protection.',
    reviews: 0
  }
];

// Helper functions
export const getHelmetsByBrand = (brandId) => {
  if (brandId === 'all') return cricketHelmets;
  return cricketHelmets.filter(helmet => helmet.brandId === brandId);
};

export const getInStockHelmets = () => {
  return cricketHelmets.filter(helmet => helmet.inStock);
};
