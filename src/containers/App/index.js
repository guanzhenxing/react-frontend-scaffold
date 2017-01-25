import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import Explore from '../../components/Explore'
import {resetErrorMessage} from '../../actions'

class App extends Component {
    static propTypes = {
        errorMessage: PropTypes.string,
        resetErrorMessage: PropTypes.func.isRequired,
        inputValue: PropTypes.string.isRequired,
        children: PropTypes.node
    }

    handleDismissClick = e => {
        this.props.resetErrorMessage()
        e.preventDefault()
    }

    handleChange = nextValue => {
        browserHistory.push(`/${nextValue}`)
    }

    renderErrorMessage() {
        const {errorMessage} = this.props
        if (!errorMessage) {
            return null
        }

        return (
            <p style={{backgroundColor: '#e99', padding: 10}}>
                <b>{errorMessage}</b>
                {' '}
                (<a href="#" onClick={this.handleDismissClick}> Dismiss </a>)
            </p>
        )
    }

    render() {
        const {inputValue} = this.props;
        return (
            <div>
                <Explore value={inputValue}
                         onChange={this.handleChange}/>
                <hr />
                {this.renderErrorMessage()}
                {this.props.children}
            </div>
        )
    }
}

/**
 * state映射
 * @param state
 * @param ownProps
 */
const mapStateToProps = (state, ownProps) => ({
    errorMessage: state.errorMessage,
    inputValue: ownProps.location.pathname.substring(1)
});

/**
 * dispatch方法映射
 * @param dispatch
 */
const mapDispatchToProps = (dispatch) => ({
    resetErrorMessage: () => dispatch(resetErrorMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
