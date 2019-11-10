import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import DateRangeInput from '../components/DateRangeInput';
import LocationInput from '../components/LocationInput';
import { BottomBtn } from './common.styles';
import { Button } from '@material-ui/core';

const SearchPage = (props: RouteComponentProps) => {
  return (
    <>
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
    </>
  )
}

export default withRouter(SearchPage);