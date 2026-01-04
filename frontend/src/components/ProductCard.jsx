import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-20">
          <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-bold rounded-full shadow-lg">
            -{product.discount}%
          </span>
        </div>
      )}

      {/* Sold Out Badge */}
      {!product.inStock && (
        <div className="absolute top-3 right-3 z-20">
          <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-full">
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
        className={`absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          product.inStock ? '' : 'top-12'
        } ${
          isFavorite
            ? 'bg-red-500 text-white'
            : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
        }`}
      >
        <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
      </button>

      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <img
          src={isHovered && product.image2 ? product.image2 : product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            !product.inStock ? 'grayscale' : ''
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
        />

        {/* Hover Actions */}
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center justify-center gap-3 transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <button
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors shadow-lg"
            title="Quick View"
          >
            <Eye size={18} />
          </button>
          {product.inStock && (
            <button
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <p className="text-xs text-emerald-600 font-semibold mb-1 uppercase tracking-wide">
          {product.vendor}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="text-gray-800 font-medium text-sm leading-tight hover:text-emerald-500 transition-colors line-clamp-2 min-h-[40px]"
        >
          {product.name}
        </Link>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.salePrice)}
          </span>
          {product.regularPrice > product.salePrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>
        {product.reviews > 0 && (
          <div className="mt-2 flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
