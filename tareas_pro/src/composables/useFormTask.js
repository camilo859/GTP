import { ref } from 'vue'

export function useTaskForm(emit) {
    //creamos variable newTask para almacenar los datos del formulario
  const newTask = ref({
    nombre: '',
    descripcion: '',
    fecha: '',
  })

  const submitTask = () => {
    if (newTask.value.nombre.trim()) { //los datos a mandar del formulario referenciados por el emit del formulario
      emit('add-task', {
        nombre: newTask.value.nombre.trim(),
        descripcion: newTask.value.descripcion.trim(), 
        fecha: newTask.value.fecha,
        estado: "En proceso" //las tareas siempre inician estando en proceso
      })
      newTask.value = { nombre: '', descripcion: '', fecha: '' }
    }
  }

  return {
    newTask,
    submitTask
  }
}
