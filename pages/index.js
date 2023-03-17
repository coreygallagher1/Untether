import styled from 'styled-components';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import CTASection from '../components/CTASection';

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
