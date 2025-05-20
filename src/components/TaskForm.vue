<template>
  <div>
    <button class="fab" @click="mostrarFormulario = true">
      +
    </button>

    <div v-if="mostrarFormulario" class="modal-overlay">
      <section class="task-form-container modal">
        <button class="close-modal" @click="mostrarFormulario = false">&times;</button>
        <h1>Crear Tarea</h1>
        <form @submit.prevent="crearTarea" class="task-form">
          <div class="form-group">
            <label for="titulo">Nombre</label>
            <input v-model="titulo" id="titulo" type="text" class="form-input"
              placeholder="Escribe el nombre de la tarea" required />
          </div>
          <div class="form-group">
            <label for="descripcion">Describe la tarea</label>
            <textarea v-model="descripcion" id="descripcion" class="form-textarea"
              placeholder="Agrega una descripción detallada" required></textarea>
          </div>
          <div class="form-group">
            <label for="fecha">Fecha de la Tarea</label>
            <input type="date" v-model="fecha_vencimiento" id="fecha" class="form-input" required />
          </div>
          <div class="form-group">
            <label for="estado">Estado:</label>
            <select v-model="estado" id="estado" class="form-select">
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Proceso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <button type="submit" class="submit-button">Añadir Tarea</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api';
import { useToast } from 'vue-toast-notification';

defineEmits(['refresh-tasks']);

const mostrarFormulario = ref(false);
const titulo = ref('');
const descripcion = ref('');
const fecha_vencimiento = ref('');
const estado = ref('pendiente');
const $toast = useToast();

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
    mostrarFormulario.value = false;
  } catch (err) {
    $toast.error('Error al crear la tarea');
  }
  emit('refresh-tasks');
}
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 10px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a90e2, #009da5);
  color: #fff;
  font-size: 32px;
  border: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
  cursor: pointer;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, box-shadow 0.3s;
}

.fab:hover {
  background: linear-gradient(135deg, #357ab8, #007c8a);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  border-radius: 24px;
  padding: 32px 28px;
  max-width: 420px;
  width: 100%;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  animation: modalIn 0.25s;
}

@keyframes modalIn {
  from {
    transform: translateY(40px) scale(0.98);
    opacity: 0;
  }

  to {
    transform: none;
    opacity: 1;
  }
}

.close-modal {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;
}

.close-modal:hover {
  color: #e6650f;
}

h1 {
  margin-bottom: 24px;
  font-size: 1.5rem;
  color: #009da5;
  text-align: center;
  letter-spacing: 1px;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: 600;
  color: #333;
  margin-bottom: 2px;
}

.form-input,
.form-textarea,
.form-select {
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
  background: #f8fafc;
  color: #222;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  border-color: #4a90e2;
}

.form-textarea {
  min-height: 60px;
  resize: vertical;
}

.submit-button {
  background: linear-gradient(135deg, #4a90e2, #009da5);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.submit-button:hover {
  background: linear-gradient(135deg, #357ab8, #007c8a);
}
</style>