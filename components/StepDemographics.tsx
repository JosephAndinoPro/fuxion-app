
import React from 'react';
import { ClientInfo, Gender, ActivityLevel } from '../types';
import { GENDERS, ACTIVITY_LEVELS } from '../constants';

interface StepDemographicsProps {
  formData: ClientInfo;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: Partial<Record<keyof ClientInfo, string>>;
}

const StepDemographics: React.FC<StepDemographicsProps> = ({ formData, handleChange, errors }) => {
  const selectClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition duration-150 bg-white text-gray-900";
  const inputClasses = (hasError: boolean) => 
    `w-full px-4 py-2 border ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500 transition duration-150 bg-white text-gray-900`;

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 border-pink-300 pb-2">Información Personal del Cliente</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClasses(!!errors.name)}
            placeholder="Ej: Ana Pérez"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
          <input
            type="number"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            className={inputClasses(!!errors.age)}
            placeholder="Ej: 35"
          />
          {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses(!!errors.phone)}
            placeholder="Ej: 0991234567"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClasses(!!errors.email)}
            placeholder="Ej: ana.perez@correo.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Género</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className={selectClasses}
          >
            <option value="" className="text-gray-500">Seleccionar...</option>
            {GENDERS.map(gender => <option key={gender} value={gender} className="text-gray-900">{gender}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">Ocupación</label>
          <input
            type="text"
            name="occupation"
            id="occupation"
            value={formData.occupation}
            onChange={handleChange}
            className={inputClasses(false)} // Assuming no specific error for occupation for now
            placeholder="Ej: Oficinista, Atleta, Estudiante"
          />
        </div>
      </div>

      <div className="mt-4"> {/* Added mt-4 for spacing */}
        <label htmlFor="activityLevel" className="block text-sm font-medium text-gray-700 mb-1">Nivel de Actividad Física General</label>
        <select
          name="activityLevel"
          id="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
          className={selectClasses}
        >
          <option value="" className="text-gray-500">Seleccionar...</option>
          {ACTIVITY_LEVELS.map(level => <option key={level} value={level} className="text-gray-900">{level}</option>)}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Sedentario (poco o ningún ejercicio), Ligero (ejercicio ligero 1-3 días/sem), Moderado (ejercicio moderado 3-5 días/sem), Activo (ejercicio intenso 6-7 días/sem), Muy Activo (ejercicio muy intenso y trabajo físico).
        </p>
      </div>
    </div>
  );
};

export default StepDemographics;