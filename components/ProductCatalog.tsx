import React from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { XCircleIcon, SparklesIcon, TagIcon, CheckIcon, TrophyIcon } from './IconComponents';

interface ProductCatalogProps {
  onClose: () => void;
}

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget as HTMLImageElement;
    console.error(`Failed to load image: ${target.src}`);
    target.src = '/assets/images/placeholder.png'; 
    target.onerror = null;
};

const CatalogCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col p-4 border border-gray-200 hover:shadow-xl hover:border-pink-300 transition-all duration-300">
    <img
      src={product.imageUrl}
      alt={product.name}
      onError={handleImageError}
      className="w-full h-40 object-contain rounded-md bg-gray-50 mb-3"
    />
    <div className="flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold text-gray-800 flex-1 pr-2">{product.name}</h3>
        <div className="flex flex-col items-end flex-shrink-0">
          <p className="bg-pink-500 text-white font-bold text-md px-2.5 py-0.5 rounded-md shadow">
            ${product.price.toFixed(2)}
          </p>
          {product.points && (
            <span className="flex items-center bg-yellow-400 text-yellow-900 font-bold text-xs px-2 py-0.5 rounded-full shadow mt-1">
              <TrophyIcon className="h-3.5 w-3.5 mr-1"/>
              {product.points} Puntos
            </span>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 font-medium flex items-center mb-2">
        <TagIcon className="h-4 w-4 mr-1.5" /> {product.category}
      </p>
      <p className="text-sm text-gray-600 mb-3 flex-grow">{product.description}</p>
      <div>
        <h4 className="font-semibold text-gray-700 flex items-center mb-1 text-sm">
          <SparklesIcon className="h-4 w-4 mr-1.5 text-yellow-500" />
          Beneficios clave:
        </h4>
        <ul className="list-none space-y-1">
          {product.benefits.slice(0, 2).map((benefit, index) => (
            <li key={index} className="flex items-start text-xs text-gray-600">
              <CheckIcon className="h-3.5 w-3.5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              {benefit}
            </li>
          ))}
           {product.benefits.length > 2 && <li className="text-xs text-gray-500 italic ml-6">...y más.</li>}
        </ul>
      </div>
    </div>
  </div>
);

const ProductCatalog: React.FC<ProductCatalogProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-gray-100 rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b bg-white">
          <h2 className="text-2xl font-bold text-purple-600">Catálogo de Productos Fuxion</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <XCircleIcon className="h-8 w-8" />
          </button>
        </header>
        <div className="p-4 sm:p-6 flex-grow overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {PRODUCTS.map((product) => (
              <CatalogCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;