import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import untetherLogo from '../../public/logo.png';
import { initFirebase } from '../../firebase/firebaseApp';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


const NavContainer = styled.nav`
position: fixed;
top: 0;
left: 0;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
background-color: #1a1a1a;
padding: 20px 60px;
z-index: 999;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.a`
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
`;

const LogoImg = styled(Image)`
  margin-right: 10px;
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
`;

const NavLink = styled.li`
  margin-left: 30px;
  font-size: 1.2rem;
`;

const NavButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #80a9ff;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #4d7fff;
  }
`;

const Navbar = () => {
  const app = initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user);
  };


  return (
    <NavContainer>
      <LogoContainer>
        <LogoImg src={untetherLogo} alt="Untether Logo" width={50} height={50} />
        <LogoText>
          <Link style={{ color: '#80a9ff' }} href="/">
            Untether
          </Link>
        </LogoText>
      </LogoContainer>
      <NavLinks>
        <NavLink>
          <Link style={{ color: '#80a9ff' }} href="/">
            Services
          </Link>
        </NavLink>
        <NavLink>
          <Link style={{ color: '#80a9ff' }} href="/about">
            Learn
          </Link>
        </NavLink>
        <NavLink>
          <Link style={{ color: '#80a9ff' }} href="/services">
            Connect
          </Link>
        </NavLink>
        <NavLink>
          <Link style={{ color: '#80a9ff' }} href="/contact">
            Pricing
          </Link>
        </NavLink>
      </NavLinks>
      <div>
        <NavButton>Sign up</NavButton>
        <NavButton
          onClick={signIn}
          style={{
            marginLeft: '20px',
            backgroundColor: 'transparent',
            color: '#80a9ff',
            border: '1px solid #80a9ff',
          }}
        >
          Log in
        </NavButton>
      </div>
    </NavContainer>
  );
};

export default Navbar;
