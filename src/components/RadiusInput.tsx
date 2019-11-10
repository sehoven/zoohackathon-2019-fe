import React, { useState } from 'react';
import { FormControl, FormHelperText, Input, InputAdornment, InputLabel } from '@material-ui/core';

const RadiusInput = (props: any) => {
    const [radius, setRadius] = useState(0);

    const handleRadiusChange = (e: any) => {
        setRadius(e.target.value);
        props.onRadiusChange(e.target.value);
    }
    return (
        <FormControl>
            <InputLabel htmlFor="radius-input">Radius</InputLabel>
            <Input endAdornment={<InputAdornment position="end">km</InputAdornment>} required id="radius-input" type="number" aria-describedby="radius-helper-text" onChange={handleRadiusChange} value={radius} />
            <FormHelperText id="radius-helper-text">Specify the search radius around your location.</FormHelperText>
        </FormControl>
    )
}

export default RadiusInput;