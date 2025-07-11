# AnswerForMe Call Assistant

<p align="center">
  <img src="assets/a4m-icon.svg" alt="AnswerForMe Logo" width="120" height="120" />
</p>

**AnswerForMe Call Assistant** es una aplicación React que simula una interfaz de llamadas telefónicas con funciones como contestar, rechazar y un asistente AI "AnswerForMe" que filtra llamadas por ti. Demuestra diferentes estados de llamada e interacción con el micrófono.

---

## 🚀 Propósito

El objetivo de AnswerForMe es ayudarte a filtrar llamadas desconocidas o sospechosas, permitiendo que un asistente AI interactúe primero con el llamante y te permita tomar el control solo si lo deseas.

## ✨ Características principales

- Simulación de llamada entrante con datos ficticios.
- Opción de contestar, rechazar o usar el asistente AI.
- El asistente AI reproduce un saludo y espera la respuesta del llamante.
- Puedes tomar el control de la llamada en cualquier momento.
- Indicador visual del estado del micrófono.
- Interfaz moderna y responsiva, con soporte para temas personalizados.

## 🖥️ Capturas de pantalla (Flujo de la app)

<p align="center">
  <b>1. Llamada entrante</b><br>
  <img src="screenshots/answer-for-me_incoming-call.png" alt="Llamada entrante" width="350" />
</p>
<p align="center">
  <b>2. Contestando con AnswerForMe (asistente AI)</b><br>
  <img src="screenshots/answer-for-me_assitant-answer.png" alt="Contestando con AnswerForMe" width="350" />
</p>
<p align="center">
  <b>3. Esperando respuesta del llamante</b><br>
  <img src="screenshots/answer-for-me_awaiting-response.png" alt="Esperando respuesta" width="350" />
</p>
<p align="center">
  <b>4. Tomando el control de la llamada</b><br>
  <img src="screenshots/answer-for-me_taking-call.png" alt="Tomando el control" width="350" />
</p>
<p align="center">
  <b>5. Llamada activa</b><br>
  <img src="screenshots/answer-for-me_call-screen.png" alt="Llamada activa" width="350" />
</p>

## ⚙️ Instalación y uso

**Requisitos:** Node.js

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Crea un archivo `.env.local` y coloca tu clave de API de Gemini:
   ```env
   GEMINI_API_KEY=tu_clave_aqui
   ```
3. Ejecuta la app:
   ```bash
   npm run dev
   ```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador para ver la aplicación.

## 📁 Estructura del proyecto

- `App.tsx`: Componente principal de la app.
- `components/`: Componentes de UI para los distintos estados de llamada.
- `assets/a4m-icon.svg`: Logo principal de la app.
- `constants.ts`: Textos y recursos de audio.
- `a4m-theme.css`: Tema visual y estilos personalizados.

## 📝 Licencia

Actualmente este proyecto no tiene una licencia definida. Si deseas contribuir o usarlo, por favor contacta al autor.

---

Desarrollado con ❤️ por Snoitan.
