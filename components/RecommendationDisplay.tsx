import React from 'react';
import { jsPDF } from 'jspdf';
import { Recommendation, Product, ClientInfo } from '../types';
import ProductCard from './ProductCard';
import { GiftIcon, LightBulbIcon, RefreshIcon, UserCircleIcon, PhoneIcon, DownloadIcon, BookOpenIcon } from './IconComponents';
import { ADMIN_CONTACT_INFO } from '../constants';

interface RecommendationDisplayProps {
  recommendation: Recommendation;
  clientInfo: ClientInfo;
  onStartOver: () => void;
  onShowCatalog: () => void;
}

const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({ recommendation, clientInfo, onStartOver, onShowCatalog }) => {
  const { clientName, mainGoal, mainProduct, complementaryProducts, lifestyleTips } = recommendation;

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const pageWidth = doc.internal.pageSize.width;
    let y = 15; // Initial Y position
    const lineHeight = 6;
    const margin = 15;
    const maxWidth = pageWidth - margin * 2;

    const addText = (text: string | string[], x: number, currentY: number, options?: any) => {
      const splitText = doc.splitTextToSize(text, (options && options.maxWidth) || maxWidth);
      doc.text(splitText, x, currentY, options);
      return currentY + (splitText.length * (options?.fontSize ? options.fontSize * 0.4 : lineHeight));
    };
    
    const checkNewPage = (currentY: number, neededHeight = 40) => {
        if (currentY + neededHeight > pageHeight - margin) {
            doc.addPage();
            return margin; // Reset Y to top margin
        }
        return currentY;
    };
    
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(236, 72, 153); // Fuxion Pink
    y = addText(`Plan de Bienestar Fuxion`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    y = addText(`Preparado para: ${clientName}`, margin, y);
    y += lineHeight * 1.5;

    // Client Info Section
    y = checkNewPage(y);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(168, 85, 247); // Fuxion Purple
    y = addText('Resumen del Cliente:', margin, y);
    y += lineHeight / 2;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    let infoText = `Edad: ${clientInfo.age} | Género: ${clientInfo.gender} | Nivel Actividad: ${clientInfo.activityLevel}`;
    y = addText(infoText, margin, y);
    y = addText(`Contacto: ${clientInfo.email} | ${clientInfo.phone}`, margin, y);
    y = addText(`Objetivo Principal: ${clientInfo.mainGoal}`, margin, y);
    if(clientInfo.commonSymptoms.length > 0) y = addText(`Síntomas Reportados: ${clientInfo.commonSymptoms.join(', ')}`, margin, y);
    y += lineHeight;

    // Product Recommendation Section
    y = checkNewPage(y);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(168, 85, 247);
    y = addText('Recomendación de Productos:', margin, y);
    y += lineHeight / 2;

    const drawProduct = (product: Product, startY: number, isMain: boolean) => {
        let currentY = startY;
        doc.setFontSize(12);
        doc.setFont("helvetica", isMain ? "bold" : "bolditalic");
        doc.setTextColor(isMain ? '#16a34a' : '#2563eb'); // Green for main, Blue for complementary
        const pointsText = product.points ? ` (${product.points} Puntos)` : '';
        currentY = addText(`${isMain ? 'Producto Principal:' : 'Producto Complementario:'} ${product.name} - $${product.price.toFixed(2)}${pointsText}`, margin, currentY);
        
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(80, 80, 80);
        currentY = addText(`Beneficios: ${product.benefits.join(', ')}`, margin + 4, currentY, { maxWidth: maxWidth - 4 });
        currentY = addText(`Uso Sugerido: ${product.suggestedUsage}`, margin + 4, currentY, { maxWidth: maxWidth - 4 });
        return currentY + lineHeight / 2;
    };

    y = drawProduct(mainProduct, y, true);
    
    if (complementaryProducts.length > 0) {
      complementaryProducts.forEach(p => {
        y = checkNewPage(y, 3 * lineHeight);
        y = drawProduct(p, y, false);
      });
    }
    y += lineHeight;

    // Lifestyle Tips Section
    y = checkNewPage(y);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(168, 85, 247);
    y = addText('Consejos de Estilo de Vida:', margin, y);
    y += lineHeight / 2;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    const tipsArray = lifestyleTips.split('\n').map(tip => tip.replace(/^- /, '• ').replace(/\*\*/g, ''));
    y = addText(tipsArray, margin, y);
    y += lineHeight;
    
    // Footer
    const finalY = pageHeight - margin - 20;
    doc.setLineWidth(0.5);
    doc.setDrawColor(236, 72, 153);
    doc.line(margin, finalY, pageWidth - margin, finalY);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text('Contacta a tu Asesora de Bienestar:', margin, finalY + 8);
    doc.setFont("helvetica", "normal");
    doc.text(`${ADMIN_CONTACT_INFO.name} - Tel: ${ADMIN_CONTACT_INFO.phone}`, margin, finalY + 14);

    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    const disclaimer = "Este plan es una sugerencia y no sustituye el consejo médico profesional. La constancia es clave para ver resultados. ¡Fuxion mejora tu vida!";
    addText(disclaimer, margin, pageHeight - margin - 5, { align: 'center'});


    doc.save(`Recomendacion_Fuxion_${clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <>
      <div className="space-y-8 animate-fadeIn p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-xl">
        <div className="text-center pb-6 border-b-2 border-pink-300">
          <UserCircleIcon className="h-16 w-16 text-pink-500 mx-auto mb-3" />
          <h2 className="text-3xl font-bold text-gray-800">
            Tu Plan Fuxion Personalizado, <span className="text-pink-500">{clientName}</span>!
          </h2>
          <p className="text-lg text-gray-600 mt-2">
            Diseñado para ayudarte a alcanzar tu objetivo de: <strong className="text-gray-700">{mainGoal}</strong>
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <div className="flex items-center mb-4">
              <GiftIcon className="h-8 w-8 text-green-500 mr-3 flex-shrink-0" />
              <h3 className="text-2xl font-semibold text-green-600">Producto Principal Recomendado</h3>
            </div>
            <ProductCard product={mainProduct} isMainProduct={true} />
          </section>

          {complementaryProducts.length > 0 && (
            <section>
              <div className="flex items-center mb-4">
                  <GiftIcon className="h-7 w-7 text-blue-500 mr-3 flex-shrink-0" />
                  <h3 className="text-xl font-semibold text-blue-600">Productos Complementarios Sugeridos</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {complementaryProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-3 italic">
                  Estos productos pueden potenciar tus resultados y abordar necesidades secundarias.
              </p>
            </section>
          )}

          <section>
            <div className="flex items-center mb-4">
              <LightBulbIcon className="h-8 w-8 text-yellow-500 mr-3 flex-shrink-0" />
              <h3 className="text-2xl font-semibold text-yellow-600">Consejos de Estilo de Vida Personalizados</h3>
            </div>
            <div className="bg-yellow-100 p-6 rounded-lg shadow-inner prose prose-sm max-w-none text-gray-800 prose-p:text-gray-700 prose-strong:text-gray-900">
              <div dangerouslySetInnerHTML={{ __html: lifestyleTips.replace(/\n/g, '<br />').replace(/^- /, '&#8226; ').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          </section>
        </div>
        
        <div className="mt-10 text-center border-t pt-6 space-y-6">
          <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Contacta a tu Asesora de Bienestar Fuxion</h4>
              <div className="flex flex-col items-center justify-center space-y-1">
                  <p className="text-md text-gray-600 flex items-center">
                  <UserCircleIcon className="h-5 w-5 mr-2 text-pink-500" /> {ADMIN_CONTACT_INFO.name}
                  </p>
                  <p className="text-md text-gray-600 flex items-center">
                  <PhoneIcon className="h-5 w-5 mr-2 text-pink-500" /> {ADMIN_CONTACT_INFO.phone}
                  </p>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Para adquirir tus productos, resolver dudas o para un seguimiento personalizado.
              </p>
          </div>

          <p className="text-md text-gray-700">
              Recuerda que la constancia es clave. ¡Estamos aquí para apoyarte en tu camino hacia el bienestar!
            </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <button
                onClick={onStartOver}
                className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-opacity-75 transition duration-150"
              >
                <RefreshIcon className="h-5 w-5 mr-2" />
                Crear Nueva Recomendación
              </button>
              <button
                onClick={onShowCatalog}
                className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition duration-150"
              >
                <BookOpenIcon className="h-5 w-5 mr-2" />
                Explorar Catálogo
              </button>
               <button
                onClick={handleDownloadPdf}
                className="flex items-center justify-center w-full sm:w-auto px-8 py-3 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-75 transition duration-150"
              >
                <DownloadIcon className="h-5 w-5 mr-2" />
                Descargar PDF
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecommendationDisplay;