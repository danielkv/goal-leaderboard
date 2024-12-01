import {
    Box,
    Container,
    FormControlLabel,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { DatePicker } from '@mui/x-date-pickers'
import { UploadInput } from '@components/molecules/UploadInput'

import { MapAutocomplete } from './.components/MapAutocomplete'
import { createFileRoute } from '@tanstack/react-router'

const SettingsPage: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Stack gap={2}>
                <Paper>
                    <Box p={4}>
                        <Stack gap={4}>
                            <Stack direction="row" gap={4}>
                                <Stack gap={2} flex={1}>
                                    <TextField label="Nome do evento" />
                                    <TextField
                                        type="url"
                                        label="Website do evento"
                                    />
                                    <DatePicker label="Data do evento" />
                                    <TextField
                                        multiline
                                        label="Descrição"
                                        minRows={4}
                                    />
                                </Stack>
                                <Stack gap={2} flex={1}>
                                    <TextField label="Local do evento" />

                                    <MapAutocomplete />
                                </Stack>
                            </Stack>
                            <Stack direction="row" gap={4}>
                                <Stack flex={1}>
                                    <Typography variant="subtitle1">
                                        Regulamento
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        Envie o regulamento oficial do evento. O
                                        arquivo deve estar em formato PDF, com
                                        tamanho máximo de 10 MB.
                                    </Typography>
                                </Stack>
                                <Stack flex={1}>
                                    <UploadInput />
                                </Stack>
                            </Stack>
                            <Stack direction="row" gap={4}>
                                <Stack flex={1}>
                                    <Typography variant="subtitle1">
                                        Logo
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        <div>Formato PNG</div>
                                        <div>Dimensões: 500x500px</div>
                                    </Typography>
                                </Stack>
                                <Stack flex={1}>
                                    <UploadInput />
                                </Stack>
                            </Stack>
                            <Stack direction="row" gap={4}>
                                <Stack flex={1}>
                                    <Typography variant="subtitle1">
                                        Header
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        color="textSecondary"
                                    >
                                        <div>Formato PNG</div>
                                        <div>Dimensões: 500x500px</div>
                                    </Typography>
                                </Stack>
                                <Stack flex={1}>
                                    <UploadInput />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Paper>
                <Stack direction="row" justifyContent="space-between">
                    <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Publicado"
                    />
                    <LoadingButton>Salvar</LoadingButton>
                </Stack>
            </Stack>
        </Container>
    )
}

export const Route = createFileRoute('/dashboard/settings/')({
    component: SettingsPage,
})
