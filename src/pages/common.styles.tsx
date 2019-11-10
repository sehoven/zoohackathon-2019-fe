import styled from 'styled-components';

export const Title = styled.div`
   margin-bottom: 20px;
`;

interface BottomBtnProps {
   width?: number
}

export const BottomBtn = styled.div`
   position: fixed;
   bottom: 10px;
   width: calc(100% - 20px);

   @media (min-width: 520px) {
      position: static;
      float: right;
      width: ${(props: BottomBtnProps) => `${props.width}px`};
   }
`;

BottomBtn.defaultProps = {
   width: 100
}

export const Message = styled.div`
   margin-bottom: 20px;
`;