import React, { useState, useEffect } from 'react';
import { ClientInfo, FormStep } from '../types';
import { FORM_STEPS } from '../constants';
import StepDemographics from './StepDemographics';
import StepHealthGoal from './StepHealthGoal';
import StepLifestyle from './StepLifestyle';
import StepGeneralHealth from './StepGeneralHealth';
import ProgressBar from './ProgressBar';
import { ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon } from './IconComponents';

interface ClientFormProps {
  initialClientInfo: ClientInfo;
  onSubmit: (clientInfo: ClientInfo) => void;
  onClientInfoChange: (clientInfo: ClientInfo) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ initialClientInfo, onSubmit, onClientInfoChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ClientInfo>(initialClientInfo);
  const [errors, setErrors] = useState<Partial<Record<keyof ClientInfo, string>>>({});

  useEffect(() => {
    setFormData(initialClientInfo);
  }, [initialClientInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number | string[] = value;

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      const currentSymptoms = formData.commonSymptoms || [];
      if (checked) {
        processedValue = [...currentSymptoms, value];
      } else {
        processedValue = currentSymptoms.filter(symptom => symptom !== value);
      }
    } else if (name === 'age' || name === 'sleepHours') {
        processedValue = value === '' ? '' : parseInt(value, 10);
        if (isNaN(processedValue as number) && value !== '') { // only if value is not empty and not a number
            processedValue = formData[name as keyof ClientInfo] as string | number; // keep previous value
        } else if (value === '') {
            processedValue = '';
        }
    }

    const newFormData = { ...formData, [name]: processedValue };
    setFormData(newFormData);
    onClientInfoChange(newFormData); // Notify parent about the change

      // Basic validation example (clearing error on change)
    if (errors[name as keyof ClientInfo]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: undefined }));
    }
  };

  const validateStep = (): boolean => {
    const currentFields = FORM_STEPS[currentStep].fields;
    const newErrors: Partial<Record<keyof ClientInfo, string>> = {};
    let isValid = true;

    currentFields.forEach(field => {
      const value = formData[field];
      if (field === 'name' && (value === '' || (typeof value === 'string' && value.trim() === ''))) {
        newErrors.name = 'El nombre es requerido.';
        isValid = false;
      }
      if (field === 'age' && (value === '' || (typeof value === 'number' && value <= 0) || (typeof value === 'string' && parseInt(value) <=0) )) {
        newErrors.age = 'La edad debe ser un número positivo.';
        isValid = false;
      }
      if (field === 'email') {
        const emailValue = value as string;
        if (!emailValue || emailValue.trim() === '') {
            newErrors.email = 'El correo electrónico es requerido.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(emailValue)) {
            newErrors.email = 'El formato del correo electrónico no es válido.';
            isValid = false;
        }
      }
      if (field === 'phone') {
          const phoneValue = value as string;
          if (!phoneValue || phoneValue.trim() === '') {
              newErrors.phone = 'El número de celular es requerido.';
              isValid = false;
          } else if (!/^[0-9\s+-]{7,15}$/.test(phoneValue)) {
              newErrors.phone = 'El formato del número de celular no es válido.';
              isValid = false;
          }
      }
       if (field === 'mainGoal' && value === '') {
        newErrors.mainGoal = 'Debe seleccionar un objetivo principal.';
        isValid = false;
      }
      // Add more specific validations as needed
    });
    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < FORM_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Esto es importante para que React maneje el envío
    if (validateStep()) {
      onSubmit(formData);
      // Netlify Forms intercepta el envío POST estándar del HTML
      // No necesitas un fetch() o axios.post() aquí para Netlify Forms
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepDemographics formData={formData} handleChange={handleChange} errors={errors} />;
      case 1:
        return <StepHealthGoal formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <StepLifestyle formData={formData} handleChange={handleChange} errors={errors} />;
      case 3:
        return <StepGeneralHealth formData={formData} handleChange={handleChange} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <form 
      name="fuxion_reco_form" // <-- ¡Nombre del formulario que Netlify debe detectar!
      method="POST" 
      data-netlify="true" // <-- Atributo clave para Netlify
      onSubmit={handleSubmit} 
      className="space-y-8"
    >
      {/* ¡Este campo oculto es CRÍTICO para la detección de formularios en SPAs con Netlify! */}
      <input type="hidden" name="form-name" value="fuxion_reco_form" /> 

      <ProgressBar currentStep={currentStep} totalSteps={FORM_STEPS.length} stepNames={FORM_STEPS.map(s => s.name)} />
      
      <div className="p-6 bg-white/50 backdrop-blur-sm rounded-lg shadow-md min-h-[300px]">
        {renderStep()}
      </div>

      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="flex items-center px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Anterior
        </button>
        {currentStep < FORM_STEPS.length - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow hover:bg-pink-600 transition duration-150"
          >
            Siguiente
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        ) : (
          <button
            type="submit" // <-- Este debe ser type="submit" para que Netlify lo intercepte
            className="flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition duration-150"
          >
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            Generar Recomendación
          </button>
        )}
      </div>
    </form>
  );
};

export default ClientForm;