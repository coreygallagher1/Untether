import styled from 'styled-components';
import dynamic from 'next/dynamic';

const PricingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  background-color: #222222;
  padding: 60px;
`;

const PricingHeading = styled.h2`
  font-size: 3rem;
  margin-bottom: 40px;
  color: #ffffff;
`;

const PricingCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  flex-wrap: wrap;
`;

const PricingCard = styled.div`
  width: 300px;
  height: 400px;
  border: 2px solid #80a9ff;
  border-radius: 5px;
  background-color: #1c1c1c;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const PricingPlan = styled.h3`
  font-size: 2rem;
  color: #ffffff;
`;

const PricingPrice = styled.p`
  font-size: 2.5rem;
  color: #ffffff;
`;

const PricingFeatures = styled.ul`
  list-style: none;
  text-align: center;
  margin: 0;
  padding: 0;
`;

const PricingFeature = styled.li`
  font-size: 1.5rem;
  color: #ffffff;
  margin: 20px 0;
`;

  

const PricingSection = () => {
  const plans = [    {      name: 'Basic',      price: '$9.99/month',      features: ['1 user', '5 accounts', '10 transactions per month']
    },
    {
      name: 'Pro',
      price: '$19.99/month',
      features: ['5 users', '25 accounts', '50 transactions per month']
    },
    {
      name: 'Enterprise',
      price: '$99.99/month',
      features: ['Unlimited users', 'Unlimited accounts', 'Unlimited transactions']
    }
  ];

  return (
    <PricingContainer>
      <PricingHeading>Our Plans</PricingHeading>
      <PricingCardsContainer>
        {plans.map(plan => (
          <PricingCard>
            <PricingPlan>{plan.name}</PricingPlan>
            <PricingPrice>{plan.price}</PricingPrice>
            <PricingFeatures>
              {plan.features.map(feature => (
                <PricingFeature>{feature}</PricingFeature>
              ))}
            </PricingFeatures>
          </PricingCard>
        ))}
      </PricingCardsContainer>
    </PricingContainer>
  );
};

export default dynamic (() => Promise.resolve(PricingSection), {ssr: false});
