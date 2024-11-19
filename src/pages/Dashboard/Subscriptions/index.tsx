import { Box, Button, Container, Stack } from '@mui/material'
import { Subscription, SubscriptionStatus } from './types'
import { MaterialReactTable } from 'material-react-table'
import { subscriptionsColumns } from './columns'

import { useCustomTable } from '@common/hooks/useCustomTable'
import SelectableFilter from '@components/organisms/SelectableFilter'
import {
    Cancel,
    CheckCircle,
    FileDownload,
    WatchLater,
} from '@mui/icons-material'
import { useEffect, useState } from 'react'

const data: Subscription[] = [
    {
        id: '1',
        name: 'Elite Masc',
        amount: 150,
        category: 'Categoria 1',
        paymentMethod: 'Cartão de crédito',
        status: 'paid',
    },
    {
        id: '2',
        name: 'Elite Fem',
        amount: 200,
        category: 'Categoria 2',
        paymentMethod: 'Boleto',
        status: 'pending',
    },
    {
        id: '3',
        name: 'RX Misto',
        amount: 300,
        category: 'Categoria 3',
        paymentMethod: 'Pix',
        status: 'paid',
    },
    {
        id: '4',
        name: 'Scaled Masc',
        amount: 250,
        category: 'Categoria 4',
        paymentMethod: 'Cartão de débito',
        status: 'canceled',
    },
    {
        id: '5',
        name: 'Interm Fem',
        amount: 100,
        category: 'Categoria 5',
        paymentMethod: 'Transferência bancária',
        status: 'paid',
    },
]

export const SubscriptionsPage: React.FC = () => {
    const [prefilter, setPrefilter] = useState<SubscriptionStatus | 'all'>(
        'all'
    )

    const [filteredData, setFilteredData] = useState<Subscription[]>(data)

    useEffect(() => {
        setFilteredData(
            prefilter === 'all'
                ? data
                : data.filter((item) => item.status === prefilter)
        )
    }, [prefilter])

    const table = useCustomTable({
        columns: subscriptionsColumns,
        manualFiltering: true,
        initialState: {
            sorting: [{ id: 'name', desc: false }],
        },
        data: filteredData,
        renderTopToolbarCustomActions: () => {
            return (
                <Button variant="outlined" startIcon={<FileDownload />}>
                    Exportar
                </Button>
            )
        },
    })

    return (
        <Container maxWidth="lg">
            <Stack gap={4}>
                <Box>
                    <SelectableFilter<Subscription, 'status'>
                        currentFilter={prefilter}
                        onClick={(filter) => setPrefilter(filter)}
                        filters={[
                            { label: 'Todos', name: 'all', count: data.length },
                            {
                                label: 'Pagos',
                                name: 'paid',
                                count: data.filter(
                                    (item) => item.status === 'paid'
                                ).length,
                                icon: (
                                    <CheckCircle
                                        fontSize="small"
                                        color="success"
                                    />
                                ),
                            },
                            {
                                label: 'Pendentes',
                                name: 'pending',
                                count: data.filter(
                                    (item) => item.status === 'pending'
                                ).length,
                                icon: (
                                    <WatchLater
                                        fontSize="small"
                                        color="warning"
                                    />
                                ),
                            },
                            {
                                label: 'Cancelados',
                                name: 'canceled',
                                count: data.filter(
                                    (item) => item.status === 'canceled'
                                ).length,
                                icon: <Cancel fontSize="small" color="error" />,
                            },
                        ]}
                    />
                </Box>

                <MaterialReactTable table={table} />
            </Stack>
        </Container>
    )
}
