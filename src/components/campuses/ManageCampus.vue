<template>
 <div class="min-h-screen flex items-center justify-start bg-gradient-to-r pl-50">
  <div class="w-[800px] h-[500px] p-10 bg-gradient-to-r bg-linear-to-r/oklch from-indigo-500 to-teal-400 rounded-xl shadow-xl translate-x-2">
      <div class="container mx-auto mt-4">
        <div class="flex justify-center">
          <div class="w-full max-w-2xl">
            <div class="bg-white dark:bg-gray-900 shadow-lg rounded-lg min-h-[200px] h-[360px] flex flex-col translate-y-6">
              <div class="border-b px-6 py-4">
                <h1 v-if="mode === 1" class="text-3xl font-bold">Visualizar</h1>
                <h1 v-else-if="mode === 2" class="text-2xl font-bold">Crear</h1>
                <h1 v-else-if="mode === 3" class="text-2xl font-bold">Actualizar</h1>
              </div>
              <form @submit.prevent="handleSubmit" class="px-6 py-4">
                <div class="mb-4 flex text-2xl">
                  <label class="w-1/3 font-semibold">Código:</label>
                  <div class="w-2/3">
                    <input
                      v-model="campus.code"
                      :disabled="mode === 1 || mode === 3"
                      class="form-input w-full rounded border-gray-300"
                      placeholder="Código"
                      required
                    />
                  </div>
                </div>
                <br>
                <div class="mb-4 flex text-2xl">
                  <label class="w-1/3 font-semibold">Nombre:</label>
                  <div class="w-2/3">
                    <input
                      v-model="campus.name"
                      :disabled="mode === 1"
                      class="form-input w-full rounded border-gray-300"
                      placeholder="Nombre"
                      required
                    />
                  </div>
                </div>
                <br>
                <div class="mb-4 flex text-2xl">
                  <label class="w-1/3 font-semibold">Dirección:</label>
                  <div class="w-2/3">
                    <input
                      v-model.number="campus.location"
                      :disabled="mode === 1"
                      type="string"
                      min="1"
                      class="form-input w-full rounded border-gray-300"
                      placeholder="Dirección"
                      required
                    />
                  </div>
                </div>
                <br>
                <div class="flex justify-end-safe gap-4 mt-6 translate-y-6">
                  <button v-if="mode === 1" type="button" class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-8 rounded" @click="returnList()">Regresar</button>
                  <button
                    v-if="mode === 2"
                    type="submit"
                    class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded translate-y-0.5"
                    @click="create()"
                  >
                    Crear
                  </button>
                  <button
                    v-if="mode === 3"
                    type="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded translate-y-0.5"
                    @click="update()"
                  >
                    Actualizar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, watch, onMounted } from 'vue'
import type { Campus } from '@/models/Campus'
import routes from '@/router/router'
import { createCampus, updateCampus, getCampus } from '@/services/campusService'
import Swal from 'sweetalert2';


const props = defineProps<{
  mode: number // 1: visualizar, 2: crear, 3: actualizar
  campusData?: Campus
  id?: string
}>()



const emit = defineEmits(['create', 'update'])


const campus = ref<Campus>({
  code: '',
  name: '',
  location: '',
})

// Si estamos en modo actualizar o visualizar y hay id, obtener datos del Campus
onMounted(async () => {
  if ((props.mode === 1 || props.mode === 3) && props.id) {
    try {
      const data = await getCampus(props.id);
      campus.value = data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar la materia',
        text: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }
});

const returnList = () => {
  routes.push( '/dashboard/campus');
};

// Observa los cambios en campusData y actualiza el campus
watch(
  () => props.campusData,
  (val) => {
    if (val) campus.value = { ...val }
  },
  { immediate: true }
)

// Método para manejar el envío del formulario segundo el modo
const handleSubmit = () => {
  if (props.mode === 1) {
    routes.push({ name: 'view' }) // Redirigir a la vista del campus
    return
  }
  if (props.mode === 2) emit('create', campus.value)
  if (props.mode === 3) emit('update', campus.value)
}
// Método para crear un campus usando el servicio

async function create() {
  try {
    // Llamada al servicio para crear el campus
    await createCampus(campus.value);
    Swal.fire({
      icon: 'success',
      title: 'Campus creado  exitosamente',
      showConfirmButton: false,
      timer: 1200
    });
    emit('create', campus.value); // Emitir el evento de creación
    // Redirigir a la lista de campus después de crear
    setTimeout(() => {
      routes.push( '/dashboard/campus');
    }, 1200);
  } catch (error) {
    console.error('Error al crear el Campus:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al crear el campus',
      text: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}

// Método para actualizar un campus usando el servicio
async function update() {
  try {
    console.log(campus.value);
    
    await updateCampus(campus.value); // Llamada al servicio para actualizar la materia
    Swal.fire({
      icon: 'success',
      title: 'Campus actualizada exitosamente',
      showConfirmButton: false,
      timer: 1200
    });
    emit('update', campus.value); // Emitir el evento de actualización
    // Redirigir a la lista de campus después de actualizar
    setTimeout(() => {
        routes.push( '/dashboard/campus');;
    }, 1200);
  } catch (error) {
    console.error('Error al actualizar la materia:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar la materia',
      text: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}
</script>
