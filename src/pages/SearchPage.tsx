import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import DateRangeInput from '../components/DateRangeInput';
import LocationInput from '../components/LocationInput';
import { BottomBtn } from './common.styles';
import { Button } from '@material-ui/core';

const SearchPage = (props: RouteComponentProps) => {
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [radius, setRadius] = useState(0);

  const [start, setStart] = useState(new Date().getTime()/1000);
  const [end, setEnd] = useState(new Date().getTime()/1000);

  return (
    <>
      <LocationInput 
        setLong={setLong}
        setLat={setLat}
        setRadius={setRadius}
      />
      <DateRangeInput
        setStart={setStart}
        setEnd={setEnd}
      />
      <BottomBtn>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {
            props.history.push(`/confirmation/${lat}/${long}/${radius}/${start}/${end}`)
          }}
        >
          Continue
        </Button>
      </BottomBtn>
    </>
  )
}

export default withRouter(SearchPage);