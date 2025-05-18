<script setup>
import { ref, watch } from 'vue';
import api from '../api';
import { useToast } from 'vue-toast-notification';
defineProps(['tareas']);
defineEmits(['refresh-tasks']);

const tareaEditada = ref(null);
const $toast = useToast()
function editarTarea(tarea) {
  tareaEditada.value = { ...tarea };
}

async function guardarCambios() {
  try {
    await api.put(`/tareas/${tareaEditada.value.idTarea}`, tareaEditada.value);
    tareaEditada.value = null;
    $toast.success("Tarea actualizada");
    
  } catch (err) {
     $toast.error("Error al actualizar tarea");
  }
  emit('refresh-tasks');
  
}



async function eliminarTarea(idTarea) {
  try {
    await api.delete(`/tareas/${idTarea}`);
    alert('Tarea eliminada');
    
  } catch (err) {
    console.error('Error al eliminar tarea:', err);
    alert('Error al eliminar la tarea');
  }
  emit('refresh-tasks'); // 👈 Aquí emites un evento para refrescar la lista
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
</style>
