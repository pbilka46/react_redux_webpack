import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGroups } from '../../../actions';
import { getAllEntities } from '../../../reducers';

import Button from '../../atoms/Button';
import Heading from '../../atoms/Text/Heading';
import PageBase from '../PageBase';

const redirect = (path) => (history) => {
  history.push(path);
};

const GroupsPage = ({ dispatch, groups, history }) => {
  const fetchGroups = () => {
    dispatch(getGroups());
  };

  const handleClick = path => () => redirect(path)(history);

  return (
    <PageBase
      header={(
        <>
          <Heading>Discover interest groups</Heading>
          <Button onClick={handleClick('/groups/create')}>New group</Button>
        </>
      )}
      onMountAction={fetchGroups}
    >
      {groups.map((group, index) => (<p key={index}>{group.name}</p>))}
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
