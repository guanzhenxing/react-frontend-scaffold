import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import App from '../../components/App'

App.propTypes = {};


const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
