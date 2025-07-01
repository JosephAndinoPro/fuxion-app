import { ClientInfo, Product } from '../types';
import { PRODUCTS } from '../constants';

interface ProductRecommendationResult {
  mainProduct: Product;
  complementaryProducts: Product[];
}

interface ProductScore extends Product {
  score: number;
}

/**
 * Generates product recommendations using a scoring system based on client information.
 * This acts as a personalized Fuxion AI recommender.
 * @param clientInfo The information provided by the client.
 * @param allProducts The list of all available Fuxion products.
 * @returns An object containing the main product and a list of complementary products.
 */
export const generateRecommendation = (clientInfo: ClientInfo, allProducts: Product[]): ProductRecommendationResult => {
  const scoredProducts: ProductScore[] = allProducts.map(product => ({ ...product, score: 0 }));

  scoredProducts.forEach(p => {
    // 1. Main Goal Match (Highest Priority)
    if (p.category.toLowerCase() === clientInfo.mainGoal.toLowerCase()) {
      p.score += 50;
    }

    // 2. Symptom Matching
    clientInfo.commonSymptoms.forEach(symptom => {
      if (p.tags.some(tag => symptom.toLowerCase().includes(tag))) {
        p.score += 20;
      }
      // Example of more specific symptom logic
      if (symptom.includes('digestivo') && p.tags.includes('digestión')) p.score += 25;
      if (symptom.includes('articular') && p.tags.includes('articulaciones')) p.score += 25;
      if (symptom.includes('menstrual') && p.tags.includes('salud femenina')) p.score += 30;
    });

    // 3. Keyword matching in goals and additional info
    const clientText = `${clientInfo.priorityGoalDetails?.toLowerCase()} ${clientInfo.additionalInfo?.toLowerCase()}`;
    p.tags.forEach(tag => {
      if (clientText.includes(tag)) {
        p.score += 10;
      }
    });

    // 4. Lifestyle and Demographic adjustments
    if ((clientInfo.activityLevel === 'Activo' || clientInfo.activityLevel === 'Muy Activo') && p.category === 'Rendimiento Deportivo') {
      p.score += 30;
    }
    if (clientInfo.gender === 'Femenino' && p.category === 'Salud Femenina') {
      p.score += 30;
    }
    if (clientInfo.sleepQuality === 'Mala' && p.tags.includes('sueño')) {
      p.score += 25;
    }
    if (clientInfo.dietType === 'Rica en procesados/dulces' && (p.tags.includes('desintoxicación') || p.tags.includes('control de peso'))) {
        p.score += 15;
    }

    // 5. Penalties for irrelevant products
    if (clientInfo.mainGoal !== 'Rendimiento Deportivo' && p.category === 'Rendimiento Deportivo') {
      p.score -= 10; // Slight penalty if not the main goal, but could be complementary
    }
  });

  // Sort products by score in descending order
  scoredProducts.sort((a, b) => b.score - a.score);

  // Fallback if no product gets a score
  if (scoredProducts.length === 0 || scoredProducts[0].score === 0) {
     const fallbackProduct = allProducts.find(p => p.id === 'vita_xtra_t') || allProducts[0];
     if(!fallbackProduct) throw new Error("No products available to recommend.");
     return {
        mainProduct: fallbackProduct,
        complementaryProducts: allProducts.filter(p => p.id !== fallbackProduct.id).slice(0, 2),
     };
  }
  
  const mainProduct = scoredProducts[0];
  const complementaryProducts = scoredProducts
    .slice(1) // Exclude main product
    .filter(p => p.score > 10) // Only recommend complementary if they have a reasonable score
    .slice(0, 2); // Limit to 2 complementary products

  return {
    mainProduct,
    complementaryProducts,
  };
};