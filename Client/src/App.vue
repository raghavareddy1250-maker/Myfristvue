<script setup>
import { ref, computed } from 'vue'

// Reactive state
const count = ref(0)

// Computed property (automatically updates when count changes)
const doubleCount = computed(() => count.value * 2)

// Method to change state
function increment() {
  count.value++
}

function decrement() {
  if (count.value > 0) {
    count.value--
  }
}
</script>

<template>
  <div class="counter-card">
    <h2>MY Vue 3 Counter</h2>
    
    <!-- Text Interpolation -->
    <p class="count-display">Current Count: <strong>{{ count }}</strong></p>
    <p class="computed-display">Double Count: {{ doubleCount }}</p>

    <!-- Event Handling -->
    <div class="actions">
      <button @click="decrement" :disabled="count === 0">Decrease</button>
      <button @click="increment">Increase</button>
    </div>

    <!-- Conditional Rendering -->
    <p v-if="count >= 10" class="milestone-msg">
      🎉 You reached 10 or more!
    </p>
  </div>
</template>

<style scoped>
.counter-card {
  max-width: 300px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.count-display {
  font-size: 1.2rem;
}

.computed-display {
  color: #666;
  font-size: 0.9rem;
}

.actions button {
  padding: 8px 16px;
  margin: 0 5px;
  font-size: 1rem;
  cursor: pointer;
}

.actions button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.milestone-msg {
  color: #42b883;
  font-weight: bold;
  margin-top: 15px;
}
</style>
