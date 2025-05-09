import { ref } from 'vue'

export default function useUpdateTask(task) {
  const updatedData = ref({ ...task })
  return { updatedData }
}
