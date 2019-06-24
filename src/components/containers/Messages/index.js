import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSelectedGroup, getMessagesByGroupId } from '../../../reducers';
import { subscribeGroup, unSubscribeGroup } from '../../../actions';
import Messages from '../../organisms/Messages';

const mapStateToProps = (state) => {
  const selected = getSelectedGroup(state.messages);

  console.log(state)
  
  return {
    messages: getMessagesByGroupId(state.messages, selected),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
