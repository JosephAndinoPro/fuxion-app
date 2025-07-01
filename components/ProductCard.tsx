import React, { useState } from 'react';
import { Product } from '../types';
import { CheckIcon, SparklesIcon, TagIcon, PuzzlePieceIcon, ClockIcon, PlayCircleIcon, XCircleIcon, TrophyIcon } from './IconComponents';

interface ProductCardProps {
  product: Product;
  isMainProduct?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isMainProduct = false }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const cardBaseClasses = "rounded-xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col";
  const mainProductClasses = "bg-gradient-to-br from-green-50 via-white to-green-100 border-2 border-green-500 p-4 sm:p-6";
  const complementaryProductClasses = "bg-white p-4 sm:p-5 border border-gray-200 hover:border-blue-400";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`Failed to load image: ${e.currentTarget.src}`);
    const target = e.currentTarget as HTMLImageElement;
    target.src = '/assets/images/placeholder.png'; // Make sure you have a placeholder.png in public/assets/images
    target.onerror = null;
  };

  return (
    <>
      <div className={`${cardBaseClasses} ${isMainProduct ? mainProductClasses : complementaryProductClasses}`}>
        {/* Card Header with Name and Price/Points */}
        <div className="flex justify-between items-start mb-3">
            <h4 className={`text-xl sm:text-2xl font-bold ${isMainProduct ? 'text-green-700' : 'text-blue-700'}`}>{product.name}</h4>
            <div className="flex flex-col items-end gap-y-1">
                <div className="bg-pink-500 text-white font-bold text-lg px-3 py-1 rounded-lg shadow-md">
                    ${product.price.toFixed(2)}
                </div>
                {product.points && (
                    <div className="flex items-center bg-yellow-400 text-yellow-900 font-bold text-xs px-2 py-0.5 rounded-full shadow">
                        <TrophyIcon className="h-4 w-4 mr-1"/>
                        {product.points} Puntos
                    </div>
                )}
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start flex-grow">
          {/* Image and Video Button */}
          <div className="w-full relative">
            <img 
              className="h-48 sm:h-60 w-full object-contain md:object-cover rounded-lg shadow-md bg-gray-100 p-1" 
              src={product.imageUrl} 
              alt={product.name}
              onError={handleImageError}
            />
            {product.videoUrl && (
                <button 
                    onClick={() => setShowVideoModal(true)}
                    className="absolute bottom-2 right-2 flex items-center bg-black/60 text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-black/80 transition-all duration-200 backdrop-blur-sm"
                >
                    <PlayCircleIcon className="h-5 w-5 mr-2" />
                    Ver Video
                </button>
            )}
          </div>
          
          {/* Core Info */}
          <div className="flex-grow">
            <p className={`mt-1 text-sm ${isMainProduct ? 'text-green-600' : 'text-blue-500'} font-medium flex items-center`}>
              <TagIcon className="h-4 w-4 mr-1.5 flex-shrink-0"/> Categoría: {product.category}
            </p>

            <div className="mt-3 sm:mt-4">
              <h5 className="font-semibold text-gray-700 flex items-center mb-1"><SparklesIcon className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0"/>Beneficios Clave:</h5>
              <ul className="list-none space-y-1">
                {product.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600">
                    <CheckIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
                {product.benefits.length > 3 && <li className="text-xs text-gray-500 italic ml-6">...y más.</li>}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Collapsible Details */}
        <div className="mt-4 pt-4 border-t border-gray-200/80 space-y-3">
           <div>
              <h5 className="font-semibold text-gray-700 flex items-center mb-1"><PuzzlePieceIcon className="h-5 w-5 mr-2 text-indigo-500 flex-shrink-0"/>Ingredientes Clave:</h5>
              <p className="text-sm text-gray-600">{product.keyIngredients.join(', ')}.</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700 flex items-center mb-1"><ClockIcon className="h-5 w-5 mr-2 text-purple-500 flex-shrink-0"/>Modo de Uso Sugerido:</h5>
              <p className="text-sm text-gray-600">{product.suggestedUsage}</p>
            </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && product.videoUrl && (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowVideoModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside video
          >
             <button 
                onClick={() => setShowVideoModal(false)}
                className="absolute top-2 right-2 text-white bg-black/30 rounded-full hover:bg-black/60 transition-colors z-10"
                aria-label="Cerrar video"
             >
                <XCircleIcon className="h-9 w-9" />
             </button>
             <video 
                className="w-full h-auto max-h-[80vh]"
                src={product.videoUrl} 
                controls 
                autoPlay
                onError={(e) => {
                    console.error("Video failed to load");
                    setShowVideoModal(false);
                    alert("No se pudo cargar el video. Asegúrate que el archivo '" + product.videoUrl + "' existe en tu carpeta public/assets/videos.");
                }}
             >
                Tu navegador no soporta la etiqueta de video.
             </video>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
