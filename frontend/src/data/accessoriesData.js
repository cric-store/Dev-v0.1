// Accessories Collection Data

export const accessoriesBrands = [
  { id: 'all', name: 'All Brands', count: 6 },
  { id: 'dsc', name: 'DSC', count: 2 },
  { id: 'kookaburra', name: 'Kookaburra', count: 1 },
  { id: 'crickstore', name: 'Crickstore', count: 1 },
  { id: 'oakley', name: 'Oakley', count: 1 },
  { id: 'str8bat', name: 'Str8Bat', count: 1 }
];

export const accessories = [
  {
    id: 'acc-1',
    brand: 'DSC',
    brandId: 'dsc',
    name: 'DSC Bat Mallet - Sheesham',
    price: 700,
    originalPrice: 775,
    discount: 10,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/rn-image_picker_lib_temp_7470d617-bb6a-4c7e-a3c2-aaa18665709b.jpg?v=1763998326&width=608'
    ],
    features: ['Sheesham Wood', 'Durable Construction', 'Perfect Weight', 'Bat Knocking Tool'],
    description: 'DSC Bat Mallet made from premium Sheesham wood for knocking in cricket bats.',
    reviews: 0
  },
  {
    id: 'acc-2',
    brand: 'Kookaburra',
    brandId: 'kookaburra',
    name: 'Kookaburra Xtreme Cricket Bat Grip - Double Color',
    price: 265,
    originalPrice: 279,
    discount: 6,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/rn-image_picker_lib_temp_77f0d1c5-4ecf-45ff-83ed-7737dbf1264b.jpg?v=1753513409&width=608'
    ],
    features: ['Double Color Design', 'Premium Rubber', 'Enhanced Grip', 'Easy Installation'],
    description: 'Kookaburra Xtreme Cricket Bat Grip in attractive double color design for better aesthetics and grip.',
    reviews: 0
  },
  {
    id: 'acc-3',
    brand: 'DSC',
    brandId: 'dsc',
    name: 'DSC Linseed Oil',
    price: 189,
    originalPrice: 199,
    discount: 6,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/dsc-linseed-oil-1.webp?v=1753448207&width=608',
      'https://crickstore.com/cdn/shop/files/dsc-linseed-oil-4.webp?v=1753448242&width=608'
    ],
    features: ['Pure Linseed Oil', 'Bat Maintenance', 'Prevents Cracking', 'Easy Application'],
    description: 'DSC Linseed Oil for cricket bat maintenance and protection against moisture.',
    reviews: 0
  },
  {
    id: 'acc-4',
    brand: 'Crickstore',
    brandId: 'crickstore',
    name: 'Rapidarm Ball Thrower',
    price: 2399,
    originalPrice: 2999,
    discount: 21,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/WhatsAppImage2025-07-10at16.39.47.jpg?v=1752146364&width=608',
      'https://crickstore.com/cdn/shop/files/WhatsApp_Image_2025-08-26_at_5.19.02_PM.jpg?v=1756209251&width=608'
    ],
    features: ['Training Equipment', 'Consistent Throws', 'Adjustable Speed', 'Solo Practice'],
    description: 'Rapidarm Ball Thrower for solo cricket practice with consistent ball delivery.',
    reviews: 0
  },
  {
    id: 'acc-5',
    brand: 'Oakley',
    brandId: 'oakley',
    name: 'Oakley Hydra Prism Sapphire Neon Orange Sunglasses',
    price: 9450,
    originalPrice: 10990,
    discount: 15,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/2_23b96984-20fe-4cff-bf9b-d19f07fa6dfc.jpg?v=1751177619&width=608',
      'https://crickstore.com/cdn/shop/files/3_056c6cb0-70c8-44c8-9db1-2dfc3ee82f73.jpg?v=1751177619&width=608'
    ],
    features: ['Prism Sapphire Lens', 'UV Protection', 'Sports Design', 'Premium Quality'],
    description: 'Oakley Hydra Prism Sapphire sunglasses with neon orange frame for cricketers.',
    reviews: 0
  },
  {
    id: 'acc-6',
    brand: 'Str8Bat',
    brandId: 'str8bat',
    name: 'Str8Bat Sensor',
    price: 5850,
    originalPrice: 6499,
    discount: 10,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/91_of_players_new.jpg?v=1747660325&width=608',
      'https://crickstore.com/cdn/shop/files/sensor.png?v=1747660325&width=608'
    ],
    features: ['Smart Sensor', 'Batting Analytics', 'App Connected', 'Performance Tracking'],
    description: 'Str8Bat Sensor for tracking batting performance with detailed analytics.',
    reviews: 0
  }
];

// Helper functions
export const getAccessoriesByBrand = (brandId) => {
  if (brandId === 'all') return accessories;
  return accessories.filter(acc => acc.brandId === brandId);
};

export const getInStockAccessories = () => {
  return accessories.filter(acc => acc.inStock);
};
