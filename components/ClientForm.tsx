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

// ... (otras importaciones y código) ...

const ClientForm: React.FC<ClientFormProps> = ({ initialClientInfo, onSubmit, onClientInfoChange }) => {
  // ... (estados y otras funciones) ...

  const handleSubmit = async (e: React.FormEvent) => { // Marca como 'async'
    e.preventDefault(); // Esto es VITAL: evita el envío de formulario HTML por defecto

    if (validateStep()) {
      onSubmit(formData); // Esto llama a tu función de App.tsx para generar la recomendación

      // --- CÓDIGO PARA ENVIAR A MAKE.COM ---
      try {
        const webhookUrl = "https://hook.us2.make.com/jrx5y5hbq78d35lt25k9r79tffzwqgas"; // <-- ¡TU URL PEGADA AQUÍ!
        
        // Convertir formData a un objeto plano si es necesario, 
        // especialmente si tienes arrays u objetos anidados (como commonSymptoms)
        const dataToSend = {
            ...formData,
            commonSymptoms: formData.commonSymptoms ? formData.commonSymptoms.join(', ') : '', // Convierte el array a string
            // Si tienes otros campos complejos, conviértelos a string
        };

        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          console.log("Datos enviados a Make.com exitosamente!");
          // Opcional: podrías mostrar un mensaje de éxito al usuario
        } else {
          console.error("Error al enviar datos a Make.com:", response.statusText);
          // Opcional: mostrar un mensaje de error al usuario
        }
      } catch (error) {
        console.error("Error en la conexión con Make.com:", error);
        // Opcional: manejar errores de red
      }
      // --- FIN DEL CÓDIGO ---
    }
  };

  // ... (resto del componente) ...
};

export default ClientForm;