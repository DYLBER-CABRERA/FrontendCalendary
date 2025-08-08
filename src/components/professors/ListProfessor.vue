<template>
  <div class="w-full max-w-[1800px] mx-auto py-8 px-4">
    <div class="rounded-2xl pb-10  bg-gradient-to-r from-blue-500 to-cyan-300 w-[1300px] mx-auto -translate-x-22">
      <h2 class="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100 pt-6 -translate-y-2">Lista de Profesores</h2>

      <div class="px-6">
        <div class="overflow-x-auto">
          <table class="w-full text-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-300 dark:border-gray-700">
            <thead class="bg-gray-100 dark:bg-gray-800">
              <tr class="border-b-2 border-gray-400 dark:border-gray-600">
                <th class="border-r-2 py-4 px-4 text-center font-bold text-gray-700 dark:text-gray-200 text-lg">
                  Cédula
                </th>
                <th class="py-4 px-4 border-r-2 text-center font-bold text-gray-700 dark:text-gray-200 text-lg">
                  Nombre
                </th>
                <th class="py-4 px-4 text-center border-r-2 font-bold text-gray-700 dark:text-gray-200 text-lg">
                  Teléfono
                </th>
                <th class="py-4 px-4 text-center border-r-2 font-bold text-gray-700 dark:text-gray-200 text-lg">
                  Email
                </th>
                <th class="py-4 px-4 text-center border-r-2 font-bold text-gray-700 dark:text-gray-200 text-lg">
                  esViaticado
                </th>
                <th class="py-4 px-4 text-center border-r-2 font-bold text-gray-700 dark:text-gray-200 text-lg">
                  Activo
                </th>
                <th class="py-4 px-4 text-center font-bold text-gray-700 dark:text-gray-200 text-lg">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="professor in paginatedProfessors" :key="professor.cedula"
                class="border-b-2 border-gray-400 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td class="py-4 px-4 border-r-2 text-gray-800 dark:text-gray-100 text-base text-center">
                  {{ professor.cedula }}
                </td>
                <td class="py-4 px-4 border-r-2 text-gray-800 dark:text-gray-100 text-base">
                  {{ professor.name }}
                </td>
                <td class="py-4 px-4 border-r-2 text-gray-800 dark:text-gray-100 text-base text-center">
                  {{ professor.phone }}
                </td>
                <td class="py-4 px-4 border-r-2 text-gray-800 dark:text-gray-100 text-base text-center">
                  {{ professor.email }}
                </td>
                <td class="py-4 px-4 border-r-2 text-gray-800 dark:text-gray-100 text-base text-center">
                  {{ professor.isViaticado ? 'Sí' : 'No' }}
                </td>
                <td class="py-4 px-4 border-r-2 text-gray-800 dark:text-gray-100 text-base text-center">
                  {{ professor.isActive ? 'Sí' : 'No' }}
                </td>
                <td class="py-4 px-4 text-center">
                  <div class="flex gap-2 justify-center flex-wrap">
                    <button class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-3 rounded text-sm"
                      @click="professor.cedula && verProfessor(professor.cedula)">Ver</button>
                    <button class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-3 rounded text-sm"
                      @click="professor.cedula && updateProfessor(professor.cedula)">Actualizar</button>
                    <button class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-3 rounded text-sm"
                      @click="professor.cedula && deleteProfesor(professor.cedula)">Borrar</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="flex justify-between items-center mt-6 px-4 flex-wrap gap-4">
          <!-- Paginación centrada -->
          <div class="flex justify-center gap-2 flex-1">
            <button v-for="page in totalPages" :key="page"
              :class="['px-4 py-2 rounded translate-y-5', currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200']"
              @click="goToPage(page)">
              {{ page }}
            </button>
          </div>
          
          <!-- Botón crear a la derecha -->
          <button
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded translate-y-5"
            @click="createProfessor()">Crear</button>
        </div>
        
        <p v-if="errorMessage" class="text-red-500 mt-4 text-center dark:text-red-400 text-lg">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ListProfessors, deleteProfessor } from '@/services/professorService'
import type { Professor } from '@/models/Professor'
import router from '@/router/router'
import Swal from 'sweetalert2'

const professors = ref<Professor[]>([]) // Lista de profesores
const errorMessage = ref<string>('') // mensaje de Error
const currentPage = ref(1)
const pageSize = 6

const fetchProfessors = async () => {
  try {
    const data = await ListProfessors() // Llamada al servicio para obtener los profesores
    console.log(data);

    professors.value = data // Las más recientes primero
    console.log(professors.value) // Verifica que los profesores se hayan cargado correctamente;

  } catch (error: any) {
    errorMessage.value = error.message // si hay un problema lanza un mensaje de error
  }
}

const paginatedProfessors = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return professors.value.slice(start, start + pageSize)
})

const totalPages = computed(() => Math.ceil(professors.value.length / pageSize))

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const verProfessor = (cedula: number) => {
  setTimeout(() => {
    router.push({ name: 'ViewProfessor', params: { id: cedula } }) // Redirige a la página de ver profesor
  }, 100);
}

const createProfessor = () => {
  setTimeout(() => {
    router.push({ name: 'CreateProfessor' }) // Redirige a la página de crear profesor
  }, 100);
}

const updateProfessor = (cedula: number) => {
  setTimeout(() => {
    router.push({ name: 'UpdateProfessor', params: { id: cedula } })
  })
}

const deleteProfesor = async (cedula: number) => {
  Swal.fire({
    title: "Eliminar Profesor?",
    text: "¿Estas seguro de eliminar al profesor?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "No, Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteProfessor(cedula) // Llamada al servicio para eliminar al profesor
        fetchProfessors() // Refrescar la lista de profesores después de eliminar
        Swal.fire("Eliminado!", "El Profesor ha sido eliminado.", "success")
      } catch (error: any) {
        errorMessage.value = error.message // si hay un problema lanza un mensaje de error
      }
    }
  })
}

onMounted(fetchProfessors) //se ejecuta una vez que el componente ha sido renderizado por primera vez  en el DOM, importante en Apis.
</script>