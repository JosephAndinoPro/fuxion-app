import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ClientInfo } from '../types';

/**
 * Generates personalized lifestyle tips using the Gemini API.
 * The API key is securely managed as an environment variable.
 */
export const generateLifestyleTips = async (clientInfo: ClientInfo): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("API_KEY environment variable is not set.");
    return "La generación de consejos de estilo de vida no está disponible en este momento (clave API no configurada). Por favor, consulta a tu asesor de bienestar.";
  }

  const ai = new GoogleGenAI({ apiKey });

  const dietDetails = clientInfo.dietType === 'Otra' ? clientInfo.customDietType : clientInfo.dietType;
  const symptomsString = clientInfo.commonSymptoms.length > 0 ? clientInfo.commonSymptoms.join(', ') : 'Ninguno reportado';

  const prompt = `
Eres un coach de bienestar y nutrición, experto y empático. Tu rol es complementar una recomendación de productos nutracéuticos con consejos de estilo de vida.
Basándote en la siguiente información de un cliente, proporciona entre 3 y 5 consejos de estilo de vida personalizados, breves, accionables y motivadores.
Estos consejos deben ayudarle a alcanzar su objetivo principal de salud.

**Reglas Estrictas:**
1.  **NO menciones, sugieras ni hagas alusión a ningún producto comercial, suplemento, vitamina o nutracéutico específico** (ni de Fuxion ni de otras marcas). Tu foco es 100% en hábitos.
2.  Enfócate únicamente en cambios de hábitos (alimentación, ejercicio, sueño, manejo de estrés, hidratación).
3.  Usa un lenguaje positivo y de apoyo. Formatea cada consejo como un punto separado. Utiliza markdown para resaltar palabras clave con negritas (**ejemplo**).
4.  Comienza cada consejo con un verbo de acción (Ej: **Prioriza**, **Incorpora**, **Intenta**, **Asegúrate**).
5.  Finaliza con una frase motivadora corta y original.

**Información del Cliente:**
- **Objetivo Principal:** ${clientInfo.mainGoal}
- **Detalles del Objetivo:** ${clientInfo.priorityGoalDetails || 'No especificado'}
- **Edad:** ${clientInfo.age}
- **Género:** ${clientInfo.gender}
- **Nivel de Actividad:** ${clientInfo.activityLevel}
- **Hábitos Alimenticios:** Dieta ${dietDetails}, comidas de forma ${clientInfo.mealRegularity}.
- **Hidratación:** Consumo de agua ${clientInfo.waterIntake}.
- **Ejercicio:** ${clientInfo.exerciseFrequency}, tipo: ${clientInfo.exerciseType || 'No especificado'}.
- **Descanso:** Duerme ${clientInfo.sleepHours} horas, calidad de sueño ${clientInfo.sleepQuality}.
- **Síntomas Comunes:** ${symptomsString}.

Analiza cómo sus hábitos actuales impactan su objetivo de **"${clientInfo.mainGoal}"** y ofrece consejos prácticos para mejorar.
`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
      config: {
        temperature: 0.75, // For creative yet relevant advice
        topP: 0.95,
        topK: 40,
      }
    });

    const text = response.text;
    if (text) {
      return text.trim();
    } else {
      return "No se pudieron generar consejos de estilo de vida en este momento. Intenta ser más específico en tu información o consulta a tu asesor.";
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    let errorMessage = "Hubo un problema al generar los consejos de estilo de vida. ";
    if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
            errorMessage += "La clave API no es válida. Por favor, verifica la configuración.";
        } else if (error.message.includes("quota")) {
            errorMessage += "Se ha alcanzado la cuota de uso. Inténtalo más tarde.";
        } else {
            errorMessage += "Por favor, inténtalo de nuevo más tarde.";
        }
    } else {
        errorMessage += "Error desconocido. Por favor, inténtalo de nuevo más tarde.";
    }
    return errorMessage;
  }
};