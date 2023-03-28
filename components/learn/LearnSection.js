import styled from 'styled-components';
import dynamic from "next/dynamic";

const LearnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0;
  background-color: #222222;
  padding: 60px;
`;

const LearnHeading = styled.h2`
  font-size: 3rem;
  margin-bottom: 40px;
  color: #ffffff;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const VideoCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 300px;
  margin: 30px 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  background-color: #1d1d1d;
  color: #ffffff;
  border: 2px solid #80a9ff;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const VideoThumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const VideoTitle = styled.h3`
  font-size: 1.5rem;
  margin: 20px 0;
`;

const VideoDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const LearnSection = () => {
  const videos = [
    {
      id: 'video1',
      title: 'How to Build a Budget',
      description: 'Learn how to build a budget and stick to it with these tips and tricks.',
      thumbnail: 'https://via.placeholder.com/300x200.png?text=Video+Thumbnail',
      url: '#'
    },
    {
      id: 'video2',
      title: 'How to Save Money on Your Taxes',
      description: 'Get expert advice on how to save money on your taxes and keep more of your hard-earned money.',
      thumbnail: 'https://via.placeholder.com/300x200.png?text=Video+Thumbnail',
      url: '#'
    },
    {
      id: 'video3',
      title: 'Investing 101: Getting Started',
      description: 'Discover the basics of investing and how to get started with your investment portfolio.',
      thumbnail: 'https://via.placeholder.com/300x200.png?text=Video+Thumbnail',
      url: '#'
    },
    {
      id: 'video4',
      title: 'The Importance of Credit Scores',
      description: 'Learn why credit scores matter and how to improve yours with these helpful tips.',
      thumbnail: 'https://via.placeholder.com/300x200.png?text=Video+Thumbnail',
      url: '#'
    },
  ];

  return (
    <LearnContainer>
      <LearnHeading>Learn About Personal Finance</LearnHeading>
      <VideoContainer>
        {videos.map((video) => (
          <VideoCard key={video.id} href={video.url}>
            <VideoThumbnail src={video.thumbnail} alt={video.title} />
            <VideoTitle>{video.title}</VideoTitle>
            <VideoDescription>{video.description}</VideoDescription>
          </VideoCard>
        ))}
      </VideoContainer>
    </LearnContainer>
);
}


export default dynamic (() => Promise.resolve(LearnSection), {ssr: false});
