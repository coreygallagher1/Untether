import styled from 'styled-components';
import Image from 'next/image';

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 50px 0;
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
`;

const FeatureImage = styled.div`
  position: relative;
  height: 200px;
  width: 200px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
`;

const FeaturesSection = () => {
  return (
    <FeaturesContainer>
      <Feature>
        <FeatureImage>
          <Image src="/feature-1.png" alt="Illustration of a credit card" layout="fill" objectFit="contain" objectPosition="center" />
        </FeatureImage>
        <FeatureTitle>Round up your purchases</FeatureTitle>
        <FeatureDescription>Our app rounds up your credit card purchases to the nearest dollar and saves the spare change.</FeatureDescription>
      </Feature>
      <Feature>
        <FeatureImage>
          <Image src="/feature-2.png" alt="Illustration of a loan" layout="fill" objectFit="contain" objectPosition="center" />
        </FeatureImage>
        <FeatureTitle>Make micropayments on your loans</FeatureTitle>
        <FeatureDescription>We use the spare change to make micropayments on your loans and help you save money on interest.</FeatureDescription>
      </Feature>
      <Feature>
        <FeatureImage>
          <Image src="/feature-3.png" alt="Illustration of a piggy bank" layout="fill" objectFit="contain" objectPosition="center" />
        </FeatureImage>
        <FeatureTitle>Save money effortlessly</FeatureTitle>
        <FeatureDescription>Our app automates the savings process, so you can save money without even thinking about it.</FeatureDescription>
      </Feature>
    </FeaturesContainer>
  );
};

export default FeaturesSection;
