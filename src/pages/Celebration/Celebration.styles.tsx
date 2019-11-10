import styled from 'styled-components';

export const CelebrationDiv = styled.div``;

export const DialogContent = styled.div`
   padding: 25px;
`;

export const HomeBtn = styled.div`
   position: fixed;
   bottom: 60px;
   width: calc(100% - 20px);

   @media (min-width: 520px) {
      position: static;
      float: left;
      width: 100px;
   }
`;