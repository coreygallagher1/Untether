import styled from 'styled-components';
import Image from 'next/image';
import creditCardImage from '../../../public/credit-cards.png';
import paymentImage from '../../../public/payment.png';
import piggyBankImage from '../../../public/piggy-bank.png';
import dynamic from "next/dynamic";

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 100px 0;
`;

const Feature = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  padding: 20px;
  background-color: #1a1a1a;
  border-radius: 10px;
`;

const FeatureImage = styled.div`
  position: relative;
  height: 150px;
  width: 150px;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 10px;
  text-align: center;
`;

const FeatureDescription = styled.p`
  font-size: 1.2rem;
  color: #b3b3b3;
  text-align: center;
`;

const FeaturesSection = () => {
  return (
    <FeaturesContainer>
      <Feature>
        <FeatureImage>
          <Image src={creditCardImage} alt="Illustration of a credit card" layout="fill" objectFit="contain" objectPosition="center" />
        </FeatureImage>
        <FeatureTitle>Round Up Your Purchases</FeatureTitle>
        <FeatureDescription>Easily save your spare change by rounding up your credit card purchases to the nearest dollar.</FeatureDescription>
      </Feature>
      <Feature>
        <FeatureImage>
          <Image src={paymentImage} alt="Illustration of a loan" layout="fill" objectFit="contain" objectPosition="center" />
        </FeatureImage>
        <FeatureTitle>Make Micropayments on Your Loans</FeatureTitle>
        <FeatureDescription>Save money on interest by using your spare change to make micropayments on your loans.</FeatureDescription>
      </Feature>
      <Feature>
        <FeatureImage>
          <Image src={piggyBankImage} alt="Illustration of a piggy bank" layout="fill" objectFit="contain" objectPosition="center" />
        </FeatureImage>
        <FeatureTitle>Effortlessly Save Money</FeatureTitle>
        <FeatureDescription>Automate your savings with our app and effortlessly save money without even thinking about it.</FeatureDescription>
      </Feature>
    </FeaturesContainer>
  );
};

export default dynamic (() => Promise.resolve(FeaturesSection), {ssr: false});
