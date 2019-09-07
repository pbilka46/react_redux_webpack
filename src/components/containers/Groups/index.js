import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Groups from '../../organisms/GroupsList';
import { getAllEntities } from '../../../reducers';
import { subscribeGroup, unSubscribeGroup, select } from '../../../actions';

const mapStateToProps = state => {
  return { groups: getAllEntities(state.chat.groups) }
};

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribeGroup,
  unSubscribeGroup,
  select,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
