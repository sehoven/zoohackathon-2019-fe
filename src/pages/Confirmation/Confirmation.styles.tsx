import styled from 'styled-components';

export const ConfirmationDiv = styled.div`
   padding: 10px;
   max-width: 500px;
   margin: 0 auto;
`;

export const Title = styled.div`
   margin-bottom: 20px;
`;

export const LabelValue = styled.div`   
   margin-bottom: 10px;

   label {
      font-weight: bold;
      display: inline-block;
      width: 110px;
   }

   p {
      margin: 0;
      display: inline-block;
   }
`;

export const Event = styled.div`
   max-width: 500px;
   min-width: 310px;
   margin-bottom: 20px;
`;

export const Message = styled.div`
   margin-bottom: 20px;
`;

export const Contacts = styled.div`
   max-width: 500px;
   margin-bottom: 60px;

   @media (min-width: 520px) {
      margin-bottom: 20px;
   }
`;

export const ConfirmBtn = styled.div`
   position: fixed;
   bottom: 10px;
   width: calc(100% - 20px);

   @media (min-width: 520px) {
      position: static;
      float: right;
      width: 100px;
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