# React Login Lite AI

A simple and modern React-based login form transformed into an AI-powered authentication experience. This project demonstrates the integration of artificial intelligence into core identity flows, including password analysis, dynamic persona generation, and an automated support assistant.

## Features

- **AI-Powered Authentication**: Secure login and sign-up powered by Blink SDK.
- **AI Password Intelligence**: Real-time analysis of password strength with intelligent suggestions.
- **Dynamic AI Personas**: Automatically generates a unique AI identity and description for every user based on their email.
- **AI Avatar Generation**: Creates high-fidelity, futuristic avatars matching the user's generated persona.
- **Neural Support Assistant**: A floating AI chat assistant to help users with onboarding and security questions.
- **Glassmorphic UI**: A premium, modern design with animated backgrounds and sleek visuals.

## Tech Stack

- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS + Lucide Icons
- **Backend/AI**: [Blink SDK](https://blink.new/docs)
- **UI Components**: Radix UI (via Shadcn)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (recommended for faster dependency management)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-login-lite-ai
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file and add your Blink Project credentials:
   ```env
   VITE_BLINK_PROJECT_ID=your-project-id
   VITE_BLINK_PUBLISHABLE_KEY=your-publishable-key
   ```

4. Start the development server:
   ```bash
   bun dev
   # or
   npm run dev
   ```

## Project Structure

- `src/App.tsx`: The main entry point and auth flow orchestrator.
- `src/components/Dashboard.tsx`: Post-auth experience with persona and avatar generation.
- `src/components/AIAssistant.tsx`: Floating AI chat component.
- `src/components/PasswordIntelligence.tsx`: AI password strength analyzer.
- `src/lib/blink.ts`: Blink SDK configuration.

## License

This project is licensed under the MIT License.
