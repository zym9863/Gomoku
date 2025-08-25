<script setup lang="ts">
import GameBoard from './components/GameBoard.vue'
</script>

<template>
  <div class="app-container">
    <header>
      <div class="logo">
        <img src="./assets/favicon.svg" alt="Gomoku Logo" class="logo-img" />
      </div>
      <h1>五子棋 - Gomoku</h1>
    </header>
    <main>
      <GameBoard />
    </main>
    <footer>
      <p>人机对战五子棋游戏 - 基于 Vue 3</p>
      <div class="footer-decoration">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  text-align: center;
  margin-bottom: 30px;
  padding: 25px;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 50%, var(--primary-light) 100%);
  color: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-heavy);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
}

header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--secondary-color), var(--accent-color), var(--secondary-light), var(--accent-light), var(--secondary-color));
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.logo {
  margin-bottom: 15px;
  position: relative;
  z-index: 1;
}

.logo-img {
  width: 50px;
  height: 50px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-medium);
  transition: transform 0.3s ease;
}

.logo-img:hover {
  transform: scale(1.1) rotate(5deg);
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
}

footer {
  margin-top: 30px;
  text-align: center;
  padding: 20px;
  color: var(--text-light);
  font-size: 0.95rem;
  border-top: 1px solid var(--background-darker);
  position: relative;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border-radius: var(--border-radius);
}

.footer-decoration {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
}

.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-light), var(--accent-color));
  opacity: 0.8;
  animation: dotPulse 2s ease-in-out infinite;
  animation-delay: calc(var(--i) * 0.3s);
}

.dot:nth-child(1) { --i: 0; }
.dot:nth-child(2) { --i: 1; }
.dot:nth-child(3) { --i: 2; }

@keyframes dotPulse {
  0%, 100% { 
    transform: scale(1);
    opacity: 0.8;
  }
  50% { 
    transform: scale(1.2);
    opacity: 1;
  }
}
</style>
