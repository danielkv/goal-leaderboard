import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Category } from '@common/types/category'

interface AddCategoryModalProps {
    open: boolean
    onClose: () => void
    onSubmit: (category: Omit<Category, 'id' | 'members' | 'subscriptions'>) => void
    loading?: boolean
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
    open,
    onClose,
    onSubmit,
    loading = false,
}) => {
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        // Validation
        if (!name.trim()) {
            setNameError('Nome da categoria é obrigatório')
            return
        }
        
        setNameError('')
        onSubmit({ name: name.trim() })
    }

    const handleClose = () => {
        if (!loading) {
            setName('')
            setNameError('')
            onClose()
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        if (nameError) {
            setNameError('')
        }
    }

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Nova Categoria</DialogTitle>
            <DialogContent>
                <Stack gap={2} sx={{ mt: 1 }}>
                    <TextField
                        label="Nome da categoria"
                        value={name}
                        onChange={handleNameChange}
                        error={!!nameError}
                        helperText={nameError}
                        fullWidth
                        autoFocus
                        disabled={loading}
                        required
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleClose}
                    disabled={loading}
                >
                    Cancelar
                </Button>
                <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={loading}
                >
                    Criar Categoria
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}
