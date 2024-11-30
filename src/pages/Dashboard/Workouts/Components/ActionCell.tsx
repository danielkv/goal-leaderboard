import { TableActionCell } from '@common/types/tables'
import { IconButton, Stack } from '@mui/material'
import { CopyAll, DeleteOutline, EditOutlined } from '@mui/icons-material'
import { Workout } from '@common/types/workout'

const WorkoutsActionsCell: TableActionCell<Workout> = () => {
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

export default WorkoutsActionsCell
