<template>
  <div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <div>
          <h3>{{ item.nombre }}</h3>
          <p>{{ item.descripcion }}</p>
          <span>{{ item.fecha }}</span>
        </div>
        <button @click="removeItem(index)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTask } from '@/composables/useTask'

// Desestructuramos el composable para obtener los items y la función removeItem
const { items, removeItem } = useTask()
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

li {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 12px 10px;
  cursor: pointer;
}
</style>
