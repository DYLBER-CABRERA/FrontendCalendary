
//importamos el puerto del microservicio de calendarios
import { environment } from '../../environments/environment'
import { Campus } from '@/models/Campus'

// Servicio para campus
// Este servicio se encarga de realizar la peticion de Get al microservicio de calendarios para listar los campus
export const ListCampuses = async (): Promise<Campus[]> => {
  const res = await fetch(`${environment.backendCalendarios}/campus`) // accede al endopindoint de campus
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error('Error al obtener campus') // si la respuesta no es correcta, lanzamos un error
  return await res.json()// retornamos los campus obtenidos
}

// Este servicio se encarga de realizar la peticion de Get al microservicio de calendarios para obtener un campus con su código
export const getCampus = async (code: string): Promise<Campus> => {
    // accede al endpoint de campus con el código del campus
  if (!code) throw new Error('El código del campus es requerido') //acemos una validación para que el código no sea nulo
  const res = await fetch(`${environment.backendCalendarios}/campus/${code}`)
  if (!res.ok) throw new Error('Error al obtener campus')// si la respuesta no es correcta, lanzamos un error
  return await res.json()// retornamos el campus obtenido
}

// Este servicio se encarga de realizar la peticiones de Post al microservicio de calendarios para crear un nuevo campus
export const createCampus = async (campus: Campus): Promise<Campus> => {
    // accede al endpoint de campus para crear un nuevo campus
  const res = await fetch(`${environment.backendCalendarios}/campus`, {
    method: 'POST',// especificamos el método POST
    // especificamos los headers y el body de la petición
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(campus)
  })
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error('Error al crear campus')
  return await res.json()// retornamos el campus creado
}

export const updateCampus = async (campus: Campus): Promise<Campus> => {
    // accede al endpoint de campus para actualizar un campus existente
  if (!campus.code) throw new Error('El código del campus es requerido') // hacemos una validación para que el código no sea nulo
  if (!campus) throw new Error('El campus es requerido') // hacemos una validación
  const res = await fetch(`${environment.backendCalendarios}/campus/${campus.code}`, {
    method: 'PUT',// especificamos el método PUT
    // especificamos los headers y el body de la petición
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(campus)
  })
    // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error('Error al actualizar campus')
  return await res.json()// retornamos el campus actualizado
}

export const deleteCampus = async (code: string): Promise<{ message: string }> => {
    if (!code) throw new Error('El código del campus es requerido') // hacemos una validación para que el código no sea nulo
  // accede al endpoint de campus para eliminar un campus con su código
    const res = await fetch(`${environment.backendCalendarios}/campus/${code}`, {
    method: 'DELETE'   // especificamos el método DELETE
  })
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error('Error al eliminar campus')
  return await res.json()// retornamos el campus eliminado
}