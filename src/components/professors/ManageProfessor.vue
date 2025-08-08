<template>
 <div class="min-h-screen flex items-center justify-start bg-gradient-to-r pl-50">
  <div class="w-[800px] h-[510px] p-10 bg-gradient-to-r bg-linear-to-r/oklch from-indigo-500 to-teal-400 rounded-xl shadow-xl translate-x-2">
      <div class="container mx-auto mt-4">
        <div class="flex justify-center">
          <div class="w-full max-w-2xl">
            <div class="bg-white dark:bg-gray-900 shadow-lg rounded-lg min-h-[200px] h-[460px] flex flex-col -translate-y-4">
              <div class="border-b px-6 py-4">
                <h1 v-if="mode === 1" class="text-3xl font-bold">Visualizar</h1>
                <h1 v-else-if="mode === 2" class="text-2xl font-bold">Crear</h1>
                <h1 v-else-if="mode === 3" class="text-2xl font-bold">Actualizar</h1>
              </div>
              <form @submit.prevent="handleSubmit" class="px-6 py-4">
                <div class="mb-4 flex text-2xl">
                  <label class="w-1/3 font-semibold">Cédula:</label>
                  <div class="w-2/3">
                    <input
                      v-model="professor.cedula"
                      :disabled="mode === 1 || mode === 3"
                      class="form-input w-full rounded border-gray-300"
                      placeholder="Cédula"
                      required
                    />
                  </div>
                </div>
                <br>
                <div class="mb-4 flex items-center text-2xl">
                  <label class="w-1/3 font-semibold">Nombre Completo:</label>
                  <div class="w-2/3">
                    <input
                      v-model="professor.name"
                      :disabled="mode === 1"
                      class="form-input w-full rounded border-gray-300"
                      placeholder="Nombre"
                      required
                    />
                  </div>
                </div>
                <br>
                <div class="mb-4 flex text-2xl">
                  <label class="w-1/3 font-semibold">Teléfono:</label>
                  <div class="w-2/3">
                    <input
                      v-model.number="professor.phone"
                      :disabled="mode === 1"
                      type="number"
                      min="1"
                      class="form-input w-full rounded border-gray-300"
                      placeholder="Teléfono"
                      required
                    />
                  </div>
                </div>
                <br>
               
                <div class="mb-4 flex text-2xl">
                  <label class="w-1/3 font-semibold">Email:</label>
                  <div class="w-2/3">
                    <input
                      v-model="professor.email"
                      :disabled="mode === 1"
                      type="email"
                      class="form-input w-full rounded border-gray-300"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
                <br>
                <div class="mb-4 flex text-2xl">
                  <label class="w-1/3 font-semibold">esViaticado:</label>
                  <div class="w-2/3">
                    <input
                      v-model="professor.isViaticado"
                      :disabled="mode === 1"
                      type="checkbox"
                      class="form-checkbox"
                    />
                  </div>
                </div>
                <br>
                <div class="mb-4 flex text-2xl" v-if="mode === 1">
                  <label class="w-1/3 font-semibold">Activo:</label>
                  <div class="w-2/3">
                    <input
                      v-model="professor.isActive"
                      :disabled="mode === 1"
                      type="checkbox"
                      class="form-checkbox"
                    />
                  </div>
                </div>
                <br>
                <div class="flex justify-end-safe gap-4 mt-2 translate-y-6">
                  <button v-if="mode === 1" type="button" class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-8 rounded -translate-y-16" @click="returnList()">Regresar</button>
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
                    class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded -translate-y-10"
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
import type { Professor } from '@/models/Professor'
import routes from '@/router/router'
import { createProfessor, updateProfessor, getProfessor } from '@/services/professorService'
import Swal from 'sweetalert2';


const props = defineProps<{
  mode: number // 1: visualizar, 2: crear, 3: actualizar
  professorData?: Professor
  id?: string
}>()



const emit = defineEmits(['create', 'update'])


const professor = ref<Professor>({
  cedula: 0,
  name: '',
  phone: '',
  email: '',
  isViaticado: false,
  isActive: false,
})

// Si estamos en modo actualizar o visualizar y hay id, obtener datos del profesor
onMounted(async () => {
  if ((props.mode === 1 || props.mode === 3) && props.id) {
    try {
      const data = await getProfessor(Number(props.id));
      professor.value = data;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al cargar el profesor',
        text: error instanceof Error ? error.message : 'Error desconocido',
      });
    }
  }
});

const returnList = () => {
  routes.push('/dashboard/profesores');
};

// Observa los cambios en professorData y actualiza el professor
watch(
  () => props.professorData,
  (val) => {
    if (val) professor.value = { ...val }
  },
  { immediate: true }
)

// Método para manejar el envío del formulario segundo el modo
const handleSubmit = () => {
  if (props.mode === 1) {
    routes.push({ name: 'view' }) // Redirigir a la vista de la materia
    return
  }
  if (props.mode === 2) emit('create', professor.value)
  if (props.mode === 3) emit('update', professor.value)
}
// Método para crear un professor usando el servicio

async function create() {
  try {
    // Llamada al servicio para crear el profesor
    await createProfessor(professor.value);
    Swal.fire({
      icon: 'success',
      title: 'Profesor creado exitosamente',
      showConfirmButton: false,
      timer: 1200
    });
    emit('create', professor.value); // Emitir el evento de creación
    // Redirigir a la lista de profesores después de crear
    setTimeout(() => {
        routes.push('/dashboard/profesores');
    }, 1200);
  } catch (error) {
    console.error('Error al crear el profesor:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al crear el profesor',
      text: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}

// Método para actualizar un profesor usando el servicio
async function update() {
  try {
    console.log(professor.value);

    await updateProfessor(professor.value); // Llamada al servicio para actualizar el profesor
    Swal.fire({
      icon: 'success',
      title: 'Profesor actualizado exitosamente',
      showConfirmButton: false,
      timer: 1200
    });
    emit('update', professor.value); // Emitir el evento de actualización
    // Redirigir a la lista de profesores después de actualizar
    setTimeout(() => {
      routes.push('/dashboard/profesores');
    }, 1200);
  } catch (error) {
    console.error('Error al actualizar el profesor:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al actualizar el profesor',
      text: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}
</script>
