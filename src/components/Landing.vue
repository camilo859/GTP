<template>
    <div class="home">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <h1>Gestiona tus Tareas, Gestiona tu Vida</h1>
          <p class="lead">
          Nosotros somos el puente hacia el orden, te ayudamos a organizar tu dia a dia de manera facil y sencilla, no te preocupes por recordarlas, preocupate por hacerla
          </p>
        </div>
      </section>
  
      <!-- Safety and Service Section -->
      <section class="safety-service" id="conocer">
        <div class="container">
          <h2>Registrate para obtener estos beneficios</h2>
          
          <div class="content-wrapper">
            <div class="text-content">
              <h3>Con solo un clic</h3>
              <p>Crearas y organizaras tus tareas de forma efectiva y automatica.</p>
              <router-link to="/register">  <button class="btn-view-all">Registrar me</button></router-link>
              
              <ul class="features-list">
                <li>Tareas automaticas</li>
                <li>Notificaciones</li>
                <li>Personalizacion</li>
              </ul>
            </div>
            
            <div class="image-content">
              <img src="https://rapiprofe.com/wp-content/uploads/2024/08/tareas-tareas-1024x678.jpg" alt="Tareas" class="service-image">
            </div>
          </div>
        </div>
      </section>
  
      <!-- Recent Projects Section -->
      <section class="recent-projects">
        <div class="container">
          <h2>Facil y en simples pasos</h2>
          <p>
            Solo necesitarias estos pasos y estaras listo para tu dia a dia </p>
        </div>
      </section>
  
      <!-- Services Grid -->
      <section class="services-grid" >
        <div class="container">
          <div class="grid">
            <div class="service-card">
              <img src="https://carlofarucci.com/wp-content/uploads/2018/04/como-crear-contenido-2019.jpg" alt="">
              <h3>Crear Tarea</h3>
              <p>Crea tu tarea y ya estaras en la aventura</p>
            </div>
            
            <div class="service-card">
              <img src="https://cdn.aicad.es/asset/img/2/proceso-para-crear-un-producto.jpg" alt="">
              <h3>Programar Tarea</h3>
              <p>Programa tu tarea, puedes elegir el dia o mes para que esta aparezca</p>
            </div>
            
            <div class="service-card">
              <img src="https://img.freepik.com/vector-premium/realizar-seguimiento-objetivos-proyecto-realizar-seguimiento-objetivos-empresa-desarrollo-progreso-proyecto-man_159757-1416.jpg" alt="">
              <h3>Realiza la tarea</h3>
              <p>Realizala, Cumple con tu deber</p>
            </div>

            <div class="service-card">
              <img src="https://i.ytimg.com/vi/yGepHfKwvAo/maxresdefault.jpg" alt="">
              <h3>Repite</h3>
              <p>Repite el ciclo y estaras a la moda. </p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Home',
  }
  </script>
  
  <style scoped>
  .home {
    font-family: 'Arial', sans-serif;
    color: #333;
    line-height: 1.6;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
  }
  
  h1, h2, h3 {
    margin-top: 0;
    line-height: 1.2;
  }
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  .hero {
    background-color: #f8f9fa;
    padding: 80px 0;
    text-align: center;
  }
  
  .hero .lead {
    font-size: 1.25rem;
    max-width: 800px;
    margin: 0 auto;
  }
  

  .safety-service {
    padding: 60px 0;
    background-color: #fff;
  }
  
  .content-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    align-items: center;
    justify-content: center;
  }
  
  .text-content {
    flex: 1;
    min-width: 300px;
  }
  
  .image-content {
    flex: 1;
    min-width: 300px;
  }
  
  .service-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .btn-view-all {
    background-color: #ff6b00;
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: background-color 0.3s;
  }
  
  .btn-view-all:hover {
    background-color: #e05d00;
  }
  
  .features-list {
    list-style-type: none;
    padding: 0;
  }
  
  .features-list li {
    position: relative;
    padding-left: 30px;
    margin-bottom: 10px;
  }
  
  .features-list li:before {
    content: "✓";
    color: #4CAF50;
    position: absolute;
    left: 0;
    font-weight: bold;
  }
  

  .recent-projects {
    padding: 60px 0;
    background-color: #f8f9fa;
    text-align: center;
  }
  
  .recent-projects p {
    max-width: 800px;
    margin: 0 auto;
  }
  

  .services-grid {
    padding: 60px 0;
    background-color: #fff;
  }
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }
  
  .service-card {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
  
  .service-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .service-card h3 {
    padding: 0 20px;
    margin-top: 15px;
  }
  
  .service-card p {
    padding: 0 20px 20px;
    font-size: 0.9rem;
  }
  

  @media (max-width: 768px) {
    .hero {
      padding: 60px 0;
    }
    
    h1 {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.75rem;
    }
    
    .content-wrapper {
      flex-direction: column;
    }
    
    .text-content, .image-content {
      flex: none;
      width: 100%;
    }
    
    .grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
  
  @media (max-width: 480px) {
    .hero {
      padding: 40px 0;
    }
    
    h1 {
      font-size: 1.75rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
    
    .grid {
      grid-template-columns: 1fr;
    }
  }
  </style>