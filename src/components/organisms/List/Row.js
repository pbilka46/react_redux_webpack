import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ style, children }) => {
  return (
    <div style={style}>
      { children }
    </div>
  );
};

Row.propTypes = {
  style: PropTypes.object,
  children: PropTypes.object,
};

export default Row;
