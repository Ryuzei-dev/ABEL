import type { Ticket } from "@/types/ticket"

function humanDate(d: Date = new Date()): string {
  try {
    return new Intl.DateTimeFormat("es-MX", { dateStyle: "medium", timeStyle: "short" }).format(d)
  } catch {
    // Fallback simple
    return d.toLocaleString()
  }
}

let TICKETS: Ticket[] = [
  {
    id: "TCK-1001",
    titulo: "Falla en router principal",
    prioridad: "alta",
    estado: "en_progreso",
    descripcion: "Pérdida intermitente de conexión en la sucursal Centro.",
    anotaciones: "Revisar logs del router",
    fecha: humanDate(new Date(Date.now() - 1000 * 60 * 45)), // hace 45 min
  },
  {
    id: "TCK-1002",
    titulo: "AP sin respuesta",
    prioridad: "media",
    estado: "abierto",
    descripcion: "El punto de acceso del 2do piso no responde a pings.",
    anotaciones: "Verificar PoE y cableado",
    fecha: humanDate(new Date(Date.now() - 1000 * 60 * 120)), // hace 2 h
  },
  {
    id: "TCK-1003",
    titulo: "Switch con temperatura elevada",
    prioridad: "alta",
    estado: "abierto",
    descripcion: "Alertas de temperatura por encima del umbral.",
    anotaciones: "Limpiar ventilación",
    fecha: humanDate(new Date(Date.now() - 1000 * 60 * 240)), // hace 4 h
  },
  {
    id: "TCK-1004",
    titulo: "Corte de fibra en sucursal norte",
    prioridad: "alta",
    estado: "cerrado",
    descripcion: "Proveedor reporta corte; servicio restaurado",
    anotaciones: "Confirmar con NOC",
    fecha: humanDate(new Date(Date.now() - 1000 * 60 * 1440)), // ayer
  },
]

export async function listTickets(): Promise<Ticket[]> {
  await new Promise((r) => setTimeout(r, 200))
  return structuredClone(TICKETS)
}

export async function addTicket(partial: Omit<Ticket, "id" | "fecha">): Promise<Ticket> {
  await new Promise((r) => setTimeout(r, 200))
  const id = `TCK-${Math.floor(Math.random() * 9000 + 1000)}`
  const ticket: Ticket = { id, fecha: humanDate(new Date()), ...partial }
  TICKETS = [ticket, ...TICKETS]
  return ticket
}
