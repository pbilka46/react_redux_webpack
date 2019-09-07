import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllEntities, getEntitiesAmount, isLoading } from "../../../reducers";

import ListBase from '../../presentational/List';

/**
 * This component renders presentational ListBase component
 */
const ListContainer = ({
                         items, loading, header, row
                       }) => (
  <ListBase
    header={header}
    length={items.length}
    loading={loading}
  >
    {
      (id, isScrolling, styles) => (row(id, items[id], styles))
    }
  </ListBase>
);

ListContainer.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
  header: PropTypes.object,
  row: PropTypes.func,
};

const mapStateToProps = (state, { listSource }) => ({
  items: getAllEntities(state[listSource]),
  loading: isLoading(state[listSource]),
  length: getEntitiesAmount(state[listSource])
});
export default connect(mapStateToProps)(ListContainer);
