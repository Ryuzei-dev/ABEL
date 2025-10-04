export type DeviceType =
  | "servidor"
  | "switch"
  | "router"
  | "impresora"
  | "camara_ip"
  | "ap"
  | "nas"

export type Device = {
  id: string
  nombre: string
  ip_o_dominio: string
  mac: string
  tipo: DeviceType
  fabricante: string
  modelo: string
  serie: string
}
