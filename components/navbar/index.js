import styled from 'styled-components';
import Link from 'next/link';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1a1a1a;
  padding: 20px 60px;
`;

const Logo = styled.a`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
`;

const NavLink = styled.li`
  margin-left: 30px;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #80a9ff;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #4d7fff;
  }
`;

const Navbar = () => {
  return (
    <NavContainer>
      <Logo>
        <Link href="/">CreditPay</Link>
      </Logo>
      <NavLinks>
        <NavLink>
          <Link href="/">Home</Link>
        </NavLink>
        <NavLink>
          <Link href="/about">About</Link>
        </NavLink>
        <NavLink>
          <Link href="/services">Services</Link>
        </NavLink>
        <NavLink>
          <Link href="/contact">Contact</Link>
        </NavLink>
      </NavLinks>
      <div>
        <NavButton>Sign up</NavButton>
        <NavButton style={{ marginLeft: '20px', backgroundColor: 'transparent', color: '#ffffff', border: '1px solid #ffffff' }}>Log in</NavButton>
      </div>
    </NavContainer>
  );
};

export default Navbar;
