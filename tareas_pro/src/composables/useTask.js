import { ref, watch } from 'vue'

const grupos = ref([])
const items = ref([])
const tasksDone = ref([]) // Nueva referencia para tareas completadas
let initialized = false

export function useTask() {
  if (!initialized) {
    const saved = localStorage.getItem('myTasks')
    if (saved) items.value = JSON.parse(saved)
    
    const savedGroups = localStorage.getItem('taskGroups')
    if (savedGroups) {
      grupos.value = JSON.parse(savedGroups)
    }
    
    // Cargar tareas completadas del localStorage
    const savedDoneTasks = localStorage.getItem('tasksDone')
    if (savedDoneTasks) {
      tasksDone.value = JSON.parse(savedDoneTasks)
    }
    
    watch(items, (newValue) => {
      localStorage.setItem('myTasks', JSON.stringify(newValue))
    }, { deep: true })
    
    watch(grupos, (newValue) => {
      localStorage.setItem('taskGroups', JSON.stringify(newValue))
    }, { deep: true })
    
    // Observador para las tareas completadas
    watch(tasksDone, (newValue) => {
      localStorage.setItem('tasksDone', JSON.stringify(newValue))
    }, { deep: true })
    
    initialized = true
  }
  
  const addItem = (task) => {
    items.value.push(task)
  }
  
  const removeItem = (index) => {
    items.value.splice(index, 1)
  }
  
  const updateTask = (task, newData) => {
    const i = items.value.findIndex(t => t === task)
    if (i < 0) return
    Object.assign(items.value[i], newData)
    items.value = [...items.value]
  }
  
  // Nueva función para guardar una tarea completada
  const saveTaskDone = (task) => {
    // Guardamos la tarea en las completadas
    tasksDone.value.push({
      ...task, 
    })
    
    // Buscamos y eliminamos la tarea de la lista de tareas activas
    const taskIndex = items.value.findIndex(t => t === task)
    if (taskIndex >= 0) {
      items.value.splice(taskIndex, 1)
    }
  }
  
  return {
    items,
    addItem,
    removeItem,
    updateTask,
    grupos,
    tasksDone, // Exponemos la referencia de tareas completadas
    saveTaskDone // Exponemos la función para guardar tareas completadas
  }
}