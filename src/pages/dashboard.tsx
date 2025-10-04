import styled from "styled-components";
import { useMemo, useState, useEffect } from "react";
import KPICard from "../components/pagesComps/Inicio/KPICard";
import { FiServer, FiWifi, FiActivity } from "react-icons/fi";
import Ticket from "../components/pagesComps/Inicio/Ticket";
import SelectComponent from "../components/form/Select";
import Input from "../components/form/Input";
import { DataTable } from "@/components/Tabla/data-table"
import type {Caidos} from "@/components/Tabla/Columns/caidosColumns"
import { caidosColumns } from "@/components/Tabla/Columns/caidosColumns"
import { Button } from "@/components/ui/button";
import FormDialog from "@/components/form/formDialog";
import type { FormField } from "@/types/form";
import type { Ticket as TicketType } from "@/types/ticket";
import { listTickets, addTicket } from "@/data/tickets";

export default function Dashboard() {

    function getDataCaidos(): Caidos[] {
        // Fetch data from your API here.
        return [
            {
                id: "728ed52f",
                name: "Router Centro",
                status: "down",
                ip: "192.168.1.1",
                lastSeen: "2025-09-21 10:05",
            }, 
        ]
    }

    const KPICardsInfo = [
        {
            titulo: "Dispositivos caídos",
            valor: 152,
            subtitulo: "Últimas 24 horas",
            icono: <FiServer size={22} />,
        },
        {
            titulo: "Dispositivos conectados",
            valor: 8240,
            subtitulo: "Actualmente en línea",
            icono: <FiWifi size={22} />,
        },
        {
            titulo: "Tickets abiertos",
            valor: 1247,
            subtitulo: "En seguimiento",
            icono: <FiActivity size={22} />,
        },
    ];

    const [tickets, setTickets] = useState<TicketType[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);

    useEffect(() => {
        listTickets().then(setTickets);
    }, []);



    // Estado UI: filtros, carga y paginación
    const [filtroSeveridad, setFiltroSeveridad] = useState<"todas" | "baja" | "media" | "alta">("todas");
    const [filtroEstado, setFiltroEstado] = useState<"todos" | "abierto" | "en_progreso" | "cerrado">("todos");
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(5);
    const [busquedaTitulo, setBusquedaTitulo] = useState("");

    const ticketFields: FormField[] = [
        { name: "titulo", label: "Título", type: "text", placeholder: "Título del ticket", required: true },
        {
            name: "prioridad",
            label: "Prioridad",
            type: "select",
            required: true,
            options: [
                { label: "Baja", value: "baja" },
                { label: "Media", value: "media" },
                { label: "Alta", value: "alta" },
            ],
        },
        { name: "descripcion", label: "Descripción", type: "textarea", placeholder: "Describe el problema", required: true },
        { name: "anotaciones", label: "Anotaciones", type: "textarea", placeholder: "Notas internas (opcional)" },
        { name: "fecha", label: "Fecha", type: "hidden", helperText: "Se asigna automáticamente" },
    ];

    const severidadItems = [
        { value: "todas", label: "Todas" },
        { value: "alta", label: "Alta" },
        { value: "media", label: "Media" },
        { value: "baja", label: "Baja" },
    ];

    const estadoItems = [
        { value: "todos", label: "Todos" },
        { value: "abierto", label: "Abierto" },
        { value: "en_progreso", label: "En progreso" },
        { value: "cerrado", label: "Cerrado" },
    ];

    const filteredTickets = useMemo(() => {
        return tickets.filter((t) => {
            const okSev = filtroSeveridad === "todas" || t.prioridad === filtroSeveridad;
            const okEst = filtroEstado === "todos" || t.estado === filtroEstado;
            const okTitle = busquedaTitulo.trim().length === 0 || t.titulo.toLowerCase().includes(busquedaTitulo.toLowerCase());
            return okSev && okEst && okTitle;
        });
    }, [tickets, filtroSeveridad, filtroEstado, busquedaTitulo]);

    const visibleTickets = useMemo(() => filteredTickets.slice(0, visible), [filteredTickets, visible]);

    function handleLoadMore() {
        setLoading(true);
        setTimeout(() => {
            setVisible((v) => v + 5);
            setLoading(false);
        }, 500);
    }

    function handleFiltroSeveridad(value: string) {
        setFiltroSeveridad(value as any);
        setVisible(5);
    }

    function handleFiltroEstado(value: string) {
        setFiltroEstado(value as any);
        setVisible(5);
    }

    const caidos = getDataCaidos();
    return (
        <Wrapper>
            <Column>
                <WrapperCards>
                    {KPICardsInfo.map((item) => (
                        <KPICard key={item.titulo} {...item} />
                    ))}
                </WrapperCards>
                <TableSection>
                    <DataTable
                        title="Estado de los dispositivos"
                        filterLabel="Filtrar por nombre"
                        columns={caidosColumns}
                        data={caidos}
                        filterColumn="name"
                        showActions={false}
                    />
                </TableSection>
            </Column>
            <Column style={{ width: '40%' }}>
                <WrapperTicket>
                    <WrapperTicketHeader>
                        <TicketTitle>Tickets pendientes</TicketTitle>
                    </WrapperTicketHeader>
                    <FilterSearchRow>
                        <Input
                            placeholder="Filtrar por título..."
                            value={busquedaTitulo}
                            onChange={(e) => setBusquedaTitulo(e.target.value)}
                        />
                        <Button className="h-[100%]" onClick={() => setDialogOpen(true)}>+Agregar</Button>
                    </FilterSearchRow>
                    <FiltersBar>
                        <FilterGroup>
                            <FiterColumn>
                                <Label>Prioridad:</Label>
                                <SelectComponent
                                    placeholder="Prioridad"
                                    items={severidadItems}
                                    value={filtroSeveridad}
                                    onValueChange={handleFiltroSeveridad}
                                    className="min-w-[9rem]"
                                />
                            </FiterColumn>
                            <FiterColumn>
                                <Label>Estado:</Label>
                                <SelectComponent
                                    placeholder="Estado"
                                    items={estadoItems}
                                    value={filtroEstado}
                                    onValueChange={handleFiltroEstado}
                                    className="min-w-[9rem]"
                                />
                            </FiterColumn>
                        </FilterGroup>
                    </FiltersBar>
                    <TicketList>
                        {loading && <Loader>Cargando…</Loader>}
                        {!loading && visibleTickets.length === 0 && (
                            <EmptyState>No hay tickets que coincidan con los filtros.</EmptyState>
                        )}
                        {!loading && visibleTickets.map((t) => (
                            <Ticket key={t.id} {...(t as any)} />
                        ))}
                    </TicketList>
                    {!loading && filteredTickets.length > visible && (
                        <FooterBar>
                            <LoadMoreButton onClick={handleLoadMore}>Cargar más</LoadMoreButton>
                        </FooterBar>
                    )}
                    <FormDialog
                        title="Nuevo ticket"
                        description="Captura la información del ticket"
                        open={dialogOpen}
                        onOpenChange={setDialogOpen}
                        submitLabel="Crear"
                        fields={ticketFields}
                        onSubmit={async (values) => {
                            await addTicket({
                                titulo: values.titulo,
                                prioridad: values.prioridad as any,
                                estado: "abierto",
                                descripcion: values.descripcion,
                                anotaciones: values.anotaciones,
                            });
                            const list = await listTickets();
                            setTickets(list);
                        }}
                    />
                </WrapperTicket>
            </Column>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 1.5rem;
    padding: 1.5rem;
`;

const FilterSearchRow = styled.div`
    display: flex;
    width: 100%;
    gap: 0.5rem;
`;

const Column = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const WrapperCards = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 8rem;
    gap: 1.5rem;
    border-radius: ${(props) => props.theme.borderRadius.md};
`;

const WrapperTicket = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 1rem;
    padding: 1rem;
    border-radius: ${(props) => props.theme.borderRadius.md};
    background: ${(props) => props.theme.colors.secondary};
    border: 1px solid ${(props) => props.theme.colors.border};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
`;

const WrapperTicketHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    position: sticky;
    top: 0;
    z-index: 1;
    background: ${(props) => props.theme.colors.secondary};
`;

const TicketTitle = styled.h2`
    margin: 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.text};
`;

const TicketList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    flex: 1;
    min-height: 0; /* allow scroll within parent */
    overflow-y: auto;
    padding-right: 0.25rem; /* spacing for scrollbar */
`;

const FiltersBar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    flex-wrap: wrap;
`;

const FilterGroup = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${(props) => props.theme.colors.textSecondary};
`;

const FiterColumn = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;

const Label = styled.label`
    margin: 0;
    font-size: ${(props) => props.theme.fontSizes.md};
    font-weight: ${(props) => props.theme.fontWeights.medium};
    color: ${(props) => props.theme.colors.text};
`;

const Loader = styled.div`
    padding: 0.75rem;
    text-align: center;
    color: ${(props) => props.theme.colors.textSecondary};
`;

const EmptyState = styled.div`
    padding: 1rem;
    text-align: center;
    color: ${(props) => props.theme.colors.textSecondary};
    border: 1px dashed ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
`;

const FooterBar = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 0.5rem;
`;


const LoadMoreButton = styled.button`
    padding: 0.5rem 0.9rem;
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.borderRadius.md};
    background: ${(props) => props.theme.colors.placeholder};
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    transition: background 0.15s ease;
    &:hover {
        filter: brightness(1.05);
    }
`;

const TableSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.colors.secondary};
    border-radius: ${(props) => props.theme.borderRadius.md};
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
    border: 1px solid ${(props) => props.theme.colors.border};
    padding: 1rem;
`;