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
  margin-bottom: 20px;
  padding: 15px;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
  height: 3px;
  background: linear-gradient(90deg, var(--secondary-color), var(--accent-color), var(--secondary-color));
}

.logo {
  margin-bottom: 10px;
}

.logo-img {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
}

footer {
  margin-top: 20px;
  text-align: center;
  padding: 15px;
  color: var(--text-light);
  font-size: 0.9rem;
  border-top: 1px solid var(--background-dark);
  position: relative;
}

.footer-decoration {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary-light);
  opacity: 0.7;
}
</style>
