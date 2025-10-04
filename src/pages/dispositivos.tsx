import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { DataTable } from "@/components/Tabla/data-table";
import { createInventarioColumns } from "@/components/Tabla/Columns/inventario";
import type { Inventario } from "@/components/Tabla/Columns/inventario";
import FormDialog from "@/components/form/formDialog";
import type { FormField } from "@/types/form";
import { listDevices, addDevice, updateDevice, DEVICE_TYPES } from "@/data/devices";
import { Button } from "@/components/ui/button";

export default function Dispositivos() {
  const [devices, setDevices] = useState<Inventario[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Inventario | null>(null)
  const [fTipo, setFTipo] = useState<string>("")
  const [fFabricante, setFFabricante] = useState<string>("")

  useEffect(() => {
    listDevices().then(setDevices as any)
  }, [])

  const filtered = useMemo(() => {
    return devices.filter(d =>
      (fTipo ? d.tipo === fTipo : true) &&
      (fFabricante ? d.fabricante.toLowerCase().includes(fFabricante.toLowerCase()) : true)
    )
  }, [devices, fTipo, fFabricante])

  const fields: FormField[] = [
    { name: "nombre", label: "Nombre del dispositivo", type: "text", required: true, placeholder: "Ej. Router Core" },
    { name: "ip_o_dominio", label: "Dirección IP / dominio", type: "text", required: true, placeholder: "Ej. 192.168.0.1 o host.local" },
    { name: "mac", label: "Dirección MAC", type: "text", required: true, placeholder: "00:11:22:33:44:55" },
    { name: "tipo", label: "Tipo", type: "select", required: true, options: DEVICE_TYPES.map(t => ({ label: t.replace("_", " "), value: t })) },
    { name: "fabricante", label: "Fabricante / marca", type: "text", required: true, placeholder: "Ej. Cisco" },
    { name: "modelo", label: "Modelo", type: "text", required: true, placeholder: "Ej. ISR4451-X" },
    { name: "serie", label: "Número de serie", type: "text", required: true, placeholder: "Ej. FTX1234ABC" },
  ]

  const columns = useMemo(() => createInventarioColumns({
    onEdit: (row) => { setEditing(row); setOpen(true) },
    onDelete: () => { /* opcional: implementar removeDevice más adelante */ },
  }), [])

  const filterMenu = (
    <div className="grid gap-4 p-4 min-w-64 text-sm">
      <div className="grid gap-2">
        <label className="text-sm font-medium text-foreground/90">Tipo</label>
        <select
          value={fTipo}
          onChange={(e) => setFTipo(e.target.value)}
          className="h-9 rounded-md border border-border bg-secondary px-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <option value="">Todos</option>
          {DEVICE_TYPES.map(t => (
            <option key={t} value={t}>{t.replace("_"," ")}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-foreground/90">Fabricante</label>
        <input
          value={fFabricante}
          onChange={(e) => setFFabricante(e.target.value)}
          placeholder="Ej. Cisco"
          className="h-9 rounded-md border border-border bg-secondary px-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" className="h-8" onClick={() => { setFTipo(""); setFFabricante("") }}>Limpiar</Button>
        <Button className="h-8" onClick={() => undefined}>Aplicar</Button>
      </div>
    </div>
  )

  return (
    <Wrapper>
      <WrapperTable>
        <DataTable
            title="Inventario de red"
            filterLabel="Filtrar por nombre"
            onAdd={() => setOpen(true)}
            columns={columns}
            data={filtered}
            filterColumn="nombre"
            filterMenu={filterMenu}
        />
      </WrapperTable>

      <FormDialog
        title={editing ? "Editar dispositivo" : "Agregar dispositivo"}
        description="Captura los datos del activo de red"
        open={open}
        onOpenChange={(v) => { setOpen(v); if (!v) setEditing(null) }}
        submitLabel={editing ? "Guardar" : "Agregar"}
        statusLabel={editing ? "Editando" : "Creando"}
        fields={fields}
        initialValues={editing ?? undefined}
        onSubmit={async (values) => {
          if (editing) {
            await updateDevice(editing.id, values as any)
          } else {
            await addDevice(values as any)
          }
          const list = await listDevices()
          setDevices(list as any)
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    height: 100%;
    padding: 1.5rem;
    flex-direction: column;
    flex: 1;
`;

const WrapperTable = styled.div`
  width: 100%;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.text};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
`;
