import { ref, onMounted } from 'vue'

export function useTaskForm(emit) {
  // Variable para almacenar los datos del formulario
  const newTask = ref({
    nombre: '',
    descripcion: '',
    fecha: '',
    group: 'General',
    repeat: false,
  })
  
  // Variables para manejar grupos personalizados
  const grupos = ref([]) // Lista de grupos personalizados
  const newGroup = ref('')
  
  // Cargar grupos desde localStorage al iniciar
  onMounted(() => {
    const storedGroups = localStorage.getItem('taskGroups')
    if (storedGroups) {
      grupos.value = JSON.parse(storedGroups)
    }
  })
  
  const saveGroupsToStorage = () => {
    localStorage.setItem('taskGroups', JSON.stringify(grupos.value))
  }
  
  const addGroup = () => {
    if (newGroup.value.trim()) {
      if (!grupos.value.includes(newGroup.value)) {
        grupos.value.push(newGroup.value)
        saveGroupsToStorage()
        emit('add-group', newGroup.value) 
      }
      newTask.value.group = newGroup.value
      newGroup.value = ''
    }
  }

  const submitTask = () => {
    if (newTask.value.nombre.trim()) {
      emit('add-task', {
        nombre: newTask.value.nombre.trim(),
        descripcion: newTask.value.descripcion.trim(), 
        fecha: newTask.value.fecha,
        estado: "En proceso", // Las tareas siempre inician estando en proceso
        group: newTask.value.group,
        repeat: newTask.value.repeat,
      })
      newTask.value = { nombre: '', descripcion: '', fecha: '', group: 'General', repeat: false }
    }
  }

  return {
    newTask,
    submitTask,
    grupos,
    newGroup,
    addGroup
  }
}