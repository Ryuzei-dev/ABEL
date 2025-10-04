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

export type AnchoBanda = {
  id: string
  nombre: string
  velocidad: string
  consumo: string
  fechaRegistro: string
}

export const anchoBandaColumns: ColumnDef<AnchoBanda>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "velocidad",
    header: "Velocidad",
  },
  {
    accessorKey: "consumo",
    header: "Consumo Actual",
  },
  {
    accessorKey: "fechaRegistro",
    header: "Fecha de Registro",
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
              <DropdownMenuItem onClick={() => console.log("Eliminar", item.id)}>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
