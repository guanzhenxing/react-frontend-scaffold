import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import App from '../../components/App'

const mapStateToProps = state => {

    return {
        userInfo: state.auth.toJS().user || {}
    }
};

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
