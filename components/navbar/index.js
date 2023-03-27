
import Image from 'next/image';
import untetherLogo from '../../public/logo.png';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import dynamic from "next/dynamic";
import React from "react";
import { Navbar, Button, Link, Text, useTheme, Dropdown, Avatar } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { fbapp } from '../../firebase/firebaseApp';

const NavbarComp = () => {

  const router = useRouter();

  const { pathname } = router;

  const [user, setUser] = useState({
    email: "",
    uid: "",
  });

  const authh = getAuth(fbapp);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      if (user.email !== "") {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      }
    } else {
      console.log("uid is none");
      // User is signed out
    }
  });

  const handleAction = (actionKey) => {
    switch (actionKey) {
      case "logout":
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            setUser({
              email: "",
              uid: "",
            });
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
        break;
      case "account":
        router.push("/account");
        break;
      case "settings":
        router.push("/settings");
        break;
      case "cover_letters":
        router.push("/coverletters");
        break;
    }
  };

  const theme = useTheme();

  return (
    <Navbar isBordered={true} variant="sticky" maxWidth={"fluid"}
    css={{
      // adjust the padding
      px: "30px",

      // adjust the font size of the Navbar.Brand and Navbar.Link components
      fontSize: "22px",
      "@sm": {
        fontSize: "22px",
      },
    }}>
  <Navbar.Brand onClick={() => router.push("/")}>
    <Navbar.Toggle showIn="xs" aria-label="toggle navigation" />
    <Image src={untetherLogo} alt="Untether Logo" width={50} height={50} />
    <Text b color="inherit" hideIn="xs" css={{ fontSize: "24px", px:10 }}>
      Untether
    </Text>
  </Navbar.Brand>
  <Navbar.Content enableCursorHighlight
          activeColor="primary"
          hideIn="xs"
          variant="highlight-rounded">
          
    <Navbar.Link
      onPress={() =>
        user.uid !== "" ? router.push("/home") : router.push("/login")
      }
      isActive={pathname == "/home"}
    >
      Services
    </Navbar.Link>
    <Navbar.Link
      onPress={() => {
        router.push("/pricing");
      }}
      isActive={pathname === "/pricing"}
      key="pricing"
    >
      Learn
    </Navbar.Link>
    <Navbar.Link
      key="examples"
      isActive={pathname === "/examples"}
      onPress={() => {
        router.push("/examples");
      }}
    >
      Connect
    </Navbar.Link>
    <Navbar.Link
      key="blog"
      isActive={pathname === "/blog"}
      onPress={() => {
        router.push("/blog");
      }}
    >
      Pricing
    </Navbar.Link>
  </Navbar.Content>

  {user.email === "" ? (
    <Navbar.Content>
      <Navbar.Link color="inherit" onPress={() => router.push("/login")}>
        Login
      </Navbar.Link>
      <Navbar.Item>
        <Button auto flat as={Link} onPress={() => router.push("/signup")}>
          Sign Up
        </Button>
      </Navbar.Item>
    </Navbar.Content>
  ) : (
    <Navbar.Content
      css={{
        "@xs": {
          w: "12%",
          jc: "flex-end",
        },
      }}
    >
      <Dropdown placement="bottom-right">
        <Navbar.Item>
          <Dropdown.Trigger>
            <Avatar
              color="primary"
              text={user.email.charAt(0).toUpperCase()}
              textColor="white"
            />
          </Dropdown.Trigger>
        </Navbar.Item>
        <Dropdown.Menu
          aria-label="User menu actions"
          color="primary"
          onAction={handleAction}
        >
          <Dropdown.Item
            textValue="Signed in as"
            key="profile"
            css={{ height: "$18" }}
          >
            <Text b color="inherit" css={{ d: "flex" }}>
              Signed in as
            </Text>
            <Text b color="inherit" css={{ d: "flex" }}>
              {user.email}
            </Text>
          </Dropdown.Item>
          <Dropdown.Item textValue="Account" key="account" withDivider>
            Account
          </Dropdown.Item>
          <Dropdown.Item textValue="Cover Letters" key="cover_letters">
            Cover Letters
          </Dropdown.Item>
          <Dropdown.Item textValue="Settings" key="settings">
            Settings
          </Dropdown.Item>
          <Dropdown.Item
            textValue="Help & Feedback"
            key="help_and_feedback"
            withDivider
          >
            Help & Feedback
          </Dropdown.Item>
          <Dropdown.Item
            textValue="Log Out"
            onClick={signOut}
            key="logout"
            withDivider
            color="error"
          >
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar.Content>
  )}

  <Navbar.Collapse>
    <Navbar.CollapseItem isActive={pathname === "/home"}>
      <Link
        color="inherit"
        css={{ minWidth: "100%" }}
        onPress={() =>
          user.uid !== "" ? router.push("/home") : router.push("/login")
        }
      >
        Services
      </Link>
    </Navbar.CollapseItem>
    <Navbar.CollapseItem isActive={pathname === "/pricing"}>
      <Link
        color="inherit"
        css={{ minWidth: "100%" }}
        onPress={() => router.push("/pricing")}
      >
        Pricing
      </Link>
    </Navbar.CollapseItem>
    <Navbar.CollapseItem>
      <Link
        color="inherit"
        css={{ minWidth: "100%" }}
        onPress={() => router.push("/login")}
      >
        Learn
      </Link>
    </Navbar.CollapseItem>
    <Navbar.CollapseItem>
      <Link
        color="inherit"
        css={{ minWidth: "100%" }}
        onPress={() => router.push("/blog")}
      >
        Blog
      </Link>
    </Navbar.CollapseItem>
  </Navbar.Collapse>
</Navbar>
  );
};

export default dynamic (() => Promise.resolve(NavbarComp), {ssr: false});
