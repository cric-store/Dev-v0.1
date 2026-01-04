// Kit Bags Collection Data - 33 Products from various brands

export const kitBagsBrands = [
  { id: 'all', name: 'All Brands', count: 33 },
  { id: 'stanford', name: 'Stanford', count: 6 },
  { id: 'shrey', name: 'Shrey', count: 5 },
  { id: 'sg', name: 'SG', count: 4 },
  { id: 'gray-nicolls', name: 'Gray Nicolls', count: 4 },
  { id: 'kookaburra', name: 'Kookaburra', count: 3 },
  { id: 'mrf', name: 'MRF', count: 2 },
  { id: 'gravity', name: 'Gravity', count: 2 },
  { id: 'sf', name: 'SF', count: 1 },
  { id: 'versant', name: 'Versant', count: 1 }
];

export const kitBags = [
  // Page 1 Products
  {
    id: 'kb-1',
    brand: 'Stanford',
    brandId: 'stanford',
    name: 'SF COBRA 2.0 Duffle Wheelie Kitbag',
    type: 'Duffle Wheelie',
    price: 2329,
    originalPrice: 2740,
    discount: 15,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/master-cobra-2_0002_1.webp?v=1740595032&width=608',
      'https://crickstore.com/cdn/shop/files/master-cobra-2_0001_2.webp?v=1740595032&width=608'
    ],
    features: ['Heavy Duty Wheels', 'Multiple Compartments', 'Padded Straps', 'Water Resistant'],
    description: 'The SF Cobra 2.0 Duffle Wheelie is perfect for junior and senior players looking for a reliable kit bag with smooth wheels for easy transport.',
    capacity: '80 Liters',
    material: 'Polyester 600D',
    dimensions: '85 x 35 x 35 cm',
    reviews: 0
  },
  {
    id: 'kb-2',
    brand: 'MRF',
    brandId: 'mrf',
    name: 'MRF Genius Limited Edition VK 18 LE Full Duffle Cricket Kit Bag',
    type: 'Full Duffle',
    price: 4250,
    originalPrice: 4850,
    discount: 13,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/mrf-kitbag-vk18-le_0_0.png?v=1725384073&width=608',
      'https://crickstore.com/cdn/shop/files/mrf-kitbag-vk18-le_0_0.png?v=1725384073&width=608'
    ],
    features: ['VK18 Limited Edition', 'Premium Material', 'Extra Padding', 'Bat Compartment'],
    description: 'The MRF Genius VK18 Limited Edition is the ultimate cricket kit bag for Virat Kohli fans. Premium construction with spacious compartments.',
    capacity: '100 Liters',
    material: 'Premium Polyester',
    dimensions: '90 x 38 x 38 cm',
    reviews: 2
  },
  {
    id: 'kb-3',
    brand: 'MRF',
    brandId: 'mrf',
    name: 'MRF Genius Virat Kohli VK18 Sr Duffle Wheelie Kit Bag',
    type: 'Duffle Wheelie',
    price: 3200,
    originalPrice: 3869,
    discount: 18,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/mrf-kitbag-vk-18-sr_0_0.png?v=1725384436&width=608',
      'https://crickstore.com/cdn/shop/files/mrf-kitbag-vk-18-sr_0_0.png?v=1725384436&width=608'
    ],
    features: ['Wheelie Design', 'VK18 Branding', 'Durable Construction', 'Easy Maneuver'],
    description: 'Senior size duffle wheelie bag with Virat Kohli VK18 signature branding. Perfect for club and league cricketers.',
    capacity: '90 Liters',
    material: 'Polyester',
    dimensions: '88 x 36 x 36 cm',
    reviews: 0
  },
  {
    id: 'kb-4',
    brand: 'Shrey',
    brandId: 'shrey',
    name: 'Shrey Kare Duffle Cricket Kit Bag',
    type: 'Duffle',
    price: 1760,
    originalPrice: 1999,
    discount: 12,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/SHREY_KARE_DUFFLE_1785_RED_2_HD_iI0pS5DtAA_18daa988-03fb-49d1-ac29-426701b63274.webp?v=1724386227&width=608',
      'https://crickstore.com/cdn/shop/files/SHREY_KARE_DUFFLE_1785_RED_1_HD_xY6DEIkhT7.webp?v=1724386121&width=608'
    ],
    features: ['Lightweight Design', 'Shoulder Straps', 'Multiple Pockets', 'Ventilated'],
    description: 'The Shrey Kare Duffle is an affordable yet durable option for beginners and intermediate players.',
    capacity: '70 Liters',
    material: 'Polyester 420D',
    dimensions: '75 x 32 x 32 cm',
    reviews: 0
  },
  {
    id: 'kb-5',
    brand: 'Shrey',
    brandId: 'shrey',
    name: 'Shrey Kare Wheelie Cricket Bag',
    type: 'Wheelie',
    price: 2250,
    originalPrice: 2599,
    discount: 14,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/SHREY_KARE_WHEELIE_1786_CERULEAN_1_HD_X8CJsDA5W.webp?v=1724655386&width=608',
      'https://crickstore.com/cdn/shop/files/SHREY_KARE_WHEELIE_1786_CERULEAN_2_HD_3Fz3wKHre.webp?v=1724655386&width=608'
    ],
    features: ['Smooth Wheels', 'Telescopic Handle', 'Padded Interior', 'Side Pockets'],
    description: 'Wheelie version of the popular Shrey Kare bag. Easy to transport with quality wheels and sturdy handle.',
    capacity: '85 Liters',
    material: 'Polyester 420D',
    dimensions: '82 x 34 x 34 cm',
    reviews: 0
  },
  {
    id: 'kb-6',
    brand: 'SG',
    brandId: 'sg',
    name: 'SG 22 Yards Duffle Kit Bag',
    type: 'Duffle',
    price: 4200,
    originalPrice: 4849,
    discount: 14,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/22YardkitBag.webp?v=1727271104&width=608',
      'https://crickstore.com/cdn/shop/files/22Yard3.webp?v=1727271104&width=608'
    ],
    features: ['22 Yards Design', 'Premium Quality', 'Large Capacity', 'Reinforced Base'],
    description: 'SG 22 Yards is a premium duffle bag with ample space for all your cricket gear. Trusted by professionals.',
    capacity: '95 Liters',
    material: 'Heavy Duty Polyester',
    dimensions: '88 x 38 x 38 cm',
    reviews: 0
  },
  {
    id: 'kb-7',
    brand: 'Stanford',
    brandId: 'stanford',
    name: 'SF Prestige Duffle Wheelie Kit Bag',
    type: 'Duffle Wheelie',
    price: 3859,
    originalPrice: 4540,
    discount: 15,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/prestige-0003_prestige.webp?v=1725901355&width=608',
      'https://crickstore.com/cdn/shop/files/prestige-0000_prestige-4.webp?v=1725901355&width=608'
    ],
    features: ['Premium Finish', 'Heavy Duty Wheels', 'Separate Bat Section', 'Shoe Compartment'],
    description: 'The SF Prestige offers a perfect blend of style and functionality. Ideal for serious cricketers.',
    capacity: '90 Liters',
    material: 'Premium Polyester 600D',
    dimensions: '86 x 36 x 36 cm',
    reviews: 1
  },
  {
    id: 'kb-8',
    brand: 'Stanford',
    brandId: 'stanford',
    name: 'SF Panther Pro Duffle Wheelie Kit Bag',
    type: 'Duffle Wheelie',
    price: 1200,
    originalPrice: 1420,
    discount: 16,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/Panther-bags_0001_Panther-Pro-570x684.webp?v=1765527823&width=608',
      'https://crickstore.com/cdn/shop/files/Bag_0005_Panther-Pro-combo-1707x2048.webp?v=1765527840&width=608'
    ],
    features: ['Budget Friendly', 'Compact Design', 'Easy Transport', 'Durable Zippers'],
    description: 'Entry level wheelie bag from SF. Perfect for beginners and juniors starting their cricket journey.',
    capacity: '65 Liters',
    material: 'Polyester',
    dimensions: '78 x 30 x 30 cm',
    reviews: 0
  },
  {
    id: 'kb-9',
    brand: 'Stanford',
    brandId: 'stanford',
    name: 'SUMMIT 222 DUFFLE KIT BAG',
    type: 'Duffle',
    price: 3150,
    originalPrice: 3700,
    discount: 15,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/summit-222_0001_2-570x570.webp?v=1742200070&width=608',
      'https://crickstore.com/cdn/shop/files/summit-222_0002_1-570x570.webp?v=1742200081&width=608'
    ],
    features: ['222 Series', 'Spacious Interior', 'Quality Material', 'Comfortable Straps'],
    description: 'The Summit 222 is a mid-range duffle bag that offers excellent value for money with premium features.',
    capacity: '85 Liters',
    material: 'Polyester 500D',
    dimensions: '84 x 35 x 35 cm',
    reviews: 0
  },
  {
    id: 'kb-10',
    brand: 'Kookaburra',
    brandId: 'kookaburra',
    name: 'Kookaburra Pro Duffle 100 Kit Bag',
    type: 'Duffle',
    price: 4550,
    originalPrice: 5449,
    discount: 17,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/ProDuffle100-KitBag-1_313483a9-3b48-4d84-94aa-9eae268ec157.webp?v=1724592620&width=608',
      'https://crickstore.com/cdn/shop/files/ProDuffle100-KitBag-2_8ced4edf-39cb-4977-9c90-5377d766f084.webp?v=1724592620&width=608'
    ],
    features: ['Australian Brand', 'Pro Series', '100L Capacity', 'Weather Resistant'],
    description: 'Kookaburra Pro Duffle 100 is trusted by international cricketers. Premium construction with iconic branding.',
    capacity: '100 Liters',
    material: 'Premium Polyester',
    dimensions: '90 x 40 x 40 cm',
    reviews: 0
  },
  {
    id: 'kb-11',
    brand: 'Stanford',
    brandId: 'stanford',
    name: 'SF Alamandus Players Duffle Kit Bag',
    type: 'Duffle',
    price: 2000,
    originalPrice: 2380,
    discount: 16,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/almandus-players-0001_2.webp?v=1725902070&width=608',
      'https://crickstore.com/cdn/shop/files/almandus-players-0002_1.webp?v=1725902069&width=608'
    ],
    features: ['Players Choice', 'Ergonomic Design', 'Multiple Sections', 'Air Mesh Padding'],
    description: 'The Alamandus Players Duffle is designed with input from professional cricketers for optimal organization.',
    capacity: '80 Liters',
    material: 'Polyester 500D',
    dimensions: '82 x 34 x 34 cm',
    reviews: 0
  },
  {
    id: 'kb-12',
    brand: 'Kookaburra',
    brandId: 'kookaburra',
    name: 'Kookaburra Pro Duffle 500 Cricket Kit Bag',
    type: 'Duffle',
    price: 4690,
    originalPrice: 5599,
    discount: 17,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/ProDuffle500-KitBag-1_5e951b30-ca43-4f27-9895-998c2d4fe3c3.webp?v=1724592184&width=608',
      'https://crickstore.com/cdn/shop/files/ProDuffle500-KitBag-2_b997bc18-091e-4a58-82c8-18ed68a44468.webp?v=1724592184&width=608'
    ],
    features: ['500 Series', 'Pro Level', 'Extra Large', 'Reinforced Bottom'],
    description: 'The flagship Kookaburra Pro Duffle 500 offers maximum space and durability for serious cricketers.',
    capacity: '110 Liters',
    material: 'Heavy Duty Polyester',
    dimensions: '92 x 42 x 42 cm',
    reviews: 0
  },
  // Page 2 Products
  {
    id: 'kb-13',
    brand: 'Gray Nicolls',
    brandId: 'gray-nicolls',
    name: 'Gray Nicolls GN9 International Wheelie Duffle - Navy Teal Green Kit Bag',
    type: 'Wheelie Duffle',
    price: 5700,
    originalPrice: 6600,
    discount: 14,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/gn_green_2_1.png?v=1724665385&width=608',
      'https://crickstore.com/cdn/shop/files/gn_green_3.png?v=1724665386&width=608'
    ],
    features: ['International Quality', 'GN9 Series', 'Smooth Wheelie', 'Premium Design'],
    description: 'Gray Nicolls GN9 International is the top-tier wheelie duffle from the British brand. Navy teal green colorway.',
    capacity: '105 Liters',
    material: 'Premium Polyester',
    dimensions: '90 x 40 x 40 cm',
    reviews: 0
  },
  {
    id: 'kb-14',
    brand: 'Stanford',
    brandId: 'stanford',
    name: 'SF Panther Elite Duffle Kit Bag',
    type: 'Duffle',
    price: 780,
    originalPrice: 920,
    discount: 16,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/Panther-bags_0000_Panther-Elite-570x684.jpg?v=1765529080&width=608',
      'https://crickstore.com/cdn/shop/files/Bag_0008_Panther-Elite-combo-570x684.jpg?v=1765529102&width=608'
    ],
    features: ['Most Affordable', 'Compact Size', 'Junior Friendly', 'Basic Features'],
    description: 'The most budget-friendly option in our range. Perfect for juniors or casual players.',
    capacity: '55 Liters',
    material: 'Basic Polyester',
    dimensions: '70 x 28 x 28 cm',
    reviews: 0
  },
  {
    id: 'kb-15',
    brand: 'Versant',
    brandId: 'versant',
    name: 'Versant GC Duffle Wheelie Kit Bag',
    type: 'Duffle Wheelie',
    price: 5650,
    originalPrice: 6799,
    discount: 17,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/42.png?v=1763809031&width=608',
      'https://crickstore.com/cdn/shop/files/39.png?v=1763809046&width=608'
    ],
    features: ['Game Changer', 'Premium Wheels', 'Spacious', 'Modern Design'],
    description: 'Versant GC (Game Changer) is a premium wheelie duffle with modern aesthetics and functionality.',
    capacity: '100 Liters',
    material: 'Premium Polyester',
    dimensions: '88 x 38 x 38 cm',
    reviews: 0
  },
  {
    id: 'kb-16',
    brand: 'Kookaburra',
    brandId: 'kookaburra',
    name: 'Kookaburra Pro Duffle 1000 Kit Bag',
    type: 'Duffle',
    price: 5600,
    originalPrice: 7999,
    discount: 30,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/ProDuffle1000-KitBag-1_dac65f2a-56d3-49a6-8767-154dbf0d7083.webp?v=1753865831&width=608',
      'https://crickstore.com/cdn/shop/files/ProDuffle1000-KitBag-2_317373fe-b820-43ab-9fc4-e3b93e095e5f.webp?v=1753865831&width=608'
    ],
    features: ['1000 Series Flagship', 'Maximum Capacity', 'Professional Grade', 'Ultra Durable'],
    description: 'The ultimate Kookaburra bag - Pro Duffle 1000. Maximum capacity and durability for international players.',
    capacity: '120 Liters',
    material: 'Ultra Heavy Duty Polyester',
    dimensions: '95 x 45 x 45 cm',
    reviews: 0
  },
  {
    id: 'kb-17',
    brand: 'SF',
    brandId: 'sf',
    name: 'SF Triumph Wheelie Kit Bag',
    type: 'Wheelie',
    price: 6230,
    originalPrice: 7250,
    discount: 15,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/triumph_0003_triumph2-405x330.jpg?v=1752089073&width=608',
      'https://crickstore.com/cdn/shop/files/triumph_0002_triumph3.webp?v=1752089112&width=608'
    ],
    features: ['Triumph Series', 'Premium Wheelie', 'Professional Choice', 'Superior Construction'],
    description: 'SF Triumph is the premium wheelie bag from Stanford with top-notch construction and features.',
    capacity: '100 Liters',
    material: 'Premium Polyester 800D',
    dimensions: '90 x 40 x 40 cm',
    reviews: 1
  },
  {
    id: 'kb-18',
    brand: 'SG',
    brandId: 'sg',
    name: 'SG Batsman\'s Kit T20 Special',
    type: 'Complete Kit',
    price: 29540,
    originalPrice: 41000,
    discount: 28,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/22YardkitBag.webp?v=1727271104&width=608',
      'https://crickstore.com/cdn/shop/files/22Yard3.webp?v=1727271104&width=608'
    ],
    features: ['Complete Kit', 'T20 Special', 'All Equipment Included', 'Premium Selection'],
    description: 'Complete batsman kit including bat, pads, gloves, helmet and bag. Everything you need for T20 cricket.',
    capacity: 'Complete Kit',
    material: 'Various Premium',
    dimensions: 'Full Kit',
    reviews: 0
  },
  {
    id: 'kb-19',
    brand: 'SG',
    brandId: 'sg',
    name: 'SG RP 17 Cricket Duffle Wheelie Kit Bag',
    type: 'Duffle Wheelie',
    price: 6909,
    originalPrice: 6909,
    discount: 0,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/22YardkitBag.webp?v=1727271104&width=608',
      'https://crickstore.com/cdn/shop/files/22Yard3.webp?v=1727271104&width=608'
    ],
    features: ['RP17 Series', 'Premium Wheelie', 'Large Capacity', 'SG Quality'],
    description: 'SG RP17 is a premium wheelie duffle bag with excellent features and SG quality construction.',
    capacity: '100 Liters',
    material: 'Heavy Duty Polyester',
    dimensions: '90 x 40 x 40 cm',
    reviews: 0
  },
  {
    id: 'kb-20',
    brand: 'SG',
    brandId: 'sg',
    name: 'SG Optipak Kit Bag',
    type: 'Kit Bag',
    price: 1199,
    originalPrice: 1199,
    discount: 0,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/16_1-copy-2-scaled.webp?v=1724763576&width=608',
      'https://crickstore.com/cdn/shop/files/16_4-copy-2-scaled.webp?v=1724763576&width=608'
    ],
    features: ['Optimized Pack', 'Compact Design', 'Budget Option', 'SG Brand'],
    description: 'SG Optipak is a compact and budget-friendly option for recreational cricketers.',
    capacity: '60 Liters',
    material: 'Polyester',
    dimensions: '75 x 30 x 30 cm',
    reviews: 0
  },
  {
    id: 'kb-21',
    brand: 'SG',
    brandId: 'sg',
    name: 'SG Smartpak Kit Bag',
    type: 'Kit Bag',
    price: 2149,
    originalPrice: 2149,
    discount: 0,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/1-2.webp?v=1724763954&width=608',
      'https://crickstore.com/cdn/shop/files/5-2.webp?v=1724763954&width=608'
    ],
    features: ['Smart Design', 'Multiple Compartments', 'Organized Storage', 'Quality Build'],
    description: 'SG Smartpak features intelligent compartmentalization for organized gear storage.',
    capacity: '75 Liters',
    material: 'Polyester 500D',
    dimensions: '80 x 32 x 32 cm',
    reviews: 0
  },
  {
    id: 'kb-22',
    brand: 'Gray Nicolls',
    brandId: 'gray-nicolls',
    name: 'Gray Nicolls GN4 Enforcer Red Cricket Kit Bag',
    type: 'Kit Bag',
    price: 2999,
    originalPrice: 2999,
    discount: 0,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/gn_green_2_1.png?v=1724665385&width=608',
      'https://crickstore.com/cdn/shop/files/gn_green_3.png?v=1724665386&width=608'
    ],
    features: ['GN4 Series', 'Enforcer Design', 'Red Colorway', 'British Quality'],
    description: 'Gray Nicolls GN4 Enforcer in striking red. Mid-range bag with excellent features.',
    capacity: '80 Liters',
    material: 'Polyester',
    dimensions: '82 x 34 x 34 cm',
    reviews: 0
  },
  {
    id: 'kb-23',
    brand: 'Gray Nicolls',
    brandId: 'gray-nicolls',
    name: 'Gray Nicolls GN3 Power Duffle Kit Bag',
    type: 'Duffle',
    price: 1890,
    originalPrice: 2199,
    discount: 15,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/gn-ckb_002_ac_large_e685ffab-600a-4f44-b7b2-1003b0efa488.jpg?v=1726559377&width=608',
      'https://crickstore.com/cdn/shop/files/gn-ckb_002_ac_large_e685ffab-600a-4f44-b7b2-1003b0efa488.jpg?v=1726559377&width=608'
    ],
    features: ['GN3 Series', 'Power Design', 'Affordable', 'GN Quality'],
    description: 'Gray Nicolls GN3 Power Duffle is an affordable entry into the GN range with solid features.',
    capacity: '70 Liters',
    material: 'Polyester',
    dimensions: '78 x 32 x 32 cm',
    reviews: 0
  },
  {
    id: 'kb-24',
    brand: 'Gray Nicolls',
    brandId: 'gray-nicolls',
    name: 'Gray Nicolls GN3 Power Duffle Camo Kit Bag',
    type: 'Duffle',
    price: 2199,
    originalPrice: 2199,
    discount: 0,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/gn-ckb_002_ac_large_e685ffab-600a-4f44-b7b2-1003b0efa488.jpg?v=1726559377&width=608',
      'https://crickstore.com/cdn/shop/files/gn-ckb_002_ac_large_e685ffab-600a-4f44-b7b2-1003b0efa488.jpg?v=1726559377&width=608'
    ],
    features: ['Camo Design', 'GN3 Series', 'Unique Style', 'Same Quality'],
    description: 'Camouflage version of the popular GN3 Power Duffle for players who want to stand out.',
    capacity: '70 Liters',
    material: 'Polyester',
    dimensions: '78 x 32 x 32 cm',
    reviews: 0
  },
  // Page 3 Products
  {
    id: 'kb-25',
    brand: 'Gray Nicolls',
    brandId: 'gray-nicolls',
    name: 'Gray Nicolls GN9 Duffle Wheelie Kit Bag',
    type: 'Duffle Wheelie',
    price: 5799,
    originalPrice: 5799,
    discount: 0,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/gn_green_2_1.png?v=1724665385&width=608',
      'https://crickstore.com/cdn/shop/files/gn_green_3.png?v=1724665386&width=608'
    ],
    features: ['GN9 Top Tier', 'Wheelie Design', 'Maximum Features', 'Pro Choice'],
    description: 'The flagship Gray Nicolls GN9 Duffle Wheelie with all premium features.',
    capacity: '105 Liters',
    material: 'Premium Polyester',
    dimensions: '90 x 40 x 40 cm',
    reviews: 0
  },
  {
    id: 'kb-26',
    brand: 'Gray Nicolls',
    brandId: 'gray-nicolls',
    name: 'Gray Nicolls GN3.5 Ultimate Duffle Kit Bag',
    type: 'Duffle',
    price: 2599,
    originalPrice: 2599,
    discount: 0,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/gn-ckb_002_ac_large_e685ffab-600a-4f44-b7b2-1003b0efa488.jpg?v=1726559377&width=608',
      'https://crickstore.com/cdn/shop/files/gn-ckb_002_ac_large_e685ffab-600a-4f44-b7b2-1003b0efa488.jpg?v=1726559377&width=608'
    ],
    features: ['GN3.5 Ultimate', 'Enhanced Features', 'Mid-Range Best', 'GN Quality'],
    description: 'Gray Nicolls GN3.5 Ultimate bridges the gap between GN3 and GN9 series.',
    capacity: '85 Liters',
    material: 'Polyester 600D',
    dimensions: '84 x 35 x 35 cm',
    reviews: 0
  },
  {
    id: 'kb-27',
    brand: 'Gravity',
    brandId: 'gravity',
    name: 'GRAVITY INTERNATIONAL LEGEND DUFFLE WHEELIE KIT BAG',
    type: 'Duffle Wheelie',
    price: 5150,
    originalPrice: 5799,
    discount: 12,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/gravity_red_1.png?v=1724871586&width=608',
      'https://crickstore.com/cdn/shop/files/gravity_red_2.png?v=1724871586&width=608'
    ],
    features: ['Legend Series', 'International Quality', 'Premium Build', 'Striking Red'],
    description: 'Gravity International Legend is a premium wheelie duffle with international quality standards.',
    capacity: '100 Liters',
    material: 'Premium Polyester',
    dimensions: '88 x 38 x 38 cm',
    reviews: 0
  },
  {
    id: 'kb-28',
    brand: 'Gravity',
    brandId: 'gravity',
    name: 'GRAVITY INTERNATIONAL Game Changer DUFFLE WHEELIE KIT BAG',
    type: 'Duffle Wheelie',
    price: 4250,
    originalPrice: 4799,
    discount: 12,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/gravity_blue_1.png?v=1724871722&width=608',
      'https://crickstore.com/cdn/shop/files/gravity_7.png?v=1724871721&width=608'
    ],
    features: ['Game Changer', 'Blue Design', 'Premium Wheelie', 'Value for Money'],
    description: 'Gravity Game Changer in striking blue. Premium features at competitive pricing.',
    capacity: '95 Liters',
    material: 'Polyester 600D',
    dimensions: '86 x 36 x 36 cm',
    reviews: 0
  },
  {
    id: 'kb-29',
    brand: 'MRF',
    brandId: 'mrf',
    name: 'MRF Warrior Cricket Kit Bag',
    type: 'Kit Bag',
    price: 3450,
    originalPrice: 3450,
    discount: 0,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/mrf-kitbag-vk18-le_0_0.png?v=1725384073&width=608',
      'https://crickstore.com/cdn/shop/files/mrf-kitbag-vk18-le_0_0.png?v=1725384073&width=608'
    ],
    features: ['Warrior Series', 'MRF Quality', 'Durable Build', 'Classic Design'],
    description: 'MRF Warrior is a solid mid-range option from the legendary Indian brand.',
    capacity: '85 Liters',
    material: 'Polyester',
    dimensions: '84 x 35 x 35 cm',
    reviews: 0
  },
  {
    id: 'kb-30',
    brand: 'MRF',
    brandId: 'mrf',
    name: 'MRF Genius Limited Edition Cricket Kit Bag',
    type: 'Kit Bag',
    price: 5325,
    originalPrice: 5325,
    discount: 0,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/mrf-kitbag-vk18-le_0_0.png?v=1725384073&width=608',
      'https://crickstore.com/cdn/shop/files/mrf-kitbag-vk18-le_0_0.png?v=1725384073&width=608'
    ],
    features: ['Genius Series', 'Limited Edition', 'Premium Build', 'Collector Item'],
    description: 'MRF Genius Limited Edition with premium features and exclusive design.',
    capacity: '100 Liters',
    material: 'Premium Polyester',
    dimensions: '90 x 40 x 40 cm',
    reviews: 0
  },
  {
    id: 'kb-31',
    brand: 'Shrey',
    brandId: 'shrey',
    name: 'Shrey Meta 150 Duffle Wheelie Kit Bag',
    type: 'Duffle Wheelie',
    price: 8399,
    originalPrice: 9499,
    discount: 12,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/SHREY_META_WHEELIE_150_3068_BLACK_1_HD_WcfCe5PXe.webp?v=1724654352&width=608',
      'https://crickstore.com/cdn/shop/files/SHREY_META_WHEELIE_150_3068_BLACK_2_HD_howEP1XNBK.webp?v=1724654352&width=608'
    ],
    features: ['Meta 150 Top Range', '150L Capacity', 'Premium Wheelie', 'Pro Features'],
    description: 'Shrey Meta 150 is the flagship wheelie bag with maximum capacity and premium features.',
    capacity: '150 Liters',
    material: 'Heavy Duty Premium Polyester',
    dimensions: '95 x 45 x 45 cm',
    reviews: 0
  },
  {
    id: 'kb-32',
    brand: 'Shrey',
    brandId: 'shrey',
    name: 'Shrey Meta 120 Duffle Wheelie Kit Bag',
    type: 'Duffle Wheelie',
    price: 7399,
    originalPrice: 8399,
    discount: 12,
    inStock: true,
    images: [
      'https://crickstore.com/cdn/shop/files/SHREY_META_DUFFLE_WHEELIE_120_3069_BLACK_1_HD_D3NP0ueEr.webp?v=1724653746&width=608',
      'https://crickstore.com/cdn/shop/files/SHREY_META_DUFFLE_WHEELIE_120_3069_BLACK_2_HD_4cfCNn5Rut.webp?v=1724653746&width=608'
    ],
    features: ['Meta 120', '120L Capacity', 'Premium Wheelie', 'Great Balance'],
    description: 'Shrey Meta 120 offers the perfect balance of capacity and maneuverability.',
    capacity: '120 Liters',
    material: 'Premium Polyester',
    dimensions: '92 x 42 x 42 cm',
    reviews: 1
  },
  {
    id: 'kb-33',
    brand: 'Shrey',
    brandId: 'shrey',
    name: 'Shrey Meta 100 Duffle Kit Bag',
    type: 'Duffle',
    price: 5100,
    originalPrice: 5799,
    discount: 13,
    inStock: false,
    images: [
      'https://crickstore.com/cdn/shop/files/SHREY_META_DUFFLE_100_3070_BLACK_1_HD_vosTGXOAo.webp?v=1724653273&width=608',
      'https://crickstore.com/cdn/shop/files/SHREY_META_DUFFLE_100_3070_BLACK_2_HD_ckdXidUDD.webp?v=1724653273&width=608'
    ],
    features: ['Meta 100', '100L Capacity', 'Duffle Design', 'Premium Quality'],
    description: 'Shrey Meta 100 Duffle without wheels - lighter option with premium quality.',
    capacity: '100 Liters',
    material: 'Premium Polyester',
    dimensions: '90 x 40 x 40 cm',
    reviews: 0
  }
];

// Helper functions
export const getKitBagsByBrand = (brandId) => {
  if (brandId === 'all') return kitBags;
  return kitBags.filter(bag => bag.brandId === brandId);
};

export const getInStockKitBags = () => {
  return kitBags.filter(bag => bag.inStock);
};

export const getKitBagById = (id) => {
  return kitBags.find(bag => bag.id === id);
};
