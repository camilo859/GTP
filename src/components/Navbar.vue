<template>
    <nav class="navbar" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
      <div class="container">
        <!-- Logo/Brand -->
        <div class="navbar-brand">
          <router-link to="/" class="logo">GestionTask</router-link>
          
          <!-- Mobile hamburger menu button -->
          <button 
            class="hamburger-button" 
            @click="toggleMobileMenu"
            aria-label="Toggle navigation menu"
          >
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>
        
        <!-- Desktop Navigation -->
        <ul class="navbar-links desktop">
          <li><router-link to="/">Inicio</router-link></li>
          <li><a href="#conocer">Conocer</a></li>
          <li><router-link to="/login">Iniciar sesion</router-link></li>
          <li><router-link to="/register">Registrarse</router-link></li>
          <li v-if="isLoggedIn"><a href="#" @click.prevent="handleLogout">Cerrar sesion</a></li>
        </ul>
        
        <!-- Mobile Navigation (shown when hamburger is clicked) -->
        <transition name="slide-down">
          <ul v-if="isMobileMenuOpen" class="navbar-links mobile">
            <li><router-link to="/" @click="closeMobileMenu">Inicio</router-link></li>
            <li><a to="#conocer" @click="closeMobileMenu">Conocer</A></li>
            <li><router-link to="/login" @click="closeMobileMenu">Iniciar sesion</router-link></li>
            <li><router-link to="/register" @click="closeMobileMenu">Registrarse</router-link></li>
            <li v-if="isLoggedIn"><a href="#" @click.prevent="handleLogout">Cerrar sesion</a></li>
          </ul>
        </transition>
      </div>
    </nav>
  </template>
  
  <script>
import { useLogout } from '@/composables/useLogout'
  export default {
    name: 'Navbar',
    data() {
      return {
        isMobileMenuOpen: false,
        isMobileView: false,
         isLoggedIn: false
      }
    },
    methods: {
      toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen
      },
      closeMobileMenu() {
        this.isMobileMenuOpen = false
      },
      checkScreenSize() {
        this.isMobileView = window.innerWidth <= 768
        if (!this.isMobileView) {
          this.isMobileMenuOpen = false
        }
      },
      handleLogout() {
      const { logout } = useLogout();
      logout();
      this.closeMobileMenu(); // Cierra el menú móvil si está abierto
    }, checkLoginStatus() {
      // Verificar si existe idUsuario en localStorage
      this.isLoggedIn = !!localStorage.getItem('idUsuario');
    }
    },
    mounted() {
this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
    this.checkLoginStatus(); 
    window.addEventListener('storage', this.checkLoginStatus);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.checkScreenSize)
    }
  }
  </script>
  
  <style scoped>
  /* Base Navbar Styles */
  .navbar {
    background-color: #2c3e50;
    color: white;
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
  }
  
  .navbar-brand {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }
  
  /* Navigation Links */
  .navbar-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }
  
  .navbar-links.desktop {
    display: none;
  }
  
  .navbar-links li {
    margin-left: 1.5rem;
  }
  
  .navbar-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    padding: 0.5rem 0;
    display: block;
  }
  
  .navbar-links a:hover,
  .navbar-links a.router-link-exact-active {
    color: #e26c28;
  }
  
  /* Mobile Menu Styles */
  .hamburger-button {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    margin-right: 24px;
  }
  
  .hamburger-line {
    display: block;
    height: 3px;
    margin: 1px;
    width: 40px;
    background-color: white;
    transition: all 0.3s ease;
  }
  
  .navbar.mobile-menu-open .hamburger-line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  
  .navbar.mobile-menu-open .hamburger-line:nth-child(2) {
    opacity: 0;
  }
  
  .navbar.mobile-menu-open .hamburger-line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
  
  .navbar-links.mobile {
    flex-direction: column;
    padding: 1rem 0;
    background-color: #34495e;
    margin-top: 1rem;
    border-radius: 4px;
    width: 100%;
  }
  
  .navbar-links.mobile li {
    margin: 0;
    padding: 0.5rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .navbar-links.mobile li:last-child {
    border-bottom: none;
  }
  
  /* Slide transition for mobile menu */
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all 0.3s ease;
    max-height: 500px;
    overflow: hidden;
  }
  
  .slide-down-enter-from,
  .slide-down-leave-to {
    max-height: 0;
    opacity: 0;
  }
  
  /* Desktop Styles */
  @media (min-width: 769px) {
    .container {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    
    .hamburger-button {
      display: none;
    }
    
    .navbar-links.desktop {
      display: flex;
    }
    
    .navbar-links.mobile {
      display: none;
    }
  }
  </style>