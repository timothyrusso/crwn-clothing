import styled from 'styled-components';
import Button from '../button/button.component';

export const PaymentFormContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  height: 100px;
  max-width: 340px;
  display: flex;
  flex-direction: column;
`;

export const PaymentButton = styled(Button)`
  margin-top: 30px;
`;
