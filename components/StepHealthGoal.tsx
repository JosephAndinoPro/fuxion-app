
import React from 'react';
import { ClientInfo } from '../types';
import { HEALTH_GOALS } from '../constants';

interface StepHealthGoalProps {
  formData: ClientInfo;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => void;
  errors: Partial<Record<keyof ClientInfo, string>>;
}

const StepHealthGoal: React.FC<StepHealthGoalProps> = ({ formData, handleChange, errors }) => {
  const selectClasses = (hasError: boolean) => 
    `w-full px-4 py-2 border ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition duration-150 bg-white text-gray-900`;
  const textareaClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition duration-150 bg-white text-gray-900";
  
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-pink-300 pb-2">Objetivo Principal de Bienestar</h2>
      
      <div>
        <label htmlFor="mainGoal" className="block text-sm font-medium text-gray-700 mb-1">¿Cuál es tu objetivo principal de salud/bienestar?</label>
        <select
          name="mainGoal"
          id="mainGoal"
          value={formData.mainGoal}
          onChange={handleChange}
          className={selectClasses(!!errors.mainGoal)}
        >
          <option value="" className="text-gray-500">Seleccionar objetivo...</option>
          {HEALTH_GOALS.map(goal => (
            <option key={goal} value={goal} className="text-gray-900">{goal}</option>
          ))}
        </select>
        {errors.mainGoal && <p className="text-red-500 text-xs mt-1">{errors.mainGoal}</p>}
        <p className="text-xs text-gray-500 mt-1">Elige la opción que mejor represente tu prioridad número uno en este momento.</p>
      </div>

      <div>
        <label htmlFor="priorityGoalDetails" className="block text-sm font-medium text-gray-700 mb-1">
          Detalles adicionales sobre tu objetivo principal (opcional)
        </label>
        <textarea
          name="priorityGoalDetails"
          id="priorityGoalDetails"
          rows={3}
          value={formData.priorityGoalDetails}
          onChange={handleChange}
          className={textareaClasses}
          placeholder="Ej: Quiero bajar 5kg para sentirme con más energía, o Necesito mejorar mi digestión porque me siento hinchado/a constantemente."
        />
      </div>
    </div>
  );
};

export default StepHealthGoal;