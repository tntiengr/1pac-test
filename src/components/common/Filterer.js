import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled'

const Filterer = ({ filterData = [], onChangeFilter = () => { } }) => {

  const _onChangeFilter = useCallback((key) => (event) => {
    const value = event.target.value;
    onChangeFilter && onChangeFilter(key, value)
  }, [onChangeFilter])

  return (
    <Wrapper>
      {filterData.length ? filterData.map(filter => (
        <FilterSection key={filter.key}>
          <label htmlFor={filter.key}>{filter.label}</label>
          <select name={filter.key} id={filter.key} onChange={_onChangeFilter(filter.key)}>
            <option value="" selected>Choose a value</option>
            {filter.options.map((el, idx) => (
              <option key={idx} value={el.value}>{el.label}</option>
            ))}
          </select>
        </FilterSection>
      ))
        : null}
    </Wrapper>
  );
};


Filterer.propTypes = {
  filterData: PropTypes.array,
  onChangeFilter: PropTypes.func
};


export default Filterer;

const Wrapper = styled.div``

const FilterSection = styled.span`
  display: inline-block;
  margin-right: 20px;
  label {
    margin-right: 5px;
  }
`
