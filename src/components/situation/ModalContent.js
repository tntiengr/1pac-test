import React, { useEffect, useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Spin } from 'antd';
import { HeartFilled } from '@ant-design/icons';

import breakPoint from "assets/styles/breakPoints";
import countryDetailApi from "api/situation/countryDetailApi";
import worldSituationApi from "api/situation/worldSituationApi";
import BarChart from "components/common/BarChart";

const TODAY = new Date();
const DATE = TODAY.toISOString().substr(0, 10);

const ModalContent = ({ slug = "", name = "", countryData = {}, onBookmark = () => { } }) => {
  const [country, setCountry] = useState({});
  const [covidDetails, setCovidDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noticedList, setNoticedList] = useState([]);
  const [chartData, setChartData] = useState({});

  const getCountryDetail = useCallback(async () => {
    try {
      if (name && slug) {
        const countryDetail = await countryDetailApi.getCountryDetail(name);
        const covidDetail = await worldSituationApi.getByCountry(slug);
        console.log("countryDetail: ", countryDetail)
        setCountry(countryDetail[0]);
        setCovidDetails(covidDetail);
        setLoading(false);
      }
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }, [name, slug])

  const _onBookmarkItem = useCallback(() => {
    if (noticedList.findIndex(item => item.Slug === countryData.Slug) !== -1) {
      const updatedList = noticedList.filter(item => item.Slug !== countryData.Slug);
      setNoticedList(updatedList);
      localStorage.setItem("noticedList", JSON.stringify(updatedList))
      onBookmark && onBookmark(updatedList)
    }
    else {
      const updatedList = noticedList.concat({ ...country, ...countryData });
      setNoticedList(updatedList)
      localStorage.setItem("noticedList", JSON.stringify(updatedList))
      onBookmark && onBookmark(updatedList)
    }
  }, [country, countryData, noticedList, onBookmark])

  const _checkActiveIcon = useMemo(() => {
    return (noticedList.findIndex(item => item.Slug === slug) !== -1)
  }, [noticedList, slug])

  const _onChangeDate = useCallback((e) => {
    const selectedData = covidDetails.find(item => item.Date.includes(e.target.value));
    setChartData(selectedData);
  }, [covidDetails])

  useEffect(() => {
    setLoading(true)
    getCountryDetail()
  }, [getCountryDetail]);

  useEffect(() => {
    const list = localStorage.getItem("noticedList");
    if (list !== null) {
      setNoticedList(JSON.parse(list))
    } else setNoticedList([])
  }, []);

  useEffect(() => {
    const selectedData = covidDetails.find(item => item.Date.includes(DATE));
    setChartData(selectedData);
  }, [covidDetails]);

  return (
    <Wrapper>
      {loading ? <Loading><Spin tip="Loading..." size="large" /></Loading> :
        <Wrap>
          <GeneralInfoSection>
            <Flag src={country?.flags?.png || ""} alt="country flag" />
            <GeneralContent>
              <p>Official Name: {country?.name?.official || country?.name?.common || ""}</p>
              <p>Population: {country?.population || ""}</p>
              <p>Capital: {country?.capital[0] || ""}</p>
              <p>Region: {country?.region || ""}</p>
              <p>Subregion: {country?.subregion || ""}</p>
              <HeartIcon onClick={_onBookmarkItem} className="heart_icon" active={_checkActiveIcon} />
            </GeneralContent>
          </GeneralInfoSection>
          <input
            type="date"
            id="date-picker"
            onChange={_onChangeDate}
            defaultValue={DATE}
            max={DATE}
            min={covidDetails[0].Date.substr(0, 10)}
          />
          <CovidInfoSection>
            <BarChart data={chartData?.ID ? chartData : covidDetails.pop()} />
          </CovidInfoSection>
        </Wrap>
      }
    </Wrapper>
  );
};


ModalContent.propTypes = {
  slug: PropTypes.string,
  name: PropTypes.string,
  countryData: PropTypes.object,
  onBookmark: PropTypes.func,
};


export default ModalContent;

const Wrapper = styled.div`
  min-height: 75vh;
`

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50px;
`
const Wrap = styled.div`
`

const GeneralInfoSection = styled.div`
  margin-bottom: 50px;
  margin-top: 10px;
  display: flex;
  align-items: center;

  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
  }
`

const Flag = styled.img`
  width: 300px;
  height: 200px;
  margin-right: 10px;
  object-fit: contain;

  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    width: 210px;
    height: 140px;
    margin-right: 0;
  }
`

const GeneralContent = styled.div`
  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    margin-top: 10px;
  }
`

const HeartIcon = styled(HeartFilled)`
  color: ${props => props.active ? "#e64e71" : "#ababab"};
  font-size: 20px;
  cursor: pointer;
`

const CovidInfoSection = styled.div`
`