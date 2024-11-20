import { Box, Button, Container, Stack } from '@mui/material'
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
import { Checkin, CheckinStatus } from '@common/types/checkin'

const data: Checkin[] = [
    {
        id: '1',
        name: 'Garrincha',
        team: 'Time do fera',
        category: 'Elite Masc',
        box: 'A',
        status: CheckinStatus.PENDING,
    },
    {
        id: '2',
        name: 'Pelé',
        team: 'Time do rei',
        category: 'Elite Masc',
        box: 'B',
        status: CheckinStatus.CHECKED,
    },
    {
        id: '3',
        name: 'Marta',
        team: 'Time das meninas',
        category: 'Elite Fem',
        box: 'C',
        status: CheckinStatus.NOSHOW,
    },
    {
        id: '4',
        name: 'Zico',
        team: 'Time do galinho',
        category: 'Veteranos',
        box: 'D',
        status: CheckinStatus.PENDING,
    },
    {
        id: '5',
        name: 'Ronaldo',
        team: 'Time do fenômeno',
        category: 'Elite Masc',
        box: 'E',
        status: CheckinStatus.CHECKED,
    },
]

export const CheckinPage: React.FC = () => {
    const [prefilter, setPrefilter] = useState<CheckinStatus | 'all'>('all')

    const [filteredData, setFilteredData] = useState<Checkin[]>(data)

    useEffect(() => {
        setFilteredData(
            prefilter === 'all'
                ? data
                : data.filter((item) => item.status === prefilter)
        )
    }, [prefilter])

    const table = useCustomTable({
        columns: subscriptionsColumns,

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
                    <SelectableFilter<Checkin, 'status'>
                        currentFilter={prefilter}
                        onClick={(filter) => setPrefilter(filter)}
                        filters={[
                            { label: 'Todos', name: 'all', count: data.length },
                            {
                                label: 'Confirmados',
                                name: CheckinStatus.CHECKED,
                                count: data.filter(
                                    (item) =>
                                        item.status === CheckinStatus.CHECKED
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
                                name: CheckinStatus.PENDING,
                                count: data.filter(
                                    (item) =>
                                        item.status === CheckinStatus.PENDING
                                ).length,
                                icon: (
                                    <WatchLater
                                        fontSize="small"
                                        color="action"
                                    />
                                ),
                            },
                            {
                                label: 'Cancelados',
                                name: CheckinStatus.NOSHOW,
                                count: data.filter(
                                    (item) =>
                                        item.status === CheckinStatus.NOSHOW
                                ).length,
                                icon: (
                                    <Cancel fontSize="small" color="warning" />
                                ),
                            },
                        ]}
                    />
                </Box>

                <MaterialReactTable table={table} />
            </Stack>
        </Container>
    )
}
