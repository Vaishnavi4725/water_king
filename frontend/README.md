# DAYRY - AI-Powered Diary Application

An intelligent journaling application built on the Internet Computer with AI-powered writing assistance, mood tracking, and beautiful insights.

## Architecture

### Authentication
- **Internet Identity**: Secure, decentralized authentication powered by the Internet Computer
- **Optional PIN Protection**: Additional 4-digit PIN security for extra privacy

### Data Persistence
- **Backend**: Motoko canister running on the Internet Computer
- **Storage**: All user data (profiles, journal entries, daily summaries, preferences) stored in the IC canister
- **Photos**: Stored using IC blob storage with streaming and caching support via `ExternalBlob`

### Frontend Stack
- **React 19** with TypeScript
- **Tailwind CSS** with OKLCH color system
- **React Query** for server state management
- **shadcn/ui** component library

## Key Features

- ✨ AI-powered writing prompts and contextual entry generation
- 😊 Automatic mood detection and sentiment analysis
- 📸 Photo attachments (up to 5 per entry) with IC blob storage
- 📊 Insights dashboard with mood trends and activity patterns
- 📅 Calendar view with monthly/weekly layouts
- 🔐 Internet Identity authentication + optional PIN protection
- 🌓 Light/dark mode support
- 📱 Responsive design for all devices

## Data Flow

1. **User Authentication**: Internet Identity → Principal ID
2. **Profile Setup**: First-time users create a profile (name) stored in the canister
3. **Journal Entries**: Written entries saved to canister with mood, contextual data, and timestamps
4. **Photos**: Uploaded as `ExternalBlob` objects, stored in canister, retrieved via direct URLs
5. **Insights**: Computed from canister data and displayed with charts

## Local Storage

The `frontend/src/lib/storage.ts` file contains **legacy** localStorage utilities that are **NOT** the authoritative data source. All production data flows through the IC backend canister.

## Development

