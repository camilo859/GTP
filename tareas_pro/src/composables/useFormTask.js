import { ref } from 'vue'

export function useTaskForm(emit) {
  const newTask = ref({
    nombre: '',
    descripcion: '',
    fecha: '',
  })

  const submitTask = () => {
    if (newTask.value.nombre.trim()) {
      emit('add-task', {
        nombre: newTask.value.nombre.trim(),
        descripcion: newTask.value.descripcion.trim(),
        fecha: newTask.value.fecha,
        estado: "En proceso"
      })
      newTask.value = { nombre: '', descripcion: '', fecha: '' }
    }
  }

  return {
    newTask,
    submitTask
  }
}
