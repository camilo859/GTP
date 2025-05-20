<template>
    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h3 class="footer-title">GestionTask</h3>
            <p class="footer-text">
              Ofrecemos tu gestor de tareas favorito
            </p>
            <div class="social-links">
              <a href="#" class="social-icon" aria-label="Facebook">FB</a>
              <a href="#" class="social-icon" aria-label="Twitter">TW</a>
              <a href="#" class="social-icon" aria-label="Instagram">IG</a>
              <a href="#" class="social-icon" aria-label="LinkedIn">LN</a>
            </div>
          </div>
  
          <!-- Enlaces rápidos -->
          <div class="footer-section">
            <h3 class="footer-title">Enlaces Rápidos</h3>
            <ul class="footer-links">
              <li><a href="/">Inicio</a></li>
              <li><a href="/">Servicios</a></li>
              <li><a href="/">Nosotros</a></li>
              <li><a href="/">Proyectos</a></li>
              <li><a href="/">Contacto</a></li>
            </ul>
          </div>
  
     
          <div class="footer-section">
            <h3 class="footer-title">Tareas</h3>
            <ul class="footer-links">
              <li><a href="/">Tareas diarias</a></li>
              <li><a href="/">Tareas semanales</a></li>
              <li><a href="/">Tareas mensuales</a></li>
            </ul>
          </div>
  
     
          <div class="footer-section">
            <h3 class="footer-title">Contáctenos</h3>
            <ul class="contact-info">
              <li>
                <span class="contact-icon">📍</span>
                <span>Colombia<br>Cali</span>
              </li>
              <li>
                <span class="contact-icon">📞</span>
                <span>(55) 1234 5678</span>
              </li>
              <li>
                <span class="contact-icon">✉️</span>
                <span>contacto@gestionTask.com</span>
              </li>
              <li>
                <span class="contact-icon">⏱️</span>
                <span>Lun-Vie: 8:00 - 18:00<br>Servicio</span>
              </li>
            </ul>
          </div>
        </div>
  
        <!-- Copyright -->
        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} GestionTask. Todos los derechos reservados.</p>
          <div class="legal-links">
            <a href="/">Política de Privacidad</a>
            <a href="/">Términos de Servicio</a>
            <a href="/">Mapa del Sitio</a>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'SiteFooter',
    data() {
      return {
        currentYear: new Date().getFullYear()
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estilos base del footer */
  .site-footer {
    background-color: #2c3e50;
    color: #ecf0f1;
    padding: 60px 0 20px;
     margin-top: 33%;
    font-size: 14px;
    font-family: Arial, sans-serif;
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
  }
  
  .footer-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    margin-bottom: 40px;
  }
  
  .footer-section {
    margin-bottom: 20px;
  }
  
  .footer-title {
    color: #fff;
    font-size: 18px;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;
  }
  
  .footer-title::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 40px;
    height: 2px;
    background-color: #e98b0f;
  }
  
  .footer-text {
    margin-bottom: 20px;
    line-height: 1.6;
  }
  
  /* Iconos sociales */
  .social-links {
    display: flex;
    gap: 15px;
  }
  
  .social-icon {
    color: #ecf0f1;
    background-color: rgba(255, 255, 255, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;
  }
  
  .social-icon:hover {
    background-color: #d17c1a;
    color: #fff;
    transform: translateY(-3px);
  }
  
  /* Enlaces del footer */
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-links li {
    margin-bottom: 10px;
  }
  
  .footer-links a,
  .legal-links a {
    color: #bdc3c7;
    text-decoration: none;
    transition: all 0.3s;
  }
  
  .footer-links a:hover,
  .legal-links a:hover {
    color: #c06a23;
    padding-left: 5px;
  }
  
  /* Información de contacto */
  .contact-info {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .contact-info li {
    display: flex;
    margin-bottom: 15px;
    align-items: flex-start;
  }
  
  .contact-icon {
    margin-right: 10px;
    margin-top: 3px;
    min-width: 16px;
    display: inline-block;
  }
  
  /* Pie del footer */
  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .legal-links {
    display: flex;
    gap: 20px;
    margin-top: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .legal-links a {
    color: #bdc3c7;
    text-decoration: none;
    white-space: nowrap;
  }
  
  /* Ajustes responsivos */
  @media (min-width: 768px) {
    .footer-bottom {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
    
    .legal-links {
      margin-top: 0;
      justify-content: flex-end;
    }
  }
  
  @media (max-width: 480px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: 30px;
    }
    
    .footer-section {
      text-align: center;
    }
    
    .footer-title::after {
      left: 50%;
      transform: translateX(-50%);
    }
    
    .social-links {
      justify-content: center;
    }
    
    .contact-info li {
      justify-content: center;
      text-align: center;
    }
    
    .contact-icon {
      display: none;
    }
  }
  </style>