<template>
  <nav class="fixed top-0 left-0 w-full bg-gradient-to-r bg-gray-600 text-white shadow-lg z-50">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button 
            type="button" 
            @click="toggleMobileMenu"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
          >
            <span class="sr-only">Abrir menú principal</span>
            <svg 
              v-if="!isMobileMenuOpen"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="1.5" 
              class="w-6 h-6"
            >
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg 
              v-else
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="1.5" 
              class="w-6 h-6"
            >
              <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/dashboard" class="flex items-center">
            <img 
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" 
              alt="Logo" 
              class="h-8 w-auto mr-3" 
            />
            <span class="text-xl font-bold hidden sm:block">Horarios</span>
          </router-link>
        </div>

            <!-- Desktop Navigation -->
        <div class="hidden sm:block flex-1 max-w-5xl mx-5">
          <div class="flex">
            <router-link 
              to="/dashboard/materias" 
              class="px-4 py-2 text-lg font-semibold rounded-md transition-colors duration-200 hover:text-yellow-300 hover:bg-white/10"
              :class="{ 'bg-gray-900 text-white': $route.path === '/dashboard/materias' }"
            >
              Materias
            </router-link>
            <router-link 
              to="/dashboard/clases" 
              class="px-4 py-2 text-lg font-semibold rounded-md transition-colors duration-200 hover:text-yellow-300 hover:bg-white/10"
              :class="{ 'bg-gray-900 text-white': $route.path === '/dashboard/clases' }"
            >
              Clases
            </router-link>
            <router-link 
              to="/dashboard/profesores" 
              class="px-4 py-2 text-lg font-semibold rounded-md transition-colors duration-200 hover:text-yellow-300 hover:bg-white/10"
              :class="{ 'bg-gray-900 text-white': $route.path === '/dashboard/profesores' }"
            >
              Profesores
            </router-link>
            <router-link 
              to="/dashboard/campus" 
              class="px-4 py-2 text-lg font-semibold rounded-md transition-colors duration-200 hover:text-yellow-300 hover:bg-white/10"
              :class="{ 'bg-gray-900 text-white': $route.path === '/dashboard/campus' }"
            >
              Campus
            </router-link>
          </div>
        </div>

        <!-- Right side - Notifications and Profile -->
        <div class="flex items-center space-x-4">
          <!-- Notification button -->
          <button 
            type="button" 
            class="relative rounded-full bg-gray-800 p-2 text-gray-300 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none transition-colors duration-200"
          >
            <span class="sr-only">Ver notificaciones</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6">
              <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <!-- Profile dropdown -->
          <div class="relative">
            <button 
              @click="toggleProfileMenu"
              class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
            >
              <span class="sr-only">Abrir menú de usuario</span>
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Perfil" 
                class="w-8 h-8 rounded-full" 
              />
            </button>

            <!-- Profile dropdown menu -->
            <div 
              v-if="isProfileMenuOpen"
              class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition-all duration-200"
            >
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">Tu Perfil</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">Configuración</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">Cerrar Sesión</a>
            </div>
          </div>
        </div>
      </div>
    </div>


  </nav>
  <main class="flex-1-relative">
    <!-- Imagen de fondo -->
    <img src="https://www.ucaldas.edu.co/portal/wp-content/uploads/2024/10/u-caldas.jpg" alt="Fondo" class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none" />
    <div class="relative z-10 p-8">
      <router-view />
    </div>
  </main>
</template>

<script>
export default {
  name: 'NavbarComponent',
  data() {
    return {
      isMobileMenuOpen: false,
      isProfileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      if (this.isMobileMenuOpen) {
        this.isProfileMenuOpen = false
      }
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen
      if (this.isProfileMenuOpen) {
        this.isMobileMenuOpen = false
      }
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false
    },
    closeMenus() {
      this.isMobileMenuOpen = false
      this.isProfileMenuOpen = false
    }
  },
  mounted() {
    // Cerrar menús al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target)) {
        this.closeMenus()
      }
    })
  }
}
</script>