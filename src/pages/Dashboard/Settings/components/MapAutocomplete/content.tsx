import { Stack } from '@mui/material'
import { Map } from '@vis.gl/react-google-maps'

import AutocompleteInput from './AutocompleteInput'

export const MapAutocompleteContent: React.FC = () => {
    return (
        <Stack gap={2}>
            <AutocompleteInput />
            <Map
                style={{
                    width: '100%',
                    height: '400px',
                }}
                defaultCenter={{
                    lat: 22.54992,
                    lng: 0,
                }}
                defaultZoom={5}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            />
        </Stack>
    )
}
