import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'
import Router from '../Router.js'
const { Header, Content } = Layout;

export default class LayoutDesktop extends Component {
  render() {
    return (
      <Layout>
        <Header>
          <h1 style = {{float: 'left', color: 'white'}}> Kansas City Tow Lots </h1>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{lineHeight: '64px', float: 'right'}}
          >
            <Menu.Item key="1"><Link to='/'><Icon type="home" />Home</Link></Menu.Item>
            <Menu.Item key="2"><a href='https://data.kcmo.org/view/2uje-k9n5' rel="noopener noreferrer" target='_blank'> <Icon type="car" /> Auction Information </a> </Menu.Item>
            <Menu.Item key="3"><Link to='/login'> <Icon type="login" /> Login </Link></Menu.Item>
          </Menu>
        </Header>
        <Content style = {{backgroundColor: '#F8F8FF'}}>
          <Router />
        </Content>
      </Layout>
    )
  }
}
