import { Button, Container, Stack } from '@mui/material'
import { MaterialReactTable } from 'material-react-table'
import { categoriesColumns } from './.columns'
import CategoryActionsCell from './.components/ActionCell'
import { AddCategoryModal } from './.components/AddCategoryModal'
import { useCustomTable } from '@common/hooks/useCustomTable'
import { Add } from '@mui/icons-material'
import { Category } from '@common/types/category'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

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
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [categories, setCategories] = useState<Category[]>(data)
    const [isLoading, setIsLoading] = useState(false)

    const handleAddCategory = async (newCategory: Omit<Category, 'id' | 'members' | 'subscriptions'>) => {
        setIsLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            const category: Category = {
                ...newCategory,
                id: String(Date.now()), // Generate a simple ID
                members: 0,
                subscriptions: 0,
            }
            
            setCategories(prev => [...prev, category])
            setIsModalOpen(false)
        } catch (error) {
            console.error('Error adding category:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const table = useCustomTable({
        columns: categoriesColumns,
        initialState: {
            sorting: [{ id: 'name', desc: false }],
        },
        data: categories,
        enablePagination: false,
        enableBottomToolbar: false,
        enableFilters: false,
        enableRowActions: true,
        renderRowActions: CategoryActionsCell,
        renderTopToolbarCustomActions: () => {
            return (
                <Button 
                    startIcon={<Add />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Nova categoria
                </Button>
            )
        },
    })

    return (
        <Container maxWidth="lg">
            <Stack gap={4}>
                <MaterialReactTable table={table} />
                <AddCategoryModal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddCategory}
                    loading={isLoading}
                />
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
