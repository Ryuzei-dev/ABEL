import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Historial = {
  id: string
  fecha: string
  usuario: string
  accion: string
  dispositivo: string
}

export const historialColumns: ColumnDef<Historial>[] = [
  {
    accessorKey: "fecha",
    header: "Fecha",
  },
  {
    accessorKey: "usuario",
    header: "Usuario",
  },
  {
    accessorKey: "accion",
    header: "Acción",
  },
  {
    accessorKey: "dispositivo",
    header: "Dispositivo",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const registro = row.original

      return (
        <div className="flex w-full justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(registro.id)}>
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuItem>Ver detalles</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
