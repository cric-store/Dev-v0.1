import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, ZoomIn, Heart, ShoppingCart, Star, Check, Package, Truck, Shield } from 'lucide-react';
import { cricketBatsBrands, cricketBats } from '../data/cricketBatsData';

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
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-bold text-gray-900 truncate pr-4">{product.name}</h2>
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
              
              {/* Navigation Arrows */}
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

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {product.images.length}
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discount > 0 && (
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold rounded-full">
                    -{product.discount}% OFF
                  </span>
                )}
                {product.isNew && (
                  <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                    NEW
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto pb-2">
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
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <p className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">{product.brand}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h3>
              {product.playerEndorsement && (
                <p className="text-gray-500 mt-1 flex items-center gap-1">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />
                  {product.playerEndorsement}
                </p>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Specifications Grid */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold text-gray-900 mb-3">Specifications</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Weight:</span>
                  <span className="font-medium text-gray-900">{product.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Willow:</span>
                  <span className="font-medium text-gray-900 text-right">{product.willow}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sweet Spot:</span>
                  <span className="font-medium text-gray-900 text-right">{product.sweetSpot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Edge:</span>
                  <span className="font-medium text-gray-900 text-right">{product.edgeThickness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Handle:</span>
                  <span className="font-medium text-gray-900 text-right">{product.handleType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Grains:</span>
                  <span className="font-medium text-gray-900">{product.grains}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Size:</span>
                  <span className="font-medium text-gray-900">{product.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Blade Width:</span>
                  <span className="font-medium text-gray-900">{product.bladeWidth}</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-bold text-gray-900 mb-3">Key Features</h4>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={14} className="text-emerald-500 flex-shrink-0" />
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
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Truck size={16} className="text-emerald-500" />
                Free Shipping
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Package size={16} className="text-emerald-500" />
                Easy Returns
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Shield size={16} className="text-emerald-500" />
                1 Year Warranty
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Single Bat Card Component
const BatCard = ({ bat, onQuickView }) => {
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
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
        {/* Main Image */}
        <img
          src={bat.images[currentImage]}
          alt={bat.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            !bat.inStock ? 'grayscale' : ''
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {bat.discount > 0 && (
            <span className="px-2 py-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold rounded-full shadow">
              -{bat.discount}%
            </span>
          )}
          {bat.isNew && (
            <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full shadow">
              NEW
            </span>
          )}
          {bat.isBestseller && (
            <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Stock Badge */}
        {!bat.inStock && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
              Sold Out
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
            bat.inStock ? '' : 'top-12'
          } ${
            isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Image Thumbnails on Hover */}
        {isHovered && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {bat.images.slice(0, 4).map((_, idx) => (
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
            onClick={() => onQuickView(bat)}
            className="w-full py-3 bg-white/95 backdrop-blur-sm rounded-xl font-semibold text-gray-900 flex items-center justify-center gap-2 hover:bg-white transition-colors"
          >
            <ZoomIn size={18} />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">{bat.brand}</p>
        <h3 className="text-gray-900 font-medium text-sm mt-1 line-clamp-2 min-h-[40px] hover:text-emerald-500 transition-colors cursor-pointer">
          {bat.shortName}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{bat.willow}</p>
        <p className="text-xs text-gray-500">Weight: {bat.weight}</p>
        
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">{formatPrice(bat.price)}</span>
          {bat.originalPrice > bat.price && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(bat.originalPrice)}</span>
          )}
        </div>

        {bat.playerEndorsement && (
          <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
            <Star size={12} className="text-yellow-500 fill-yellow-500" />
            {bat.playerEndorsement}
          </div>
        )}
      </div>
    </div>
  );
};

// Main Collection Component
const CricketBatsCollection = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const getFilteredBats = () => {
    if (selectedBrand === 'all') {
      return Object.values(cricketBats).flat();
    }
    return cricketBats[selectedBrand] || [];
  };

  const filteredBats = getFilteredBats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 md:py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-emerald-400">Cricket Bats</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Cricket <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Bats</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Discover our premium collection of English Willow cricket bats from the world's best brands. 
            Handcrafted for performance, designed for champions.
          </p>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="sticky top-[108px] bg-white shadow-md z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setSelectedBrand('all')}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                selectedBrand === 'all'
                  ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Brands
            </button>
            {cricketBatsBrands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedBrand === brand.id
                    ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {brand.logo}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Description (when selected) */}
      {selectedBrand !== 'all' && (
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {cricketBatsBrands.find(b => b.id === selectedBrand)?.name}
            </h2>
            <p className="text-gray-600 mt-1">
              {cricketBatsBrands.find(b => b.id === selectedBrand)?.description}
            </p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredBats.length}</span> bats
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredBats.map((bat) => (
            <BatCard key={bat.id} bat={bat} onQuickView={handleQuickView} />
          ))}
        </div>
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

export default CricketBatsCollection;
