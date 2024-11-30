import { Box, Button, Container, Stack } from '@mui/material'

import { MaterialReactTable } from 'material-react-table'
import { subscriptionsColumns } from '../columns'

import { useCustomTable } from '@common/hooks/useCustomTable'
import SelectableFilter from '@components/organisms/SelectableFilter'
import {
    CheckCircle,
    RemoveCircleOutline,
    Upgrade,
    WatchLater,
} from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { Score, ScoreStatus } from '@common/types/score'
import WorkoutScoreActionsCell from '../components/ActionCell'

const data: Score[] = [
    {
        id: '1',
        team: 'Time do campo',
        box: 'A',
        result: { type: 'time', value: 100 },
        tiebreak: { type: 'reps', value: 100 },
        status: ScoreStatus.PUBLISHED,
    },
    {
        id: '2',
        team: 'Time da quadra',
        box: 'B',
        result: { type: 'time', value: 200 },
        tiebreak: { type: 'reps', value: 200 },
        status: ScoreStatus.NON_PUBLISHED,
    },
    {
        id: '3',
        team: 'Time da piscina',
        box: 'C',
        result: { type: 'time', value: 300 },
        tiebreak: { type: 'reps', value: 300 },
        status: ScoreStatus.PENDING,
    },
    {
        id: '4',
        team: 'Time da pista',
        box: 'D',
        result: { type: 'time', value: 400 },
        tiebreak: { type: 'reps', value: 400 },
        status: ScoreStatus.PENDING,
    },
    {
        id: '5',
        team: 'Time do ginásio',
        box: 'E',
        result: { type: 'time', value: 500 },
        tiebreak: { type: 'reps', value: 500 },
        status: ScoreStatus.NON_PUBLISHED,
    },
]

export const WorkoutScorePage: React.FC = () => {
    const [prefilter, setPrefilter] = useState<ScoreStatus | 'all'>('all')
    const [filteredData, setFilteredData] = useState<Score[]>(data)

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
            sorting: [{ id: 'team', desc: false }],
        },
        data: filteredData,
        enableRowActions: true,
        renderRowActions: WorkoutScoreActionsCell,
        renderTopToolbarCustomActions: () => {
            return <Button startIcon={<Upgrade />}>Publicar</Button>
        },
    })

    return (
        <Container maxWidth="lg">
            <Stack gap={4}>
                <Box>
                    <SelectableFilter<Score, 'status'>
                        currentFilter={prefilter}
                        onClick={(filter) => setPrefilter(filter)}
                        filters={[
                            { label: 'Todos', name: 'all', count: data.length },
                            {
                                label: 'Publicados',
                                name: ScoreStatus.PUBLISHED,
                                count: data.filter(
                                    (item) =>
                                        item.status === ScoreStatus.PUBLISHED
                                ).length,
                                icon: (
                                    <CheckCircle
                                        fontSize="small"
                                        color="success"
                                    />
                                ),
                            },
                            {
                                label: 'Não publicados',
                                name: ScoreStatus.NON_PUBLISHED,
                                count: data.filter(
                                    (item) =>
                                        item.status ===
                                        ScoreStatus.NON_PUBLISHED
                                ).length,
                                icon: (
                                    <WatchLater
                                        fontSize="small"
                                        color="warning"
                                    />
                                ),
                            },
                            {
                                label: 'Pendentes',
                                name: ScoreStatus.PENDING,
                                count: data.filter(
                                    (item) =>
                                        item.status === ScoreStatus.PENDING
                                ).length,
                                icon: (
                                    <RemoveCircleOutline
                                        fontSize="small"
                                        color="disabled"
                                    />
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
