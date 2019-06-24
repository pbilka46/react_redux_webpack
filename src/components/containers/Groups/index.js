import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Groups from '../../organisms/Groups';
import { getAllEntities } from '../../../reducers';
import { subscribeGroup, unSubscribeGroup, select } from '../../../actions';

const mapStateToProps = state => ({
  groups: getAllEntities(state.groups),
});

const mapDispatchToProps = dispatch => bindActionCreators({
  subscribeGroup,
  unSubscribeGroup,
  select,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
