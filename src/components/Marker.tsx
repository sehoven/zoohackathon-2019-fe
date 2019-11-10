import styled from 'styled-components';

interface MarkerProps {
  lat: number,
  lng: number,
  text: string
}

const Marker = styled.div<MarkerProps>`
    height: 10px;
    width: 10px;
    background-color: red;
    border: 1px solid black;
    border-radius: 30px;
    margin: -5px;
`;

export default Marker;