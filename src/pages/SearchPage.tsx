import React, { useState } from 'react';
import styled from 'styled-components';
import DateRangeInput from '../components/DateRangeInput';
import LocationInput from '../components/LocationInput';

const SearchPage = () => {


      return (
          <>
            <LocationInput />
            <DateRangeInput />
        </>
      )
}

export default SearchPage;