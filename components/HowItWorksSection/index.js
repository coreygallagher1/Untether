import styled from 'styled-components';

const HowItWorksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 60px;
`;

const HowItWorksStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
`;

const HowItWorksStepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #80a9ff;
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const HowItWorksStepTitle = styled.h3`
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 10px;
`;

const HowItWorksStepDescription = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
  max-width: 500px;
`;

const HowItWorksSection = () => {
  return (
    <HowItWorksContainer>
      <h2>How It Works</h2>
      <HowItWorksStepContainer>
        <HowItWorksStepNumber>1</HowItWorksStepNumber>
        <HowItWorksStepTitle>Link Your Accounts</HowItWorksStepTitle>
        <HowItWorksStepDescription>Connect your credit card and loan accounts securely using our app.</HowItWorksStepDescription>
      </HowItWorksStepContainer>
      <HowItWorksStepContainer>
        <HowItWorksStepNumber>2</HowItWorksStepNumber>
        <HowItWorksStepTitle>Round Up Your Purchases</HowItWorksStepTitle>
        <HowItWorksStepDescription>Every time you make a purchase, we round it up to the nearest dollar and save the spare change.</HowItWorksStepDescription>
      </HowItWorksStepContainer>
      <HowItWorksStepContainer>
        <HowItWorksStepNumber>3</HowItWorksStepNumber>
        <HowItWorksStepTitle>Make Micropayments</HowItWorksStepTitle>
        <HowItWorksStepDescription>We use your spare change to make micropayments on your loans, helping you pay them off faster.</HowItWorksStepDescription>
      </HowItWorksStepContainer>
    </HowItWorksContainer>
  );
};

export default HowItWorksSection;
