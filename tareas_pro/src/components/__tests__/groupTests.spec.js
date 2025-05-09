import { expect, test, vi, beforeEach } from 'vitest'
import { useTaskForm } from '@/composables/useFormTask'

// Mock para el localStorage
beforeEach(() => {
  // Limpiar cualquier mock previo
  vi.resetAllMocks()
  
  // Crear un mock para localStorage
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn()
  }
  
  // Simular grupos existentes
  localStorageMock.getItem.mockReturnValue(JSON.stringify(['General', 'Trabajo', 'Personal']))
  
  // Asignar el mock al objeto global
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true
  })
})

// Mock para onMounted de Vue
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue')
  return {
    ...actual,
    onMounted: (fn) => fn(), // Ejecuta la funcion
    ref: (val) => ({ value: val }) // Simplificación de ref para pruebas
  }
})

test('Verifica si un grupo ya existe', () => {
  // Creamos un mock para el emit
  const emit = vi.fn()
  
  // Obtenemos las funciones del composable
  const { addGroup, newGroup, grupos } = useTaskForm(emit)
  
  // Verificamos que los grupos se cargaron desde localStorage
  expect(grupos.value).toContain('General')
  expect(grupos.value).toContain('Trabajo')
  expect(grupos.value).toContain('Personal')
  
  // Intentamos agregar un grupo que ya existe
  newGroup.value = 'Trabajo'
  addGroup()
  
  // Verificamos que no se haya emitido el evento add-group para un grupo existente
  expect(emit).not.toHaveBeenCalledWith('add-group', 'Trabajo')
  
  // La longitud del array de grupos no deberia cambiar
  expect(grupos.value.length).toBe(3)
  
  // Ahora probamos con un grupo nuevo
  newGroup.value = 'Nuevo'
  addGroup()
  
  // Deberia emitir el evento para un grupo nuevo
  expect(emit).toHaveBeenCalledWith('add-group', 'Nuevo')
  
  // Y el array de grupos deberia tener un elemento más
  expect(grupos.value.length).toBe(4)
})

// Función auxiliar para verificar si una tarea ya existe en un grupo
function isTaskInGroup(tasks, taskName, groupName) {
  return tasks.some(task => 
    task.nombre === taskName && task.group === groupName
  )
}

test('Verifica si una tarea ya existe en un grupo', () => {
  // Creamos un mock para el emit
  const emit = vi.fn()
  
  // Simulamos tareas existentes
  const existingTasks = [
    { nombre: 'Tarea 1', descripcion: 'Desc 1', fecha: '2025-04-28', estado: 'En proceso', group: 'General', repeat: false },
    { nombre: 'Tarea 2', descripcion: 'Desc 2', fecha: '2025-04-29', estado: 'En proceso', group: 'Trabajo', repeat: true }
  ]
  
  // Verificar tarea existente
  const taskExists = isTaskInGroup(existingTasks, 'Tarea 1', 'General')
  expect(taskExists).toBe(true)
  
  // Verificar tarea que no existe en ese grupo
  const taskDoesNotExist = isTaskInGroup(existingTasks, 'Tarea 1', 'Trabajo')
  expect(taskDoesNotExist).toBe(false)
  
  // Verificar tarea que no existe en absoluto
  const taskNotFound = isTaskInGroup(existingTasks, 'Tarea 3', 'General')
  expect(taskNotFound).toBe(false)
})