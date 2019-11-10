import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, InputAdornment, IconButton, CircularProgress, FormControl, FormHelperText, InputLabel, Input, ListItem, List, ListItemText } from '@material-ui/core';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { getAddressFromGeocode, getCurrentPosition } from '../utils/locationUtils';
import GoogleMap from 'google-map-react';
import Marker from '../components/Marker';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const AutocompleteSection = styled.div`
    display: flex;
    width: 100%;
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

const LocationInput = () => {
    const [location, setLocation] = useState('');
    const [latLong, setLatLong] = useState({ lat: 0, long: 0 });
    const [loading, setLoading] = useState(false);
    const [mapCenter, setMapCenter] = useState({ lat: 32.7157, long: -117.1611 });
    const [markerLocation, setMarkerLocation] = useState();
    const [radius, setRadius] = useState<string|number>('');
    const [mapRef, setMapRef] = useState();
    const [circle, setCircle] = useState();
    const [expanded, setExpanded] = useState(false);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        getCurrentPosition()
            .then(coordinates => setMapCenter(coordinates))
    }, []);

    const syncLocation = (coords: coordinates) => {
        const convertedCoords = {
            lat: coords.lat,
            lng: coords.long
        }
        if (mapRef && mapRef.map) {
            if (circle) {
                circle.setCenter(convertedCoords);
            } else {
                setCircle(new window.google.maps.Circle({
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#FF0000',
                    fillOpacity: 0.3,
                    map: mapRef.map,
                    center: convertedCoords,
                    radius: +radius * 1000,
                }));
            }
        }

        setLatLong(coords);
        setMarkerLocation(coords);
        setMapCenter(coords);
    }
    
    const handleExpandChange = (event: object, expanded: boolean) => {
        setExpanded(expanded);
        if (!mapLoaded) {
            setMapLoaded(true);
        }
    }

    const handleRadiusChange = (e: any) => {
        if (e.target.value) {
            const newRadius = parseInt(e.target.value);
            setRadius(newRadius);
            if (markerLocation && markerLocation.lat && markerLocation.long && mapRef && mapRef.map) {
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
                    circle.setRadius(newRadius * 1000);
                    circle.setCenter({
                        lat: markerLocation.lat,
                        lng: markerLocation.long
                    });
                }
            }
        } else {
            setRadius('');
        }
    }

    const handleChange = (location: string) => {
        setLocation(location);
    };
    
    const handleSelect = (address: string) => {
        console.log('handle select');
        setLocation(address);
        geocodeByAddress(address)
            .then((results: any) => getLatLng(results[0]))
            .then((coords) => {
                syncLocation({
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
                syncLocation(coordinates);
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
        syncLocation(coords);
        getAddressFromGeocode(coords)
            .then(address => setLocation(address));
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
                        {loading ? <CircularProgress /> : 
                            <IconButton onClick={getCurrentLocation}>
                                <MyLocationIcon />
                            </IconButton>
                        }
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

            <ExpansionPanel expanded={expanded} onChange={handleExpandChange}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>Show Map</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {mapLoaded && <MapContainer>
                        <GoogleMap
                            bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`, v: '3.31' }}
                            center={{ lat: mapCenter.lat, lng: mapCenter.long }}
                            zoom={9}
                            onClick={onMapClick}
                            onGoogleApiLoaded={({map, maps}) => {
                                setMapRef({ map, maps });
                                if (radius && markerLocation && markerLocation.lat && markerLocation.long) {
                                    setCircle(new window.google.maps.Circle({
                                        strokeColor: '#FF0000',
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                        fillColor: '#FF0000',
                                        fillOpacity: 0.3,
                                        map,
                                        center: { lat: mapCenter.lat, lng: mapCenter.long },
                                        radius: +radius * 1000,
                                    }));
                                }
                            }}
                            options={{zoomControl: false}}
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
                        </MapContainer> }
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <FormControl fullWidth>
                <InputLabel htmlFor="radius-input">Radius</InputLabel>
                <Input endAdornment={<InputAdornment position="end">km</InputAdornment>} required id="radius-input" type="number" aria-describedby="radius-helper-text" onChange={handleRadiusChange} value={radius} />
                <FormHelperText id="radius-helper-text">Specify the search radius around your location.</FormHelperText>
            </FormControl>        
        </>
    )
}

export default LocationInput;