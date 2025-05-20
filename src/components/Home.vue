<script setup>
import TaskForm from './TaskForm.vue';
import MyTasks from './MyTasks.vue';
import api from '../api';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const tareas = ref([]);
const router = useRouter();

onMounted(() => {
  if (!localStorage.getItem('idUsuario')) {
    router.push('/login');
  } else {
    cargarTareas();
  }
});


async function cargarTareas() {
  const idUsuario = localStorage.getItem('idUsuario');
  const res = await api.get(`/tareas/${idUsuario}`);
  tareas.value = res.data;
}


function logout() {
  localStorage.removeItem('idUsuario');
  router.push('/login');
}

onMounted(() => {
  cargarTareas();
});
</script>

<template>
  
  <section>
    <TaskForm @task-created="cargarTareas" />
    <MyTasks :tareas="tareas" @refresh-tasks="cargarTareas" />
    
  </section>
</template>

<style scoped>


</style>
