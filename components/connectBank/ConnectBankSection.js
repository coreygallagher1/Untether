import styled from 'styled-components';
import dynamic from 'next/dynamic';


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
  color: #80a9ff;
`;

const ConnectForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

const ConnectLabel = styled.label`
  font-size: 1.5rem;
  margin-top: 20px;
  color: #ffffff;
`;

const ConnectInput = styled.input`
  font-size: 1.5rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
  color: #222222;
  margin-top: 10px;
  width: 100%;
`;

const ConnectButton = styled.button`
  font-size: 1.5rem;
  color: #ffffff;
  background-color: #80a9ff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #5181c1;
  }
`;

const ConnectBankSection = () => {
  const handleBankSubmit = (event) => {
    event.preventDefault();
    // Handle bank connection here
  };

  return (
    <ConnectContainer>
    <ConnectHeading>Connect to Your Bank</ConnectHeading>
    <ConnectForm>
      <ConnectLabel htmlFor="username">Username</ConnectLabel>
      <ConnectInput type="text" id="username" />
      <ConnectLabel htmlFor="password">Password</ConnectLabel>
      <ConnectInput type="password" id="password" />
      <ConnectButton>Connect</ConnectButton>
    </ConnectForm>
  </ConnectContainer>
  );
};

export default dynamic (() => Promise.resolve(ConnectBankSection), {ssr: false});
