import styled from 'styled-components';
import Image from 'next/image';

const TestimonialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
`;

const Testimonial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  margin: 20px 0;
`;

const TestimonialAuthor = styled.p`
  font-size: 1.2rem;
  color: #ffffff;
  font-style: italic;
`;

const TestimonialImageContainer = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 10px;
`;

const TestimonialImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const TestimonialsSection = () => {
  return (
    <TestimonialsContainer>
      <h2>What Our Users Say</h2>
      <Testimonial>
        <TestimonialText>"I love this app! It's such an easy way to save money without even thinking about it. Highly recommend!"</TestimonialText>
        <TestimonialImageContainer>
          <TestimonialImage src="/testimonial-1.png" alt="Headshot of user" layout="fill" objectFit="cover" objectPosition="center" />
        </TestimonialImageContainer>
        <TestimonialAuthor>John Doe</TestimonialAuthor>
      </Testimonial>
      <Testimonial>
        <TestimonialText>"I never knew how much money I was wasting until I started using this app. It's amazing how much I've saved in just a few months!"</TestimonialText>
        <TestimonialImageContainer>
          <TestimonialImage src="/testimonial-2.png" alt="Headshot of user" layout="fill" objectFit="cover" objectPosition="center" />
        </TestimonialImageContainer>
        <TestimonialAuthor>Jane Smith</TestimonialAuthor>
      </Testimonial>
      <Testimonial>
        <TestimonialText>"This app has helped me pay off my loans faster and save money on interest. It's a game changer!"</TestimonialText>
        <TestimonialImageContainer>
          <TestimonialImage src="/testimonial-3.png" alt="Headshot of user" layout="fill" objectFit="cover" objectPosition="center" />
        </TestimonialImageContainer>
        <TestimonialAuthor>Bob Johnson</TestimonialAuthor>
      </Testimonial>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;
