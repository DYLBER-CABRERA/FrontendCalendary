<template>
    <div class="min-h-screen flex items-center justify-start bg-gradient-to-r pl-50">
        <div
            class="w-[900px] min-h-[600px] p-10 bg-gradient-to-r bg-linear-to-r/oklch from-indigo-500 to-teal-400 rounded-xl shadow-xl translate-x-2">
            <div class="container mx-auto mt-4">
                <div class="flex justify-center">
                    <div class="w-full max-w-2xl">
                        <div
                            class="bg-white dark:bg-gray-900 shadow-lg rounded-lg min-h-[400px] h-auto flex flex-col translate-y-6 w-auto">
                            <div class="border-b px-6 py-4">
                                <h1 v-if="mode === 1" class="text-3xl font-bold">Visualizar Clase</h1>
                                <h1 v-else-if="mode === 2" class="text-2xl font-bold">Crear Clase</h1>
                                <h1 v-else-if="mode === 3" class="text-2xl font-bold">Actualizar Clase</h1>
                            </div>
                            <form @submit.prevent="handleSubmit" class="px-2 py-4">
                                <div class="mb-4 flex text-xl" v-if="mode === 1">
                                    <label class="w-1/3 font-semibold text-2xl" >Código:</label>
                                    <div class="w-2/3">
                                        <input v-model="clase.code" :disabled="mode === 1"
                                            class="form-input w-[600px] rounded border-gray-300 text-xl -translate-x-10"
                                            placeholder="Código de la Clase" required type="text" />
                                    </div>
                                </div>
                                <div class="mb-4 flex text-2xl">
                                    <label class="w-1/3 font-semibold">Profesor:</label>
                                    <div class="w-2/3">
                                        <!-- <input v-model="clase.professorId" :disabled="mode === 1 || mode === 3"
                                            class="form-input w-full rounded border-gray-300 -translate-x-10"
                                            placeholder="ID del Profesor" required type="number" /> -->
                                            <select class="w-full rounded bg-gray-700 border-gray-300 -translate-x-10" name="professorId" id="professorId" v-model="clase.professorId" :disabled="mode === 1 || mode === 3">
                                                <option v-for="professor in professors" :key="professor.cedula" :value="professor.cedula">
                                                    {{ professor.name }}
                                                </option>
                                            </select>
                                    </div>
                                </div>
                                <div class="mb-4 flex text-2xl">
                                    <label class="w-1/3 font-semibold">Campus:</label>
                                    <div class="w-2/3">
                                        <select class="w-full rounded bg-gray-700 border-gray-300 -translate-x-10" name="campusId" id="campusId" v-model="clase.campusId" :disabled="mode === 1 || mode === 3">
                                            <option v-for="campus in campuses" :key="campus.code" :value="campus.code">
                                                {{ campus.name }}
                                            </option>
                                            </select>
                                    </div>
                                </div>
                                <div class="mb-4 flex text-2xl">
                                    <label class="w-1/3 font-semibold">Materia ID:</label>
                                    <div class="w-2/3">
                                        <select class="w-full rounded bg-gray-700 border-gray-300 -translate-x-10" name="subjectId" id="subjectId" v-model="clase.subjectCode" :disabled="mode === 1 || mode === 3">
                                            <option v-for="subject in subjects" :key="subject.code" :value="subject.code">
                                                {{ subject.code }}
                                            </option>
                                            </select>
                                    </div>
                                </div>
                                <div class="mb-4 flex text-2xl">
                                    <label class="w-1/3 font-semibold">Fecha Inicio:</label>
                                    <div class="w-2/3">
                                        <input
  :value="formatDate(clase.startDate)"
  @input="onStartDateInput"
  :disabled="mode === 1 || mode === 3"
  class="form-input w-full rounded border-gray-300 -translate-x-10"
  type="date"
  required
/>
                                </div>
                                </div>
                                <div class="mb-4 flex text-2xl" v-if="mode === 1">
                                    <label class="w-1/3 font-semibold">Fecha Fin:</label>
                                    <div class="w-2/3">
                                        <input
  :value="formatDate(clase.endDate)"
  @input="onEndDateInput"
  :disabled="mode === 1"
  class="form-input w-full rounded border-gray-300 -translate-x-10"
  type="date"
  required
