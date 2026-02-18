# React Login Lite AI

A simple and modern React-based login form transformed into an AI-powered authentication experience. This project demonstrates the integration of artificial intelligence into core identity flows, including password analysis, dynamic persona generation, and an automated support assistant.

## 🚀 Features

### 1. AI Password Intelligence (`src/components/PasswordIntelligence.tsx`)
- **Neural Audit**: Real-time analysis of password security using Blink AI (`generateObject`).
- **Dynamic Scoring**: Provides a 0-100 integrity score and categorizes strength (Weak, Medium, Strong).
- **Intelligent Advice**: Generates actionable security suggestions tailored to the specific password entered.

### 2. Dynamic AI Personas (`src/components/Dashboard.tsx`)
- **Identity Synthesis**: Automatically generates a unique digital persona for every user based on their email identifier.
- **Structured Data**: Uses Blink AI (`generateObject`) to create names, titles, descriptions, and catchphrases.
- **Persona Regeneration**: Users can trigger a "neural identity refresh" to generate a new persona.

### 3. AI Avatar Generation (`src/components/Dashboard.tsx`)
- **Visual Identity**: Creates high-fidelity, futuristic avatars using the `fal-ai/flux/schnell` model via Blink AI (`generateImage`).
- **Contextual Prompting**: The image generation prompt is dynamically constructed based on the user's generated persona name.

### 4. Neural Support Assistant (`src/components/AIAssistant.tsx`)
- **Agentic Chat**: A floating AI assistant powered by the `google/gemini-3-flash` model.
- **Context-Aware Support**: Tailored to help users with onboarding, security questions, and app navigation.
- **Streaming Interface**: Leverages the `useAgent` hook from `@blinkdotnew/react` for smooth, real-time message streaming.

### 5. Secure Authentication (`src/App.tsx`)
- **Blink Auth**: Fully managed authentication lifecycle including sign-up and sign-in.
- **Social Bridge**: Seamless integration with Google and Apple for rapid onboarding.
- **Glassmorphic UI**: Premium design with animated background elements and sleek visuals.

---

## 🛠 Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Backend/AI**: [Blink SDK](https://blink.new/docs) (Auth, AI, Storage)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI)
- **Notifications**: [Sonner](https://sonner.stevenlu.com/)

---

## 📂 Project Structure & Documentation

### Core Configuration
- `src/lib/blink.ts`: Initializes the Blink SDK client. It dynamically detects the Project ID based on the environment or hostname.
- `tailwind.config.cjs`: Custom Tailwind configuration with specialized animations like `border-beam`, `gradient`, and `pulse-slow`.

### Key Components
- `src/App.tsx`: The primary orchestrator. It manages the global authentication state using the `useBlinkAuth` hook and switches between the Login view and the Dashboard.
- `src/components/Dashboard.tsx`: The authenticated area. It handles the "Neural Identity" lifecycle, triggering AI generation tasks when the user first logs in.
- `src/components/PasswordIntelligence.tsx`: A self-contained molecule that watches the password state and debounces calls to Blink AI to prevent excessive API usage.
- `src/components/AIAssistant.tsx`: Implements the `useAgent` pattern. It defines a `supportAgent` with specific system instructions to ensure professional and relevant responses.

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (recommended)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd react-login-lite-ai
   ```

2. **Install dependencies**:
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**:
   Blink automatically manages your environment variables. If running locally, ensure your `.env.local` contains:
   ```env
   VITE_BLINK_PROJECT_ID=your-project-id
   VITE_BLINK_PUBLISHABLE_KEY=your-publishable-key
   ```

4. **Start the development server**:
   ```bash
   bun dev
   # or
   npm run dev
   ```

---

## 🛡 Security Note

This application uses the Blink SDK for authentication. All user data is encrypted and handled securely by the Blink platform. Ensure your `VITE_BLINK_PUBLISHABLE_KEY` is kept secure and never exposed in public repositories.

---

## 📄 License

This project is licensed under the MIT License.
