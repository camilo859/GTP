<template>
  <div class="formulario-registro">
    <div class="form-container">
      <h1>Registro de Usuario</h1>
      <form @submit.prevent="registrarUsuario">
        <div>
          <label>Nombre:</label>
          <input v-model="nombre" type="text" required />
        </div>
        <div>
          <label>Edad:</label>
          <input v-model="edad" type="number" required />
        </div>
        <div>
          <label>Correo:</label>
          <input v-model="correo" type="email" required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input v-model="contraseña" type="password" required />
        </div>
        <button type="submit" class="btn-registrar">Registrarse</button>
        <button type="button" @click="cancelarRegistro" class="btn-cancelar">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api'; // ajusta la ruta según tu proyecto

const router = useRouter();

const nombre = ref('');
const edad = ref('');
const correo = ref('');
const contraseña = ref('');

async function registrarUsuario() {
  try {
    await api.post('/register', {
      nombre: nombre.value,
      edad: edad.value,
      correo: correo.value,
      contraseña: contraseña.value
    });
    alert('Usuario registrado correctamente');
    router.push('/login'); // redirige al login después del registro
  } catch (err) {
  console.error('Error al registrar usuario:', err);
  if (err.response && err.response.data) {
    alert('Error al registrar usuario: ' + JSON.stringify(err.response.data.error));
  } else {
    alert('Error al registrar usuario (no se pudo conectar al servidor)');
  }
}

}

function cancelarRegistro() {
  router.push('/login'); // redirige al login al cancelar
}
</script>

<style>
.formulario-registro {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-container {
  width: 350px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
}

form div {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.btn-registrar {
  width: 100%;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.btn-cancelar {
  width: 100%;
  background-color: #f44336;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
