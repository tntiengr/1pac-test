import React from 'react';
import styled from '@emotion/styled'
import {
  Link
} from "react-router-dom";

import logo from "../assets/images/logo.jpeg";
import breakPoint from "assets/styles/breakPoints";

const Header = () => {
  return (
    <Wrapper>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <RightSection>
        <ul>
          <li>
            <Link to="/">STATISTIC</Link>
          </li>
          <li>
            <Link to="/noticed">NOTICED</Link>
          </li>
        </ul>
      </RightSection>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  img {
    width: 150px;
    height: auto;
  }
`
const RightSection = styled.div`
  ul {
    margin-right: 50px;
    @media screen and (max-width: ${breakPoint.tabletS - 1}px){
      margin-right: 10px;
    }
  }

  li {
    display: inline-block;
    padding: 15px;
    font-size: 22px;
    font-weight: 600;
    color: #151e4a;
    margin-right: 30px;

    @media screen and (max-width: ${breakPoint.tabletS - 1}px){
      padding: 5px;
      font-size: 12px;
      margin-right: 5px;
    }
  }
`