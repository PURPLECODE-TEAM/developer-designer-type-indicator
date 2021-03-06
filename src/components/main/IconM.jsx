import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconImg = styled.img`
  width: 7rem;
  object-fit: contain;
  margin-top: ${(props) => props.top}rem;
  margin-left: ${(props) => props.left}rem;
  margin-right: ${(props) => props.right}rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const IconM = ({ src, alt, top, left, right }) => {
  return <IconImg src={src} alt={alt} top={top} left={left} right={right} />;
};

IconM.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
};

IconM.defaultProps = {
  top: '0',
  left: '0',
  right: '0',
};

export default IconM;
