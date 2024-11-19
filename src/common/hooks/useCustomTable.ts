import { useTheme } from '@mui/material'
import {
    MRT_RowData,
    MRT_TableInstance,
    MRT_TableOptions,
    useMaterialReactTable,
} from 'material-react-table'

export const useCustomTable = <TData extends MRT_RowData>(
    tableOptions: MRT_TableOptions<TData>
): MRT_TableInstance<TData> => {
    const theme = useTheme()

    return useMaterialReactTable<TData>({
        muiTopToolbarProps: {
            sx: {
                backgroundColor: theme.palette.background.paper,
                padding: 2,
            },
        },
        muiBottomToolbarProps: {
            sx: {
                backgroundColor: theme.palette.background.paper,
            },
        },
        enableFullScreenToggle: false,
        enableDensityToggle: false,
        enableKeyboardShortcuts: false,
        enableColumnActions: false,
        enableColumnFilters: false,
        enableHiding: false,
        positionActionsColumn: 'last',
        displayColumnDefOptions: {
            'mrt-row-actions': {
                header: '',
            },
        },
        ...tableOptions,
        initialState: {
            density: 'spacious',
            ...tableOptions.initialState,
        },
    })
}
