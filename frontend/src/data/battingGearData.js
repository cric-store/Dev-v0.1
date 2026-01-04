// Batting Gear Collection Data - 4 Products

export const battingGearBrands = [
  { id: 'all', name: 'All Brands', count: 4 },
  { id: 'gray-nicolls', name: 'Gray Nicolls', count: 2 },
  { id: 'kookaburra', name: 'Kookaburra', count: 1 },
  { id: 'sg', name: 'SG', count: 1 }
];

export const battingGear = [
  {
    id: 'bg-1',
    brand: 'Gray Nicolls',
    brandId: 'gray-nicolls',
    name: 'Gray Nicolls Gold Edition Cricket Batting Gloves',
    type: 'Batting Gloves',
    price: 3825,
    originalPrice: 4199,
    discount: 9,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/img-20230403-wa0021_clipped_rev_1_1.png?v=1724833954&width=608',
      'https://crickstore.com/cdn/shop/files/img-20230403-wa0025_clipped_rev_1_1.png?v=1724833954&width=608'
    ],
    features: ['Premium Leather Palm', 'High Density Foam', 'Sweat Absorbent Lining', 'Flexible Fingers'],
    description: 'Gray Nicolls Gold Edition batting gloves offer premium protection with superior comfort. Features high-density foam padding and genuine leather palm for excellent grip.',
    reviews: 0
  },
  {
    id: 'bg-2',
    brand: 'Gray Nicolls',
    brandId: 'gray-nicolls',
    name: 'Gray Nicolls GN8 Test Cricket Batting Gloves',
    type: 'Batting Gloves',
    price: 3349,
    originalPrice: 3799,
    discount: 12,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/img-20230403-wa0011_clipped_rev_1_1.png?v=1724833678&width=608',
      'https://crickstore.com/cdn/shop/files/img-20230403-wa0030_clipped_rev_1.png?v=1724833678&width=608'
    ],
    features: ['Test Grade Protection', 'Pittard Leather Palm', 'Pre-curved Fingers', 'Ventilated Design'],
    description: 'The GN8 Test gloves are designed for professional-level cricket. Pittard leather palm provides excellent grip in all conditions.',
    reviews: 0
  },
  {
    id: 'bg-3',
    brand: 'Kookaburra',
    brandId: 'kookaburra',
    name: 'Kookaburra CSK Kahuna Players IPL Edition Batting Gloves',
    type: 'Batting Gloves',
    price: 3869,
    originalPrice: 4299,
    discount: 11,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/whatsapp_image_2021-04-24_at_6.28.30_pm_clipped_rev_1_-_copy.png?v=1725014658&width=608',
      'https://crickstore.com/cdn/shop/files/whatsapp_image_2021-04-24_at_6.11.29_pm_2__clipped_rev_1_-_copy.png?v=1725014658&width=608'
    ],
    features: ['CSK IPL Edition', 'Kahuna Players Grade', 'Premium Protection', 'Yellow Design'],
    description: 'Official Chennai Super Kings IPL Edition batting gloves from Kookaburra. Kahuna Players grade with premium protection and iconic yellow design.',
    reviews: 0
  },
  {
    id: 'bg-4',
    brand: 'SG',
    brandId: 'sg',
    name: 'SG Test Pro Batting Gloves',
    type: 'Batting Gloves',
    price: 2999,
    originalPrice: 3499,
    discount: 15,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/img-20230403-wa0021_clipped_rev_1_1.png?v=1724833954&width=608',
      'https://crickstore.com/cdn/shop/files/img-20230403-wa0025_clipped_rev_1_1.png?v=1724833954&width=608'
    ],
    features: ['Test Grade', 'Leather Palm', 'High Impact Protection', 'SG Quality'],
    description: 'SG Test Pro batting gloves offer professional-level protection with premium leather palm and high-density foam padding.',
    reviews: 0
  }
];

// Helper functions
export const getBattingGearByBrand = (brandId) => {
  if (brandId === 'all') return battingGear;
  return battingGear.filter(item => item.brandId === brandId);
};

export const getInStockBattingGear = () => {
  return battingGear.filter(item => item.inStock);
};
