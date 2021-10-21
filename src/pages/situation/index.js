import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled from '@emotion/styled'
import { Spin } from 'antd';

import breakPoint from "assets/styles/breakPoints";
import worldSituationApi from "api/situation/worldSituationApi";

import Filterer from "components/common/Filterer";
import Pagination from "components/common/Pagination";
import Modal from "components/common/Modal";
import ModalContent from 'components/situation/ModalContent';
import BarChart from "components/common/BarChart"

const USER_PER_PAGE = 20;
const Situation = () => {
  const [data, setData] = useState([]);
  const [globalData, setGlobalData] = useState({})
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ sortBy: "" });
  const [hideModal, setHideModal] = useState(true);
  const [cityDataDetail, setCityDataDetail] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [noticedList, setNoticedList] = useState([])

  const pageVisited = pageNumber * USER_PER_PAGE;
  const displayCountry = data.slice(pageVisited, pageVisited + USER_PER_PAGE);

  const _onChangeFilter = useCallback((key, value) => {
    setFilter(filter => ({ ...filter, [key]: value }))
  }, [])

  const _getSituation = useCallback(async () => {
    try {
      const covidSituation = await worldSituationApi.getSituation();
      setData(covidSituation.Countries);
      setGlobalData({
        Confirmed: covidSituation.Global.TotalConfirmed,
        Deaths: covidSituation.Global.TotalDeaths,
        Recovered: covidSituation.Global.TotalRecovered,
      })
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }, [])

  const _onChangePage = useCallback((page) => {
    setPageNumber(page)
  }, [])

  const _onShowCountryDetail = useCallback((country) => () => {
    setHideModal(false);
    setCityDataDetail(country);
  }, [])

  const _onCloseModal = useCallback(() => {
    setHideModal(true);
  }, [])

  const _checkActive = useMemo(() => (name) => {
    return (noticedList.findIndex(item => item.Slug === name) !== -1)
  }, [noticedList])

  const _onBookmark = useCallback((updatedList) => {
    setNoticedList(updatedList);
  }, [])

  useEffect(() => {
    _getSituation();
  }, [_getSituation]);

  useEffect(() => {
    setData((data) => {
      return [...data].sort((a, b) => {
        if (filter.sortBy === "confirmed") return b.TotalConfirmed - a.TotalConfirmed;
        else if (filter.sortBy === "death") return b.TotalDeaths - a.TotalDeaths;
        else if (filter.sortBy === "recovered") return a.TotalRecovered - b.TotalRecovered;
        else return a.Country?.toUpperCase() > b.Country?.toUpperCase() ? 1 : -1;
      })
    })

  }, [filter.sortBy]);

  useEffect(() => {
    const list = localStorage.getItem("noticedList");
    if (list !== null) {
      setNoticedList(JSON.parse(list))
    } else setNoticedList([])
  }, []);

  return (
    <Wrapper>
      <TableSection>
        <TableTitle>COVID19 SITUATION</TableTitle>
        <Filterer filterData={FILTER} onChangeFilter={_onChangeFilter} />
        <CityTable>
          <thead>
            <RowItem>
              <th>Name</th>
              <th>Total Confirmed Case</th>
              <th>Total Deaths Case</th>
              <th>Total Recovered Case</th>
            </RowItem>
          </thead>
          <tbody>
            {data.length ? displayCountry.map((country, idx) => {
              return (
                <RowItem key={idx} active={_checkActive(country.Slug)}>
                  <td onClick={_onShowCountryDetail(country)}>{country.Country}</td>
                  <td>{country.TotalConfirmed}</td>
                  <td>{country.TotalDeaths}</td>
                  <td>{country.TotalRecovered}</td>
                </RowItem>
              )
            }) : null}
          </tbody>
        </CityTable>
        {loading ? <Loading><Spin tip="Loading..." size="large" /></Loading> : null}
        {!data.length && loading === false && <Nodata>No Data</Nodata>}
        <Pagination totalRows={data.length} limit={USER_PER_PAGE} page={pageNumber} onChangePage={_onChangePage} />
        <Modal hidden={hideModal} onCloseModal={_onCloseModal} >
          <ModalContent
            slug={cityDataDetail?.Slug || ""}
            name={cityDataDetail?.Country || ""}
            countryData={cityDataDetail}
            onBookmark={_onBookmark}
          />
        </Modal>
      </TableSection>
      <SummarySection>
        <BarChart data={globalData} />
        <SummaryTitle>Global Situation</SummaryTitle>
      </SummarySection>
    </Wrapper>
  );
};


Situation.propTypes = {

};

const FILTER = [
  {
    key: 'sortBy',
    label: "Sort By:",
    options: [
      {
        label: 'Total Confirmed Cases',
        value: 'confirmed',
      },
      {
        label: 'Number Of Deaths',
        value: 'death',
      },
      {
        label: 'Number Of Recovered Cases',
        value: 'recovered',
      }
    ]
  },
  // {
  //   key: 'status',
  //   label: "Status",
  //   options: [
  //     {
  //       label: 'Total Confirmed Cases',
  //       value: 'confirmed',
  //     },
  //     {
  //       label: 'Number Of Deaths',
  //       value: 'death',
  //     },
  //     {
  //       label: 'Number Of Recovered Cases',
  //       value: 'recovered',
  //     }
  //   ]
  // }
]


export default Situation;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  padding-top: 0;

  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    flex-direction: column;
  }
`
const TableSection = styled.div`
  width: 60%;
  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    width: 100%;
    margin-bottom: 50px;
  }
`
const CityTable = styled.table`
  width: 100%;
  margin-bottom: 20px;

  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    margin-top: 10px;
  }
`

const TableTitle = styled.p`
  display: none;
  font-size: 15px;
  font-weight: 600;
  color: #ababab;
  text-align: center;
  margin-bottom: 10px;

  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    display: block;
  }
`

const RowItem = styled.tr`
  text-align: center;
  border: 1px solid #000;
  background-color: ${props => props.active ? "rgba(235, 42, 42,0.2)" : ""};

  th:nth-of-type(1) {
    width: 245px;
  }
  td:nth-of-type(1) {
    cursor: pointer;
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

const Loading = styled.div`
width: 100%;
display: flex;
justify-content: center;
padding-top: 20px;
`

const SummarySection = styled.div`
  width: 40%;
  height: 510px;
  margin-left: 20px;
  margin-bottom: 70px;
  
  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    width: 100%;
    height: 250px;
    margin-left: 0;
    margin-bottom: 100px;
  }
`
const SummaryTitle = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  margin-top: 20px;
`