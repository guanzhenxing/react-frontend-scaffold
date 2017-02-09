/**
 * Created by guanzhenxing on 2017-02-09.
 */
import React, {
    Component,
    PropTypes,
} from 'react';
import logo from './logo.svg';
import styles from './App.css';

class App extends Component {

    componentDidMount() {
        this.props.fetchData('This is a fetch data');
    }


    render() {
        return (
            <div className={styles["App"]}>
                <div className={styles["App-header"]}>
                    <img src={logo} className={styles["App-logo"]} alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className={styles["App-intro"]}>
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                {this.props.data}
            </div>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;
