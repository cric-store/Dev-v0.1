// Batting Pads Collection Data - One per brand

export const battingPadsBrands = [
  { id: 'all', name: 'All Brands', count: 9 },
  { id: 'stanford', name: 'Stanford', count: 1 },
  { id: 'sg', name: 'SG', count: 1 },
  { id: 'ss', name: 'SS', count: 1 },
  { id: 'dsc', name: 'DSC', count: 1 },
  { id: 'mrf', name: 'MRF', count: 1 },
  { id: 'versant', name: 'Versant', count: 1 },
  { id: 'moonwalkr', name: 'Moonwalkr', count: 1 },
  { id: 'gray-nicolls', name: 'Gray Nicolls', count: 1 },
  { id: 'morrant', name: 'Morrant', count: 1 }
];

export const battingPads = [
  {
    id: 'bp-1',
    brand: 'Stanford',
    brandId: 'stanford',
    name: 'SF Ultralite Moulded Batting Pads',
    price: 2622,
    originalPrice: 2980,
    discount: 13,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/ultralite-moulded_0000_COMBO-scaled.webp?v=1731300115&width=608',
      'https://crickstore.com/cdn/shop/files/ultralite-moulded_0001_BACK-scaled.webp?v=1731300115&width=608'
    ],
    features: ['Ultralite Design', 'Moulded Construction', 'Lightweight', 'Comfortable Fit'],
    description: 'SF Ultralite Moulded Batting Pads offer excellent protection with a lightweight design perfect for long innings.',
    reviews: 0
  },
  {
    id: 'bp-2',
    brand: 'SG',
    brandId: 'sg',
    name: 'SG Test White Batting Pads',
    price: 4311,
    originalPrice: 4899,
    discount: 13,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/1_1d908f41-69a1-486b-92a5-d44aea1a03b4.webp?v=1724829477&width=608',
      'https://crickstore.com/cdn/shop/files/2_6fc019ec-bf93-4b14-a820-f3b9bce5ee2c.webp?v=1724829477&width=608'
    ],
    features: ['Test Grade', 'Premium White', 'High Impact Protection', 'SG Quality'],
    description: 'SG Test White Batting Pads are designed for professional-level cricket with superior protection and comfort.',
    reviews: 0
  },
  {
    id: 'bp-3',
    brand: 'SS',
    brandId: 'ss',
    name: 'SS Test Opener Players Black Colored Batting Pads',
    price: 4250,
    originalPrice: 5200,
    discount: 19,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/img20220713140419_clipped_rev_1.png?v=1724832808&width=608',
      'https://crickstore.com/cdn/shop/files/img20220713135730_clipped_rev_1.png?v=1724832808&width=608'
    ],
    features: ['Test Opener Series', 'Players Grade', 'Black Design', 'Premium Protection'],
    description: 'SS Test Opener Players Grade batting pads in striking black color. Premium protection for serious cricketers.',
    reviews: 0
  },
  {
    id: 'bp-4',
    brand: 'DSC',
    brandId: 'dsc',
    name: 'DSC Flexlite 2 Strap Molded Batting Pads',
    price: 5355,
    originalPrice: 6299,
    discount: 15,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/IMG20241023141206.jpg?v=1730261952&width=608',
      'https://crickstore.com/cdn/shop/files/IMG20241023141242.jpg?v=1730261952&width=608'
    ],
    features: ['Flexlite Technology', '2 Strap Design', 'Molded Construction', 'Secure Fit'],
    description: 'DSC Flexlite featuring innovative 2-strap design with molded construction for optimal flexibility and protection.',
    reviews: 0
  },
  {
    id: 'bp-5',
    brand: 'MRF',
    brandId: 'mrf',
    name: 'MRF Game Changer Cricket Batting Pads - Virat Kohli',
    price: 4549,
    originalPrice: 5190,
    discount: 13,
    inStock: false,
    playerEdition: 'Virat Kohli',
    images: [
      'https://crickstore.com/cdn/shop/files/mrf_genius_le_batting_pads_1.png?v=1724757238&width=608',
      'https://crickstore.com/cdn/shop/files/mrf_genius_le_batting_pads_1.png?v=1724757238&width=608'
    ],
    features: ['Virat Kohli Edition', 'Game Changer Series', 'Premium Build', 'MRF Quality'],
    description: 'MRF Game Changer batting pads endorsed by Virat Kohli. Premium protection with iconic MRF quality.',
    reviews: 0
  },
  {
    id: 'bp-6',
    brand: 'Versant',
    brandId: 'versant',
    name: 'Versant OG 2-Strap Molded Batting Pads',
    price: 5500,
    originalPrice: 6199,
    discount: 12,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/51.png?v=1763794957&width=608',
      'https://crickstore.com/cdn/shop/files/58.png?v=1763794962&width=608'
    ],
    features: ['OG Series', '2-Strap Molded', 'Modern Design', 'Premium Quality'],
    description: 'Versant OG 2-Strap Molded Batting Pads with modern design and premium construction.',
    reviews: 0
  },
  {
    id: 'bp-7',
    brand: 'Moonwalkr',
    brandId: 'moonwalkr',
    name: 'Moonwalkr Cricket Batting Pads 2.0',
    price: 2699,
    originalPrice: 2999,
    discount: 11,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/batter-leg-guard-NAVY-3.webp?v=1725037808&width=608',
      'https://crickstore.com/cdn/shop/files/batter-leg-guard-white-3.webp?v=1725037807&width=608'
    ],
    features: ['2.0 Version', 'Innovative Design', 'Lightweight', 'Modern Protection'],
    description: 'Moonwalkr Cricket Batting Pads 2.0 with innovative design and lightweight construction.',
    reviews: 0
  },
  {
    id: 'bp-8',
    brand: 'Gray Nicolls',
    brandId: 'gray-nicolls',
    name: 'Gray Nicolls GN4 Enforcer Cricket Batting Pads',
    price: 3500,
    originalPrice: 3999,
    discount: 13,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/1_1d908f41-69a1-486b-92a5-d44aea1a03b4.webp?v=1724829477&width=608',
      'https://crickstore.com/cdn/shop/files/2_6fc019ec-bf93-4b14-a820-f3b9bce5ee2c.webp?v=1724829477&width=608'
    ],
    features: ['GN4 Series', 'Enforcer Design', 'British Quality', 'Professional Grade'],
    description: 'Gray Nicolls GN4 Enforcer batting pads with British heritage and professional-grade protection.',
    reviews: 0
  },
  {
    id: 'bp-9',
    brand: 'Morrant',
    brandId: 'morrant',
    name: 'Morrant Super Ultralite Batting Pads',
    price: 2999,
    originalPrice: 3499,
    discount: 15,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/clublite_0000_COMBO-570x684.webp?v=1724580570&width=608',
      'https://crickstore.com/cdn/shop/files/clublite_0001_BACK-scaled.webp?v=1724580570&width=608'
    ],
    features: ['Super Ultralite', 'Quality Build', 'Comfortable', 'Value for Money'],
    description: 'Morrant Super Ultralite batting pads offering excellent value with quality construction.',
    reviews: 0
  }
];

// Helper functions
export const getBattingPadsByBrand = (brandId) => {
  if (brandId === 'all') return battingPads;
  return battingPads.filter(pad => pad.brandId === brandId);
};

export const getInStockBattingPads = () => {
  return battingPads.filter(pad => pad.inStock);
};
