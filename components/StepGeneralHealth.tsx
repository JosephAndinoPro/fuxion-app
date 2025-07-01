

import React from 'react';
import { ClientInfo } from '../types';
import { SYMPTOM_OPTIONS } from '../constants';

interface StepGeneralHealthProps {
  formData: ClientInfo;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: Partial<Record<keyof ClientInfo, string>>;
}

const StepGeneralHealth: React.FC<StepGeneralHealthProps> = ({ formData, handleChange, errors }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e); // Let the main handler process it
  };

  const textareaClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 bg-white text-gray-900";

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-pink-300 pb-2">Salud General y Síntomas</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Síntomas Frecuentes (selecciona los que apliquen)</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {SYMPTOM_OPTIONS.map(symptom => (
            <div key={symptom} className="flex items-center">
              <input
                type="checkbox"
                name="commonSymptoms"
                id={`symptom-${symptom.replace(/\s+/g, '-')}`}
                value={symptom}
                checked={formData.commonSymptoms.includes(symptom)}
                onChange={handleCheckboxChange}
                className="h-5 w-5 text-pink-500 border-gray-300 rounded focus:ring-pink-400 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor={`symptom-${symptom.replace(/\s+/g, '-')}`} className="ml-2 text-sm text-gray-700 cursor-pointer">{symptom}</label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="medicalConditions" className="block text-sm font-medium text-gray-700 mb-1">Condiciones Médicas Preexistentes (si alguna)</label>
        <textarea
          name="medicalConditions"
          id="medicalConditions"
          rows={2}
          value={formData.medicalConditions}
          onChange={handleChange}
          className={textareaClasses}
          placeholder="Ej: Hipertensión, Diabetes tipo 2, Hipotiroidismo"
        />
      </div>

      <div>
        <label htmlFor="currentMedications" className="block text-sm font-medium text-gray-700 mb-1">Medicamentos o Suplementos Actuales (si alguno)</label>
        <textarea
          name="currentMedications"
          id="currentMedications"
          rows={2}
          value={formData.currentMedications}
          onChange={handleChange}
          className={textareaClasses}
          placeholder="Ej: Losartán 50mg, Multivitamínico"
        />
      </div>

      <div>
        <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 mb-1">Información Adicional Relevante (opcional)</label>
        <textarea
          name="additionalInfo"
          id="additionalInfo"
          rows={3}
          value={formData.additionalInfo}
          onChange={handleChange}
          className={textareaClasses}
          placeholder="Cualquier otro detalle que consideres importante para tu recomendación."
        />
      </div>
    </div>
  );
};

export default StepGeneralHealth;