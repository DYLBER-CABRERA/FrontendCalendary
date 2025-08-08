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
                      v-model="subject.code"
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
                      v-model="subject.name"
                      :disabled="mode === 1"
                      class="form-input w-full rounded border-gray-300"
                      placeholder="Nombre"
                      required
                    />
                  </div>
                </div>
                <br>
                <div class="mb-4 flex text-2xl">
                  <label class="w-1/3 font-semibold">Total Horas:</label>
                  <div class="w-2/3">
                    <input
                      v-model.number="subject.totalHours"
                      :disabled="mode === 1"
                      type="number"
                      min="1"
                      class="form-input w-full rounded border-gray-300"
                      placeholder="Total de horas"
                      required
                    />
                  </div>
                </div>
                <br>
                <div class="mb-4 flex text-2xl">
                  <label class="w-1/3 font-semibold">Créditos:</label>
                  <div class="w-2/3">
                    <input
                      v-model.number="subject.credits"
                      :disabled="mode === 1"
                      type="number"
                      min="1"
                      class="form-input w-full rounded border-gray-300"
                      placeholder="Créditos"
                      required
                    />
                  </div>
                </div>
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
import type { Subject } from '@/models/Subject'
import routes from '@/router/router'
import { createSubject, updateSubject, getSubject } from '@/services/subjectsService'
import Swal from 'sweetalert2';


const props = defineProps<{
  mode: number // 1: visualizar, 2: crear, 3: actualizar
  subjectData?: Subject
  id?: string
}>()



const emit = defineEmits(['create', 'update'])


const subject = ref<Subject>({
  code: '',
  name: '',
  totalHours: 0,
  credits: 0,
})

// Si estamos en modo actualizar o visualizar y hay id, obtener datos del subject
onMounted(async () => {
  if ((props.mode === 1 || props.mode === 3) && props.id) {
    try {
      const data = await getSubject(props.id);
      subject.value = data;
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
  routes.push('/dashboard/materias');
};

// Observa los cambios en subjectData y actualiza el subject
watch(
  () => props.subjectData,
  (val) => {
    if (val) subject.value = { ...val }
  },
  { immediate: true }
)

// Método para manejar el envío del formulario segundo el modo
const handleSubmit = () => {
  if (props.mode === 1) {
    routes.push({ name: 'view' }) // Redirigir a la vista de la materia
    return
  }
  if (props.mode === 2) emit('create', subject.value)
  if (props.mode === 3) emit('update', subject.value)
}
// Método para crear un subject usando el servicio

async function create() {
  try {
    // Llamada al servicio para crear la materia
    await createSubject(subject.value);
    Swal.fire({
      icon: 'success',
      title: 'Materia creada exitosamente',
      showConfirmButton: false,
      timer: 1200
    });
    emit('create', subject.value); // Emitir el evento de creación
    // Redirigir a la lista de materias después de crear
    setTimeout(() => {
      routes.push('/dashboard/materias');
    }, 1200);
  } catch (error) {
    console.error('Error al crear la materia:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error al crear la materia',
      text: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
}

// Método para actualizar un subject usando el servicio
async function update() {
  try {
    console.log(subject.value);
    
    await updateSubject(subject.value); // Llamada al servicio para actualizar la materia
    Swal.fire({
      icon: 'success',
      title: 'Materia actualizada exitosamente',
      showConfirmButton: false,
      timer: 1200
    });
    emit('update', subject.value); // Emitir el evento de actualización
    // Redirigir a la lista de materias después de actualizar
    setTimeout(() => {
      routes.push('/dashboard/materias');
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
