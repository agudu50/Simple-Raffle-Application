# 🎟️ Raffle Application

A modern, feature-rich raffle application built with React and Vite. Perfect for giveaways, contests, and random selections.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-7.3.1-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.19-teal)

## ✨ Features

### Core Raffle Features
- **Random Winner Selection** - Fair and random drawing from participant pool
- **Multiple Winners** - Draw up to 100 winners at once
- **Animation Effects** - Exciting spinning animation during draws
- **Confetti Celebration** - Celebratory confetti when winners are announced
- **Draw History** - Track all past draws with timestamps

### Participant Management
- **Add Participants** - Add names one at a time
- **Bulk Add** - Paste multiple names (comma or newline separated)
- **Random Name Generator** - Generate 3-20 random names instantly for testing
- **Search & Filter** - Find participants quickly in large lists
- **Shuffle List** - Randomize participant order
- **Remove Duplicates** - Automatic duplicate detection

### Prize Management
- **Add Prizes** - Create a list of prizes for winners
- **Prize Assignment** - Prizes automatically assigned in order (1st prize → 1st winner)
- **Prize Display** - Prizes shown alongside winner names

### Settings & Customization
- **Winner Count** - Choose how many winners to draw
- **Animation Duration** - Adjust draw animation speed (0.5s - 5s)
- **Remove After Win** - Optionally remove winners from the pool
- **Dark/Light Mode** - Full dark mode support with system preference detection

### User Experience
- **Sticky Winner Banner** - Winners displayed at top with auto-dismiss (10s) or manual close
- **Mobile Responsive** - Fully optimized for mobile devices
- **Persistent Data** - All data survives page refresh and server restarts (participants, winners, history, settings, prizes)
- **Clean Modern UI** - Sleek design with solid colors and smooth transitions

## 🚀 Getting Started

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

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 3** - Utility-first styling
- **canvas-confetti** - Celebration effects
- **LocalStorage API** - Data persistence

## 📁 Project Structure

```
src/
├── components/
│   ├── ParticipantForm.jsx    # Add participants & random generator
│   ├── ParticipantList.jsx    # Display & manage participants
│   ├── PrizeManager.jsx       # Prize management UI
│   ├── RaffleControls.jsx     # Draw & reset buttons
│   ├── RaffleSettings.jsx     # Settings panel
│   ├── WinnerDisplay.jsx      # Winner announcement
│   └── WinnerHistory.jsx      # Past draws history
├── hooks/
│   └── useRaffle.js           # Core raffle logic & state
├── App.jsx                    # Main application
├── main.jsx                   # Entry point
└── index.css                  # Global styles
```

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

---

Made with ❤️ using React + Vite