/>
                                    </div>
                                </div>
                                <div class="mb-4 flex text-2xl">
                                    <label class="w-1/3 font-semibold">Total Horas:</label>
                                    <div class="w-2/3">
                                        <input :value="clase.schedule?.totalHours ?? 0"
                                            @input="onTotalHoursInput($event)" :disabled="mode === 1" type="number"
                                            min="1" class="form-input w-full rounded border-gray-300 -translate-x-10"
                                            placeholder="Total de horas" required />
                                    </div>
                                </div>
                                <div class="mb-4 flex flex-col text-2xl">
                                    <label class="font-semibold mb-2">Sesiones:</label>
                                    <div
                                        v-for="(session, idx) in clase.schedule?.sessions"
                                        :key="idx"
                                        class="flex items-center gap-4 mb-2"
                                    >
                                        <!-- Día de la semana -->
                                        <select
                                            :disabled="mode === 1"
                                            v-model.number="session.weekday"
                                            class="form-select rounded"
                                            required
                                        >
                                            <option disabled class="text-black text-center bg-sky-500" value="">Día</option>
                                            <option class="bg-gray-700 text-center" v-for="(dia, i) in diasSemana" :key="i" :value="i + 1">{{ dia }}</option>
                                        </select>
                                        <!-- Horario -->
                                        <input
                                            :disabled="mode === 1"
                                            v-model="session.timeSlot"
                                            class="form-input rounded border-gray-300"
                                            placeholder="Ej: 08:00-10:00"
                                            required
                                        />
                                        <!-- Botón eliminar sesión -->
                                        <button
                                            v-if="mode !== 1"
                                            type="button"
                                            class="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded"
                                            @click="removeSession(idx)"
                                        >X</button>
                                    </div>
                                    <!-- Botón agregar sesión -->
                                    <button
                                        v-if="mode !== 1"
                                        type="button"
                                        class="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-1 rounded mt-2"
                                        @click="addSession"
                                    >Agregar sesión</button>
                                </div>
                                <div class="flex justify-end-safe gap-4 mt-6 translate-y-6">
                                    <button v-if="mode === 1" type="button"
                                        class="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-8 rounded -translate-y-4"
                                        @click="returnList()">Regresar</button>
                                    <button v-if="mode === 2" type="submit"
                                        class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-8 rounded -translate-y-4"
                                        @click="create()">
                                        Crear
                                    </button>
                                    <button v-if="mode === 3" type="submit"
                                        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded -translate-y-4"
                                        @click="update()">
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
import type { Classes } from '@/models/Classes'
import routes from '@/router/router'
import { createClass, updateClass, getClass } from '@/services/classesService'
import { ListProfessors } from '@/services/professorService'
import { ListCampuses } from '@/services/campusService'
import { listSubjects } from '@/services/subjectsService'
import Swal from 'sweetalert2';
import type { Professor } from '@/models/Professor'
import type { Campus } from '@/models/Campus'
import type { Subject } from '@/models/Subject'



const props = defineProps<{
    mode: number // 1: visualizar, 2: crear, 3: actualizar
    classData?: Classes
    id?: string
}>()

const professors = ref<Professor[]>([]) // Lista de profesores
const campuses = ref<Campus[]>([]) // Lista de campus
const subjects = ref<Subject[]>([]) // Lista de materias
const errorMessage = ref<string>('')

const emit = defineEmits(['create', 'update'])

const clase = ref<Classes>({
    professorId: undefined,
    campusId: '',
    subjectCode: '',
    startDate: new Date(),
    endDate: new Date(),
    schedule: { totalHours: 0, sessions: [] }
})


onMounted(async () => {
    await fetchProfessor();
    await fetchCampus();
    await fetchSubjects();
    if ((props.mode === 1 || props.mode === 3) && props.id) {
        try {
            const data = await getClass(props.id);
            if (!data.schedule) {
                data.schedule = { totalHours: 0, sessions: [] }
            }
            clase.value = data;
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al cargar la clase',
                text: error instanceof Error ? error.message : 'Error desconocido',
            });
        }
    }
});

