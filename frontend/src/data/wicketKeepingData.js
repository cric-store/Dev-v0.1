// Wicket Keeping Gloves Collection Data

export const wicketKeepingBrands = [
  { id: 'all', name: 'All Brands', count: 5 },
  { id: 'kookaburra', name: 'Kookaburra', count: 1 },
  { id: 'gray-nicolls', name: 'Gray Nicolls', count: 1 },
  { id: 'ss', name: 'SS', count: 1 },
  { id: 'sg', name: 'SG', count: 2 }
];

export const wicketKeepingGloves = [
  {
    id: 'wk-1',
    brand: 'Kookaburra',
    brandId: 'kookaburra',
    name: 'Kookaburra Pro 1.0 Wicket Keeping Gloves White',
    price: 5191,
    originalPrice: 5899,
    discount: 13,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/3J13191.webp?v=1724856252&width=608',
      'https://crickstore.com/cdn/shop/files/3J13191_4.webp?v=1724856252&width=608'
    ],
    features: ['Pro Level Quality', 'Premium Leather', 'Superior Grip', 'Comfortable Fit'],
    description: 'Kookaburra Pro 1.0 Wicket Keeping Gloves offer professional-grade protection and grip for serious wicket keepers.',
    reviews: 0
  },
  {
    id: 'wk-2',
    brand: 'Gray Nicolls',
    brandId: 'gray-nicolls',
    name: 'Gray Nicolls Limited Edition Wicket Keeping Gloves - Black',
    price: 5199,
    originalPrice: 5199,
    discount: 0,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/screenshot_2023-10-27-10-07-28-17_1c337646f29875672b5a61192b9010f9.jpg?v=1724762213&width=608'
    ],
    features: ['Limited Edition', 'Black Design', 'British Quality', 'Premium Construction'],
    description: 'Gray Nicolls Limited Edition Wicket Keeping Gloves in striking black color with premium British craftsmanship.',
    reviews: 0
  },
  {
    id: 'wk-3',
    brand: 'SS',
    brandId: 'ss',
    name: 'SS Player Series Wicket Keeping Gloves',
    price: 5950,
    originalPrice: 7400,
    discount: 20,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/rn-image_picker_lib_temp_1bc327c7-ff94-414c-b2b5-2597c9094a29.jpg?v=1765453850&width=608',
      'https://crickstore.com/cdn/shop/files/rn-image_picker_lib_temp_e26c7535-cd49-4a90-81cd-34fef38e97a7.jpg?v=1765453924&width=608'
    ],
    features: ['Player Series', 'Premium Leather', 'Extra Padding', 'Secure Wrist Strap'],
    description: 'SS Player Series Wicket Keeping Gloves designed for professional players with superior leather and padding.',
    reviews: 0
  },
  {
    id: 'wk-4',
    brand: 'SG',
    brandId: 'sg',
    name: 'SG Supakeep Classic Mens Wicket Keeping Gloves',
    price: 5000,
    originalPrice: 5899,
    discount: 16,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/51EsByukGEL._SX679.jpg?v=1731993976&width=608',
      'https://crickstore.com/cdn/shop/files/3_48574846-00ba-4838-a172-af70c182e742.webp?v=1724760203&width=608'
    ],
    features: ['Classic Design', 'Premium Quality', 'Excellent Grip', 'Durable Construction'],
    description: 'SG Supakeep Classic Wicket Keeping Gloves offering excellent grip and durability for all levels of play.',
    reviews: 1
  },
  {
    id: 'wk-5',
    brand: 'SG',
    brandId: 'sg',
    name: 'SG Test Mens Wicket Keeping Gloves',
    price: 3824,
    originalPrice: 4499,
    discount: 16,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/Test-1-5-scaled_5a2b45ea-7fe5-4ae4-8a11-1baa3801437a.webp?v=1724760991&width=608',
      'https://crickstore.com/cdn/shop/files/Test-3-6-scaled_cec9e14d-3802-4ea8-aeb0-a393a2530ed2.webp?v=1724760991&width=608'
    ],
    features: ['Test Grade', 'Professional Quality', 'Superior Protection', 'Comfortable Padding'],
    description: 'SG Test Wicket Keeping Gloves designed for test-level cricket with professional-grade protection.',
    reviews: 0
  }
];

// Helper functions
export const getWicketKeepingByBrand = (brandId) => {
  if (brandId === 'all') return wicketKeepingGloves;
  return wicketKeepingGloves.filter(glove => glove.brandId === brandId);
};

export const getInStockWicketKeeping = () => {
  return wicketKeepingGloves.filter(glove => glove.inStock);
};
