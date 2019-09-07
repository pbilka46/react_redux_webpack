import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getGroups } from '../../../actions';
import {getAllEntities, getSelectedGroup} from '../../../reducers';

import PageBase from '../PageBase';
const Groups = (props) => {
  const getGroups = () => {
    props.getGroups();
  };

  return (
    <PageBase
      title="Discover groups"
      onMountAction={getGroups}
    >
      
      {
        props.groups.map(group => (<p>{group.name}</p>))
      }
    </PageBase>
  )
};

const mapStateToProps = (state) => {
  return {
    groups: getAllEntities(state.groups)
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getGroups
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);

