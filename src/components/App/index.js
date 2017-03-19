/**
 * Created by guanzhenxing on 2017-03-08.
 */
import {Layout, Menu} from 'antd';
const {SubMenu} = Menu;
const {Header, Sider} = Layout;
import React, {
    Component,
    PropTypes,
} from 'react';
import styles from './index.css';

const buildHeader = (props) => {

    return (
        <Header className="header">
            <div className={styles['logo']}></div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{lineHeight: '64px'}}>
            </Menu>
        </Header>
    )

};

const buildMenu = (props) => {
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{height: '100%'}}>
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
        </Menu>
    )
}


class App extends Component {

    render() {

        let offsetHeight = window.document.body.offsetHeight;

        return (
            <Layout style={{height: offsetHeight}}>
                {buildHeader(this.props)}
                <Layout >
                    <Sider width={240} style={{background: '#fff'}}>
                        {buildMenu(this.props)}
                    </Sider>
                    <Layout style={{padding: '10px'}}>
                        {this.props.children}
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

App.propTypes = {};
App.defaultProps = {};

export default App;

