import { MRT_ColumnDef } from 'material-react-table'
import { Workout } from './types'
import { formatResultType } from '@common/helpers/formatResultType'
import { ResultType } from '@common/types/workout'

import { secondsToTime } from '@common/helpers/secondsToTime'
import { formatWorkoutType } from '@common/helpers/formatWorkoutType'

export const subscriptionsColumns: MRT_ColumnDef<Workout>[] = [
    {
        header: 'Nome',
        accessorKey: 'name',
    },
    {
        header: 'Tipo',
        accessorKey: 'type',
        Cell: ({ row }) =>
            `${formatWorkoutType(row.getValue('type'))} (${secondsToTime(row.original.timecap)})`,
    },
    {
        header: 'Resultado',
        accessorKey: 'result',
        Cell: ({ cell }) => formatResultType(cell.getValue<ResultType>()),
    },
    {
        header: 'Tiebreak',
        accessorKey: 'tiebreak',
        Cell: ({ cell }) => formatResultType(cell.getValue<ResultType>()),
    },
]
