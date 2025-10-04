export type Ticket = {
  id: string
  titulo: string
  prioridad: "baja" | "media" | "alta"
  estado: "abierto" | "en_progreso" | "cerrado"
  descripcion: string
  anotaciones?: string
  fecha: string // ISO string
}