const returnList = () => {
    routes.push('/dashboard/clases');
};

watch(
    () => props.classData,
    (val) => {
        if (val) clase.value = { ...val }
    },
    { immediate: true }
)

watch(
    () => clase.value,
    (val) => {
        if (!val.schedule) {
            val.schedule = {
                totalHours: 0,
                sessions: []
            }
        }
    },
    { deep: true }
)
// función que se ejecuta al cambiar el input de total horas
function onTotalHoursInput(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    if (!clase.value.schedule) {
        clase.value.schedule = { totalHours: 0, sessions: [] };
    }
    clase.value.schedule.totalHours = value;
}

const handleSubmit = () => {
    if (props.mode === 1) {
        routes.push({ name: 'ListClasses' })
        return
    }
    if (props.mode === 2) emit('create', clase.value)
    if (props.mode === 3) emit('update', clase.value)
}


  async function create() {
    try {
        // Crea un objeto plano para enviar al backend
        const payload = {
            ...clase.value,
            startDate: formatDate(clase.value.startDate),
            endDate: formatDate(clase.value.endDate)
        };

        // @ts-ignore para ignorar el error de tipos en esta línea
        // O bien, no tipar el parámetro en el servicio
        // @ts-ignore
        await createClass(payload);

        Swal.fire({
            icon: 'success',
            title: 'Clase creada exitosamente',
            showConfirmButton: false,
            timer: 1200
        });
        emit('create', clase.value);
        setTimeout(() => {
            routes.push('/dashboard/clases');
        }, 1200);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al crear la clase',
            text: error instanceof Error ? error.message : 'Error desconocido',
        });
    }
}
async function update() {
    try {
          // Espera la respuesta del backend (debe devolver la clase actualizada, incluyendo el nuevo code si cambió)
        const updated = await updateClass(clase.value);

        // Si el backend devuelve un nuevo code, actualízalo en el frontend
        if (updated && updated.code && updated.code !== clase.value.code) {
            clase.value.code = updated.code;
        }
        await updateClass(clase.value);
        Swal.fire({
            icon: 'success',
            title: 'Clase actualizada exitosamente',
            showConfirmButton: false,
            timer: 1200
        });
        emit('update', clase.value);
        setTimeout(() => {
            routes.push('/dashboard/clases');
        }, 1200);
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error al actualizar la clase',
            text: error instanceof Error ? error.message : 'Error desconocido',
        });
    }
}

const diasSemana = [
  'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
];

function addSession() {
  if (!clase.value.schedule) clase.value.schedule = { totalHours: 0, sessions: [] };
  clase.value.schedule.sessions?.push({ weekday: 1, timeSlot: '' });
}

function removeSession(idx: number) {
  if (clase.value.schedule && Array.isArray(clase.value.schedule.sessions) && clase.value.schedule.sessions.length > 1) {
    clase.value.schedule.sessions.splice(idx, 1);
  }
}

const fetchProfessor = async () =>{
    try {
       
        const data = await ListProfessors()
        professors.value = data
        console.log(professors.value);
        
    } catch (error: any) {
    errorMessage.value = error.message
    }

}
const fetchCampus = async () =>{
    try {
        const data = await ListCampuses()
        campuses.value = data
        console.log(campuses.value);
    } catch (error: any) {
        errorMessage.value = error.message
    }
}

const fetchSubjects = async () =>{
    try {
        const data = await listSubjects()
        subjects.value = data
        console.log(subjects.value);
    } catch (error: any) {
        errorMessage.value = error.message
    }
}

function onStartDateInput(event: Event) {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    clase.value.startDate = new Date(target.value);
  }
}

function onEndDateInput(event: Event) {
  const target = event.target as HTMLInputElement | null;
  if (target) {
    clase.value.endDate = new Date(target.value);
  }
}

function formatDate(date?: Date | string): string {
  if (!date) return '';
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}


</script>
