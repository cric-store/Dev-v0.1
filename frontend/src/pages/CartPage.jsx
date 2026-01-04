import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Truck, Shield, User, Mail, Phone, MapPin, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

// Format price in CAD
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [checkoutAsGuest, setCheckoutAsGuest] = useState(false);
  
  // Customer form state
  const [customerInfo, setCustomerInfo] = useState({
    full_name: '',
    email: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    province: '',
    postal_code: '',
    country: 'CA'
  });
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!customerInfo.full_name.trim()) errors.full_name = 'Full name is required';
    if (!customerInfo.email.trim()) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) errors.email = 'Invalid email format';
    if (!customerInfo.phone.trim()) errors.phone = 'Phone number is required';
    if (!customerInfo.address_line1.trim()) errors.address_line1 = 'Address is required';
    if (!customerInfo.city.trim()) errors.city = 'City is required';
    if (!customerInfo.province.trim()) errors.province = 'Province is required';
    if (!customerInfo.postal_code.trim()) errors.postal_code = 'Postal code is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Pre-fill form when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setCustomerInfo(prev => ({
        ...prev,
        full_name: user.user_metadata?.full_name || prev.full_name,
        email: user.email || prev.email,
        phone: user.user_metadata?.phone || prev.phone,
        ...(user.user_metadata?.address || {})
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    // If not authenticated and not checking out as guest, show options
    if (!showCheckoutForm) {
      if (isAuthenticated) {
        setShowCheckoutForm(true);
        setCheckoutAsGuest(false);
      } else {
        setShowCheckoutForm(true);
      }
      return;
    }
    
    if (!validateForm()) {
      setError('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    
    if (!backendUrl) {
      setError('Checkout service not configured. Please contact support.');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch(`${backendUrl}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart_items: cartItems.map(item => ({
            product_id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.images?.[0] || item.image
          })),
          customer: customerInfo,
          origin_url: window.location.origin
        })
      });

      if (!response.ok) {
        let errorMessage = 'Failed to create checkout';
        try {
          const errData = await response.json();
          errorMessage = errData.detail || errorMessage;
        } catch {
          errorMessage = `Server error (${response.status})`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Redirect to Stripe checkout
      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        throw new Error('Invalid checkout response');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      let userMessage = err.message || 'Failed to initiate checkout';
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        userMessage = 'Unable to connect to checkout service. Please check your internet connection.';
      } else if (userMessage.includes('Body') || userMessage.includes('body')) {
        userMessage = 'Connection error. Please try again.';
      }
      setError(userMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingBag size={80} className="text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any items yet.</p>
        <Link 
          to="/collections/cricket-bats"
          className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link 
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        Continue Shopping
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-4"
            >
              {/* Product Image */}
              <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                <img 
                  src={item.images?.[0] || item.image || '/placeholder.png'} 
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                <p className="text-sm text-emerald-600 font-medium">{item.brand}</p>
                <p className="text-lg font-bold text-gray-900 mt-1">{formatPrice(item.price)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-end justify-between">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  data-testid={`remove-item-${item.id}`}
                >
                  <Trash2 size={18} />
                </button>

                <div className="flex items-center gap-2 bg-gray-100 rounded-lg">
                  <button 
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="p-2 hover:bg-gray-200 rounded-l-lg transition-colors"
                    data-testid={`decrease-qty-${item.id}`}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-gray-200 rounded-r-lg transition-colors"
                    data-testid={`increase-qty-${item.id}`}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Checkout Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-emerald-600 font-medium">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(getCartTotal())}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Including taxes</p>
              </div>
            </div>

            {/* Login Option for Guest Users */}
            {showCheckoutForm && !isAuthenticated && !checkoutAsGuest && (
              <div className="mb-6 border-t border-gray-200 pt-6">
                <div className="space-y-3">
                  <Link
                    to="/login?redirect=/cart"
                    className="w-full py-3 px-4 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
                  >
                    <LogIn size={18} />
                    Sign in for faster checkout
                  </Link>
                  <button
                    onClick={() => setCheckoutAsGuest(true)}
                    className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium text-sm"
                  >
                    Or continue as guest
                  </button>
                </div>
              </div>
            )}

            {/* Customer Information Form */}
            {showCheckoutForm && (isAuthenticated || checkoutAsGuest) && (
              <div className="mb-6 space-y-4 border-t border-gray-200 pt-6">
                {isAuthenticated && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-emerald-700">
                      Signed in as <span className="font-semibold">{user?.email}</span>
                    </p>
                  </div>
                )}
                
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <User size={18} />
                  {isAuthenticated ? 'Shipping Information' : 'Customer Information'}
                </h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    value={customerInfo.full_name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${formErrors.full_name ? 'border-red-500' : 'border-gray-300'}`}
                    data-testid="customer-name"
                  />
                  {formErrors.full_name && <p className="text-red-500 text-xs mt-1">{formErrors.full_name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                      data-testid="customer-email"
                    />
                  </div>
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      data-testid="customer-phone"
                    />
                  </div>
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>

                <h3 className="font-semibold text-gray-900 flex items-center gap-2 pt-2">
                  <MapPin size={18} />
                  Shipping Address
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                  <input
                    type="text"
                    name="address_line1"
                    value={customerInfo.address_line1}
                    onChange={handleInputChange}
                    placeholder="123 Cricket Lane"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${formErrors.address_line1 ? 'border-red-500' : 'border-gray-300'}`}
                    data-testid="customer-address"
                  />
                  {formErrors.address_line1 && <p className="text-red-500 text-xs mt-1">{formErrors.address_line1}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apt/Suite (Optional)</label>
                  <input
                    type="text"
                    name="address_line2"
                    value={customerInfo.address_line2}
                    onChange={handleInputChange}
                    placeholder="Apt 4B"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    data-testid="customer-address2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      placeholder="Toronto"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`}
                      data-testid="customer-city"
                    />
                    {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
                    <select
                      name="province"
                      value={customerInfo.province}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${formErrors.province ? 'border-red-500' : 'border-gray-300'}`}
                      data-testid="customer-province"
                    >
                      <option value="">Select</option>
                      <option value="AB">Alberta</option>
                      <option value="BC">British Columbia</option>
                      <option value="MB">Manitoba</option>
                      <option value="NB">New Brunswick</option>
                      <option value="NL">Newfoundland and Labrador</option>
                      <option value="NS">Nova Scotia</option>
                      <option value="NT">Northwest Territories</option>
                      <option value="NU">Nunavut</option>
                      <option value="ON">Ontario</option>
                      <option value="PE">Prince Edward Island</option>
                      <option value="QC">Quebec</option>
                      <option value="SK">Saskatchewan</option>
                      <option value="YT">Yukon</option>
                    </select>
                    {formErrors.province && <p className="text-red-500 text-xs mt-1">{formErrors.province}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                    <input
                      type="text"
                      name="postal_code"
                      value={customerInfo.postal_code}
                      onChange={handleInputChange}
                      placeholder="M5V 1A1"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${formErrors.postal_code ? 'border-red-500' : 'border-gray-300'}`}
                      data-testid="customer-postal"
                    />
                    {formErrors.postal_code && <p className="text-red-500 text-xs mt-1">{formErrors.postal_code}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={customerInfo.country}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              data-testid="checkout-btn"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : showCheckoutForm ? (
                <>
                  <CreditCard size={20} />
                  Pay {formatPrice(getCartTotal())}
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  Proceed to Checkout
                </>
              )}
            </button>

            {/* Trust Badges */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck size={20} className="text-emerald-500" />
                  <span className="text-xs text-gray-600">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Shield size={20} className="text-emerald-500" />
                  <span className="text-xs text-gray-600">Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
