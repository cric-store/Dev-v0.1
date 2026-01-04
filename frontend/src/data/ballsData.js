// Cricket Balls Collection Data

export const ballsBrands = [
  { id: 'all', name: 'All Brands', count: 5 },
  { id: 'crickstore', name: 'Crickstore', count: 1 },
  { id: 'sf', name: 'Stanford', count: 1 },
  { id: 'sg', name: 'SG', count: 2 },
  { id: 'kookaburra', name: 'Kookaburra', count: 1 }
];

export const cricketBalls = [
  {
    id: 'ball-1',
    brand: 'Crickstore',
    brandId: 'crickstore',
    name: 'Crickstore League Special White Cricket Balls',
    price: 489,
    originalPrice: 549,
    discount: 11,
    inStock: true,
    color: 'White',
    images: [
      'https://crickstore.com/cdn/shop/files/crickstore_league_special_cricket_balls_white.png?v=1724046283&width=608'
    ],
    features: ['League Quality', 'White Color', 'Leather Construction', 'T20 Format'],
    description: 'Crickstore League Special White Cricket Balls perfect for limited overs cricket with excellent seam and swing.',
    reviews: 2
  },
  {
    id: 'ball-2',
    brand: 'Stanford',
    brandId: 'sf',
    name: 'SF True Test Red Leather Cricket Ball',
    price: 450,
    originalPrice: 550,
    discount: 19,
    inStock: true,
    color: 'Red',
    images: [
      'https://crickstore.com/cdn/shop/files/true-test-red_0002_ticket-2-800x800.webp?v=1726166091&width=608'
    ],
    features: ['Test Quality', 'Red Color', 'Premium Leather', 'Long Format'],
    description: 'SF True Test Red Leather Cricket Ball designed for test match conditions with superior durability.',
    reviews: 0
  },
  {
    id: 'ball-3',
    brand: 'SG',
    brandId: 'sg',
    name: 'SG Club White Cricket Balls',
    price: 945,
    originalPrice: 1149,
    discount: 18,
    inStock: true,
    color: 'White',
    images: [
      'https://crickstore.com/cdn/shop/files/1_df6dd04e-ed6a-4c11-bcc6-f9ebdbf9b0c2.webp?v=1740943581&width=608',
      'https://crickstore.com/cdn/shop/files/3_11dff697-17a8-4021-a3fc-b2ee208be2fb.webp?v=1740943581&width=608'
    ],
    features: ['Club Level', 'White Color', 'SG Quality', 'All Formats'],
    description: 'SG Club White Cricket Balls offering excellent quality for club-level cricket matches.',
    reviews: 0
  },
  {
    id: 'ball-4',
    brand: 'SG',
    brandId: 'sg',
    name: 'SG Club Leather Cricket Ball Red',
    price: 719,
    originalPrice: 849,
    discount: 16,
    inStock: true,
    color: 'Red',
    images: [
      'https://crickstore.com/cdn/shop/files/1_8c479ac1-848c-4a39-8e15-92f9c447db63.webp?v=1740935815&width=608',
      'https://crickstore.com/cdn/shop/files/3_3d22afa4-4a81-4b33-9fa4-91f9b4b14e68.webp?v=1740935815&width=608'
    ],
    features: ['Club Level', 'Red Color', 'Premium Leather', 'Test Format'],
    description: 'SG Club Leather Cricket Ball in classic red color for traditional cricket matches.',
    reviews: 0
  },
  {
    id: 'ball-5',
    brand: 'Kookaburra',
    brandId: 'kookaburra',
    name: 'Kookaburra Speed Leather Cricket Ball White',
    price: 1250,
    originalPrice: 1549,
    discount: 20,
    inStock: true,
    color: 'White',
    images: [
      'https://crickstore.com/cdn/shop/files/KB01CB5-SpeedWhiteCricketBall-1_e529381b-8774-4093-936c-5d2c7d8647b2.webp?v=1752137193&width=608',
      'https://crickstore.com/cdn/shop/files/KB01CB5-SpeedWhiteCricketBall-2_eb55a134-7be7-4cf9-8b94-b3856c3ecff3.webp?v=1752137193&width=608'
    ],
    features: ['Premium Quality', 'White Color', 'Australian Brand', 'International Standard'],
    description: 'Kookaburra Speed Leather Cricket Ball White - premium quality ball used in international cricket.',
    reviews: 0
  }
];

// Helper functions
export const getBallsByBrand = (brandId) => {
  if (brandId === 'all') return cricketBalls;
  return cricketBalls.filter(ball => ball.brandId === brandId);
};

export const getBallsByColor = (color) => {
  return cricketBalls.filter(ball => ball.color.toLowerCase() === color.toLowerCase());
};

export const getInStockBalls = () => {
  return cricketBalls.filter(ball => ball.inStock);
};
