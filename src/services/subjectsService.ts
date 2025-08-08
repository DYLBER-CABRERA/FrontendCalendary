
//importamos el puerto del microservicio de calendarios
import { environment } from '../../environments/environment'
import { Subject } from '@/models/Subject'

// Servicio para subjects
// Este servicio se encarga de realizar la peticion de Get al microservicio de calendarios para listar los subjects o materias
export const listSubjects = async (): Promise<Subject[]> => {
  const res = await fetch(`${environment.backendCalendarios}/subjects`) // accede al endopindoint de subjects
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error('Error al obtener subjects') // si la respuesta no es correcta, lanzamos un error
  return await res.json()// retornamos los subjects obtenidos
}

// Este servicio se encarga de realizar la peticion de Get al microservicio de calendarios para obtener un subjects con su código
export const getSubject = async (code: string): Promise<Subject> => {
    // accede al endpoint de subjects con el código del subject
  if (!code) throw new Error('El código del subject es requerido') //acemos una validación para que el código no sea nulo
  const res = await fetch(`${environment.backendCalendarios}/subjects/${code}`)
  if (!res.ok) throw new Error('Error al obtener subject')// si la respuesta no es correcta, lanzamos un error
  return await res.json()// retornamos el subject obtenido
}

// Este servicio se encarga de realizar la peticiones de Post al microservicio de calendarios para crear un nuevo subject
export const createSubject = async (subject: Subject): Promise<Subject> => {
    // accede al endpoint de subjects para crear un nuevo subject
  const res = await fetch(`${environment.backendCalendarios}/subjects`, {
    method: 'POST',// especificamos el método POST
    // especificamos los headers y el body de la petición
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subject)
  })
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error('Error al crear subject')
  return await res.json()// retornamos el subject creado
}

export const updateSubject = async (subject: Subject): Promise<Subject> => {
    // accede al endpoint de subjects para actualizar un subject existente
  if (!subject.code) throw new Error('El código del subject es requerido') // hacemos una validación para que el código no sea nulo
  if (!subject) throw new Error('El subject es requerido') // hacemos una validación
  const res = await fetch(`${environment.backendCalendarios}/subjects/${subject.code}`, {
    method: 'PUT',// especificamos el método PUT
    // especificamos los headers y el body de la petición
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subject)
  })
    // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error('Error al actualizar subject')
  return await res.json()// retornamos el subject actualizado
}

export const deleteSubject = async (code: string): Promise<{ message: string }> => {
    if (!code) throw new Error('El código del subject es requerido') // hacemos una validación para que el código no sea nulo
  // accede al endpoint de subjects para eliminar un subject con su código
    const res = await fetch(`${environment.backendCalendarios}/subjects/${code}`, {
    method: 'DELETE'   // especificamos el método DELETE
  })
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error('Error al eliminar subject')
  return await res.json()// retornamos el subject eliminado
}