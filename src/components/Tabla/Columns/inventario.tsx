import type { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react"

export type Inventario = {
  id: string
  nombre: string
  ip_o_dominio: string
  mac: string
  tipo: string
  fabricante: string
  modelo: string
  serie: string
}

export function createInventarioColumns(handlers?: {
  onEdit?: (row: Inventario) => void
  onDelete?: (row: Inventario) => void
}): ColumnDef<Inventario>[] {
  return [
    { accessorKey: "nombre", header: "Nombre del dispositivo" },
    { accessorKey: "ip_o_dominio", header: "Dirección IP / dominio" },
    { accessorKey: "mac", header: "Dirección MAC" },
    { accessorKey: "tipo", header: "Tipo" },
    { accessorKey: "fabricante", header: "Fabricante / marca" },
    { accessorKey: "modelo", header: "Modelo" },
    { accessorKey: "serie", header: "Número de serie" },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/20 hover:bg-accent"
            aria-label="Editar"
            onClick={() => handlers?.onEdit?.(row.original)}
          >
            <Pencil className="size-4" />
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/20 hover:bg-accent"
            aria-label="Eliminar"
            onClick={() => handlers?.onDelete?.(row.original)}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ),
    },
  ]
}

// Backward compatibility (no-op handlers)
export const inventarioColumns: ColumnDef<Inventario>[] = createInventarioColumns()
