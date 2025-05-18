<template>
  <section class="login-container">
    <center> <h2>Iniciar Sesión</h2> </center>
    <form @submit.prevent="login">
      <center><div>
        <label for="correo">Correo:</label>
        <input type="email" v-model="correo" id="correo" required /> 
      </div>
      <div>
        <label for="contraseña">Contraseña:</label>
        <input type="password" v-model="contraseña" id="contraseña" required />
      </div></center>
      <button type="submit">Ingresar</button>
    </form>
    <p>¿No tienes cuenta? <router-link to="/register">Registrar usuario</router-link></p>
  </section>
</template>

  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../api';
import { useToast } from 'vue-toast-notification';
const router = useRouter();

const correo = ref('');
const contraseña = ref('');
const $toast = useToast()
async function login() {
  try {
    const res = await api.post('/login', {
      correo: correo.value,
      contraseña: contraseña.value
    });
     $toast.success( `Bienvenido ${res.data.nombre} `);
    localStorage.setItem('idUsuario', res.data.idUsuario);
    router.push('/home');
  } catch (err) {
     $toast.error("Error al iniciar sesion");
  }
}
</script>

  
  <style scoped>
  .login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}

form {
  display: flex;
  flex-direction: column;
}

button {
  margin-top: 10px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

p {
  margin-top: 10px;
  text-align: center;
}

  </style>
  