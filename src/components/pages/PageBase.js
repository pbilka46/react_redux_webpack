import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Heading from '../atoms/Text/Heading';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 64px 1.25rem;
  min-height: 100%;
`;

const PageBase = ({ onMountAction, title, children }) => {
  
  useEffect(() => {
    onMountAction();
  }, []);
  
  return (
    <Wrapper>
      
      <Heading tag="h1">{title}</Heading>
      {children}
    </Wrapper>
  );
};

PageBase.propTypes = {
  onMountAction: PropTypes.func,
  title: PropTypes.string,
}

PageBase.defaultProps = {
  onMountAction: () => {},
};

export default PageBase;
