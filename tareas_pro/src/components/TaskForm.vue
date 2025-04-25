<script setup>
import { ref } from 'vue'
import { useTaskForm } from '@/composables/useFormTask'
const openSettings = ref(false)
const emit = defineEmits(['add-task']) //emit para referenciar el formulario el cual tendra la informacion

const { 
  newTask, 
  submitTask, 
  grupos, 
  newGroup, 
  addGroup
} = useTaskForm(emit)//se trae la variable que almacena las tareas por enviar y su 
//funcion de envio
</script>

<template>
  <div class="makeTask__container">
    <h2>Crear Tarea</h2>
    <form @submit.prevent="submitTask">
      <div class="makeTask__Inputs">
        <input v-model="newTask.nombre" type="text" placeholder="Nombre" required />
        <textarea v-model="newTask.descripcion" placeholder="Describe la tarea"></textarea>
        <label for="date-task">
          Fecha de la Tarea
        </label>
        <input v-model="newTask.fecha" type="date" required name="date-task" />
     
        <label>
          <input type="checkbox" v-model="openSettings" />
          Configuraciones
        </label>
        <div class="settings" v-if="openSettings">
          <label for="group-task">Añadir a grupo</label>
          <div class="grupo-container">
            <select v-model="newTask.group" name="group-task">
              <option value="General">General</option>
              <option v-for="grupo in grupos" :key="grupo" :value="grupo">
                {{ grupo }}
              </option>
              <option value="crear-nuevo">Crear nuevo grupo</option>
            </select>
          </div>
          <div v-if="newTask.group === 'crear-nuevo'" class="nuevo-grupo-form">
            <input 
              v-model="newGroup" 
              type="text" 
              placeholder="Nombre del nuevo grupo" 
            />
            <button type="button" @click="addGroup">Añadir</button>
          </div>
          
          <label for="repeat-task">
            <input type="checkbox" name="repeat-task" v-model="newTask.repeat">
            Repetir Tarea
          </label>
        </div>
      </div>
      <button type="submit">Añadir Tarea</button>
    </form>
  </div>
</template>
<style scoped>
 :root {
      --primary-color: #4a6fa5;
      --secondary-color: #6b8cc7;
      --accent-color: #ff6b6b;
      --background-color: #f8f9fa;
      --text-color: #333;
      --border-radius: 10px;
      --box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
      --transition: all 0.3s ease;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: var(--background-color);
      color: var(--text-color);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    
    .makeTask__container {
      background: white;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      width: 90%;
      max-width: 500px;
      padding: 2rem;
      overflow: hidden;
      position: relative;
    }
    
    
    h2 {
      color: var(--primary-color);
      margin-top: 0;
      font-size: 1.8rem;
      font-weight: 600;
      position: relative;
      padding-bottom: 0.5rem;
      margin-bottom: 1.5rem;
    }
    
    h2::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      background-color: var(--accent-color);
    }
    
    .makeTask__Inputs {
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
      margin-bottom: 1.5rem;
    }
    
    input[type="text"],
    textarea,
    input[type="date"],
    select {
      padding: 0.8rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #f9f9f9;
      font-size: 1rem;
      transition: var(--transition);
    }
    
    input[type="text"]:focus,
    textarea:focus,
    input[type="date"]:focus,
    select:focus {
      outline: none;
      border-color: var(--secondary-color);
      box-shadow: 0 0 0 3px rgba(107, 140, 199, 0.2);
      background-color: white;
    }
    
    textarea {
      min-height: 100px;
      resize: vertical;
    }
    
    label {
      font-weight: 500;
      margin-bottom: 0.3rem;
      color: #555;
      display: block;
    }
    
    input[type="checkbox"] {
      margin-right: 0.5rem;
    }
    
    label:has(input[type="checkbox"]) {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }
    
    .settings {
      background-color: #f0f4ff;
      border-radius: var(--border-radius);
      padding: 1rem;
      margin-top: 0.5rem;
      border-left: 3px solid var(--secondary-color);
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    button[type="submit"] {
      background: #000;
      color: white;
      border: none;
      padding: 0.8rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 25px;
      cursor: pointer;
      display: block;
      width: 100%;
      transition: var(--transition);
      box-shadow: 0 4px 12px rgba(74, 111, 165, 0.3);
    }
    
    button[type="submit"]:hover {
      background: linear-gradient(to right, #3d5d8c, #5778b0);
      transform: translateY(-2px);
      box-shadow: 0 6px 15px rgba(74, 111, 165, 0.4);
    }
    
    button[type="submit"]:active {
      transform: translateY(0);
    }
    
    /* Animaciones para mejorar la experiencia de usuario */
    input, textarea, select, button {
      transition: var(--transition);
    }
    
    @media (max-width: 600px) {
      .makeTask__container {
        padding: 1.5rem;
        width: 95%;
      }
    }
</style>
