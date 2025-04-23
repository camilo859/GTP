<script setup>
import { useTaskForm } from '@/composables/useFormTask'

const emit = defineEmits(['add-task']) //emit para referenciar el formulario el cual tendra la informacion

const { newTask, submitTask } = useTaskForm(emit) //se trae la variable que almacena las tareas por enviar y su 
//funcion de envio
</script>

<template>
  <div class="makeTask__container">
    <h2>Crear Tarea</h2>
    <form @submit.prevent="submitTask">
      <div class="makeTask__Inputs">
        <input v-model="newTask.nombre" type="text" placeholder="Nombre" required />
        <textarea v-model="newTask.descripcion" placeholder="Descripción">Describe la tarea</textarea>
        <input v-model="newTask.fecha" type="date" required />
      </div>
      <button type="submit">Añadir Tarea</button>
    </form>
  </div>
</template>
<style scoped>
.makeTask__container{
  display: flex;
  flex-direction: column;
}
form {
max-width: 380px;
gap: 10px;
}
.makeTask__Inputs{
display: flex;
flex-direction: column;
gap: 20px;
}

form button{
  margin: 20px 0px;
  padding: 12px 24px;
  background: #000;
  color: #fff;
  border: none;
}

h2{
  font-size: 30px;
  margin: 20px 0px;
}

input{
  padding: 12px 20px;
}
textarea{
  min-width: 240px;
  min-height:200px ;
  width: 100%;
  padding: 20px 0px 0px 20px;
}
</style>
