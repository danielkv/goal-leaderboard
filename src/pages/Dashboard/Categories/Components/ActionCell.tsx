import { TableActionCell } from '@common/types/tables'
import { Category } from '../types'
import { IconButton, Stack } from '@mui/material'
import { CopyAll, DeleteOutline, EditOutlined } from '@mui/icons-material'

const CategoryActionsCell: TableActionCell<Category> = () => {
    return (
        <Stack direction="row">
            <IconButton>
                <CopyAll />
            </IconButton>
            <IconButton>
                <EditOutlined />
            </IconButton>
            <IconButton>
                <DeleteOutline />
            </IconButton>
        </Stack>
    )
}

export default CategoryActionsCell
