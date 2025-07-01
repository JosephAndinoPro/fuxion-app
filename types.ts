export interface ClientInfo {
  name: string;
  age: number | string; // Allow string for input field, convert to number on processing
  gender: 'Masculino' | 'Femenino' | 'Otro' | '';
  phone: string;
  email: string;
  occupation: string;
  activityLevel: 'Sedentario' | 'Ligero' | 'Moderado' | 'Activo' | 'Muy Activo' | '';
  
  mainGoal: string; // From HEALTH_GOALS in constants.ts
  priorityGoalDetails?: string;

  dietType: 'Equilibrada' | 'Rica en frutas/verduras' | 'Rica en procesados/dulces' | 'Vegetariana' | 'Vegana' | 'Otra' | '';
  customDietType?: string;
  mealRegularity: 'Regular' | 'Irregular' | '';
  waterIntake: 'Bajo (<1L)' | 'Moderado (1-2L)' | 'Alto (>2L)' | '';
  exerciseFrequency: 'Nunca' | '1-2 veces/sem' | '3-4 veces/sem' | '5+ veces/sem' | '';
  exerciseType: string;
  sleepHours: number | string; // Allow string for input field
  sleepQuality: 'Mala' | 'Regular' | 'Buena' | '';

  commonSymptoms: string[]; // Array of selected symptoms from SYMPTOM_OPTIONS
  medicalConditions: string;
  currentMedications: string;
  additionalInfo: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  points?: number; // Points awarded for purchasing the product
  category: string; // Corresponds to one of HEALTH_GOALS or similar
  description: string;
  benefits: string[];
  keyIngredients: string[];
  suggestedUsage: string;
  expectedResults: string;
  imageUrl: string;
  videoUrl?: string; // Optional URL for product video
  tags: string[]; // For matching with client needs/goals
}

export interface Recommendation {
  clientName: string;
  mainGoal: string;
  mainProduct: Product;
  complementaryProducts: Product[];
  lifestyleTips: string;
}

export interface FormStep {
  id: number;
  name: string;
  fields: (keyof ClientInfo)[];
}

export enum ActivityLevel {
  SEDENTARIO = 'Sedentario',
  LIGERO = 'Ligero',
  MODERADO = 'Moderado',
  ACTIVO = 'Activo',
  MUY_ACTIVO = 'Muy Activo',
}

export enum Gender {
  MASCULINO = 'Masculino',
  FEMENINO = 'Femenino',
  OTRO = 'Otro',
}

export enum DietType {
  EQUILIBRADA = 'Equilibrada',
  FRUTAS_VERDURAS = 'Rica en frutas/verduras',
  PROCESADOS_DULCES = 'Rica en procesados/dulces',
  VEGETARIANA = 'Vegetariana',
  VEGANA = 'Vegana',
  OTRA = 'Otra',
}

export enum MealRegularity {
  REGULAR = 'Regular',
  IRREGULAR = 'Irregular',
}

export enum WaterIntake {
  BAJO = 'Bajo (<1L)',
  MODERADO = 'Moderado (1-2L)',
  ALTO = 'Alto (>2L)',
}

export enum ExerciseFrequency {
  NUNCA = 'Nunca',
  UNO_DOS = '1-2 veces/sem',
  TRES_CUATRO = '3-4 veces/sem',
  CINCO_MAS = '5+ veces/sem',
}

export enum SleepQuality {
  MALA = 'Mala',
  REGULAR = 'Regular',
  BUENA = 'Buena',
}

export interface AdminContact {
  name: string;
  phone: string;
}

// Ensure enum values match string literals used in ClientInfo and constants