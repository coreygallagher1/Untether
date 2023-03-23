import styled from 'styled-components';
import Link from 'next/link';
import dynamic from "next/dynamic";

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -60px;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-right: 20px;
  color: #80a9ff;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Link href="/">
        <FooterLink>@ Untether 2023</FooterLink>
      </Link>
      <Link href="/terms">
        <FooterLink>Terms of Service</FooterLink>
      </Link>
      <Link href="/contact">
        <FooterLink>Contact Us</FooterLink>
      </Link>
    </FooterContainer>
  );
};

export default dynamic (() => Promise.resolve(Footer), {ssr: false});
