import { TableActionCell } from '@common/types/tables'
import { IconButton, Stack } from '@mui/material'
import { Score } from '@common/types/score'
import { Settings } from '@mui/icons-material'

const WorkoutScoreActionsCell: TableActionCell<Score> = () => {
    return (
        <Stack direction="row">
            <IconButton>
                <Settings />
            </IconButton>
        </Stack>
    )
}

export default WorkoutScoreActionsCell
