import * as React from "react"
import type { ColumnDef, SortingState, ColumnFiltersState, VisibilityState } from "@tanstack/react-table"
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,

} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Filter, FileUp, FileDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import styled from "styled-components"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title?: string
  filterLabel?: string
  onAdd?: () => void
  filterColumn?: string // Columna por defecto para filtrar
  /**
   * Si se provee, el DataTable activa scroll infinito con carga perezosa.
   * Debe devolver filas para la página solicitada y si hay más por cargar.
   */
  loadMore?: (
    page: number,
    pageSize: number,
    params: { filterValue?: string }
  ) => Promise<{ rows: TData[]; hasMore: boolean }>
  /** Tamaño de página para lazy load (por defecto 20) */
  pageSize?: number
  /** Contenido del menú de filtros; si se define, aparece botón "Filtros" */
  filterMenu?: React.ReactNode
  /** Muestra/oculta acciones (toggler columnas, +Agregar, Filtros). Por defecto true. */
  showActions?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title = "Data",
  filterLabel = "Buscar",
  onAdd,
  filterColumn = "nombre", // Valor por defecto: filtrar por columna 'nombre'
  loadMore,
  pageSize = 20,
  filterMenu,
  showActions = true,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  // Estado para lazy load
  const [items, setItems] = React.useState<TData[]>([])
  const [page, setPage] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true)
  const sentinelRef = React.useRef<HTMLDivElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  const table = useReactTable({
    data: loadMore ? items : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(loadMore ? {} : { getPaginationRowModel: getPaginationRowModel() }),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  // Cargar una página (lazy)
  const loadNextPage = React.useCallback(async () => {
    if (!loadMore || loading || !hasMore) return
    setLoading(true)
    try {
      const filterValue = (table.getColumn(filterColumn)?.getFilterValue() as string) ?? undefined
      const res = await loadMore(page, pageSize, { filterValue })
      setItems(prev => [...prev, ...res.rows])
      setPage(prev => prev + 1)
      setHasMore(res.hasMore)
    } finally {
      setLoading(false)
    }
  }, [loadMore, loading, hasMore, page, pageSize, table, filterColumn])

  // Reset y carga inicial cuando activamos lazy o cambia el filtro
  React.useEffect(() => {
    if (!loadMore) return
    setItems([])
    setPage(0)
    setHasMore(true)
    setLoading(false)
    // Cargar primera página
    loadNextPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMore, filterColumn, (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""]) // reinicia ante cambio de filtro

  // IntersectionObserver para el sentinel
  React.useEffect(() => {
    if (!loadMore) return
    const node = sentinelRef.current
    const rootEl = containerRef.current
    if (!node) return
    const obs = new IntersectionObserver((entries) => {
      const first = entries[0]
      if (first.isIntersecting) {
        loadNextPage()
      }
    }, { root: rootEl ?? null, rootMargin: "200px", threshold: 0 })
    if (node) obs.observe(node)
    return () => {
      obs.disconnect()
    }
  }, [loadMore, loadNextPage])

  return (
    <Wrapper>
      <Title>{title}</Title>
      <ActionsBar>
        <div className="flex items-center w-full gap-2">
          <Input
            placeholder={filterLabel}
            value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(filterColumn)?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
        </div>
        {showActions && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Mostrar/ocultar columnas
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .filter((column) => column.id !== "actions")
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" className="ml-2 inline-flex items-center gap-2">
              <FileUp className="size-4" />
              Cargar Excel
            </Button>
            <Button variant="outline" className="ml-2 inline-flex items-center gap-2">
              <FileDown className="size-4" />
              Generar Excel
            </Button>
            {onAdd && (
              <Button variant="outline" className="ml-2" onClick={onAdd}>
                +Agregar
              </Button>
            )}
            {filterMenu && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-2 inline-flex items-center gap-2">
                    <Filter className="size-4" />
                    Filtros
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">{filterMenu}</DropdownMenuContent>
              </DropdownMenu>
            )}
          </>
        )}
      </ActionsBar>
      <WrapperTable ref={containerRef}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {loadMore && (
          <div ref={sentinelRef} style={{ padding: "0.75rem", textAlign: "center" }}>
            {loading ? "Cargando..." : hasMore ? "" : "No hay más resultados"}
          </div>
        )}
      </WrapperTable>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

const FilterLabel = styled.span`
  color: ${(p) => p.theme.colors.textSecondary};
  font-size: ${(p) => p.theme.fontSizes.sm};
`;
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(p) => p.theme.colors.text};
  margin: 0;
`;

const ActionsBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  align-items: center;
  gap: 0.75rem;
  
  /* Style the search input (shadcn input uses data-slot="input") */
  input[data-slot="input"] {
    background: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.text};
    border-color: ${(p) => p.theme.colors.border};
    border-radius: ${(p) => p.theme.borderRadius.md};
  }
  input[data-slot="input"]::placeholder {
    color: ${(p) => p.theme.colors.textSecondary};
  }
  
  /* Button styles removed to prevent affecting dropdown menu */
`;

const WrapperTable = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  overflow: hidden;
  flex: 1;
  
  /* Scrollable body with sticky header */
  max-height: 28rem; /* make panel scroll if long */
  overflow: auto;

  /* Table theming */
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: ${(p) => p.theme.colors.primary};
    color: ${(p) => p.theme.colors.text};
  }

  thead tr th {
    background: ${(p) => p.theme.colors.secondary};
    color: ${(p) => p.theme.colors.text};
    font-weight: ${(p) => p.theme.fontWeights.medium};
    padding: 0.5rem 0.75rem; /* compact */
    border-bottom: 1px solid ${(p) => p.theme.colors.border};
    position: sticky;
    top: 0;
    z-index: 2;
  }
  /* sort button inside header (e.g., Email) */
  thead tr th button {
    color: ${(p) => p.theme.colors.text};
  }
  thead tr th button:hover {
    background: ${(p) => p.theme.colors.placeholder}26; /* ~15% */
  }
  thead tr th:first-child {
    border-top-left-radius: ${(p) => p.theme.borderRadius.md};
  }
  thead tr th:last-child {
    border-top-right-radius: ${(p) => p.theme.borderRadius.md};
  }

  tbody tr {
    transition: background 0.15s ease;
  }
  tbody tr:nth-child(odd) {
    background: ${(p) => p.theme.colors.placeholder}10; /* ~6% */
  }
  tbody tr:hover {
    background: ${(p) => p.theme.colors.placeholder}1A; /* ~10% */
  }
  tbody td {
    padding: 0.5rem 0.75rem; /* compact */
    border-top: 1px solid ${(p) => p.theme.colors.border};
  }

  /* subtle scrollbars inside table body if needed */
  tbody {
    scrollbar-width: thin;
  }
`;