import { MRT_ColumnDef } from 'material-react-table'
import { Subscription } from './.types'
import { Cancel, CheckCircle, WatchLater } from '@mui/icons-material'
import { formatCurrency } from '@common/helpers/formatCurrency'

export const subscriptionsColumns: MRT_ColumnDef<Subscription>[] = [
    {
        header: 'Nome',
        accessorKey: 'name',
    },
    {
        header: 'Categoria',
        accessorKey: 'category',
    },
    {
        header: 'Valor',
        accessorKey: 'amount',
        Cell: ({ cell }) => {
            return formatCurrency(cell.getValue<number>())
        },
    },
    {
        header: 'Método',
        accessorKey: 'paymentMethod',
    },
    {
        header: 'Status',
        accessorKey: 'status',
        Cell: ({ cell }) => {
            switch (cell.getValue()) {
                case 'paid':
                    return <CheckCircle fontSize="small" color="success" />
                case 'canceled':
                    return <Cancel fontSize="small" color="error" />
                default:
                    return <WatchLater fontSize="small" color="warning" />
            }
        },
    },
]
