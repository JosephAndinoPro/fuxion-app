
import React from 'react';
import { ClientInfo, DietType, MealRegularity, WaterIntake, ExerciseFrequency, SleepQuality } from '../types';
import { DIET_TYPES, MEAL_REGULARITIES, WATER_INTAKES, EXERCISE_FREQUENCIES, SLEEP_QUALITIES } from '../constants';

interface StepLifestyleProps {
  formData: ClientInfo;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  errors: Partial<Record<keyof ClientInfo, string>>;
}

const StepLifestyle: React.FC<StepLifestyleProps> = ({ formData, handleChange, errors }) => {
  const selectClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900";
  const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900";

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-pink-300 pb-2">Hábitos de Estilo de Vida</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label htmlFor="dietType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Alimentación Principal</label>
          <select
            name="dietType"
            id="dietType"
            value={formData.dietType}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="" className="text-gray-500">Seleccionar...</option>
            {DIET_TYPES.map(type => <option key={type} value={type} className="text-gray-900">{type}</option>)}
          </select>
          {formData.dietType === DietType.OTRA && (
            <input
              type="text"
              name="customDietType"
              id="customDietType"
              value={formData.customDietType}
              onChange={handleChange}
              className={`mt-2 ${inputClasses}`}
              placeholder="Especificar otro tipo de dieta"
            />
          )}
        </div>

        <div>
          <label htmlFor="mealRegularity" className="block text-sm font-medium text-gray-700 mb-1">Regularidad de Comidas</label>
          <select
            name="mealRegularity"
            id="mealRegularity"
            value={formData.mealRegularity}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="" className="text-gray-500">Seleccionar...</option>
            {MEAL_REGULARITIES.map(reg => <option key={reg} value={reg} className="text-gray-900">{reg}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="waterIntake" className="block text-sm font-medium text-gray-700 mb-1">Consumo Diario de Agua</label>
          <select
            name="waterIntake"
            id="waterIntake"
            value={formData.waterIntake}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="" className="text-gray-500">Seleccionar...</option>
            {WATER_INTAKES.map(intake => <option key={intake} value={intake} className="text-gray-900">{intake}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="exerciseFrequency" className="block text-sm font-medium text-gray-700 mb-1">Frecuencia de Ejercicio Físico</label>
          <select
            name="exerciseFrequency"
            id="exerciseFrequency"
            value={formData.exerciseFrequency}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="" className="text-gray-500">Seleccionar...</option>
            {EXERCISE_FREQUENCIES.map(freq => <option key={freq} value={freq} className="text-gray-900">{freq}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-4"> {/* Added mt-4 for spacing */}
        <label htmlFor="exerciseType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Ejercicio Principal (si aplica)</label>
        <input
          type="text"
          name="exerciseType"
          id="exerciseType"
          value={formData.exerciseType}
          onChange={handleChange}
          className={inputClasses}
          placeholder="Ej: Correr, Gimnasio, Yoga, Natación"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4"> {/* Added mt-4 for spacing */}
        <div>
          <label htmlFor="sleepHours" className="block text-sm font-medium text-gray-700 mb-1">Horas de Sueño (promedio por noche)</label>
          <input
            type="number"
            name="sleepHours"
            id="sleepHours"
            value={formData.sleepHours}
            onChange={handleChange}
            min="0" max="24"
            className={inputClasses}
            placeholder="Ej: 7"
          />
        </div>
        <div>
          <label htmlFor="sleepQuality" className="block text-sm font-medium text-gray-700 mb-1">Calidad del Descanso</label>
          <select
            name="sleepQuality"
            id="sleepQuality"
            value={formData.sleepQuality}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="" className="text-gray-500">Seleccionar...</option>
            {SLEEP_QUALITIES.map(quality => <option key={quality} value={quality} className="text-gray-900">{quality}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};

export default StepLifestyle;