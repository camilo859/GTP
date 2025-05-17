<template>
  <section>
    <h2 v-if="items.length > 0">Tus tareas</h2>
    <h6 class="pendientes" v-else >No hay tareas pendientes</h6>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <form @submit.prevent="save">
          <div>
            <div class="task_delete"></div>
            <input 
              type="checkbox" 
              @change="$event.target.checked && saveTaskDone(item)" 
              class="end-task" 
            />
            <h3>Tarea:  
              <span v-if="editing !== item">{{ item.nombre }}</span>
              <input
                v-else
                type="text"
                v-model="updatedData.nombre"
                placeholder="Nombre"
              />
            </h3>

            <p>Descripción:
              <span v-if="editing !== item">{{ item.descripcion }}</span>
              <input
                v-else
                type="text"
                v-model="updatedData.descripcion"
                placeholder="Descripción"
              />
            </p>
          </div>

          <button class="task_delete" @click="removeItem(index)">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ff1f1f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#ff1f1f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
          </button>
          <button class="task_edit" @click="startEdit(item)" type="button">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#88fe39" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#88fe39" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>
          </button>
          <div class="task_content">
            <span>Fecha:
              <span v-if="editing !== item">{{ item.fecha }}</span>
              <input v-else type="date" v-model="updatedData.fecha" />
            </span>

            <div >
              <p>Repetir: {{ item.repeat ? 'Si' : 'No' }}
              <label v-if="editing === item" class="repeat">
                <input type="checkbox" v-model="updatedData.repeat" />
                Cambiar
              </label>
              </p>
            </div>

            <p v-if="item.group !== 'crear-nuevo'">Grupo: {{ item.group }}
              <label v-if="editing === item">
                <select  v-model="updatedData.group">
                  <option v-for="grupo in grupos" :key="grupo" :value="grupo">
                  {{ grupo }}
                  </option>
                </select>
              </label>
            </p>
          </div>
          <div v-if="editing === item" class="edit-form">
            <button class="edit__button-save" type="submit">Guardar</button>
            <button class="edit__button-canceled" type="button" @click="cancelEdit">Cancelar</button>
          </div>
        </form>
      </li>
    </ul>
    <span class="updateTask__message" v-if="message">{{message}}</span>
  </section>
</template>
<script setup>
import { useTask } from '@/composables/useTask'
import { ref } from 'vue'
// Desestructuramos el composable para obtener los items y la función removeItem
const { items, removeItem,updateTask } = useTask()
const message = ref(null)
const editing = ref(null)
const updatedData = ref({})
const {grupos,saveTaskDone} = useTask()
function startEdit(task) {
  editing.value = task
  const { updatedData: localData } = useUpdateTask(task)
  updatedData.value = localData.value
}

function save() {
  message.value = "Tarea Actualizada"
  setTimeout(() => {
    message.value = null
  }, 3000)
  updateTask(editing.value, updatedData.value)

  editing.value = null
  
}

function cancelEdit() {
  editing.value = null
}
</script>

<style scoped>
section{
  margin: 20px;
}
.task_content{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  height: 12px;
  color: var(--text-color);
  font-size: 12px;
  
}
.end-task{
  height: 20px;
}
.updateTask__message{
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: #000;
  color: #fff;
  padding: 20px;
}

h3{
  margin: 0;
}
    h2{
      margin-top: 36px;
      font-size: 1.8rem;
      font-weight: 600;
      position: relative;
      padding-bottom: 0.5rem;
      margin-bottom: 0px;
    }
    
    h2::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50px;
      height: 3px;
      background-color: var(--accent-color);
    }
ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 40px 40px 0px 0px;
  gap: 10px;
}

li {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 12px;  
  position: relative;
  box-sizing: border-box;
}
.repeat{
  display: flex;
  align-items: center;
}
.edit__button-save,.edit__button-canceled, .task_edit{
  padding: 12px 10px;
  cursor: pointer;
  width: fit-content;
  border: 0;
  background-color: black;
  display: inline;
  margin: 20px 0px 0px;
  font-size: 12px;
  margin-right: 10px;
}
.task_delete,.task_edit{
  position: absolute;
  right: 0px;
  top: 0px;
  border: 0;
  background-color: transparent;
  padding: 10px;
  cursor: pointer;
}
input{
  padding:6px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background-color: #f9f9f9;
}
.task_edit{
  right: 40px;
  box-shadow: none;
  margin-top: 0;
}
input[type="checkbox"]{
  padding: 0;
  margin: 0;
}
button svg{
  width: 24px;
}
</style>
