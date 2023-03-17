import styled from 'styled-components';
import Image from 'next/image';

const HeroContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
  padding: 50px;
  background-color: #1a1a1a;
  border-radius: 10px;
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 500px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  color: #ffffff;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 40px;
`;

const HeroButton = styled.button`
  background-color: #80a9ff;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: white;
    color: #80a9ff;
    border: 2px solid #80a9ff;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  max-width: 500px;
  position: relative;
  height: 500px;
  border-radius: 10px;
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroTitle>Save money effortlessly with our micropayment app.</HeroTitle>
        <HeroSubtitle>Our app rounds up your credit card purchases and uses the spare change to make micropayments on your loans. Start saving money today!</HeroSubtitle>
        <HeroButton>Get Started</HeroButton>
      </HeroContent>
      <HeroImage>
        <Image src="/hero-image.jpg" alt="Illustration of a person using our micropayment app" layout="fill" objectFit="cover" objectPosition="center" />
      </HeroImage>
    </HeroContainer>
  );
};

export default HeroSection;
