// Batting Gloves Collection Data

export const battingGlovesBrands = [
  { id: 'all', name: 'All Brands', count: 6 },
  { id: 'versant', name: 'Versant', count: 2 },
  { id: 'ss', name: 'SS', count: 2 },
  { id: 'sf', name: 'Stanford', count: 1 },
  { id: 'sg', name: 'SG', count: 1 }
];

export const battingGloves = [
  {
    id: 'bg-1',
    brand: 'Versant',
    brandId: 'versant',
    name: 'Versant GOAT Cricket Batting Gloves',
    price: 3909,
    originalPrice: 4599,
    discount: 16,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/61OGqYflZ4L._SX569.jpg?v=1751964029&width=608',
      'https://crickstore.com/cdn/shop/files/33_944c43b3-0fd2-4ef9-a2ce-635e5a0f5987.png?v=1763790078&width=608'
    ],
    features: ['Premium Leather', 'Split Finger Design', 'High Impact Protection', 'Comfortable Fit'],
    description: 'Versant GOAT Cricket Batting Gloves featuring premium leather construction with modern split finger design for enhanced flexibility.',
    reviews: 0
  },
  {
    id: 'bg-2',
    brand: 'Versant',
    brandId: 'versant',
    name: 'Versant Showman Shubman Gill Player Edition Batting Gloves',
    price: 4670,
    originalPrice: 5499,
    discount: 16,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/rn-image_picker_lib_temp_14b7d8f5-d25b-49fd-a6c6-44f97c988932.jpg?v=1758700360&width=608',
      'https://crickstore.com/cdn/shop/files/94.png?v=1763791424&width=608'
    ],
    features: ['Player Edition', 'Shubman Gill Design', 'Premium Quality', 'Professional Grade'],
    description: 'Versant Showman batting gloves - Shubman Gill Player Edition with signature design and premium materials.',
    reviews: 0
  },
  {
    id: 'bg-3',
    brand: 'SS',
    brandId: 'ss',
    name: 'SS Super Test All White Cricket Batting Gloves',
    price: 3150,
    originalPrice: 3635,
    discount: 14,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/img_20200415_184859_1_clipped_rev_1_p.png?v=1724672286&width=608',
      'https://crickstore.com/cdn/shop/files/img_20200415_185015_clipped_rev_1_p.png?v=1724672286&width=608'
    ],
    features: ['All White Design', 'Test Match Quality', 'High Grade Leather', 'Traditional Sausage Design'],
    description: 'SS Super Test All White Cricket Batting Gloves designed for test cricket with premium leather and classic design.',
    reviews: 0
  },
  {
    id: 'bg-4',
    brand: 'SS',
    brandId: 'ss',
    name: 'SS Dragon Cricket Batting Gloves',
    price: 2466,
    originalPrice: 2740,
    discount: 10,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/whatsapp_image_2024-03-27_at_3.11.09_pm_2__clipped_rev_1_1.png?v=1724671549&width=608',
      'https://crickstore.com/cdn/shop/files/whatsapp_image_2024-03-27_at_3.11.08_pm_clipped_rev_1.png?v=1724671550&width=608'
    ],
    features: ['Dragon Design', 'Lightweight', 'Excellent Grip', 'Modern Style'],
    description: 'SS Dragon Cricket Batting Gloves with modern dragon design and lightweight construction.',
    reviews: 0
  },
  {
    id: 'bg-5',
    brand: 'Stanford',
    brandId: 'sf',
    name: 'Stanford SF NexGen Mens Batting Gloves',
    price: 2200,
    originalPrice: 2620,
    discount: 17,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/master-0004_Layer-2-copy_1.webp?v=1724175729&width=608',
      'https://crickstore.com/cdn/shop/files/master-0003_Color-Balance-1.webp?v=1724175729&width=608'
    ],
    features: ['NexGen Technology', 'Breathable Material', 'Secure Fit', 'Value for Money'],
    description: 'Stanford SF NexGen Mens Batting Gloves with advanced materials for comfort and protection.',
    reviews: 0
  },
  {
    id: 'bg-6',
    brand: 'SG',
    brandId: 'sg',
    name: 'SG Litevate White Cricket Batting Gloves',
    price: 2300,
    originalPrice: 2799,
    discount: 18,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/1_81cadf28-ff9c-4b8b-b26b-47431b336805.webp?v=1724669646&width=608',
      'https://crickstore.com/cdn/shop/files/2_95fcb5e7-69dd-4ef8-b8c4-86c565de92b0.webp?v=1724669646&width=608'
    ],
    features: ['Lightweight Design', 'White Color', 'Premium Padding', 'Professional Quality'],
    description: 'SG Litevate White Cricket Batting Gloves with lightweight construction for maximum comfort.',
    reviews: 0
  }
];

// Helper functions
export const getBattingGlovesByBrand = (brandId) => {
  if (brandId === 'all') return battingGloves;
  return battingGloves.filter(glove => glove.brandId === brandId);
};

export const getInStockBattingGloves = () => {
  return battingGloves.filter(glove => glove.inStock);
};
