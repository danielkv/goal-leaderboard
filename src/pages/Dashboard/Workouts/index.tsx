import { Button, Container, Stack, Typography } from '@mui/material'
import { Workout } from './types'
import { MaterialReactTable } from 'material-react-table'
import { subscriptionsColumns } from './columns'

import { useCustomTable } from '@common/hooks/useCustomTable'

import { Add, CopyAll } from '@mui/icons-material'
import WorkoutsActionsCell from './Components/ActionCell'

const data: Workout[] = [
    {
        id: '1',
        name: 'Elite Masc',
        type: 'amrap',
        timecap: 600,
        result: 'time',
        tiebreak: 'reps',
    },
    {
        id: '2',
        name: 'Beginner Fem',
        type: 'fortime',
        timecap: 900,
        result: 'reps',
        tiebreak: 'time',
    },
    {
        id: '3',
        name: 'Intermediate Masc',
        type: 'emom',
        timecap: 1200,
        result: 'time',
        tiebreak: 'reps',
    },
    {
        id: '4',
        name: 'Advanced Fem',
        type: 'amrap',
        timecap: 800,
        result: 'reps',
        tiebreak: 'time',
    },
    {
        id: '5',
        name: 'Pro Masc',
        type: 'fortime',
        timecap: 1000,
        result: 'time',
        tiebreak: 'reps',
    },
]

export const WorkoutsPage: React.FC = () => {
    const table = useCustomTable({
        columns: subscriptionsColumns,
        enablePagination: false,
        enableBottomToolbar: false,
        enableFilters: false,
        initialState: {
            sorting: [{ id: 'name', desc: false }],
        },
        data,
        renderTopToolbarCustomActions: () => {
            return (
                <Stack direction="row" gap={2}>
                    <Button startIcon={<Add />}>Novo workout</Button>
                    <Button variant="outlined" startIcon={<CopyAll />}>
                        Clonar workouts
                    </Button>
                </Stack>
            )
        },
        enableRowActions: true,
        renderRowActions: WorkoutsActionsCell,
    })

    return (
        <Container maxWidth="lg">
            <Stack gap={4}>
                <Stack gap={2}>
                    <Typography fontWeight="bold" fontSize={18} variant="h4">
                        Scaled Misto
                    </Typography>
                    <MaterialReactTable table={table} />
                </Stack>
                <Stack gap={2}>
                    <Typography fontWeight="bold" fontSize={18} variant="h4">
                        Scaled Misto
                    </Typography>
                    <MaterialReactTable table={table} />
                </Stack>
            </Stack>
        </Container>
    )
}
