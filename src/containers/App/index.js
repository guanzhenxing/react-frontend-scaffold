import {connect} from 'react-redux'
import App from '../../components/App';
import {searchUserName, changeUserName} from '../../actions/App';

/**
 * state映射
 * @param state
 * @param ownProps
 */
const mapStateToProps = (state, ownProps) => ({});
/**
 * dispatch方法映射
 * @param dispatch
 */
const mapDispatchToProps = (dispatch) => ({
    searchUserName: (userName) => dispatch(searchUserName(userName)),
    changeUserName: (value) => dispatch(changeUserName(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
