import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/mockData';

const CategorySection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Shop By <span className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-gray-600 text-lg">Get your hands on the best gear</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-center text-sm md:text-base transition-transform duration-300 group-hover:translate-y-0">
                  {category.name}
                </h3>
                <div className="w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto mt-2 transition-all duration-300 group-hover:w-12" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
