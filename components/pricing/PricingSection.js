import styled from 'styled-components';
import dynamic from 'next/dynamic';


const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  background-color: #1f1f1f;
  padding: 60px;
`;

const PricingHeading = styled.h2`
  font-size: 3rem;
  margin-bottom: 40px;
  color: #ffffff;
`;

const PricingCardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 60px;
`;

const PricingCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 300px;
  margin: 0 30px;
  background-color: #ffffff;
  padding: 40px 30px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const PricingCardHeading = styled.h3`
  font-size: 2rem;
  color: #222222;
  margin-bottom: 20px;
`;

const PricingCardPrice = styled.p`
  font-size: 2.5rem;
  color: #80a9ff;
  margin-bottom: 30px;
`;

const PricingCardFeatureList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const PricingCardFeature = styled.li`
  font-size: 1.2rem;
  color: #555555;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;
  

const PricingSection = () => {
  const pricingCards = [
    {
      id: 'basic',
      title: 'Basic',
      price: '$9.99/mo',
      features: ['1 user', 'Basic analytics', 'Email support'],
    },
    {
      id: 'pro',
      title: 'Pro',
      price: '$29.99/mo',
      features: ['5 users', 'Advanced analytics', 'Phone and email support'],
    },
    {
      id: 'premium',
      title: 'Premium',
      price: '$99.99/mo',
      features: ['Unlimited users', 'Advanced analytics', '24/7 support'],
    },
  ];

  return (
    <PricingContainer>
    <PricingHeading>Choose Your Plan</PricingHeading>
    <PricingCardContainer>
      {pricingCards.map((card) => (
        <PricingCard key={card.id}>
          <PricingCardHeading>{card.title}</PricingCardHeading>
          <PricingCardPrice>{card.price}</PricingCardPrice>
          <PricingCardFeatureList>
            {card.features.map((feature) => (
              <PricingCardFeature key={feature}>{feature}</PricingCardFeature>
            ))}
          </PricingCardFeatureList>
        </PricingCard>
      ))}
    </PricingCardContainer>
  </PricingContainer>
  );
};

export default dynamic (() => Promise.resolve(PricingSection), {ssr: false});
