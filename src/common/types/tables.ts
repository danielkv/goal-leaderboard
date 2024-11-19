import {
    type MRT_Cell,
    type MRT_Row,
    type MRT_RowData,
    type MRT_TableInstance,
} from 'material-react-table'
import { type ReactNode } from 'react'

export type TableActionCell<TData extends MRT_RowData> = (props: {
    cell: MRT_Cell<TData>
    row: MRT_Row<TData>
    staticRowIndex?: number
    table: MRT_TableInstance<TData>
}) => ReactNode
