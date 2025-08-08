
//importamos el puerto del microservicio de calendarios
import { environment } from '../../environments/environment'
import { Professor } from '@/models/Professor'

// Servicio para professor
// Este servicio se encarga de realizar la peticion de Get al microservicio de calendarios para listar los professor o materias
export const ListProfessors = async (): Promise<Professor[]> => {
  const res = await fetch(`${environment.backendCalendarios}/professors`) // accede al endopindoint de professor
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error('Error al obtener profesores') // si la respuesta no es correcta, lanzamos un error
  return await res.json()// retornamos los professor obtenidos
}

// Este servicio se encarga de realizar la peticion de Get al microservicio de calendarios para obtener un professor con su código
export const getProfessor = async (code: number): Promise<Professor> => {
    // accede al endpoint de professor con el código del professor
  if (!code) throw new Error('El código del professor es requerido') //acemos una validación para que el código no sea nulo
  const res = await fetch(`${environment.backendCalendarios}/professors/${code}`)
  if (!res.ok) throw new Error('Error al obtener professor')// si la respuesta no es correcta, lanzamos un error
  return await res.json()// retornamos el professor obtenido
}

// Este servicio se encarga de realizar la peticiones de Post al microservicio de calendarios para crear un nuevo professor
export const createProfessor = async (professor: Professor): Promise<Professor> => {
    // accede al endpoint de professor para crear un nuevo professor    
  const res = await fetch(`${environment.backendCalendarios}/professors`, {
    method: 'POST',// especificamos el método POST
    // especificamos los headers y el body de la petición
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(professor)
  })
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error('Error al crear professor')
  return await res.json()// retornamos el professor creado
}

export const updateProfessor = async (professor: Professor): Promise<Professor> => {
    // accede al endpoint de professor para actualizar un professor existente
  if (!professor.cedula) throw new Error('El código del professor es requerido') // hacemos una validación para que el código no sea nulo
  if (!professor) throw new Error('El professor es requerido') // hacemos una validación
  const res = await fetch(`${environment.backendCalendarios}/professors/${professor.cedula}`, {
    method: 'PUT',// especificamos el método PUT
    // especificamos los headers y el body de la petición
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(professor)
  })
    // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error('Error al actualizar professor')
  return await res.json()// retornamos el professor actualizado
}

export const deleteProfessor = async (cedula: number): Promise<{ message: string }> => {
    if (!cedula) throw new Error('El código del professor es requerido') // hacemos una validación para que el código no sea nulo
  // accede al endpoint de professor para eliminar un professor con su código
    const res = await fetch(`${environment.backendCalendarios}/professors/${cedula}`, {
    method: 'DELETE'   // especificamos el método DELETE
  })
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error('Error al eliminar professor')
  return await res.json()// retornamos el professor eliminado
}