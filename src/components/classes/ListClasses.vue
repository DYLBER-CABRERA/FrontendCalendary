<template>
  <div class="w-full mx-auto py-8 px-4 translate-y-2">
    <div class="rounded-2xl pb-8 bg-gradient-to-r from-blue-500 to-cyan-300 w-[1300px] mx-auto -translate-x-22 -translate-y-5 ">
      <h2 class="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100 pt-6 -translate-y-2">Lista de Clases</h2>

      <div class="px-6">
        <div class="w-full overflow-hidden rounded-2xl shadow-2xl">
          <table class="w-full text-sm bg-white dark:bg-gray-900 border-collapse">
            <thead class="bg-gray-100 dark:bg-gray-800">
              <tr class="border-b-2 border-gray-400 dark:border-gray-600">
                <th class="py-4 px-3 text-center font-bold text-gray-700 dark:text-gray-200 text-lg border-r border-gray-300 dark:border-gray-600">
                  ID Clase
                </th>
                <th class="py-4 px-3 text-center font-bold text-gray-700 dark:text-gray-200 text-lg border-r border-gray-300 dark:border-gray-600">
                  Profesor
                </th>
                <th class="py-4 px-3 text-center font-bold text-gray-700 dark:text-gray-200 text-lg border-r border-gray-300 dark:border-gray-600">
                  Campus
                </th>
                <th class="py-4 px-3 text-center font-bold text-gray-700 dark:text-gray-200 text-lg border-r border-gray-300 dark:border-gray-600">
                  Materia
                </th>
                <th class="py-4 px-3 text-center font-bold text-gray-700 dark:text-gray-200 text-lg border-r border-gray-300 dark:border-gray-600">
                  Fecha Inicio
                </th>
                <th class="py-4 px-3 text-center font-bold text-gray-700 dark:text-gray-200 text-lg border-r border-gray-300 dark:border-gray-600">
                  Fecha Fin
                </th>
                <th class="py-4 px-3 text-center font-bold text-gray-700 dark:text-gray-200 text-lg border-r border-gray-300 dark:border-gray-600">
                  Total Horas
                </th>
                <th class="py-4 px-3 text-center font-bold text-gray-700 dark:text-gray-200 text-lg">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="clase in paginatedClasses" :key="clase.code" 
                class="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                <td class="py-4 px-3 text-gray-800 dark:text-gray-100 text-base text-center border-r border-gray-300 dark:border-gray-600">
                  {{ clase.code }}
                </td>
                <td class="py-4 px-3 text-gray-800 dark:text-gray-100 text-base border-r border-gray-300 dark:border-gray-600">
                  {{ clase.professorId }}
                </td>
                <td class="py-4 px-3 text-gray-800 dark:text-gray-100 text-base text-center border-r border-gray-300 dark:border-gray-600 whitespace-nowrap w-auto">
                  {{ clase.campusId }}
                </td>
                <td class="py-4 px-3 text-gray-800 dark:text-gray-100 text-base border-r border-gray-300 dark:border-gray-600 whitespace-nowrap w-auto">
                  {{ clase.subjectCode }}
                </td>
                <td class="py-4 px-3 text-gray-800 dark:text-gray-100 text-base text-center border-r border-gray-300 dark:border-gray-600">
                  <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm">
                    {{ clase.startDate }}
                  </span>
                </td>
                <td class="py-4 px-3 text-gray-800 dark:text-gray-100 text-base text-center border-r border-gray-300 dark:border-gray-600 whitespace-nowrap w-auto">
                  <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm">
                    {{ clase.endDate }}
                  </span>
                </td>
                <td class="py-4 px-3 text-gray-800 dark:text-gray-100 text-base text-center border-r border-gray-300 dark:border-gray-600">
                  <span class="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded font-semibold">
                    {{ clase.schedule?.totalHours }}h
                  </span>
                </td>
                <td class="py-4 px-3">
                  <div class="flex gap-2 justify-center flex-wrap">
                    <button class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded text-sm transition-colors duration-200" 
                      @click="clase.code && verClass(clase.code)">
                      Ver
                    </button>
                    <button class="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-3 rounded text-sm transition-colors duration-200" 
                      @click="clase.code && updateClass(clase.code)">
                      Actualizar
                    </button>
                    <button class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded text-sm transition-colors duration-200" 
                      @click="clase.code && borrarClass(clase.code)">
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Paginación y botón crear -->
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
            @click="createClass()">Crear</button>
        </div>
        
        <p v-if="errorMessage" class="text-red-500 mt-4 text-center dark:text-red-400 text-lg font-medium">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { listClasses, deleteClass } from '@/services/classesService'
import type { Classes } from '@/models/Classes'
import router from '@/router/router'
import Swal from 'sweetalert2'

const classes = ref<Classes[]>([])
const errorMessage = ref<string>('')
const currentPage = ref(1)
const pageSize = 6

const fetchClasses = async () => {
  try {
    const data = await listClasses()
    classes.value = data
  } catch (error: any) {
    errorMessage.value = error.message
  }
}

const paginatedClasses = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return classes.value.slice(start, start + pageSize)
})

const totalPages = computed(() => Math.ceil(classes.value.length / pageSize))

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const verClass = (code: string) => {
  setTimeout(() => {
    router.push({ name: 'ViewClass', params: { id: code } })
  }, 100)
}

const createClass = () => {
  setTimeout(() => {
    router.push({ name: 'CreateClass' })
  }, 100)
}

const updateClass = (code: string) => {
  setTimeout(() => {
    router.push({ name: 'UpdateClass', params: { id: code } })
  }, 100)
}

const borrarClass = async (code: string) => {
  // El código es composite: profesorId-campusId-subjectCode-startDate
  const [professorId, campusId, subjectCode, startDate] = code.split(' - ')
  Swal.fire({
    title: "Eliminar Clase?",
    text: "¿Estas seguro de eliminar la clase?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "No, Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteClass(Number(professorId), campusId, subjectCode, startDate)
        fetchClasses()
        Swal.fire("Eliminado!", "La Clase ha sido eliminada.", "success")
      } catch (error: any) {
        errorMessage.value = error.message
      }
    }
  })
}

onMounted(fetchClasses)
</script>