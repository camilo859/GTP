<script setup>
import { useTask } from './ruta-a-tu-archivo-useTask'; // Asegúrate de usar la ruta correcta

const { tasksDone } = useTask();

// Función para formatear fechas (opcional, ya que quitaste completedAt)
const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  } catch (e) {
    return '';
  }
};
</script>

<template>
  <div class="completed-tasks">
    <h2>Tareas Completadas</h2>
    
    <div v-if="tasksDone.length === 0" class="no-tasks">
      No hay tareas completadas todavía
    </div>
    
    <ul v-else class="tasks-list">
      <li v-for="(task, index) in tasksDone" :key="index" class="task-item">
        <div class="task-title">{{ task.title || task.nombre || 'Tarea sin título' }}</div>
        <div class="task-details">
          <div class="task-description" v-if="task.description || task.descripcion">
            {{ task.description || task.descripcion }}
          </div>
          <!-- Solo mostrar fecha si existe la propiedad completedAt -->
          <div class="task-completed-date" v-if="task.completedAt">
            Completada: {{ formatDate(task.completedAt) }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.completed-tasks {
  padding: 15px;
  margin: 10px 0;
}

.no-tasks {
  text-align: center;
  color: #777;
  padding: 20px;
}

.tasks-list {
  list-style-type: none;
  padding: 0;
}

.task-item {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.task-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.task-details {
  font-size: 0.9em;
  color: #555;
}

.task-description {
  margin-bottom: 5px;
}

.task-completed-date {
  font-size: 0.8em;
  color: #777;
  font-style: italic;
}
</style>