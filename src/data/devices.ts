import type { Device, DeviceType } from "@/types/device"

let DEVICES: Device[] = [
  {
    id: "DEV-001",
    nombre: "Router Core",
    ip_o_dominio: "192.168.0.1",
    mac: "00:11:22:33:44:55",
    tipo: "router",
    fabricante: "Cisco",
    modelo: "ISR4451-X",
    serie: "FTX1234ABC",
  },
  {
    id: "DEV-002",
    nombre: "Switch Acceso Piso 2",
    ip_o_dominio: "sw2.local",
    mac: "AA:BB:CC:DD:EE:01",
    tipo: "switch",
    fabricante: "HPE",
    modelo: "2530-24G",
    serie: "CN1234XYZ",
  },
  {
    id: "DEV-003",
    nombre: "Servidor App",
    ip_o_dominio: "app01.local",
    mac: "AA:BB:CC:DD:EE:02",
    tipo: "servidor",
    fabricante: "Dell",
    modelo: "PowerEdge R740",
    serie: "SVR7890DEF",
  },
]

export async function listDevices(): Promise<Device[]> {
  await new Promise((r) => setTimeout(r, 200))
  return structuredClone(DEVICES)
}

export async function addDevice(partial: Omit<Device, "id">): Promise<Device> {
  await new Promise((r) => setTimeout(r, 200))
  const id = `DEV-${Math.floor(Math.random() * 900 + 100)}`
  const dev: Device = { id, ...partial }
  DEVICES = [dev, ...DEVICES]
  return dev
}

export async function removeDevice(id: string): Promise<void> {
  await new Promise((r) => setTimeout(r, 150))
  DEVICES = DEVICES.filter(d => d.id !== id)
}

export const DEVICE_TYPES: DeviceType[] = [
  "servidor",
  "switch",
  "router",
  "impresora",
  "camara_ip",
  "ap",
  "nas",
]

export async function updateDevice(id: string, patch: Partial<Omit<Device, "id">>): Promise<Device | null> {
  await new Promise((r) => setTimeout(r, 200))
  const idx = DEVICES.findIndex(d => d.id === id)
  if (idx === -1) return null
  const updated = { ...DEVICES[idx], ...patch }
  DEVICES[idx] = updated
  return structuredClone(updated)
}
