import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, ZoomIn, Heart, ShoppingCart, Check, Package, Truck, Shield, Filter, ChevronDown, Grid3X3, List } from 'lucide-react';
import { kitBagsBrands, kitBags, getKitBagsByBrand } from '../data/kitBagsData';

// Format price in INR
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Product Quick View Modal
const ProductModal = ({ product, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!isOpen || !product) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
          <h2 className="text-lg font-bold text-gray-900 truncate pr-4">{product.name}</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden group">
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white shadow-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount > 0 && (
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold rounded-full">
                    -{product.discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex ? 'border-emerald-500 ring-2 ring-emerald-200' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-5">
            <div>
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">{product.brand}</p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">{product.name}</h3>
              <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                {product.type}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

            {/* Specifications */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-900 mb-3 text-sm">Specifications</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Capacity:</span>
                  <span className="font-medium text-gray-900">{product.capacity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Material:</span>
                  <span className="font-medium text-gray-900 text-right text-xs">{product.material}</span>
                </div>
                <div className="col-span-2 flex justify-between">
                  <span className="text-gray-500">Dimensions:</span>
                  <span className="font-medium text-gray-900">{product.dimensions}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-bold text-gray-900 mb-2 text-sm">Key Features</h4>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                    <Check size={12} className="text-emerald-500 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                  isFavorite ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:border-gray-300'
                }`}
              >
                <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
              <button
                disabled={!product.inStock}
                className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  product.inStock
                    ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white hover:shadow-lg hover:shadow-emerald-500/30'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={20} />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Truck size={14} className="text-emerald-500" />
                Free Shipping
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Package size={14} className="text-emerald-500" />
                Easy Returns
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield size={14} className="text-emerald-500" />
                Warranty
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Single Kit Bag Card Component
const KitBagCard = ({ bag, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImage(0);
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={bag.images[currentImage]}
          alt={bag.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            !bag.inStock ? 'grayscale opacity-80' : ''
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {bag.discount > 0 && (
            <span className="px-2 py-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold rounded-full shadow">
              -{bag.discount}%
            </span>
          )}
        </div>

        {/* Stock Badge */}
        {!bag.inStock && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
              Sold out
            </span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            bag.inStock ? '' : 'top-12'
          } ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Image Navigation Dots */}
        {isHovered && bag.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {bag.images.map((_, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImage
                    ? 'bg-emerald-500 w-4'
                    : 'bg-white/70 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}

        {/* Quick View Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-4 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => onQuickView(bag)}
            className="w-full py-2.5 bg-white/95 backdrop-blur-sm rounded-xl font-semibold text-gray-900 flex items-center justify-center gap-2 hover:bg-white transition-colors text-sm"
          >
            <ZoomIn size={16} />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">{bag.brand}</p>
        <h3 className="text-gray-900 font-medium text-sm mt-1 line-clamp-2 min-h-[40px] hover:text-emerald-500 transition-colors cursor-pointer">
          {bag.name}
        </h3>
        <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-medium rounded">
          {bag.type}
        </span>
        
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">{formatPrice(bag.price)}</span>
          {bag.originalPrice > bag.price && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(bag.originalPrice)}</span>
          )}
        </div>

        {bag.reviews > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            {bag.reviews} review{bag.reviews > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Kit Bags Collection Component
const KitBagsCollection = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('best-selling');
  const [showFilters, setShowFilters] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  
  const ITEMS_PER_PAGE = 12;

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Filter and sort bags
  const filteredAndSortedBags = useMemo(() => {
    let bags = getKitBagsByBrand(selectedBrand);
    
    // Apply availability filter
    if (availabilityFilter === 'in-stock') {
      bags = bags.filter(bag => bag.inStock);
    } else if (availabilityFilter === 'out-of-stock') {
      bags = bags.filter(bag => !bag.inStock);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        bags = [...bags].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        bags = [...bags].sort((a, b) => b.price - a.price);
        break;
      case 'name-az':
        bags = [...bags].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-za':
        bags = [...bags].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // best-selling - keep original order
        break;
    }
    
    return bags;
  }, [selectedBrand, sortBy, availabilityFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBags.length / ITEMS_PER_PAGE);
  const paginatedBags = filteredAndSortedBags.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const inStockCount = kitBags.filter(b => b.inStock).length;
  const outOfStockCount = kitBags.filter(b => !b.inStock).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-[300px] md:h-[350px] overflow-hidden">
        <img
          src="https://crickstore.com/cdn/shop/collections/ProDuffle500-KitBag-2_b997bc18-091e-4a58-82c8-18ed68a44468.webp?v=1724993921&width=1440"
          alt="Kit Bags Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <p className="text-emerald-400 text-sm font-semibold tracking-wider mb-2">Collection</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Kit Bags
            </h1>
            <p className="text-gray-300 text-lg max-w-xl">
              Cricket Kit Bags in both Duffle and Wheelie Styles from top brands
            </p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-[108px] bg-white shadow-md z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Brand Filters - Horizontal Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide flex-1 mr-4">
              {kitBagsBrands.map((brand) => (
                <button
                  key={brand.id}
                  onClick={() => {
                    setSelectedBrand(brand.id);
                    setCurrentPage(1);
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                    selectedBrand === brand.id
                      ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>

            {/* Sort & Filter */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter size={16} />
                <span className="hidden sm:inline text-sm">Filter</span>
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-8 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="best-selling">Best selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-az">A-Z</option>
                  <option value="name-za">Z-A</option>
                </select>
                <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-6">
              {/* Availability Filter */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">Availability</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setAvailabilityFilter('all')}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      availabilityFilter === 'all'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All ({kitBags.length})
                  </button>
                  <button
                    onClick={() => setAvailabilityFilter('in-stock')}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      availabilityFilter === 'in-stock'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    In Stock ({inStockCount})
                  </button>
                  <button
                    onClick={() => setAvailabilityFilter('out-of-stock')}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                      availabilityFilter === 'out-of-stock'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Out of Stock ({outOfStockCount})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredAndSortedBags.length}</span> products
          </p>
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {paginatedBags.map((bag) => (
            <KitBagCard key={bag.id} bag={bag} onQuickView={handleQuickView} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageChange(idx + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === idx + 1
                    ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default KitBagsCollection;
