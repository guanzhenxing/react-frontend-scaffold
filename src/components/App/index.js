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
            <div className={styles['logo']}>This is a ReactJs APP</div>
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
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{height: '100%'}}
        >
            <SubMenu key="sub1" title={<span><Icon type="user"/>subnav 1</span>}>
                <Menu.Item key="1">option1</Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop"/>subnav 2</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="notification"/>subnav 3</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
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

