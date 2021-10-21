import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled'


const Pagination = ({ totalRows, limit, page, onChangePage = () => { } }) => {
  const totalPage = Math.ceil(totalRows / limit);
  const displayPage = page + 1;
  let displayPages = [displayPage - 1, displayPage, displayPage + 1];

  const _onChangePage = useCallback((page) => () => {
    onChangePage && onChangePage(page)
  }, [onChangePage])
  return (
    <Wrapper hidden={totalRows <= limit}>
      {displayPage > 1 ? <PreviousButton onClick={_onChangePage(page - 1)}>
        Previous
      </PreviousButton> : null}
      {displayPage > 2 && (
        <>
          <PaginationButton onClick={_onChangePage(0)}>1</PaginationButton>
          {displayPage > 3 && <PaginationButton>...</PaginationButton>}
        </>
      )}
      {displayPages.map((el, idx) => (
        <PaginationButton hidden={el > totalPage || el === 0} active={el === displayPage} key={idx} onClick={_onChangePage(el - 1)}>{el}</PaginationButton>
      ))}
      {displayPage < totalPage - 1 && (
        <>
          {displayPage < totalPage - 2 && <PaginationButton>...</PaginationButton>}
          <PaginationButton onClick={_onChangePage(totalPage - 1)}>{totalPage}</PaginationButton>
        </>
      )}
      {displayPage < totalPage ? <NextButton onClick={_onChangePage(page + 1)}>
        Next
      </NextButton> : null}

    </Wrapper>
  );
};


Pagination.propTypes = {
  totalRows: PropTypes.number,
  limit: PropTypes.number,
  page: PropTypes.number,
  onChangePage: PropTypes.func,
};


export default Pagination;

const Wrapper = styled.div`
  display: ${props => props.hidden ? "none" : "block"};
  float: right;
`

const PreviousButton = styled.button`
`

const NextButton = styled.button`
`

const PaginationButton = styled.button`
  ${props => props.active ? "background-color: #6c91f0; color: #fff" : ""};
  ${props => props.hidden ? "display: none;" : "display: inline;"}
`
