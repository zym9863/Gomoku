# 五子棋 (Gomoku) - Vue 3 + TypeScript

[简体中文](README.md) | [English](README_EN.md)

A human vs computer Gomoku game built with Vue 3, TypeScript, and Vite.

## Features

- Human vs computer gameplay
- Beautiful interface design
- Responsive layout
- Highlighting of the last move
- Real-time game status display

## Tech Stack

- **Frontend Framework**: Vue 3
- **Development Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS (with CSS variables for theming)

## Visual Design

The game interface is carefully designed with the following visual elements:

- Custom board texture and piece effects
- Gradient title bar
- Custom icons and status indicators
- Animation effects (such as pulse animation for the last move)
- Interactive feedback (such as hover effects)

## Project Structure

```
src/
├── assets/            # Static assets
│   ├── icons/         # Icon files
│   ├── board-texture.svg  # Board texture
│   └── favicon.svg    # Website icon
├── components/        # Components
│   ├── Cell.vue       # Board cell component
│   └── GameBoard.vue  # Game board component
├── utils/             # Utility functions
│   ├── computerAI.ts  # Computer AI logic
│   └── gameLogic.ts   # Core game logic
├── App.vue            # Main application component
├── main.ts            # Entry file
└── style.css          # Global styles
```

## Running the Project

1. Install dependencies:
   ```
   npm install
   ```

2. Run in development mode:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Game Rules

- Black pieces go first
- The first player to form a line of five pieces (horizontal, vertical, or diagonal) wins
- Player uses black pieces, computer uses white pieces

## Future Plans

- Add difficulty selection
- Implement player vs player mode
- Add sound effects
- Support for undoing moves
- Add game recording and replay functionality
