import styled from 'styled-components';

export const Title = styled.div`
   margin-bottom: 20px;
`;

export const BottomBtn = styled.div`
   position: fixed;
   bottom: 10px;
   width: calc(100% - 20px);

   @media (min-width: 520px) {
      position: static;
      float: right;
      width: 100px;
   }
`;