/* eslint-disable @typescript-eslint/no-explicit-any */
import SelectableButtons, {
    SelectableButtonsProps,
} from '@components/molecules/SelectableButtons'
import { Stack } from '@mui/material'

type Filter<
    TData extends Record<string, any>,
    FieldToFilter extends keyof TData = keyof TData,
> = Omit<SelectableButtonsProps, 'onClick' | 'selected'> & {
    name: TData[FieldToFilter] | 'all'
}

interface SelectableFilterProps<
    TData extends Record<string, any>,
    FieldToFilter extends keyof TData = keyof TData,
> {
    filters: Filter<TData, FieldToFilter>[]
    currentFilter: TData[FieldToFilter] | 'all'
    onClick?: (name: TData[FieldToFilter] | 'all') => void
}

const SelectableFilter = <
    TData extends Record<string, any>,
    FieldToFilter extends keyof TData = keyof TData,
>({
    currentFilter,
    filters,
    onClick,
}: SelectableFilterProps<TData, FieldToFilter>): React.ReactNode => {
    return (
        <Stack direction="row" justifyContent="stretch" spacing={3}>
            {filters.map(({ name, ...rest }) => (
                <SelectableButtons
                    selected={name === currentFilter}
                    {...rest}
                    onClick={() => onClick?.(name)}
                />
            ))}
        </Stack>
    )
}

export default SelectableFilter
