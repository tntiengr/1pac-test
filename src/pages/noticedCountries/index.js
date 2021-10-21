import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import CountryTag from "components/noticedCountries/CountryTag"
import Modal from "components/common/Modal";
import ModalContent from 'components/situation/ModalContent';

import breakPoint from "assets/styles/breakPoints";

const Noticed = () => {
  const [noticedList, setNoticedList] = useState([]);
  const [modalCountry, setModalCountry] = useState({});
  const [hideModal, setHideModal] = useState(true);

  const _onOpenModal = useCallback((country) => () => {
    setHideModal(false);
    setModalCountry(country)
  }, [])

  const _onCloseModal = useCallback(() => {
    setHideModal(true);
  }, [])

  const _onBookmark = useCallback((updatedList) => {
    setNoticedList(updatedList);
  }, [])

  useEffect(() => {
    const list = localStorage.getItem("noticedList");
    if (list !== null) {
      setNoticedList(JSON.parse(list))
    } else setNoticedList([])
  }, []);

  return (
    <Wrapper>
      <Title>Noticed Countries</Title>
      <ListCountries>
        {noticedList.length ?
          noticedList.map(country => {
            return (
              <WrapTag key={country.ID} onClick={_onOpenModal(country)}>
                <CountryTag country={country} />
              </WrapTag>

            )
          })
          : <Nodata>No Data</Nodata>}
      </ListCountries>
      <Modal hidden={hideModal} onCloseModal={_onCloseModal} >
        <ModalContent
          slug={modalCountry?.Slug || ""}
          name={modalCountry?.Country || ""}
          countryData={modalCountry}
          onBookmark={_onBookmark}
        />
      </Modal>
    </Wrapper>
  );
};

export default Noticed;

const Wrapper = styled.div`
  padding: 20px;
  padding-top: 20px;
  background-color: #f5f5f5;
  height: 100vh;
`
const Title = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #696969;
`
const ListCountries = styled.div`
  padding: 10px 0px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const WrapTag = styled.div`
  width: calc(33.3333% - 30px);
  margin: 15px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #e8e8e8;
  transition: background-color .2s ease-in-out;

  &:hover {
    background-color: #f1f0f7;
  }
  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    width: calc(50% - 20px);
    margin: 10px;
  }
`

const Nodata = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: grey;
  font-size: 24px;
  font-weight: 600;
`