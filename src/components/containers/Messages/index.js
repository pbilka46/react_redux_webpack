import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMessages } from '../../../reducers';
import Messages from '../../organisms/Messages';

const mapStateToProps = (state, ownProps) => {
  
  return {
    messages: getMessages(state.chat, ownProps.selectedGroup),
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
