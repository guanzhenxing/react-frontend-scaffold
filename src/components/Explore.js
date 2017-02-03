import React, {Component, PropTypes} from 'react'
import {Input, Button} from 'antd';
import styles from './Explore.css';
const GITHUB_REPO = 'https://github.com/reactjs/redux';

export default class Explore extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setInputValue(nextProps.value)
        }
    }

    getInputValue = () => {
        return this.refs.input.value
    }

    setInputValue = (val) => {
        this.refs.input.value = val
    }

    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.handleGoClick()
        }
    }

    handleGoClick = () => {
        this.props.onChange(this.getInputValue())
    }

    render() {
        return (
            <div>
                <p>Type a username or repo full name and hit 'Go':</p>
                <div className={styles['search']}>
                    <Input ref="input" placeholder="Basic usage"
                           defaultValue={this.props.value}
                           onKeyUp={this.handleKeyUp}/>
                    <Button onClick={this.handleGoClick}>Go!!!</Button>
                </div>
                <p>
                    Code on <a href={GITHUB_REPO} target="_blank">Github</a>.
                </p>
                <p>
                    Move the DevTools with Ctrl+W or hide them with Ctrl+H.
                </p>
            </div>
        )
    }
}
