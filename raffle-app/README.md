# Raffle App

A modern, feature-rich raffle application built with React and Vite. Perfect for giveaways, contests, and random selections with a beautiful UI and celebratory confetti animations.

**Live Demo:** [raffle-app-sage.vercel.app](https://raffle-app-sage.vercel.app)

## Features

- **Participant Management** - Add individual or multiple participants, shuffle, and manage the participant pool
- **Prize Management** - Define prizes to be awarded to winners
- **Customizable Settings** - Configure winner count, duplicate handling, animation duration, and more
- **Winner History** - Track past raffle results with automatic cache expiration
- **Random Name Generator** - Quickly populate participants for testing
- **Dark Mode** - Automatic detection with manual toggle support
- **Confetti Celebrations** - Festive animations when winners are drawn
- **Persistent Storage** - Data saved to localStorage for session continuity
- **Responsive Design** - Works great on desktop and mobile devices

## Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first styling
- **canvas-confetti** - Winner celebration animations

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd raffle-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── components/
│   ├── LandingPage.jsx      # First-time visitor welcome page
│   ├── ParticipantForm.jsx  # Add participants form
│   ├── ParticipantList.jsx  # Display and manage participants
│   ├── PrizeManager.jsx     # Prize configuration
│   ├── RaffleControls.jsx   # Draw and reset controls
│   ├── RaffleSettings.jsx   # Raffle configuration options
│   ├── WinnerDisplay.jsx    # Winner announcement banner
│   └── WinnerHistory.jsx    # Past raffle results
├── hooks/
│   └── useRaffle.js         # Core raffle logic and state management
├── App.jsx                  # Main application component
├── main.jsx                 # Application entry point
└── index.css                # Global styles
```

## Usage

1. **Add Participants** - Enter names individually or paste a list
2. **Configure Settings** - Set number of winners and other options
3. **Add Prizes** (optional) - Define prizes for winners
4. **Draw Winners** - Click the draw button to randomly select winners
5. **Celebrate!** - Enjoy the confetti and view results

## License

MIT
