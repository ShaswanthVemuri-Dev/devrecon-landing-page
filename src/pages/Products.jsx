import React from 'react';
import ProductsHero from '../sections/products/ProductsHero.jsx';
import ProductShowcase from '../sections/products/ProductShowcase.jsx';
import { products } from '../data/products.js';

const Products = () => {
  return (
    <main className="bg-white text-[#111111] overflow-hidden">
      <ProductsHero />
      <ProductShowcase products={products} />
    </main>
  );
};

export default Products;
