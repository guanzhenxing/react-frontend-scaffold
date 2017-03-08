import React, {PropTypes} from 'react'
// import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import App from '../components/App'
import * as todoActions from '../actions/index'

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
