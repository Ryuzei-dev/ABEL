import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Conectado = {
  id: string
  nombre: string
  status: "active" | "inactive"
  ip: string
  ultimaConexion: string
}

export const conectadosColumns: ColumnDef<Conectado>[] = [
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nombre
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "ip",
    header: "IP",
  },
  {
    accessorKey: "ultimaConexion",
    header: "Última conexión",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const dispositivo = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(dispositivo.id)}>
                Copiar ID del dispositivo
              </DropdownMenuItem>
              <DropdownMenuItem>Ver detalles</DropdownMenuItem>
              <DropdownMenuItem>Desconectar dispositivo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
 