import { CloudUpload } from '@mui/icons-material'
import { Button, ButtonProps, Stack } from '@mui/material'

interface UploadInputProps extends Omit<ButtonProps, 'onChange' | 'onClick'> {
    onChange?: (files: FileList | null) => void
    accept?: string
    label?: string
}

export const UploadInput: React.FC<UploadInputProps> = ({
    onChange,
    accept,
    label,
    ...props
}) => {
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.files)
    }
    return (
        <Stack
            border="1px solid"
            borderColor="background.paper"
            bgcolor="background.default"
            alignItems="center"
            justifyContent="center"
            p={8}
        >
            <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                startIcon={<CloudUpload />}
                {...props}
            >
                {label || 'Selecionar arquivo'}
                <input
                    type="file"
                    accept={accept}
                    hidden
                    onChange={handleOnChange}
                    multiple
                />
            </Button>
        </Stack>
    )
}
