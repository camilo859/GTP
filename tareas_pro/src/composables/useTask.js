import { ref, onMounted, watch } from 'vue'

const items = ref([]) //  FUERA de la función
const initialized = ref(false) //  solo para no montar dos veces

export function useTask() {
  if (!initialized.value) {
    const savedItems = localStorage.getItem('myTasks')
    if (savedItems) {
      items.value = JSON.parse(savedItems)
    }
    watch(items, (newValue) => {
      localStorage.setItem('myTasks', JSON.stringify(newValue))
    }, { deep: true })
    initialized.value = true
  }

  const addItem = (task) => {
    items.value.push(task)
  }

  const removeItem = (index) => {
    items.value.splice(index, 1)
  }

  return {
    items,
    addItem,
    removeItem
  }
}
