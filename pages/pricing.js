import styled from 'styled-components';
import HeroSection from '../components/homepage/HeroSection';
import FeaturesSection from '../components/homepage/FeaturesSection';
import TestimonialsSection from '../components/homepage/TestimonialsSection';
import HowItWorksSection from '../components/homepage/HowItWorksSection';
import CTASection from '../components/homepage/CTASection';
import PricingSection from '../components/pricing/PricingSection';

const HomePageContainer = styled.div`
  background-color: #1a1a1a;
  color: #fff;
`;

const Pricing = () => {
  return (
    <HomePageContainer>
      <PricingSection/>
      
    </HomePageContainer>
  );
};


export default Pricing;
