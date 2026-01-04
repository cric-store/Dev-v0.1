// Cricket Footwear Collection Data

export const footwearBrands = [
  { id: 'all', name: 'All Brands', count: 6 },
  { id: 'asics', name: 'Asics', count: 1 },
  { id: 'dsc', name: 'DSC', count: 2 },
  { id: 'puma', name: 'Puma', count: 1 },
  { id: 'kookaburra', name: 'Kookaburra', count: 1 },
  { id: 'new-balance', name: 'New Balance', count: 1 }
];

export const footwearProducts = [
  {
    id: 'fw-1',
    brand: 'Asics',
    brandId: 'asics',
    name: 'Asics Gel Peake 2 White Stadium Orange Rubber Studs Shoes',
    price: 6100,
    originalPrice: 6999,
    discount: 13,
    inStock: true,
    type: 'Rubber Studs',
    images: [
      'https://crickstore.com/cdn/shop/files/rn-image_picker_lib_temp_7c068b04-34ff-412e-b87f-a8b9c185cc45.jpg?v=1725111873&width=608'
    ],
    features: ['Gel Cushioning', 'Rubber Studs', 'All-Rounder', 'Premium Comfort'],
    description: 'Asics Gel Peake 2 cricket shoes with superior gel cushioning technology for all-day comfort on the field.',
    reviews: 2
  },
  {
    id: 'fw-2',
    brand: 'DSC',
    brandId: 'dsc',
    name: 'DSC Jaffa Neo Cricket Shoes - Sky Blue Orange',
    price: 2089,
    originalPrice: 2199,
    discount: 6,
    inStock: true,
    type: 'Rubber Studs',
    images: [
      'https://crickstore.com/cdn/shop/files/dsc-jaffa-neo-orange-1.jpg?v=1739779056&width=608',
      'https://crickstore.com/cdn/shop/files/dsc-jaffa-neo-orange-7_1.jpg?v=1739779056&width=608'
    ],
    features: ['Lightweight Design', 'Rubber Studs', 'Breathable', 'Value for Money'],
    description: 'DSC Jaffa Neo cricket shoes in vibrant sky blue and orange colorway with excellent grip.',
    reviews: 0
  },
  {
    id: 'fw-3',
    brand: 'DSC',
    brandId: 'dsc',
    name: 'DSC Superstorm Rubber Studs Cricket Shoes',
    price: 1400,
    originalPrice: 1599,
    discount: 13,
    inStock: true,
    type: 'Rubber Studs',
    images: [
      'https://crickstore.com/cdn/shop/files/rn-image_picker_lib_temp_1a7d8238-fd01-4668-a039-3592ddef4249.webp?v=1753378958&width=608',
      'https://crickstore.com/cdn/shop/files/rn-image_picker_lib_temp_1802ab92-1952-44e0-9f84-1926647d3263.webp?v=1753378958&width=608'
    ],
    features: ['Budget Friendly', 'Rubber Studs', 'Durable', 'Good Grip'],
    description: 'DSC Superstorm cricket shoes offering great value with reliable performance on the pitch.',
    reviews: 0
  },
  {
    id: 'fw-4',
    brand: 'Puma',
    brandId: 'puma',
    name: 'Puma 22FH Vibrant Yellow Puma Green Rubber Studs',
    price: 3750,
    originalPrice: 6499,
    discount: 43,
    inStock: true,
    type: 'Rubber Studs',
    images: [
      'https://crickstore.com/cdn/shop/files/whatsapp_image_2023-08-08_at_12.31.51_pm_1.jpg?v=1725030997&width=608',
      'https://crickstore.com/cdn/shop/files/whatsapp_image_2023-08-08_at_12.31.51_pm.jpg?v=1725030998&width=608'
    ],
    features: ['Puma Quality', 'Vibrant Colors', 'Rubber Studs', 'Professional Grade'],
    description: 'Puma 22FH cricket shoes in eye-catching vibrant yellow and green colorway with premium build quality.',
    reviews: 0
  },
  {
    id: 'fw-5',
    brand: 'Kookaburra',
    brandId: 'kookaburra',
    name: 'Kookaburra Pro 2.0 Rubber Studs Cricket Shoes',
    price: 3200,
    originalPrice: 6499,
    discount: 51,
    inStock: true,
    type: 'Rubber Studs',
    images: [
      'https://crickstore.com/cdn/shop/files/1-KB.webp?v=1751258352&width=608',
      'https://crickstore.com/cdn/shop/files/2-KB.webp?v=1751258352&width=608'
    ],
    features: ['Pro Series', 'Australian Brand', 'Rubber Studs', 'Superior Grip'],
    description: 'Kookaburra Pro 2.0 cricket shoes from the renowned Australian brand with professional-grade performance.',
    reviews: 0
  },
  {
    id: 'fw-6',
    brand: 'New Balance',
    brandId: 'new-balance',
    name: 'New Balance CK4030N5 Mens Spikes Cricket Shoes',
    price: 10000,
    originalPrice: 11999,
    discount: 17,
    inStock: true,
    type: 'Spikes',
    images: [
      'https://crickstore.com/cdn/shop/files/31D88m-KDTL.jpg?v=1724852916&width=608',
      'https://crickstore.com/cdn/shop/files/41vECX_jn-L.jpg?v=1724852916&width=608'
    ],
    features: ['Metal Spikes', 'Premium Build', 'International Standard', 'Maximum Grip'],
    description: 'New Balance CK4030N5 professional cricket spikes designed for international-level performance.',
    reviews: 0
  }
];

// Helper functions
export const getFootwearByBrand = (brandId) => {
  if (brandId === 'all') return footwearProducts;
  return footwearProducts.filter(shoe => shoe.brandId === brandId);
};

export const getFootwearByType = (type) => {
  return footwearProducts.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
};

export const getInStockFootwear = () => {
  return footwearProducts.filter(shoe => shoe.inStock);
};
