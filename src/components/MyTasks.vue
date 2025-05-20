<template>
  <section>
   
   

    <h2 class="titulo-tareas">{{ mostrarCompletadas ? 'Tareas Completadas' : 'Tareas Activas' }}</h2>


    <div v-if="mostrarCompletadas" class="ordenar-modern">
      <label>Ordenar por:</label>
      <select v-model="ordenCompletadas">
        <option value="fecha">Fecha de completado</option>
      </select>
    </div>

    <ul v-if="!mostrarCompletadas">
      <li
        v-for="item in tareasActivas"
        :key="item.idTarea"
        :class="['tarea-container', item.estado]"
      >
        <div class="tarea-header">
          <input
            type="checkbox"
            :checked="item.estado === 'completada'"
            @change="marcarCompletada(item)"
            class="checkbox-modern"
          />
          <span class="tarea-titulo">{{ item.titulo }}</span>
        </div>
        <p class="tarea-desc">{{ item.descripcion }}</p>
        <div class="tarea-info">
          <span>Fecha límite: {{ item.fecha_vencimiento }}</span>
          <span class="tarea-estado">{{ item.estado }}</span>
        </div>
        <div class="tarea-actions">
          <button @click="editarTarea(item)" class="icon-btn" title="Editar">✏️</button>
          <button @click="eliminarTarea(item.idTarea)" class="icon-btn" title="Eliminar">🗑️</button>
        </div>
      </li>
      <li v-if="tareasActivas.length === 0" class="no-tareas">No tienes tareas activas.</li>
    </ul>

    <ul v-if="mostrarCompletadas">
      <li
        v-for="item in tareasCompletadas"
        :key="item.idTarea"
        class="tarea-container completada"
      >
        <div class="tarea-header">
          <span class="check-icon">✔️</span>
          <span class="tarea-titulo completada">{{ item.titulo }}</span>
        </div>
        <p class="tarea-desc">{{ item.descripcion }}</p>
        <div class="tarea-info">
          <span>Completada: {{ item.fecha_completado }}</span>
          <span class="tarea-estado">{{ item.estado }}</span>
        </div>
        <div class="tarea-actions">
          <button @click="editarTarea(item)" class="icon-btn" title="Editar">✏️</button>
          <button @click="eliminarTarea(item.idTarea)" class="icon-btn" title="Eliminar">🗑️</button>
        </div>
      </li>
      <li v-if="tareasCompletadas.length === 0" class="no-tareas">No tienes tareas completadas.</li>
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
    <button
      class="completadas-fab"
      @click="mostrarCompletadas = !mostrarCompletadas"
      :title="mostrarCompletadas ? 'Ver todas las tareas' : 'Ver solo completadas'"
    >
      <span v-if="!mostrarCompletadas">✔️ Completadas</span>
      <span v-else>📋 Todas</span>
    </button>
    <br>
  
  </section>
  
   
</template>

<script setup>
import { ref, computed } from 'vue';
import api from '../api';
import { useToast } from 'vue-toast-notification';
const props = defineProps(['tareas']);
const emit = defineEmits(['refresh-tasks']);

const tareaEditada = ref(null);
const mostrarCompletadas = ref(false);
const ordenCompletadas = ref('fecha');
const $toast = useToast();

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
    $toast.success('Tarea eliminada');
  } catch (err) {
    $toast.error('Error al eliminar la tarea');
  }
  emit('refresh-tasks');
}

async function marcarCompletada(tarea) {
  if (tarea.estado === 'completada') return;
  try {
    await api.put(`/tareas/${tarea.idTarea}`, {
      ...tarea,
      estado: 'completada',
      fecha_completado: new Date().toISOString().slice(0, 10)
    });
    $toast.success('¡Tarea completada!');
    emit('refresh-tasks');
  } catch (err) {
    $toast.error('Error al marcar como completada');
  }
}

const tareasActivas = computed(() =>
  props.tareas.filter(t => t.estado !== 'completada')
);

const tareasCompletadas = computed(() => {
  let completadas = props.tareas
    .filter(t => t.estado === 'completada')
    .map(t => ({
      ...t,
      fecha_completado: t.fecha_completado || t.fecha_vencimiento 
    }));
  completadas.sort((a, b) => new Date(b.fecha_completado) - new Date(a.fecha_completado));
  return completadas;
});
</script>

<style scoped>
.titulo-tareas {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin: 32px 0 24px 0;
  color: #009da5;
  letter-spacing: 1px;
}

.completadas-fab {
  position: fixed;
  top: 50%;
  right: 36px;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #4a90e2, #009da5);
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 14px 28px;
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0,0,0,0.13);
  cursor: pointer;
  z-index: 1102;
  transition: background 0.2s, box-shadow 0.2s;
}
.completadas-fab:hover {
  background: linear-gradient(135deg, #357ab8, #007c8a);
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
}

.ordenar-modern {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.tarea-container {
  border-radius: 18px;
  border: 2px solid #e0e0e0;
  margin: 0 auto 22px auto;
  padding: 22px 24px 18px 24px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  transition: border 0.2s, background 0.2s;
  position: relative;
  max-width: 600px;
}

.tarea-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 8px;
}
.tarea-titulo {
  font-weight: bold;
  font-size: 1.2rem;
}
.tarea-titulo.completada {
  text-decoration: line-through;
  color: #2ecc40;
}
.tarea-desc {
  margin: 0 0 8px 0;
  color: #444;
}
.tarea-info {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.95rem;
}
.tarea-estado {
  font-weight: bold;
  text-transform: capitalize;
}
.check-icon {
  color: #2ecc40;
  font-size: 1.5rem;
  margin-right: 8px;
}
.tarea-actions {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
.icon-btn {
  background: #f4f4f4;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.icon-btn:hover {
  background: #e0e0e0;
}


.checkbox-modern {
  accent-color: #009da5;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid #009da5;
  margin-right: 8px;
}

.no-tareas {
  text-align: left;
  color: #888;
  margin-top: 32px;
  font-size: 1.1rem;
}

/* Borde y fondo por estado */
.pendiente { border-left: 8px solid #e6650f; background: #fff7f0; }
.en_proceso { border-left: 8px solid #4a90e2; background: #f0f6ff; }
.completada { border-left: 8px solid #2ecc40; background: #f0fff4; }

.edit-form {
  margin: 32px auto 0 auto;
  padding: 18px;
  border: 1.5px solid #aaa;
  border-radius: 12px;
  background-color: #f5f5f5;
  max-width: 500px;
}
.edit-form input,
.edit-form textarea,
.edit-form select {
  width: 100%;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1.5px solid #e0e0e0;
  padding: 8px;
  font-size: 1rem;
}
.edit-form button {
  margin-right: 10px;
  padding: 7px 16px;
  cursor: pointer;
  border-radius: 8px;
  border: none;
  background: #4a90e2;
  color: #fff;
  font-weight: 600;
  transition: background 0.2s;
}
.edit-form button[type="button"] {
  background: #aaa;
}
.edit-form button:hover {
  background: #357ab8;
}
</style>