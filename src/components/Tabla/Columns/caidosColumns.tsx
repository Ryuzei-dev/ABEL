import type { ColumnDef } from "@tanstack/react-table"

export type Caidos = {
  id: string
  name: string
  status: "active" | "inactive" | "down"
  ip: string
  lastSeen: string
}

export const caidosColumns: ColumnDef<Caidos>[] = [
  {
    accessorKey: "name",
    header: "Nombre del dispositivo",
  },
  {
    accessorKey: "ip",
    header: "IP",
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const value = row.original.status
      const isActive = value === "active"
      // Considerar "down" como inactivo
      const inactive = value === "inactive" || value === "down"
      const label = isActive ? "Activo" : inactive ? "Inactivo" : String(value)
      const base = "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border"
      const cls = isActive
        ? `${base} text-emerald-400 border-emerald-500/60 bg-emerald-500/10`
        : `${base} text-red-400 border-red-500/60 bg-red-500/10`
      return <span className={cls}>{label}</span>
    },
  },
  {
    accessorKey: "lastSeen",
    header: "Última revisión",
  },
]
