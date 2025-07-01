
import React, { useState, useCallback } from 'react';
import { ClientInfo, Recommendation, Product } from './types';
import { initialClientInfo, HEALTH_GOALS, PRODUCTS } from './constants';
import ClientForm from './components/ClientForm';
import RecommendationDisplay from './components/RecommendationDisplay';
import ProductCatalog from './components/ProductCatalog';
import { generateRecommendation } from './services/recommendationService';
import { generateLifestyleTips } from './services/geminiService';
import { LogoIcon, BookOpenIcon } from './components/IconComponents';

const App: React.FC = () => {
  const [clientInfo, setClientInfo] = useState<ClientInfo>(initialClientInfo);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(true);
  const [showCatalog, setShowCatalog] = useState<boolean>(false); // State to control catalog visibility globally

  const handleFormSubmit = useCallback(async (formData: ClientInfo) => {
    setIsLoading(true);
    setError(null);
    setClientInfo(formData); // Set clientInfo here so it's available for RecommendationDisplay
    setShowForm(false);

    try {
      const productRecommendation = generateRecommendation(formData, PRODUCTS);
      
      let lifestyleTips = "Could not generate lifestyle tips at this moment. Please focus on the product recommendations and general well-being practices.";
      try {
        lifestyleTips = await generateLifestyleTips(formData);
      } catch (geminiError) {
        console.error("Error generating lifestyle tips:", geminiError);
        // Use a fallback message if Gemini fails, but still show product recommendations
      }

      setRecommendation({
        clientName: formData.name,
        mainGoal: formData.mainGoal,
        mainProduct: productRecommendation.mainProduct,
        complementaryProducts: productRecommendation.complementaryProducts,
        lifestyleTips: lifestyleTips,
      });

    } catch (e) {
      console.error("Error generating recommendation:", e);
      setError("Failed to generate recommendation. Please try again.");
      setShowForm(true); // Go back to form if error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleStartOver = () => {
    setClientInfo(initialClientInfo);
    setRecommendation(null);
    setShowForm(true);
    setError(null);
  };
  
  const getGradientForGoal = (goal: string) => {
    const goalColors: { [key: string]: string } = {
      'Control de Peso': 'from-green-400 to-blue-500',
      'Energía': 'from-yellow-400 to-orange-500',
      'Digestión': 'from-teal-400 to-cyan-500',
      'Sistema Inmunológico': 'from-blue-400 to-indigo-500',
      'Estrés/Ánimo': 'from-purple-400 to-pink-500',
      'Sueño': 'from-indigo-400 to-blue-600',
      'Salud Articular/Muscular': 'from-red-400 to-pink-600',
      'Rendimiento Deportivo': 'from-orange-400 to-red-500',
      'Belleza': 'from-pink-400 to-rose-500',
      'Desintoxicación': 'from-lime-400 to-emerald-500',
    };
    return goalColors[goal] || 'from-gray-400 to-gray-600';
  };

  const currentGradient = clientInfo.mainGoal && HEALTH_GOALS.includes(clientInfo.mainGoal) 
    ? getGradientForGoal(clientInfo.mainGoal) 
    : 'from-purple-600 via-pink-500 to-red-500';


  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${currentGradient} p-4 sm:p-6 md:p-8 flex flex-col items-center transition-all duration-500 ease-in-out`}>
      <header className="mb-6 w-full max-w-5xl flex justify-between items-center flex-wrap gap-4">
        <div className="inline-flex items-center bg-white/20 backdrop-blur-md p-3 rounded-xl shadow-lg">
          <LogoIcon className="h-12 w-12 text-white" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white ml-3">
            Fuxion <span className="font-light">Wellness Planner</span>
          </h1>
        </div>
        <button
          onClick={() => setShowCatalog(true)}
          className="flex items-center justify-center px-5 py-3 bg-white/30 text-white font-semibold rounded-lg shadow-md backdrop-blur-md hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-opacity-75 transition duration-150"
          title="Explorar el catálogo completo de productos Fuxion"
        >
          <BookOpenIcon className="h-6 w-6 mr-2" />
          Explorar Catálogo
        </button>
      </header>

      <main className="w-full max-w-5xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-xl p-6 sm:p-8 md:p-10 transform transition-all duration-500 ease-in-out">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
            <p className="mt-4 text-xl font-semibold text-gray-700">Generando tu plan personalizado...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="text-center p-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
            <p className="font-bold text-lg">¡Ups! Algo salió mal.</p>
            <p className="mb-4">{error}</p>
            <button
              onClick={handleStartOver}
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-150"
            >
              Intentar de Nuevo
            </button>
          </div>
        )}

        {!isLoading && !error && showForm && (
          <ClientForm
            initialClientInfo={clientInfo}
            onSubmit={handleFormSubmit}
            onClientInfoChange={setClientInfo}
          />
        )}

        {!isLoading && !error && !showForm && recommendation && (
          <RecommendationDisplay
            recommendation={recommendation}
            clientInfo={clientInfo} 
            onStartOver={handleStartOver}
            onShowCatalog={() => setShowCatalog(true)}
          />
        )}
      </main>
      <footer className="mt-8 text-center text-white/80 text-sm">
        <p>&copy; {new Date().getFullYear()} Fuxion Wellness Planner. Personalizado para ti.</p>
        <p className="text-xs mt-1">Esta herramienta proporciona sugerencias y no sustituye el consejo médico profesional.</p>
      </footer>
      {showCatalog && <ProductCatalog onClose={() => setShowCatalog(false)} />}
    </div>
  );
};

export default App;