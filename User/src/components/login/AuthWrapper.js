import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../styleUtil';
import { Link } from 'react-router-dom';

// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    border-radius: 16px;
`;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
    padding-top: 2.5rem;
    border-radius: 16px;
    width: 500px;
    box-shadow: 0 10px 20px rgba(2, 4, 142, 0.3);
`;


// 로고
const LogoWrapper = styled.div`
    background: ${oc.indigo[9]};
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Logo = styled(Link)`
    color: #1b0278;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    margin: 0;
    font-weight: 600;
    font-size: 2.4rem;
    letter-spacing: 0px;
    text-decoration: none;
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 2rem;
    padding-top: 6vh;
    height: 55vh;
    display: flex;
    flex-direction : column;
    border-radius: 16px;
`;

const AuthWrapper = ({children}) => (
    <Positioner>
        <ShadowedBox>
            <Logo to="/">Login</Logo>
            <hr style={{marginTop: "1.5rem",border:"solid 2px #1b0278", width:"90%"}}></hr>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
);

export default AuthWrapper;