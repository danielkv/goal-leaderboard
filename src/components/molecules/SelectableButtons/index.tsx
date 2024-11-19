import { Button, Stack, styled, Typography } from '@mui/material'

export interface SelectableButtonsProps {
    label: string
    icon?: React.ReactNode
    count?: number
    selected?: boolean
    onClick?: () => void
}

const StyledButton = styled(Button)<{ selected?: boolean }>(
    ({ selected, theme }) => ({
        backgroundColor: '#101010',
        outline: selected
            ? `3px solid ${theme.palette.secondary.main}`
            : 'none',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#151515',
        },
    })
)

const SelectableButtons: React.FC<SelectableButtonsProps> = ({
    label,
    selected,
    count,
    icon,
    onClick,
}) => {
    return (
        <StyledButton selected={selected} onClick={onClick} fullWidth>
            <Stack flex={1} padding={2} direction="row" gap={6}>
                <Stack direction="row" gap={2} flex={1}>
                    {icon}
                    <Typography fontWeight="bold">{label}</Typography>
                </Stack>
                {count && <Typography fontWeight="bold">{count}</Typography>}
            </Stack>
        </StyledButton>
    )
}

export default SelectableButtons
