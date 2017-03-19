/**
 * Created by guanzhenxing on 2017-03-17.
 */
import {connect} from 'react-redux';
import Login from '../../components/Login';
import {login, cleanError} from '../../actions/auth/AuthAction';


function mapStateToProps(state) {

    let error = state.auth.get('error');

    return {
        error: error && error.message
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (user) => dispatch(login(user)),
        cleanError: () => dispatch(cleanError())
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Login);