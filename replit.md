# LevelForge

## Overview
LevelForge is an AI-powered level design analysis tool that transforms game level screenshots or gameplay footage into professional portfolio breakdowns, flow diagrams, and pacing analysis using Google's Gemini AI.

**Current State**: Fully functional and running on Replit. The app is configured to work with Replit's environment and deployment system.

## Recent Changes
- **2024-11-19**: Apple-style glassmorphism UI redesign
  - Complete visual redesign with Apple-inspired aesthetics
  - Changed color scheme from amber/orange to blue/purple
  - Enhanced glassmorphism effects throughout the app
  - Updated typography with Apple system fonts
  - Redesigned all components (Header, Buttons, Cards, Upload Form)
  - Added grain texture and subtle animated gradient backgrounds
  - Improved spacing and layout for cleaner, more minimal design

- **2024-11-19**: Initial setup for Replit environment
  - Configured Vite to run on port 5000 with proper host allowance for Replit's proxy
  - Integrated GEMINI_API_KEY from Replit Secrets
  - Set up workflow for development server
  - Configured static deployment (build output to levelforge/dist)

## Project Architecture

### Technology Stack
- **Frontend**: React 19.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **AI Service**: Google Gemini AI (@google/genai)
- **PDF Export**: jsPDF + html2canvas
- **Styling**: Tailwind CSS (via CDN - should be migrated to PostCSS for production)

### Directory Structure
```
levelforge/
├── components/         # React components
│   ├── editor/        # Portfolio editor components
│   ├── AnimatedStats.tsx
│   ├── ChatAssistant.tsx
│   ├── ComparisonView.tsx
│   └── ...
├── lib/ai/            # AI integration modules
│   ├── challengeGenerator.ts
│   ├── chatService.ts
│   ├── comparisonAnalyzer.ts
│   ├── portfolioGenerator.ts
│   └── ...
├── services/          # API services
│   └── geminiService.ts
├── utils/             # Utility functions
│   ├── fileProcessor.ts
│   ├── pdfExporter.ts
│   ├── videoProcessor.ts
│   └── ...
├── App.tsx            # Main application component
└── vite.config.ts     # Vite configuration
```

### Key Features
1. **Image Analysis**: Upload level screenshots for AI-powered analysis
2. **Video Timeline**: Analyze gameplay footage for pacing and flow
3. **Comparison Mode**: Compare multiple level designs
4. **Portfolio Generation**: AI-generated professional portfolio breakdowns
5. **Design Challenges**: Auto-generated design improvement suggestions
6. **PDF Export**: Export analysis to PDF format

## Environment Configuration

### Required Secrets
- `GEMINI_API_KEY`: Google Gemini API key (configured in Replit Secrets)
  - Get your key from: https://aistudio.google.com/apikey

### Vite Configuration
The vite.config.ts is configured to:
- Run on port 5000 (required for Replit webview)
- Bind to 0.0.0.0 (allows external access)
- Allow all hosts (required for Replit's proxy)
- Load GEMINI_API_KEY from environment variables

## Development Workflow

### Running Locally
The app runs via the "Start application" workflow:
```bash
cd levelforge && npm run dev
```

### Building for Production
```bash
cd levelforge && npm run build
```

### Deployment
Configured as a static deployment:
- Build command: `npm run build`
- Public directory: `levelforge/dist`
- The build process creates optimized static files

## Known Issues & Future Improvements

### Production Considerations
- **Tailwind CSS**: Currently using CDN version. Should migrate to PostCSS plugin for production
- **HTML Validation**: Minor warnings about nested div elements in p tags (cosmetic, doesn't affect functionality)
- **Security**: API key is exposed client-side (standard for client-side AI apps, but consider serverless functions for production)

### Potential Enhancements
- Add backend API layer to protect API keys
- Migrate to PostCSS for Tailwind
- Add user authentication for saved projects
- Implement project persistence (database integration)

## User Preferences
No specific user preferences documented yet.

## Dependencies
See `levelforge/package.json` for full dependency list. Key dependencies:
- React 19.2.0
- @google/genai 1.29.1
- jsPDF 2.5.1
- html2canvas 1.4.1

## Support & Documentation
- Original project: https://ai.studio/apps/drive/1UlDcM-wVaprbXAuvY6WJbuhFPf28JfkG
- Google Gemini API: https://ai.google.dev/
