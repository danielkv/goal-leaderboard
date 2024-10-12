import { themeOptions } from './theme'

import { CssBaseline, ThemeProvider } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { GeneralRouter } from '@router'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import ptBrLocale from 'dayjs/locale/pt-br'

dayjs.locale(ptBrLocale)

function App() {
    return (
        <ThemeProvider theme={themeOptions}>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="pt-br"
            >
                <CssBaseline />
                <GeneralRouter />
            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default App
