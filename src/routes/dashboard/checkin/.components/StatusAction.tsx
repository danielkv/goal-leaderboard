import { CheckinStatus } from '@common/types/checkin'
import { Cancel, CheckCircle } from '@mui/icons-material'
import { IconButton, Stack, SvgIconOwnProps } from '@mui/material'

interface StatusActionProps {
    status: CheckinStatus
    onClick(newStatus: CheckinStatus): void
}

function getIconColor(
    status: CheckinStatus,
    condiction: CheckinStatus,
    color: SvgIconOwnProps['color']
): SvgIconOwnProps['color'] {
    if (status === condiction) return color

    if (status === CheckinStatus.PENDING) return 'action'

    return 'disabled'
}

const StatusAction: React.FC<StatusActionProps> = ({ status, onClick }) => {
    return (
        <Stack direction="row" spacing={1}>
            <IconButton
                onClick={() =>
                    onClick(
                        status === CheckinStatus.CHECKED
                            ? CheckinStatus.PENDING
                            : CheckinStatus.CHECKED
                    )
                }
            >
                <CheckCircle
                    fontSize="small"
                    color={getIconColor(
                        status,
                        CheckinStatus.CHECKED,
                        'success'
                    )}
                />
            </IconButton>
            <IconButton
                onClick={() =>
                    onClick(
                        status === CheckinStatus.NOSHOW
                            ? CheckinStatus.PENDING
                            : CheckinStatus.NOSHOW
                    )
                }
            >
                <Cancel
                    fontSize="small"
                    color={getIconColor(
                        status,
                        CheckinStatus.NOSHOW,
                        'warning'
                    )}
                />
            </IconButton>
        </Stack>
    )
}

export default StatusAction
