import React from 'react';
import styled from 'styled-components';

const themeColor = '#34A5E4';

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
  color: ${themeColor};
`;

const ContentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  color: #333;
  text-align: left;

  h2 {
    font-size: 2em;
    color: ${themeColor};
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1em;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.5em;
    color: #555;
    margin-bottom: 5px;
  }

  address {
    font-style: normal;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  span {
    display: block;
    margin-bottom: 10px;
  }
`;

const Form = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 2px solid ${themeColor};
  border-radius: 5px;
  font-size: 1em;
`;

const Textarea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  border: 2px solid ${themeColor};
  border-radius: 5px;
  font-size: 1em;
  resize: vertical;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 15px;
  margin-top: 20px;
  background-color: ${themeColor};
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2em;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const Contact = () => {
  return (
    <ContactContainer>
      <Title>Contact Us</Title>
      <ContentFormContainer>
        <Content>
          <h2>Get in Touch</h2>
          <p>
            We would love to hear from you! Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
          </p>
          <h3>Address</h3>
          <address>
            Kongu Engineering College<br />
            Erode, TN, 638052
          </address>
          <h3>Phone</h3>
          <span>(123) 456-7890</span>
          <h3>Email</h3>
          <span>support@healthcare.com</span>
        </Content>
        <Form>
          <Input type="text" placeholder="Name" required />
          <Input type="email" placeholder="Email" required />
          <Input type="text" placeholder="Subject" required />
          <Textarea placeholder="Message" required />
          <Button type="submit">Send Message</Button>
        </Form>
      </ContentFormContainer>
    </ContactContainer>
  );
};

export default Contact;
