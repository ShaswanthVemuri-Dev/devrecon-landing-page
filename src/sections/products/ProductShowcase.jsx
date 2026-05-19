import React from 'react';
import ProductPanel from './ProductPanel.jsx';
import './previews/PreviewStyles.css';

const ProductShowcase = ({ products }) => {
  return (
    <section className="relative px-6 pb-24 md:pb-36">
      <div className="relative z-10 mx-auto max-w-7xl space-y-24 md:space-y-36">
        {products.map((product, index) => (
          <ProductPanel
            key={product.id}
            product={product}
            reverse={index % 2 === 1}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
