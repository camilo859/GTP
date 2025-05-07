<template>
  <section>
    <h2>Crear Nueva Tarea</h2>
    <form @submit.prevent="crearTarea">
      <div>
        <label for="titulo">Título:</label>
        <input v-model="titulo" id="titulo" required />
      </div>
      <div>
        <label for="descripcion">Descripción:</label>
        <textarea v-model="descripcion" id="descripcion" required></textarea>
      </div>
      <div>
        <label for="fecha">Fecha de Vencimiento:</label>
        <input type="date" v-model="fecha_vencimiento" id="fecha" required />
      </div>
      <div>
        <label for="estado">Estado:</label>
        <select v-model="estado" id="estado">
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En Proceso</option>
          <option value="completada">Completada</option>
        </select>
      </div>
      <button type="submit">Crear Tarea</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api';

const titulo = ref('');
const descripcion = ref('');
const fecha_vencimiento = ref('');
const estado = ref('pendiente');

async function crearTarea() {
  try {
    const idUsuario = localStorage.getItem('idUsuario');
    await api.post('/tareas', {
      titulo: titulo.value,
      descripcion: descripcion.value,
      fecha_vencimiento: fecha_vencimiento.value,
      estado: estado.value,
      idUsuario: idUsuario
    });
    alert('Tarea creada exitosamente');

    // Limpiar el formulario
    titulo.value = '';
    descripcion.value = '';
    fecha_vencimiento.value = '';
    estado.value = 'pendiente';
  } catch (err) {
    console.error('Error al crear tarea:', err);
    alert('Error al crear la tarea');
  }
}
</script>

<style scoped>
section {
  margin: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

label {
  font-weight: bold;
}

input, textarea, select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 100%;
}

button {
  padding: 10px 20px;
  background-color: var(--accent-color, #4CAF50);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: var(--accent-color-dark, #45a049);
}
</style>
