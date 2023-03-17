import styled from 'styled-components';

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  background-color: #1a1a1a;
  padding: 60px;
`;

const CTAHeading = styled.h2`
  font-size: 2rem;
  margin-bottom: 40px;
  color: #ffffff;
`;

const CTAButton = styled.button`
  background-color: #80a9ff;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 20px 40px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }
`;

const CTASubheading = styled.p`
  font-size: 1.2rem;
  margin-top: 40px;
  max-width: 600px;
  text-align: center;
  color: #ffffff;
`;

const CTASection = () => {
  return (
    <CTAContainer>
      <CTAHeading>Get started with our service today!</CTAHeading>
      <CTAButton>Sign Up Now</CTAButton>
      <CTASubheading>
        Sign up now to start rounding up your purchases and making micropayments on your loans.
      </CTASubheading>
    </CTAContainer>
  );
};

export default CTASection;
