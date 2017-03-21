/**
 * Created by guanzhenxing on 2017-03-08.
 */
import {Layout, Menu, Dropdown, Icon} from 'antd';
const {SubMenu} = Menu;
const {Header, Sider} = Layout;
import React, {
    Component,
    PropTypes,
} from 'react';
import  styles from './index.css';
import {Link} from 'react-router'

const buildHeader = (props) => {


    const menu = (
        <Menu theme="dark" mode="horizontal">
            <Menu.Item key="logout"><Link to="/login">退出</Link></Menu.Item>
        </Menu>
    );

    let userId = props.userInfo['user_id'];
    let userName = props.userInfo['org_exinfo'] && props.userInfo['org_exinfo']['real_name'];

    return (
        <Header className="header">
            <div className={styles['logo']}>工程院项目信息化系统</div>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" href="#" style={{float: 'right', color: '#ffffff'}}>
                    {`${userName}(${userId})`} <Icon type="down"/> </a>
            </Dropdown>
        </Header>
    )

};

const buildMenu = (props) => {
    return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['teamCluster']}
            style={{height: '100%'}}>
            <Menu.Item key="teamCluster"><Link to="/teamCluster">项目集群</Link></Menu.Item>
            <Menu.Item key="t20team"><Link to="/t20team">T20(TEAM)</Link></Menu.Item>
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

App.propTypes = {
    user: PropTypes.object,
};
App.defaultProps = {};

export default App;

