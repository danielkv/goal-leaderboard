import { MRT_ColumnDef } from 'material-react-table'
import { Category } from './types'

export const categoriesColumns: MRT_ColumnDef<Category>[] = [
    {
        header: 'Nome',
        accessorKey: 'name',
    },
    {
        header: 'Integrantes',
        accessorKey: 'members',
    },
    {
        header: 'Inscrições',
        accessorKey: 'subscriptions',
    },
]
