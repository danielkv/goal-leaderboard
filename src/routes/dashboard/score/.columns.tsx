import { MRT_ColumnDef } from 'material-react-table'
import { Score } from '@common/types/score'

export const subscriptionsColumns: MRT_ColumnDef<Score>[] = [
    {
        header: 'Equipe',
        accessorKey: 'team',
    },
    {
        header: 'Box',
        accessorKey: 'box',
    },
    {
        header: 'Resultado',
        accessorKey: 'result.value',
    },
    {
        header: 'Tie break',
        accessorKey: 'tiebreak.value',
    },
]
