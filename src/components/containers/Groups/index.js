import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DiscoverGroupsList, ChatGroupsList } from '../../organisms/GroupsList';
import { getAllEntities } from '../../../reducers';
import { subscribeGroup, unSubscribeGroup, selectGroup } from '../../../actions';

const mapStateToProps = state => ({ groups: getAllEntities(state.chat.groups) });

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribeGroup,
  unSubscribeGroup,
  select: selectGroup,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatGroupsList);
