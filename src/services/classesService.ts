//importamos el puerto del microservicio de calendarios
import { environment } from "../../environments/environment";
import { Classes } from "@/models/Classes";

// Servicio para subjects
// Este servicio se encarga de realizar la peticion de Get al microservicio de calendarios para listar los subjects o materias
export const listClasses = async (): Promise<Classes[]> => {
  const res = await fetch(`${environment.backendCalendarios}/classes`); // accede al endopindoint de subjects
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error("Error al obtener classes"); // si la respuesta no es correcta, lanzamos un error
  return await res.json(); // retornamos los classes obtenidos
};

// Este servicio se encarga de realizar la peticion de Get al microservicio de calendarios para obtener un classes con su código
export const getClass = async (code: string): Promise<Classes> => {
  // accede al endpoint de classes con el código del class
  if (!code) throw new Error("El código del class es requerido"); //acemos una validación para que el código no sea nulo
  const res = await fetch(`${environment.backendCalendarios}/classes/${code}`);
  if (!res.ok) throw new Error("Error al obtener class"); // si la respuesta no es correcta, lanzamos un error
  return await res.json(); // retornamos el class obtenido
};

// Este servicio se encarga de realizar la peticiones de Post al microservicio de calendarios para crear un nuevo class
export const createClass = async (newClass: Classes): Promise<Classes> => {
  console.log(newClass);

  // accede al endpoint de classes para crear un nuevo class
  const res = await fetch(`${environment.backendCalendarios}/classes`, {
    method: "POST", // especificamos el método POST
    // especificamos los headers y el body de la petición
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newClass),
  });
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error("Error al crear class");
  return await res.json(); // retornamos el class creado
};

export const updateClass = async (updateClass: Classes): Promise<Classes> => {
  if (
    !updateClass.professorId ||
    !updateClass.campusId ||
    !updateClass.subjectCode ||
    !updateClass.startDate
  ) {
    throw new Error("Faltan datos clave para actualizar la clase");
  }
  // Generamos un id único para el class basado en sus propiedades
  const classId = `${updateClass.professorId} - ${updateClass.campusId} - ${updateClass.subjectCode} - ${updateClass.startDate}`;
  console.log(classId);

  // accede al endpoint de classes con el id del class
  // especificamos el método PUT para actualizar el class
  const res = await fetch(`${environment.backendCalendarios}/classes/${classId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateClass),
  });
  // Si la respuesta no es correcta, lanzamos un error
  if (!res.ok) throw new Error("Error al actualizar class");
  return await res.json();
};

export const deleteClass = async (
  professorId: number,
  campusId: string,
  subjectCode: string,
  startDate: string
): Promise<{ message: string }> => {
  if (!professorId || !campusId || !subjectCode || !startDate) {
    throw new Error("Faltan datos clave para eliminar la clase");
  }
  const classId = `${professorId} - ${campusId} - ${subjectCode} - ${startDate}`;
  console.log(classId);
  const res = await fetch(`${environment.backendCalendarios}/classes/${classId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar class");
  return await res.json();
};
