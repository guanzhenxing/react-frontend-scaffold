/**
 * Created by guanzhenxing on 2017-03-17.
 */
import {connect} from 'react-redux';
import Login from '../../components/Login';
import {login, cleanError,logout} from '../../actions/auth/auth-action';


function mapStateToProps(state) {

    let error = state.auth.get('error');

    return {
        error: error && error.message
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (user) => dispatch(login(user)),
        logout:()=>dispatch(logout()),
        cleanError: () => dispatch(cleanError())
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Login);