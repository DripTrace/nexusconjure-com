import styled from "styled-components";
import { ServicesProps } from "./index";

const MomAndDad = ({ fill, className }: ServicesProps) => {
    return (
        <>
            <MomAndDadPolicy
                className={className}
                id="Icons_ManAndWoman"
                overflow="hidden"
                version="1.1"
                viewBox="0 0 96 96"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle fill={fill} cx="32" cy="15" r="7" />
                <circle fill={fill} cx="64" cy="15" r="7" />
                <path
                    fill={fill}
                    d=" M 82.9 52.1 L 77.2 31 C 77 30.4 76.7 29.8 76.3 29.4 C 74.4 27.4 72 25.9 69.4 25 C 67.7 24.3 65.9 24 64 24 C 62.1 24 60.3 24.3 58.6 24.9 C 55.9 25.8 53.6 27.3 51.7 29.3 C 51.3 29.8 51 30.3 50.8 30.9 L 48 41.4 L 45.2 31 C 45 30.4 44.7 29.8 44.3 29.4 C 42.4 27.4 40 25.9 37.4 25 C 35.7 24.3 33.9 24 32 24 C 30.1 24 28.3 24.3 26.6 24.9 C 23.9 25.8 21.6 27.3 19.7 29.3 C 19.3 29.8 19 30.3 18.8 30.9 L 13.2 52 C 12.8 53.6 13.6 55.4 15.3 55.8 C 15.5 56 15.7 56 16 56 C 17.3 56 18.5 55.1 18.9 53.8 L 24 34.6 L 24 57 L 24 88 L 30 88 L 30 57 L 34 57 L 34 88 L 40 88 L 40 57 L 40 34.6 L 45.1 53.7 C 45.5 55 46.7 55.9 48 55.9 C 48.3 55.9 48.5 55.9 48.8 55.8 C 49.7 55.5 50.4 54.8 50.7 54 C 50.8 54 56 34.6 56 34.6 L 56 42.7 L 50.3 64 L 56 64 L 56 88 L 62 88 L 62 64 L 66 64 L 66 88 L 72 88 L 72 64 L 77.7 64 L 72 42.7 L 72 34.6 L 77.1 53.7 C 77.5 55 78.7 55.9 80 55.9 C 80.3 55.9 80.5 55.9 80.8 55.8 C 82.4 55.4 83.3 53.7 82.9 52.1 Z"
                />
            </MomAndDadPolicy>
        </>
    );
};

export default MomAndDad;

export const MomAndDadPolicy = styled.svg`
    height: 100px;
    width: 100px;

    > circle,
    path {
        fill: #32cd32;
    }

    @media screen and (max-width: 768px) {
        height: 70px;
        width: 70px;
    }
`;
