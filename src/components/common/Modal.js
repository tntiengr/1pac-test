import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled'

import breakPoint from "assets/styles/breakPoints";

const Modal = ({ children, hidden = true, onCloseModal = () => { } }) => {

  const _onCloseModal = useCallback(() => {
    onCloseModal && onCloseModal();
  }, [onCloseModal])

  const _onClickModal = useCallback((e) => {
    if ((e.target.className.constructor.name === "String" || e.target.className.constructor.name === "Array") && e.target.className.includes("modal"))
      _onCloseModal()
  }, [_onCloseModal])

  return (
    <Wrapper hidden={hidden} className="modal" onClick={_onClickModal}>
      <ModalContent>
        <CloseButton onClick={_onCloseModal}>&times;</CloseButton>
        {children}
      </ModalContent>
    </Wrapper>
  );
};
Modal.propTypes = {
  hidden: PropTypes.bool,
  onCloseModal: PropTypes.func,
};


export default Modal;

const Wrapper = styled.div`
  display: ${props => props.hidden ? "none" : "block"};
  position: fixed; 
  z-index: 1;
  padding-top: 40px; 
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; 
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`
const CloseButton = styled.span`
  cursor: pointer;
  color: #888;
  font-size: 20px;
  font-weight: 600;
  float: right;
`

const ModalContent = styled.div`
  background-color: #f2f2f2;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;

  @media screen and (max-width: ${breakPoint.tabletS - 1}px){
    width: 80%;
  }
`