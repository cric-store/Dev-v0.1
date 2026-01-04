// Protection Collection Data - Cricket body protection gear

export const protectionCategories = [
  { id: 'all', name: 'All Protection', count: 4 },
  { id: 'abdominal', name: 'Abdominal Guards', count: 1 },
  { id: 'thigh', name: 'Thigh Guards', count: 1 },
  { id: 'arm', name: 'Arm Guards', count: 1 },
  { id: 'chest', name: 'Chest Guards', count: 1 }
];

export const protectionProducts = [
  {
    id: 'prot-1',
    brand: 'SS',
    brandId: 'ss',
    category: 'abdominal',
    name: 'SS Player Series Abdo Guard',
    price: 165,
    originalPrice: 179,
    discount: 8,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/rn-image_picker_lib_temp_19399ba0-5489-4453-b9a1-53bd81a3723d.png?v=1752856511&width=608'
    ],
    features: ['Comfortable Fit', 'Lightweight Design', 'Premium Protection', 'Adjustable Strap'],
    description: 'SS Player Series Abdominal Guard offers essential protection with comfortable fit for all-day wear during cricket matches.',
    reviews: 0
  },
  {
    id: 'prot-2',
    brand: 'SG',
    brandId: 'sg',
    category: 'thigh',
    name: 'SG Combo Thigh Guard',
    price: 899,
    originalPrice: 1099,
    discount: 19,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/1_1d908f41-69a1-486b-92a5-d44aea1a03b4.webp?v=1724829477&width=608'
    ],
    features: ['Dual Thigh Protection', 'Inner & Outer Guard', 'Velcro Straps', 'Impact Resistant'],
    description: 'SG Combo Thigh Guard provides comprehensive protection for both inner and outer thigh with secure velcro straps.',
    reviews: 0
  },
  {
    id: 'prot-3',
    brand: 'DSC',
    brandId: 'dsc',
    category: 'arm',
    name: 'DSC Intense Passion Arm Guard',
    price: 450,
    originalPrice: 549,
    discount: 18,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/IMG20241023141206.jpg?v=1730261952&width=608'
    ],
    features: ['Forearm Protection', 'Breathable Material', 'Secure Fit', 'Lightweight'],
    description: 'DSC Intense Passion Arm Guard offers reliable forearm protection with breathable design for maximum comfort.',
    reviews: 0
  },
  {
    id: 'prot-4',
    brand: 'GM',
    brandId: 'gm',
    category: 'chest',
    name: 'GM Original Chest Guard',
    price: 799,
    originalPrice: 999,
    discount: 20,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/Untitleddesign_51.webp?v=1752216143&width=608'
    ],
    features: ['Full Chest Coverage', 'Shock Absorbing Foam', 'Adjustable Straps', 'Professional Grade'],
    description: 'GM Original Chest Guard provides professional-grade chest protection with shock-absorbing foam padding.',
    reviews: 0
  }
];

// Helper functions
export const getProtectionByCategory = (categoryId) => {
  if (categoryId === 'all') return protectionProducts;
  return protectionProducts.filter(product => product.category === categoryId);
};

export const getInStockProtection = () => {
  return protectionProducts.filter(product => product.inStock);
};
