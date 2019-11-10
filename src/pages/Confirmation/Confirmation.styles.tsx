import styled from 'styled-components';

export const ConfirmationDiv = styled.div``;

export const LabelValue = styled.div`   
   margin-bottom: 10px;

   label {
      font-weight: bold;
      display: inline-block;
      width: 130px;
   }

   p {
      margin: 0;
      display: inline-block;
   }
`;

export const Activity = styled.div`
   max-width: 500px;
   min-width: 310px;
   margin-bottom: 20px;
`;

export const Contacts = styled.div`
   max-width: 500px;
   margin-bottom: 60px;

   @media (min-width: 520px) {
      margin-bottom: 20px;
   }
`;

export const BackBtn = styled.div`
   display: none;

   @media (min-width: 520px) {
      display: inline-block;
      float: left;
      width: 100px;
   }
`;