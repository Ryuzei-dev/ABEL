import type { Payment } from "./columns"
import { columns } from "./columns"
import { DataTable } from "./data-table"

// Mock API: genera datos paginados con filtro por email
async function fetchPayments(
  page: number,
  pageSize: number,
  params: { filterValue?: string }
): Promise<{ rows: Payment[]; hasMore: boolean }> {
  // Simular latencia de red
  await new Promise((r) => setTimeout(r, 400))

  const start = page * pageSize
  const total = 200 // tamaño total simulado
  const end = Math.min(start + pageSize, total)

  // Crear filas simuladas
  let rows: Payment[] = []
  for (let i = start; i < end; i++) {
    const email = `user${i}@example.com`
    rows.push({
      id: `${i.toString(16)}-${i}`,
      amount: Math.round(Math.random() * 1000),
      status: i % 3 === 0 ? "pending" : i % 3 === 1 ? "processing" : "success",
      email,
    })
  }

  // Filtro en cliente (puedes moverlo al servidor)
  if (params.filterValue) {
    const fv = params.filterValue.toLowerCase()
    rows = rows.filter((r) => r.email.toLowerCase().includes(fv))
  }

  return { rows, hasMore: end < total }
}

export default function DemoPage() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <DataTable<Payment, unknown>
        title="Payments"
        filterLabel="Filtrar por email"
        onAdd={() => {
          console.log("Agregar elemento")
        }}
        columns={columns}
        data={[]}
        pageSize={20}
        loadMore={fetchPayments}
        filterColumn="email"
      />
    </div>
  )
}