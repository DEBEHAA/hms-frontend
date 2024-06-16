import React from 'react';
import Slider from 'react-slick';
import styled, { keyframes } from 'styled-components';
import { FaHeartbeat, FaUserMd, FaLaptopMedical } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const themeColor = 'rgb(52 165 228 / var(--tw-text-opacity))';

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: auto;
  text-align: center;
  animation: ${fadeIn} 1s ease-in;
  color: ${themeColor};
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const SliderContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;

  .slick-slide img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: ${themeColor};
`;

const Subtitle = styled.h2`
  font-size: 1.8em;
  margin: 20px 0;
  color: ${themeColor};
`;

const Description = styled.p`
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 40px;
  animation: ${fadeIn} 1.5s ease-in;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
  animation: ${fadeIn} 2.5s ease-in;

  svg {
    font-size: 3em;
    color: ${themeColor};
  }
`;

const About = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>

      <AboutContainer>
        <Title>About Us</Title>
        <Subtitle>Our Mission</Subtitle>
        <Description>
          Our mission is to revolutionize the healthcare experience by providing a seamless and efficient way for patients to schedule appointments with their healthcare providers. We aim to enhance the patient experience through innovative technology and exceptional service.
        </Description>
        <IconContainer>
          <FaHeartbeat />
          <FaUserMd />
          <FaLaptopMedical />
        </IconContainer>
        <Subtitle>What We Offer</Subtitle>
        <Description>
          Our platform offers a variety of features to make healthcare more accessible and convenient:
          <ul>
            <li>Easy online appointment booking</li>
            <li>Automated reminders for upcoming appointments</li>
            <li>Secure management of patient records</li>
            <li>Access to top healthcare professionals</li>
          </ul>
        </Description>
        <Subtitle>Our Team</Subtitle>
        <Description>
          Our team is composed of experienced professionals dedicated to improving healthcare. From our skilled developers to our customer service representatives, everyone plays a crucial role in making our platform the best it can be.
        </Description>
        <Subtitle>Contact Us</Subtitle>
        <Description>
          Have questions or need assistance? Contact us at support@healthcare.com or call us at (123) 456-7890. We are here to help you with all your healthcare needs.
        </Description>
      </AboutContainer>
    </div>
  );
};

export default About;
