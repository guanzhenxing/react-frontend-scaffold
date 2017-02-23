import {connect} from 'react-redux'
import App from '../../components/App';

/**
 * state映射
 * @param state
 * @param ownProps
 */
const mapStateToProps = (state, ownProps) => ({
    data: state.app.data
});
/**
 * dispatch方法映射
 * @param dispatch
 */
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App)
