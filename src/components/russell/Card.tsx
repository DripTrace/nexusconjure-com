"use client";

import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Github } from "./AllSvgs";

interface ThemeProps {
    text: string;
    body: string;
}

const Box = styled(motion.li)<{ theme: ThemeProps }>`
    width: 16rem;
    height: 40vh;
    background-color: ${(props) => props.theme.text};
    color: ${(props) => props.theme.body};
    padding: 1.5rem 2rem;
    margin-right: 8rem;
    border-radius: 0 50px 0 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid ${(props) => props.theme.body};
    transition: all 0.2s ease;

    &:hover {
        background-color: ${(props) => props.theme.body};
        color: ${(props) => props.theme.text};
        border: 1px solid ${(props) => props.theme.text};
    }
`;

const Title = styled.h2`
    font-size: calc(1em + 0.5vw);
`;

const Description = styled.h2`
    font-size: calc(0.8em + 0.3vw);
    font-family: "Karla", sans-serif;
    font-weight: 500;
`;

const Tags = styled.div<{ theme: ThemeProps }>`
    border-top: 2px solid ${(props) => props.theme.body};
    padding-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    ${Box}:hover & {
        border-top: 2px solid ${(props) => props.theme.text};
    }
`;

const Tag = styled.span`
    margin-right: 1rem;
    font-size: calc(0.8em + 0.3vw);
`;

const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
`;

const Link = styled.a<{ theme: ThemeProps }>`
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    text-decoration: none;
    padding: 0.5rem calc(2rem + 2vw);
    border-radius: 0 0 0 50px;
    font-size: calc(1em + 0.5vw);

    ${Box}:hover & {
        background-color: ${(props) => props.theme.text};
        color: ${(props) => props.theme.body};
    }
`;

const Git = styled.a<{ theme: ThemeProps }>`
    color: inherit;
    text-decoration: none;
    ${Box}:hover & {
        & > * {
            fill: ${(props) => props.theme.text};
        }
    }
`;

// Framer motion configuration
const Item = {
    hidden: {
        scale: 0,
    },
    show: {
        scale: 1,
        transition: {
            type: "spring",
            duration: 0.5,
        },
    },
};

interface CardData {
    id: number;
    name: string;
    description: string;
    tags: string[];
    demo: string;
    github: string;
}

interface CardProps {
    data: CardData;
}

const Card: React.FC<CardProps> = ({ data }) => {
    const { id, name, description, tags, demo, github } = data;

    return (
        <Box key={id} variants={Item}>
            <Title>{name}</Title>
            <Description>{description}</Description>
            <Tags>
                {tags.map((t, index) => (
                    <Tag key={index}>#{t}</Tag>
                ))}
            </Tags>
            <Footer>
                <Link href={demo} target="_blank" rel="noopener noreferrer">
                    Visit
                </Link>
                <Git href={github} target="_blank" rel="noopener noreferrer">
                    <Github width={30} height={30} />
                </Git>
            </Footer>
        </Box>
    );
};

export default Card;
