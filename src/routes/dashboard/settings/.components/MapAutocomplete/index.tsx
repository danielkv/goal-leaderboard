import { APIProvider } from '@vis.gl/react-google-maps'
import { MapAutocompleteContent } from './content'

export const MapAutocomplete: React.FC = () => {
    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <MapAutocompleteContent />
        </APIProvider>
    )
}
