import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingCart, User, Phone, Mail, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [battingGearOpen, setBattingGearOpen] = useState(false);
  const [mobileBattingGearOpen, setMobileBattingGearOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Cricket Bats", href: "/collections/cricket-bats" },
    { 
      name: "Batting Gear", 
      href: "/collections/batting-gear",
      hasDropdown: true,
      dropdown: [
        { name: "Batting Gloves", href: "/collections/batting-gear" },
        { name: "Batting Pads", href: "/collections/batting-pads" },
        { name: "Helmets", href: "/collections/helmets" },
        { name: "Protection", href: "/collections/protection" }
      ]
    },
    { name: "Wicket Keeping", href: "/collections/wicket-keeping" },
    { name: "Balls", href: "/collections/balls" },
    { name: "Kit Bags", href: "/collections/kit-bags" },
    { name: "Footwear", href: "/collections/footwear" },
    { name: "Accessories", href: "/collections/accessories" },
    { name: "Custom Jerseys", href: "/collections/customs-uniforms" }
  ];

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-400 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <a href="mailto:sales@cricstore.com" className="flex items-center gap-1 hover:text-emerald-100 transition-colors">
              <Mail size={14} />
              <span className="hidden sm:inline">sales@cricstore.com</span>
            </a>
            <a href="tel:+919029962123" className="flex items-center gap-1 hover:text-emerald-100 transition-colors">
              <Phone size={14} />
              <span className="hidden sm:inline">+91 9029962123</span>
            </a>
          </div>
          <div className="text-center flex-1 hidden md:block">
            <span className="font-medium">Free shipping</span> English Willow Bats in India • Shipping Happiness <span className="font-bold">Since 2011</span>
          </div>
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-black shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_ad12457d-7953-4d9a-aba5-d8b3d9f2110b/artifacts/gwyix5np_43810314-7AC9-492A-A3E1-F1B8A43C7E71.png" 
                alt="CricStore Logo" 
                className="h-28 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div 
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setBattingGearOpen(true)}
                    onMouseLeave={() => setBattingGearOpen(false)}
                  >
                    <button
                      className="flex items-center gap-1 text-gray-700 hover:text-emerald-500 font-medium transition-colors relative group"
                    >
                      {link.name}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${battingGearOpen ? 'rotate-180' : ''}`} />
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-300 group-hover:w-full" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {battingGearOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                        <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45" />
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-4 py-2.5 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors text-sm font-medium"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-gray-700 hover:text-emerald-500 font-medium transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 transition-all duration-300 group-hover:w-full" />
                  </Link>
                )
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                <User size={20} className="text-gray-600" />
              </button>
              <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingCart size={20} className="text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-green-400 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => (
                link.hasDropdown ? (
                  <div key={link.name}>
                    <button
                      onClick={() => setMobileBattingGearOpen(!mobileBattingGearOpen)}
                      className="w-full px-6 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-500 transition-colors font-medium flex items-center justify-between"
                    >
                      {link.name}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${mobileBattingGearOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileBattingGearOpen && (
                      <div className="bg-gray-50 py-2">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-10 py-2.5 text-gray-600 hover:text-emerald-500 transition-colors text-sm font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="px-6 py-3 text-gray-700 hover:bg-emerald-50 hover:text-emerald-500 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
