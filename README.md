# Asesor de Bienestar Fuxion (Aplicación con React y AI)

Una aplicación web inteligente que actúa como un coach de bienestar virtual. Guía a los usuarios a través de un formulario dinámico para recomendarles productos de la marca Fuxion y generarles un plan de estilo de vida personalizado utilizando la IA de Google Gemini.


![image](https://github.com/user-attachments/assets/7de10399-30ec-4149-be0e-de633cc3ad7c)

![image](https://github.com/user-attachments/assets/8e417a38-71fc-4b23-896b-3d770653bb1f)

https://planfuxionalexandra.netlify.app/

## Características Principales

* **Formulario Dinámico:** Un formulario interactivo de múltiples pasos para recopilar información del usuario sobre sus objetivos y estilo de vida.
* **Algoritmo de Recomendación:** Lógica interna escrita en TypeScript que analiza las respuestas para recomendar un producto principal y productos complementarios.
* **Integración con IA:** Se conecta a la **API de Google Gemini** para generar consejos únicos y personalizados de dieta, ejercicio y bienestar.
* **Exportación a PDF:** Permite a los usuarios descargar su plan de bienestar completo en un archivo PDF, generado en el lado del cliente.
* **Interfaz Moderna y Responsiva:** Construida con **TailwindCSS** para un diseño limpio, rápido y adaptable a cualquier dispositivo.

## Stack Tecnológico

* **Lenguaje:** TypeScript
* **Framework de UI:** React (con Hooks)
* **Estilos:** TailwindCSS
* **Inteligencia Artificial:** Google Gemini API
* **Generación de PDF:** jspdf

## Instalación y Uso Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/JosephAndinoPro/fuxion-app.git](https://github.com/JosephAndinoPro/fuxion-app.git)
    cd fuxion-app
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar la API Key de Gemini:**
    * Crea un archivo llamado `.env.local` en la raíz del proyecto.
    * Dentro de este archivo, añade tu API Key de Google Gemini de la siguiente manera:
        ```
        VITE_GEMINI_API_KEY=TU_API_KEY_AQUI
        ```

4.  **Ejecutar la aplicación:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.
