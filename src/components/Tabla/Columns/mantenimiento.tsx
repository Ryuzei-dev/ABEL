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

export type Mantenimiento = {
  id: string
  equipo: string
  tipo: string
  fechaProgramada: string
  estado: string
  tecnico: string
}

export const mantenimientoColumns: ColumnDef<Mantenimiento>[] = [
  {
    accessorKey: "equipo",
    header: "Equipo",
  },
  {
    accessorKey: "tipo",
    header: "Tipo",
  },
  {
    accessorKey: "fechaProgramada",
    header: "Fecha Programada",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
  {
    accessorKey: "tecnico",
    header: "Técnico",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

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
              <DropdownMenuItem onClick={() => console.log("Ver detalles", item.id)}>
                Ver detalles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Editar", item.id)}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Completar", item.id)}>
                Marcar como completado
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600"
                onClick={() => console.log("Cancelar", item.id)}
              >
                Cancelar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
