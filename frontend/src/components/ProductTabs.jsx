import React, { useState } from 'react';
import { products } from '../data/mockData';
import ProductCard from './ProductCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('latest');

  const tabData = [
    { id: 'latest', label: 'Latest Additions', products: products.latest },
    { id: 'bestsellers', label: 'Bestsellers', products: products.bestsellers },
    { id: 'popular', label: 'Most Popular', products: products.popular },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Explore Our <span className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent">Store</span>
          </h2>
        </div>

        <Tabs defaultValue="latest" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100 p-1 rounded-full inline-flex gap-1">
              {tabData.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabData.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {tab.products.slice(0, 8).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductTabs;
