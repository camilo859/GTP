<template>
  <section class="task-form-container">
    <h1>Crear Tarea</h1>
    <form @submit.prevent="crearTarea" class="task-form">
      <div class="form-group">
        <label for="titulo">Nombre</label>
        <input 
          v-model="titulo" 
          id="titulo" 
          type="text" 
          class="form-input"
          placeholder="Escribe el nombre de la tarea"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="descripcion">Describe la tarea</label>
        <textarea 
          v-model="descripcion" 
          id="descripcion" 
          class="form-textarea"
          placeholder="Agrega una descripción detallada"
          required
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="fecha">Fecha de la Tarea</label>
        <input 
          type="date" 
          v-model="fecha_vencimiento" 
          id="fecha" 
          class="form-input"
          placeholder="dd/mm/aaaa"
          required
        />
      </div>
      <div>
        <label for="estado">Estado:</label>
        <select v-model="estado" id="estado">
          <option value="pendiente">Pendiente</option>
          <option value="en_proceso">En Proceso</option>
          <option value="completada">Completada</option>
        </select>
      </div>
      <button type="submit" class="submit-button">Añadir Tarea</button>
    </form>
  </section>
</template>


<script setup>
import { ref } from 'vue';
import api from '../api';
import { useToast } from 'vue-toast-notification';

defineEmits(['refresh-tasks']);//definición para refrescar la página

const titulo = ref('');
const descripcion = ref('');
const fecha_vencimiento = ref('');
const estado = ref('pendiente');
const $toast = useToast()
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
    $toast.success(`La tarea: ${titulo.value} fue creada correctamente para el ${fecha_vencimiento.value}`);

    // Limpiar el formulario
    titulo.value = '';
    descripcion.value = '';
    fecha_vencimiento.value = '';
    estado.value = 'pendiente';

  } catch (err) {
     $toast.success(`La tarea: ${titulo.value} fue creada correctamente para el ${fecha_vencimiento.value}`);
  }

emit('refresh-tasks');
  
}
</script>

<style scoped>
.task-form-container {
  max-width: 500px;
  padding: 20px;
  font-family: Arial, sans-serif;
}
h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
}

h1::after {
  content: "";
  position: absolute;
  left: 20%;
  bottom: 0;
  width: 40%;
  height: 2px;
  background-color: #e6650f;
  transform: translateX(-50%);
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-size: 14px;
  color: #555;
  font-weight: bold;
}

.form-input, .form-textarea {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #4a90e2;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.submit-button {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #3a7bc8;
}

/* Estilo para el input de fecha */
input[type="date"] {
  position: relative;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.7;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 600px) {
  .task-form-container {
    padding: 15px;
    max-width: 100%;
  }
  
  h1 {
    font-size: 20px;
  }
  
  .form-input, .form-textarea, .submit-button {
    padding: 10px;
  }
}
</style>