import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { PageHeader } from '../molecules/PageHeader';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  padding: 64px 1.25rem;
  min-height: 100%;
`;

const PageBase = ({ onMountAction, header, children }) => {
  useEffect(() => {
    onMountAction();
  }, []);

  return (
    <Wrapper>
      <PageHeader>{header}</PageHeader>
      {children}
    </Wrapper>
  );
};

PageBase.propTypes = {
  onMountAction: PropTypes.func,
  header: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  children: PropTypes.func,
};

PageBase.defaultProps = {
  onMountAction: () => {},
};

export default PageBase;
