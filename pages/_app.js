import { useEffect } from "react";
import { createTheme, NextUIProvider, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Box } from "../components/layout/Box.js";
import fbb from "../firebase/firebaseApp.js";
import Footer from "../components/footer/Footer.js";
import Header from "../components/navbar";
import Head from "next/head";
import { getAuth } from "firebase/auth";

import { ThemeProvider as NextThemesProvider } from 'next-themes';

import "../styles/Global.css";

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: "light",
});

const darkTheme = createTheme({
  type: "dark",
  colors: {
    
     // brand colors
     primaryLight: '$green200',
     primaryLightHover: '$green300',
     primaryLightActive: '$green400',
     primaryLightContrast: '$green600',
     primary: '#4ADE7B',
     primaryBorder: '$green500',
     primaryBorderHover: '$green600',
     primarySolidHover: '$green700',
     primarySolidContrast: '$white',
     primaryShadow: '$green500',

     gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
     link: '#5E1DAD',

     // you can also create your own color
     myColor: '#80b6ff'
    
  },
  space: {},
  fonts: {}
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
  
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <NextThemesProvider theme={darkTheme}>
        <NextUIProvider theme={darkTheme}>
          <Header />
          <div style={{ minHeight: "100vh", width: "100%", marginLeft: "0%" }}>
            <Box css={{ px: "$12", mt: "$", "@xsMax": { px: "$10" } }}>
              <Component {...pageProps} />
            </Box>
          </div>
          <Spacer y={2} />
          <Footer />
        </NextUIProvider>
      </NextThemesProvider>
    </>
  );
}

export default MyApp;
