<template>
<div class="w-full mx-auto py-8 px-4 translate-y-2">
    <div class="rounded-2xl pb-10  bg-gradient-to-r from-blue-500 to-cyan-300 w-[1200px] mx-auto -translate-x-15">
      <h2 class="text-4xl font-bold mb-10 text-center text-gray-800 dark:text-gray-100 translate-y-4">Lista de Campus</h2>
      <div class="px-6">
        <br>
        <table class="min-w-max text-sm bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-gray-300 dark:border-gray-700 translate-x-16">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr class="border-t-3 border-b-3 border-gray-400 dark:border-gray-600">
            <th class="border-r-2 py-4 px-6 text-center font-bold text-gray-700 dark:text-gray-200 text-xl whitespace-nowrap">Código</th>
            <th class="py-4 px-6 border-r-2 text-center font-bold text-gray-700 dark:text-gray-200 text-xl whitespace-nowrap">Nombre</th>
            <th class="py-4 px-2 text-center border-r-2 font-bold text-gray-700 dark:text-gray-200 text-xl whitespace-nowrap w-24">Dirección</th>
            <th class="py-4 px-6 text-center font-bold text-gray-700 dark:text-gray-200 text-xl whitespace-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="campus in paginatedCampuses" :key="campus.code" class="border-b-3 border-gray-400 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800">
            <td class="py-4 px-6 border-r-2 text-gray-800 dark:text-gray-100 text-xl whitespace-nowrap">{{ campus.code }}</td>
            <td class="py-4 px-6 border-r-2 text-gray-800 dark:text-gray-100 text-xl whitespace-nowrap">{{ campus.name }}</td>
            <td class="py-4 px-2 border-r-2 text-gray-800 dark:text-gray-100 text-xl text-center w-24 whitespace-nowrap">{{ campus.location }}</td>
            <!-- <td class="py-4 px-2 border-r-2 text-gray-800 dark:text-gray-100 text-xl text-center w-20 whitespace-nowrap">{{ campus.city }}</td> -->
            <td class="py-4 px-6 flex gap-2 whitespace-nowrap">
              <button class="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded" @click="campus.code && verCampus(campus.code)">Ver</button>
              <button class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" @click="campus.code && updateCampus(campus.code)">Actualizar</button>
              <button class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded" @click="campus.code && borrarCampus(campus.code)">Borrar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-center mt-6 gap-2">
        <button
          v-for="page in totalPages"
          :key="page"
          :class="['px-4 py-2 rounded translate-y-3', currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200  translate-y-3'] "
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
        <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-10 rounded translate-x-96 translate-y-3" @click="createCampus()">Crear</button>
      </div>
      <p v-if="errorMessage" class="text-red-500 mt-4 text-center dark:text-red-400 text-xl">{{ errorMessage }}</p>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ListCampuses, deleteCampus } from '@/services/campusService'
import type { Campus } from '@/models/Campus'
import router from '@/router/router'
import Swal from 'sweetalert2'

const campuses = ref<Campus[]>([]) // Lista de campus   
const errorMessage = ref<string>('') // mensaje de Error
const currentPage = ref(1)
const pageSize = 10

const fetchCampuses = async () => {
  try {
    const data = await ListCampuses() // Llamada al servicio para obtener los campus
    console.log(data);

    campuses.value = data // Las más recientes primero
    console.log(campuses.value) // Verifica que los campus se hayan cargado correctamente;

  } catch (error: any) {
    errorMessage.value = error.message // si hay un problema lanza un mensaje de error
  }
}

const paginatedCampuses = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return campuses.value.slice(start, start + pageSize)
})

const totalPages = computed(() => Math.ceil(campuses.value.length / pageSize))

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const verCampus =  (code: string) => {
  setTimeout(() => {
    router.push({ name: 'ViewCampus', params: { id: code } }) // Redirige a la página de ver campus
    }, 100);
}

const createCampus = () => {
  setTimeout(() => {
    router.push({ name: 'CreateCampus' }) // Redirige a la página de crear campus
  }, 100);
}
const updateCampus = (id:string) => {
  setTimeout(()=>{
    router.push({name: 'UpdateCampus', params: {id: id}})
  })
}

const borrarCampus = async (id: string) => {
 Swal.fire({
    title: "Eliminar Campus?",
      text: "¿Estas seguro de eliminar el campus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, Cancelar",
 }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteCampus(id) // Llamada al servicio para eliminar el campus
        fetchCampuses() // Refrescar la lista de campus después de eliminar
        Swal.fire("Eliminado!", "El Campus ha sido eliminado.", "success")
      } catch (error: any) {
        errorMessage.value = error.message // si hay un problema lanza un mensaje de error
      }
    }
  })
}

onMounted(fetchCampuses) //se ejecuta una vez que el componente ha sido renderizado por primera vez  en el DOM, importante en Apis.

</script>