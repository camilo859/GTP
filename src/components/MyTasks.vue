<script setup>
import { ref, watch } from 'vue';
import api from '../api';

defineProps(['tareas']);
defineEmits(['refresh-tasks']);

const tareaEditada = ref(null);

function editarTarea(tarea) {
  tareaEditada.value = { ...tarea };
}

async function guardarCambios() {
  try {
    await api.put(`/tareas/${tareaEditada.value.idTarea}`, tareaEditada.value);
    tareaEditada.value = null;
    alert('Tarea actualizada');
    
  } catch (err) {
    console.error('Error al actualizar tarea:', err);
    alert('Error al actualizar la tarea');
  }
  emit('refresh-tasks');
  
}



async function eliminarTarea(idTarea) {
  try {
    await api.delete(`/tareas/${idTarea}`);
    alert('Tarea eliminada');
    mostrarNotificacion(' Tarea eliminada correctamente');
  } catch (err) {
    console.error('Error al eliminar tarea:', err);
    alert('Error al eliminar la tarea');
  }
  emit('refresh-tasks'); // 👈 Aquí emites un evento para refrescar la lista
}

const notificaciones = ref([]);

function mostrarNotificacion(mensaje) {
  notificaciones.value.push(mensaje);
  setTimeout(() => {
    notificaciones.value.shift();
  }, 3000);
}

</script>

<template>
  <section>
    <h2>Tus tareas</h2>
    <ul>
      <li v-for="item in tareas" :key="item.idTarea">
        <div>
          <h3>Tarea: {{ item.titulo }}</h3>
          <p>Descripción: {{ item.descripcion }}</p>
          <p>Fecha: {{ item.fecha_vencimiento }}</p>
          <p>Estado: {{ item.estado }}</p>
          <button @click="editarTarea(item)">✏️</button>
          <button @click="eliminarTarea(item.idTarea)">🗑️</button>
        </div>
      </li>
    </ul>

    <div v-if="tareaEditada" class="edit-form">
      <h3>Editando tarea</h3>
      <form @submit.prevent="guardarCambios">
        <input v-model="tareaEditada.titulo" placeholder="Título" />
        <textarea v-model="tareaEditada.descripcion" placeholder="Descripción"></textarea>
        <select v-model="tareaEditada.estado">
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En Proceso</option>
          <option value="completada">Completada</option>
        </select>
        <button type="submit">Guardar Cambios</button>
        <button type="button" @click="tareaEditada = null">Cancelar</button>
      </form>
    </div>
  </section>

  <div class="notificaciones">
    <div 
      v-for="(msg, index) in notificaciones" 
      :key="index" 
      class="notificacion success"
    >
      {{ msg }}
    </div>
  </div>

</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

li {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
}

.edit-form {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 8px;
  background-color: #f5f5f5;
}

button {
  margin-right: 10px;
  padding: 6px 12px;
  cursor: pointer;
}

.notificaciones {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.notificacion {
  padding: 10px 16px;
  border-radius: 6px;
  color: #fff;
  font-weight: bold;
  background-color: #28a745;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  animation: fadein 0.3s;
  margin-bottom: 10px;
}

@keyframes fadein {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
