import styled from "styled-components";
import { ServicesProps } from "./index";

const Management = ({ fill, className }: ServicesProps) => {
    return (
        <>
            <ManagementPolicy
                className={className}
                enable-background="new 0 0 91 91"
                height="91px"
                id="Layer_1"
                version="1.1"
                viewBox="0 0 91 91"
                width="91px"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill={fill}
                    d="M66,67.272V55.337c0-4.039-2.445-7.779-6.508-10.299c1.826-2.697,2.895-5.951,2.895-9.453   c0-9.293-7.518-16.854-16.758-16.854c-9.236,0-16.75,7.561-16.75,16.854c0,3.547,1.1,6.836,2.968,9.555   c-3.961,2.52-6.345,6.223-6.345,10.197v11.936h3.4V55.337c0-2.914,1.943-5.688,5.165-7.588c2.19,2.109,4.939,3.627,8.006,4.299   l-3.484,16.99l7.163,5.73l7.163-5.73l-3.546-17.039c3.035-0.699,5.758-2.223,7.918-4.332c3.313,1.9,5.313,4.703,5.313,7.67v11.936   H66z M45.752,70.415l-3.414-2.73l2.865-13.973h1.049l2.909,13.975L45.752,70.415z M45.629,49.038   c-7.361,0-13.351-6.035-13.351-13.453c0-7.42,5.989-13.453,13.351-13.453c7.365,0,13.357,6.033,13.357,13.453   C58.986,43.003,52.994,49.038,45.629,49.038z"
                />
            </ManagementPolicy>
        </>
    );
};

export default Management;

export const ManagementPolicy = styled.svg`
    height: 100px;
    width: 100px;

    > path {
        fill: #32cd32;
    }

    @media screen and (max-width: 768px) {
        height: 70px;
        width: 70px;
    }
`;
