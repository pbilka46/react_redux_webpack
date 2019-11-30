import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMessages } from '../../../reducers';
import Messages from '../../organisms/Messages';
import { getRecentMessages } from "../../../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    messages: getMessages(state.chat, ownProps.selectedGroup),
  };
};

export default connect(mapStateToProps)(Messages);
