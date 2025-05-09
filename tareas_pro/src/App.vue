<script setup>
import TaskForm from './components/TaskForm.vue'
import MyTasks from './components/MyTasks.vue'  
import { useTask } from '@/composables/useTask'  

const { addItem } = useTask()  
</script>

<template>
  <main>
  <TaskForm @add-task="addItem" />
  <div class="show-taks">
    <MyTasks />
    <TaksDone />
  </div>
  </main>
</template>

<style>
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
  padding: 0;
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
main{
  display: grid;
  grid-template-columns: 50% 50%;
}
.show-taks{
  display: grid;
  grid-template-rows: 50% 50%;
}
button[type="submit"], button[type="button"] {
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

  @media (max-width: 768px) {
    main{
  display: grid;
  grid-template-columns: 100%;
}
  }
</style>
