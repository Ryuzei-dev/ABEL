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

export type UsuarioRol = {
  id: string
  nombre: string
  email: string
  rol: "Administrador" | "Técnico" | "Operador" | "Visitante"
  estado: "activo" | "inactivo"
}

export const usuariosRolColumns: ColumnDef<UsuarioRol>[] = [
  {
    accessorKey: "nombre",
    header: "Nombre",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "rol",
    header: "Rol",
    cell: ({ row }) => {
      const rol = row.original.rol
      let color = "text-gray-500"
      if (rol === "Administrador") color = "text-red-600"
      else if (rol === "Técnico") color = "text-blue-600"
      else if (rol === "Operador") color = "text-yellow-600"
      else if (rol === "Visitante") color = "text-gray-400"

      return <span className={color}>{rol}</span>
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.original.estado
      return (
        <span className={estado === "activo" ? "text-green-600" : "text-gray-500"}>
          {estado}
        </span>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const usuario = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(usuario.id)}>
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuItem>Editar usuario</DropdownMenuItem>
              <DropdownMenuItem>Desactivar usuario</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]
