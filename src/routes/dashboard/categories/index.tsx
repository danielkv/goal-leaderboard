import { Button, Container, Stack } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import { categoriesColumns } from './.columns'
import CategoryActionsCell from './.components/ActionCell'
import { useCustomTable } from '@common/hooks/useCustomTable'
import { Add } from '@mui/icons-material'
import { Category } from '@common/types/category'
import { createFileRoute } from '@tanstack/react-router'

const data: Category[] = [
    {
        id: '1',
        name: 'Categoria 1',
        members: 10,
        subscriptions: 10,
    },
    {
        id: '2',
        name: 'Categoria 2',
        members: 10,
        subscriptions: 10,
    },
    {
        id: '3',
        name: 'Categoria 3',
        members: 10,
        subscriptions: 10,
    },
]

const CategoriesPage: React.FC = () => {
    const table = useCustomTable({
        columns: categoriesColumns,
        initialState: {
            sorting: [{ id: 'name', desc: false }],
        },
        data,
        enablePagination: false,
        enableBottomToolbar: false,
        enableFilters: false,
        enableRowActions: true,
        renderRowActions: CategoryActionsCell,
        renderTopToolbarCustomActions: () => {
            return <Button startIcon={<Add />}>Nova categoria</Button>
        },
    })

    return (
        <Container maxWidth="lg">
            <Stack gap={4}>
                <MaterialReactTable table={table} />
            </Stack>
        </Container>
    )
}

export const Route = createFileRoute('/dashboard/categories/')({
    component: CategoriesPage,
    staticData: {
        name: 'Categorias',
    },
})
