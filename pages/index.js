import styled from 'styled-components';
import HeroSection from '../components/homepage/HeroSection';
import FeaturesSection from '../components/homepage/FeaturesSection';
import TestimonialsSection from '../components/homepage/TestimonialsSection';
import HowItWorksSection from '../components/homepage/HowItWorksSection';
import CTASection from '../components/homepage/CTASection';

const HomePageContainer = styled.div`
  background-color: #1a1a1a;
  color: #fff;
`;

const HomePage = () => {
  return (
    <HomePageContainer>
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <HowItWorksSection />
      <CTASection />
    </HomePageContainer>
  );
};


export default HomePage;
