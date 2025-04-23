<script setup>
import TaskForm from './components/TaskForm.vue'
</script>

<template>
  <TaskForm @add-task="addItem" />
</template>

<style scoped>

body{
  padding: 0;
  margin: 0;
}
</style>