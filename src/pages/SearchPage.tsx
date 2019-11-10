import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import DateRangeInput from '../components/DateRangeInput';
import LocationInput from '../components/LocationInput';
import TopicInput from '../components/TopicInput';
import { BottomBtn } from './common.styles';
import { Button } from '@material-ui/core';

const SearchPageContainer = styled.div`
    margin-bottom: 50px;
`;

const SearchPage = (props: RouteComponentProps) => {
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [radius, setRadius] = useState(0);

  const [start, setStart] = useState(new Date().getTime()/1000);
  const [end, setEnd] = useState(new Date().getTime()/1000);

  return (
    <SearchPageContainer>
      <LocationInput 
        setLong={setLong}
        setLat={setLat}
        setRadius={setRadius}
      />
      <DateRangeInput
        setStart={setStart}
        setEnd={setEnd}
      />
      <TopicInput />
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
    </SearchPageContainer>
  )
}

export default withRouter(SearchPage);