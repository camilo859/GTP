<script setup>
import TaskForm from './components/TaskForm.vue'
import MyTasks from './components/MyTasks.vue'  
import { useTask } from '@/composables/useTask'  

const { addItem } = useTask()  
</script>

<template>
  <TaskForm @add-task="addItem" />
  <MyTasks />
</template>

<style scoped>
body {
  padding: 0;
  margin: 0;
}
</style>
