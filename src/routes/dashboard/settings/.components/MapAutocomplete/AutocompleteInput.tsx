import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import parse from 'autosuggest-highlight/parse'
import { debounce } from 'lodash'

import { useEffect, useMemo } from 'react'
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

type PlaceType = google.maps.places.AutocompletePrediction

export default function AutocompleteInput() {
    const [value, setValue] = useState<PlaceType | null>(null)
    const [inputValue, setInputValue] = useState('')
    const [options, setOptions] = useState<readonly PlaceType[]>([])

    const places = useMapsLibrary('places')
    const map = useMap()

    const [sessionToken, setSessionToken] =
        useState<google.maps.places.AutocompleteSessionToken>()

    const [autocompleteService, setAutocompleteService] =
        useState<google.maps.places.AutocompleteService | null>(null)

    const [placesService, setPlacesService] =
        useState<google.maps.places.PlacesService | null>(null)

    useEffect(() => {
        if (!places || !map) return

        setAutocompleteService(new places.AutocompleteService())
        setPlacesService(new places.PlacesService(map))
        setSessionToken(new places.AutocompleteSessionToken())

        return () => setAutocompleteService(null)
    }, [map, places])

    const fetch = useMemo(() => {
        return debounce(async (input: string) => {
            return autocompleteService?.getPlacePredictions({
                input,
                sessionToken,
            })
        }, 400)
    }, [autocompleteService, sessionToken])

    useEffect(() => {
        let active = true

        if (inputValue === '') {
            setOptions(value ? [value] : [])
            return undefined
        }

        fetch(inputValue)?.then((results) => {
            if (!active) return

            let newOptions: readonly PlaceType[] = []

            if (value) {
                newOptions = [value]
            }

            if (results) {
                newOptions = [...newOptions, ...results.predictions]
            }

            setOptions(newOptions)
        })

        return () => {
            active = false
        }
    }, [value, inputValue, fetch])

    const handleChange = (place: PlaceType | null) => {
        if (!place) return

        const detailRequestOptions = {
            placeId: place.place_id,
            fields: ['geometry', 'name', 'formatted_address'],
            sessionToken,
        }

        const detailsRequestCallback = (
            placeDetails: google.maps.places.PlaceResult | null
        ) => {
            if (!placeDetails?.geometry?.viewport) return
            map?.fitBounds(placeDetails.geometry.viewport)
            // setInputValue(placeDetails?.formatted_address ?? '')
            // setSessionToken(new places.AutocompleteSessionToken())
        }

        placesService?.getDetails(detailRequestOptions, detailsRequestCallback)
    }

    return (
        <Autocomplete
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="Nenhum local encontrado"
            onChange={(_, newValue: PlaceType | null) => {
                handleChange(newValue)
                setOptions(newValue ? [newValue, ...options] : options)
                setValue(newValue)
            }}
            onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue)
            }}
            renderInput={(params) => (
                <TextField {...params} label="Endereço do evento" fullWidth />
            )}
            renderOption={(props, option) => {
                const { key, ...optionProps } = props
                const matches =
                    option.structured_formatting.main_text_matched_substrings ||
                    []

                const parts = parse(
                    option.structured_formatting.main_text,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    matches.map((match: any) => [
                        match.offset,
                        match.offset + match.length,
                    ])
                )
                return (
                    <li key={key} {...optionProps}>
                        <Grid container sx={{ alignItems: 'center' }}>
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <LocationOnIcon
                                    sx={{ color: 'text.secondary' }}
                                />
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    width: 'calc(100% - 44px)',
                                    wordWrap: 'break-word',
                                }}
                            >
                                {parts.map((part, index) => (
                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{
                                            fontWeight: part.highlight
                                                ? 'bold'
                                                : 'regular',
                                        }}
                                    >
                                        {part.text}
                                    </Box>
                                ))}
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {
                                        option.structured_formatting
                                            .secondary_text
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                )
            }}
        />
    )
}
