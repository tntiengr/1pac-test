import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import breakPoint from "assets/styles/breakPoints";

const CountryTag = ({ country = {} }) => {
  return (
    <Wrapper>
      <Flag src={country?.flags?.png || ""} alt="country flag" />
      <Information>
        <p>{country.name.official}</p>
        <p>Official Name: {country.name.official}</p>
        <p>Population: {country.population}</p>
        <p>Capital: {country.capital[0]}</p>
      </Information>
    </Wrapper>
  );
};


CountryTag.propTypes = {
  country: PropTypes.object,
};


export default CountryTag;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 100%;
  height: 120px;
  padding: 5px;

  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    flex-direction: row;
    flex-wrap: wrap;
  }
`
const Flag = styled.img`
  width: 75px;
  height: 50px;
  margin-right: 10px;
  object-fit: contain;
  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    width: 100%;
    height: 70%;
    margin-right: 0;
  }
`

const Information = styled.div`
  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    width: 100%;
    text-align: center;
  }

  & p{
    &:nth-of-type(1){
        display: none;
        font-size: 12px;
      }
    
    @media screen and (max-width: ${breakPoint.tabletS - 1}px){
      display: none;
      &:nth-of-type(1){
        display: block;
      }
    }
  }
`
