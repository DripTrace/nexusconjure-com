"use client";

import styled, { keyframes, ThemeProvider } from "styled-components";
// const astronaut = require("assets/russell/Images/spaceman.png");
import LogoComponent from "./LogoComponent";
import { DarkTheme } from "./GlobalStyle";
import SocialIcons from "./SocialIcons";
import PowerButton from "./PowerButton";
import ParticlesComponent from "./ParticleComponent";
import Image from "next/image";
import BigTitle from "./BigTitle";

const Box = styled.div`
    background-color: ${(props) => props.theme.body};
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
`;
const float = keyframes`
0% { transform: translateY(-10px) }
50% { transform: translateY(15px) translateX(15px) }
100% { transform: translateY(-10px) }

`;
const Spaceman = styled.div`
    position: absolute;
    top: 10%;
    right: 5%;
    width: 20vw;
    animation: ${float} 4s ease infinite;
    img {
        width: 100%;
        height: auto;
    }
`;
const Main = styled.div`
    border: 2px solid ${(props) => props.theme.text};
    color: ${(props) => props.theme.text};
    padding: 2rem;
    width: 50vw;
    height: 60vh;
    z-index: 3;
    line-height: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calc(0.6rem + 1vw);
    backdrop-filter: blur(4px);

    position: absolute;
    left: calc(5rem + 5vw);
    top: 10rem;
    font-family: "Ubuntu Mono", monospace;
    font-style: italic;
`;

const AboutPage = () => {
    return (
        <ThemeProvider theme={DarkTheme}>
            <Box>
                <LogoComponent theme="dark" />
                <SocialIcons theme="dark" />
                <PowerButton />
                <ParticlesComponent theme="dark" />

                <Spaceman>
                    <Image
                        src="/assets/russell/Images/spaceman.png"
                        alt="spaceman"
                        height={100}
                        width={100}
                    />
                </Spaceman>
                <Main>
                    I'm a Full-Stack DevOps Engineer from Southern California. I
                    love to create complex and beautiful websites with great
                    user experiences.
                    <br /> <br />
                    I'm interested in the whole frontend stack Like trying new
                    things and building great projects. I'm an independent
                    freelancer and blogger. I love to write blogs and read
                    books.
                    <br /> <br />I believe everything is an Art when you put
                    your consciousness in it. You can connect with me via social
                    links.
                </Main>

                <BigTitle text="ABOUT" top="10%" left="5%" />
            </Box>
        </ThemeProvider>
    );
};

export default AboutPage;