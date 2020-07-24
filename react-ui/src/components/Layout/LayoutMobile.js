import React, { Component } from 'react';
import { Layout, Button, Icon } from 'antd';
import { Link } from 'react-router-dom'
import Router from '../Router.js'
const { Header, Content } = Layout;

export default class LayoutMobile extends Component {
  render() {
    return (
      <Layout>
        <Header>
          <h1 style = {{fontSize: 20, textAlign: 'center', color: 'white'}}> Kansas City Tow Lots </h1>
        </Header>
        <Content style = {{backgroundColor: '#F8F8FF'}}>
          <Button style = {{width: '100%', backgroundColor: '#001529', color: 'white', fontWeight: 'bold'}}><Link to='/'><Icon type="home" />Home</Link></Button>
          <br />
          <a style={{ textDecoration: 'none' }} href='https://data.kcmo.org/view/2uje-k9n5' rel="noopener noreferrer" target='_blank'> <Button style = {{width: '100%', color: 'white', backgroundColor: '#001529', fontWeight: 'bold'}}> <Icon type="car" /> Auction Information </Button> </a>
          <br />
          <Button style = {{width: '100%', color: 'white', backgroundColor: '#001529', fontWeight: 'bold'}}><Link to='/login'> <Icon type="login" /> Login </Link></Button>
          <Router />
        </Content>
      </Layout>
    )
  }
}
