import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';
import { footerLinks } from '../data/mockData';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
      setName('');
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-black text-lg">CS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                  CRIC STORE
                </span>
                <span className="text-[10px] text-gray-400 -mt-1 tracking-widest">EVERYTHING CRICKET</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Your one-stop destination for all cricket needs. Premium quality equipment from top brands, delivered with love since 2011.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:sales@cricstore.com" className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  <Mail size={18} className="text-emerald-400" />
                  sales@cricstore.com
                </a>
              </li>
              <li>
                <a href="tel:+919029962123" className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                  <Phone size={18} className="text-emerald-400" />
                  +91 9029962123
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Subscribe to our emails</h4>
            <p className="text-gray-400 text-sm mb-4">
              Get exclusive offers, new arrivals, and cricket tips delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-sm transition-colors"
              />
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-sm pr-12 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-md flex items-center justify-center hover:shadow-lg transition-shadow"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
            {subscribed && (
              <p className="text-emerald-400 text-sm mt-3 animate-fade-in">
                Thanks for subscribing!
              </p>
            )}
            <p className="text-gray-500 text-xs mt-4">
              Your information is safe and secure with us.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 CRIC STORE. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/visa.sxIq5Dot.svg" alt="Visa" className="h-6 opacity-60 hover:opacity-100 transition-opacity" />
              <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/mastercard.1c4_lyMp.svg" alt="Mastercard" className="h-6 opacity-60 hover:opacity-100 transition-opacity" />
              <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/amex.Csr7hRoy.svg" alt="Amex" className="h-6 opacity-60 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
