import { MRT_ColumnDef } from 'material-react-table'
import { Checkin } from '@common/types/checkin'
import StatusAction from './components/StatusAction'

export const subscriptionsColumns: MRT_ColumnDef<Checkin>[] = [
    {
        header: 'Nome',
        accessorKey: 'name',
    },
    {
        header: 'Equipe',
        accessorKey: 'team',
    },
    {
        header: 'Categoria',
        accessorKey: 'category',
    },
    {
        header: 'Box',
        accessorKey: 'box',
    },
    {
        header: 'Status',
        accessorKey: 'status',
        Cell: ({ row }) => (
            <StatusAction status={row.original.status} onClick={() => {}} />
        ),
    },
]
