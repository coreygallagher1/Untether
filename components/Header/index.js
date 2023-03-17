import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Logo = styled.h1`
  font-size: 2rem;
  color: #fff;
`;

const Nav = styled.nav`
  display: flex;
`;

const NavLink = styled.a`
  color: #fff;
  margin-right: 20px;
  font-size: 1.2rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>My MicroPayments App</Logo>
      <Nav>
        <NavLink href="#">Home</NavLink>
        <NavLink href="#">About</NavLink>
        <NavLink href="#">Services</NavLink>
        <NavLink href="#">Contact</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
