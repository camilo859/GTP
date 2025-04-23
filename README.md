import { ref, onMounted, watch } from 'vue'

const items = ref([])

onMounted(() => {
  const savedItems = localStorage.getItem('myTasks')
  if (savedItems) {
    items.value = JSON.parse(savedItems)
  }
})

// Guardar cambios en localStorage
watch(items, (newValue) => {
  localStorage.setItem('myTasks', JSON.stringify(newValue))
}, { deep: true })

const removeItem = (index) => {
  items.value.splice(index, 1)
}

const addItem = (task) => {
  items.value.push(task)
}
