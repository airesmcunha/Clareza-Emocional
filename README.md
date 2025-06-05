# Clareza Emocional

Simple React application with a small Express proxy to call the OpenAI API. The proxy avoids CORS issues when running the app in the browser.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your OpenAI API key.

   ```bash
   cp .env.example .env
   # edit .env and set OPENAI_API_KEY
   ```

3. Start the backend server:
   ```bash
   npm run server
   ```
   The server runs on port defined in `.env` (default `3001`).

4. In another terminal start the React app:
   ```bash
   npm start
   ```

Then open `http://localhost:3000` in your browser.
