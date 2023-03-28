import styled from 'styled-components';
import Image from 'next/image';
import louieImage from '../../../public/Louie.png';
import parkerImage from '../../../public/Parker.png';
import maximImage from '../../../public/Maxim.png';
import dynamic from "next/dynamic";

const TestimonialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  background-color: #222222;
  padding: 50px 0;
`;

const Testimonial = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
  margin: 30px 0;
`;

const TestimonialText = styled.p`
  font-size: 1.5rem;
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
  height: 200px;
  width: 200px;
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
        <TestimonialText>"This app has been a lifesaver! I never realized how much money I was losing due to interest payments on my loans, but now I'm saving thousands of dollars and paying of my debt early."</TestimonialText>
        <TestimonialImageContainer>
          <TestimonialImage src={louieImage} alt="Headshot of user" layout="fill" objectFit="cover" objectPosition="center" />
        </TestimonialImageContainer>
        <TestimonialAuthor>Louie Reichenbach</TestimonialAuthor>
      </Testimonial>
      <Testimonial>
        <TestimonialText>"I've been using this app for a few months now, and it's already helped me pay off some of my debts. It's amazing how much of a difference it can make!"</TestimonialText>
        <TestimonialImageContainer>
          <TestimonialImage src={parkerImage} alt="Headshot of user" layout="fill" objectFit="cover" objectPosition="center" />
        </TestimonialImageContainer>
        <TestimonialAuthor>Parker Swanson</TestimonialAuthor>
      </Testimonial>
      <Testimonial>
        <TestimonialText>"I used to hate budgeting for loan payments, but this app has made it so easy. I love how it rounds up my purchases and saves the spare change for me. I don't even have to think about paying my loans anymore!"</TestimonialText>
        <TestimonialImageContainer>
          <TestimonialImage src={maximImage} alt="Headshot of user" layout="fill" objectFit="cover" objectPosition="center" />
        </TestimonialImageContainer>
        <TestimonialAuthor>Maxim Zagrebelny</TestimonialAuthor>
      </Testimonial>
    </TestimonialsContainer>
  );
};


export default dynamic (() => Promise.resolve(TestimonialsSection), {ssr: false});