 export class Subject {
  code?: string;
  name?: string;
  totalHours?: number;
  credits?: number;
  createdAt?: string;
  updatedAt?: string;
  classes?: any[]; // Referencia a clases asociadas a la materia
}
