import styled from 'styled-components';
import HeroSection from '../components/homepage/HeroSection';
import FeaturesSection from '../components/homepage/FeaturesSection';
import TestimonialsSection from '../components/homepage/TestimonialsSection';
import HowItWorksSection from '../components/homepage/HowItWorksSection';
import CTASection from '../components/homepage/CTASection';
import LearnSection from '../components/learn/LearnSection';

const HomePageContainer = styled.div`
  background-color: #1a1a1a;
  color: #fff;
`;

const Learn = () => {
  return (
    <HomePageContainer>
      <LearnSection />
      
    </HomePageContainer>
  );
};


export default Learn;
