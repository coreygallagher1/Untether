import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { PlaidLink } from 'react-plaid-link';


const ConnectContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  background-color: #222222;
  color: #ffffff;
  padding: 60px;
`;

const ConnectHeading = styled.h2`
  font-size: 3rem;
  margin-bottom: 40px;
  color: #ffffff;
`;




const ConnectBankSection = () => {



  return (
    <ConnectContainer>
      <ConnectHeading>Connect to Your Bank</ConnectHeading>
  
      <StyledPlaidLink
        clientName="UNTETHER"
        env="sandbox"
        product={['auth', 'transactions']}
        publicKey="62218f5e28b03c0014f641b8"
        onSuccess={handleSuccess}
        onExit={handleExit}
      >
        Connect to Your Bank
      </StyledPlaidLink>
    </ConnectContainer>
  );
};

export default dynamic (() => Promise.resolve(ConnectBankSection), {ssr: false});
