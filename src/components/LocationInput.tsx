import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { InputAdornment, IconButton, CircularProgress, FormControl, FormHelperText, InputLabel, Input, ListItem, List, ListItemText, Typography } from '@material-ui/core';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import RadiusInput from './RadiusInput';
import { getAddressFromGeocode, getCurrentPosition } from '../utils/locationUtils';
import GoogleMap from 'google-map-react';
import Marker from '../components/Marker';

const AutocompleteSection = styled.div`
    display: flex;
`;

const MapContainer = styled.div`
    width: 100%;
    height: 300px;
`;

declare interface mapClick {
    x: number,
    y: number,
    lat: number,
    lng: number, 
    event: any
}

export interface LocationInputProps {
    setLat: any;
    setLong: any;
    setRadius: any;
}

const LocationInput = (props: LocationInputProps) => {
    const [location, setLocation] = useState('');
    const [latLong, setLatLong] = useState({ lat: 0, long: 0 });
    const [loading, setLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState({ lat: 32.7157, long: -117.1611 });
    const [markerLocation, setMarkerLocation] = useState();
    const [radius, setRadius] = useState<string|number>('');
    const [mapRef, setMapRef] = useState();
    const [circle, setCircle] = useState();

    useEffect(() => {
        getCurrentPosition()
            .then(coordinates => setMapCenter(coordinates))
    }, []);


    const handleRadiusChange = (e: any) => {
        if (e.target.value) {
            const newRadius = parseInt(e.target.value);
            setRadius(newRadius);
            props.setRadius(newRadius);
            if (!circle) {
                setCircle(new window.google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.3,
                    map: mapRef.map,
                    center: {
                        lat: markerLocation.lat,
                        lng: markerLocation.long
                    },
                    radius: newRadius * 1000,
                }));
            } else {
                console.log('editing circle...');
                circle.setRadius(newRadius * 1000);
                circle.setCenter({
                    lat: markerLocation.lat,
                    lng: markerLocation.long
                });
            }
        } else {
            setRadius('');
        }
    }

    const handleChange = (location: string) => {
        setLocation(location);
    };
    
    const handleSelect = (address: string) => {
        setLocation(address);
        geocodeByAddress(address)
            .then((results: any) => getLatLng(results[0]))
            .then((coords: any) => {

                setLatLong({
                    lat: coords.lat,
                    long: coords.lng
                });
                props.setLat(coords.lat);
                props.setLong(coords.lng);
                setMarkerLocation({
                    lat: coords.lat,
                    long: coords.lng
                });
                setMapCenter({
                    lat: coords.lat,
                    long: coords.lng
                });
            })
            .catch((error: any) => console.error('Error', error));
    };
    
    const getCurrentLocation = () => {
        setLatLong({ lat: 0, long: 0 });
        setLocation('');
        setLoading(true);
        getCurrentPosition()
            .then(coordinates => {
                setLatLong(coordinates)
                props.setLat(coordinates.lat);
                props.setLong(coordinates.long);
                setMarkerLocation(coordinates)
                setMapCenter(coordinates)
                return getAddressFromGeocode(coordinates)
            })
            .then(address => setLocation(address))
            .finally(() => setLoading(false));
    };

    const onMapClick = ({x, y, lat, lng, event}: mapClick) => {
        const coords = {
            lat,
            long: lng
        }
        setMarkerLocation(coords);
        setLatLong(coords);
        props.setLat(coords.lat);
        props.setLong(coords.long);
        getAddressFromGeocode(coords)
            .then(address => setLocation(address))
    }
     
    return (
        <>
            <PlacesAutocomplete
                value={location}
                onChange={handleChange}
                onSelect={handleSelect}
            >
                {({ getInputProps, getSuggestionItemProps, suggestions }) => (
                <>
                    <AutocompleteSection>
                        <FormControl>
                            <InputLabel htmlFor="location-input">Location</InputLabel>
                            <Input required id="location-input" aria-describedby="location-helper-text" onChange={handleChange} value={location} {...getInputProps()} />
                            <FormHelperText id="location-helper-text">Search for a point of interest or choose your current location.</FormHelperText>
                        </FormControl>
                        <IconButton onClick={getCurrentLocation}>
                            <MyLocationIcon />
                        </IconButton>
                    </AutocompleteSection>
                    <List>
                        {suggestions.map((suggestion, index) => {
                            return (
                            <ListItem button divider key={index} {...getSuggestionItemProps(suggestion)} >
                                <ListItemText>{suggestion.description}</ListItemText>
                            </ListItem>
                            );
                        })}
                    </List>
                </>
                )}
            </PlacesAutocomplete>

            <MapContainer>
                <GoogleMap
                    bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places` }}
                    center={{ lat: mapCenter.lat, lng: mapCenter.long }}
                    zoom={10}
                    onClick={onMapClick}
                    onGoogleApiLoaded={({map, maps}) => setMapRef({ map, maps })}
                    >
                        {
                            markerLocation && markerLocation.lat && markerLocation.long && 
                            <Marker
                                lat={markerLocation.lat}
                                lng={markerLocation.long}
                                text="My Marker"
                            />
                        }
                        
                    </GoogleMap>
            </MapContainer>
        
            {loading && <CircularProgress />}
            {!!latLong.lat && <Typography variant="subtitle2">Latitude: {latLong.lat}</Typography>}
            {!!latLong.long && <Typography variant="subtitle2">Longitude: {latLong.long}</Typography>}

            <FormControl>
                <InputLabel htmlFor="radius-input">Radius</InputLabel>
                <Input endAdornment={<InputAdornment position="end">km</InputAdornment>} required id="radius-input" type="number" aria-describedby="radius-helper-text" onChange={handleRadiusChange} value={radius} />
                <FormHelperText id="radius-helper-text">Specify the search radius around your location.</FormHelperText>
            </FormControl>        
        </>
    )
}

export default LocationInput;