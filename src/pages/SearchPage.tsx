import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import DateRangeInput from '../components/DateRangeInput';
import LocationInput from '../components/LocationInput';
import { BottomBtn } from './common.styles';
import { Button } from '@material-ui/core';

const SearchPageContainer = styled.div`
    margin-bottom: 50px;
`;

const SearchPage = (props: RouteComponentProps) => {
  return (
    <SearchPageContainer>
      <LocationInput />
      <DateRangeInput />
      <BottomBtn>
        <Button
          fullWidth
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {props.history.push('/confirmation')}}
        >
          Continue
        </Button>
      </BottomBtn>
    </SearchPageContainer>
  )
}

export default withRouter(SearchPage);