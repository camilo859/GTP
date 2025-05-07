import { ref, watch } from 'vue'

const items = ref([])
let initialized = false

export function useTask() {
  if (!initialized) {
    const saved = localStorage.getItem('myTasks')
    if (saved) items.value = JSON.parse(saved)

    watch(items, (newValue) => {
      localStorage.setItem('myTasks', JSON.stringify(newValue))
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

  return {
    items,
    addItem,
    removeItem,
    updateTask,
  }
}
