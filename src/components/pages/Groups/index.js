import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getGroups } from '../../../actions';
import { getAllEntities, getSelectedGroup } from '../../../reducers';

import Button from '../../atoms/Button';
import Heading from '../../atoms/Text/Heading';
import PageBase from '../PageBase';

const redirect = (path) => (history) => {
  history.push(path);
};

const GroupsPage = ({ dispatch, groups, history }) => {
  const fetch = () => {
    dispatch(getGroups());
  };

  const handleClick = path => () => redirect(path)(history);

  return (
    <PageBase
      header={(
        <>
          <Heading>Odkrywaj grupy zainteresowań</Heading>
          <Button onClick={handleClick('/groups/create')}>Stwórz nową</Button>
        </>
      )}
      onMountAction={fetch}
    >
      {
        groups.map(group => (<p>{group.name}</p>))
      }
    </PageBase>
  );
};

GroupsPage.propTypes = {
  groups: PropTypes.array,
  history: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = state => ({
  groups: getAllEntities(state.groups)
});

export default connect(mapStateToProps)(GroupsPage);
