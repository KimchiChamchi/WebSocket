import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space,  } from 'antd';

import { Wallet, CreateWallet, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar, Test } from './components';
import './App.css';
import BlockStatus from './components/BlockStatus';

const App = () => (
  <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/wallet">
              <Wallet />
            </Route>
            <Route exact path="/createwallet">
              <CreateWallet />
            </Route>
            <Route exact path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>
            <Route exact path="/crypto/:coinId">
              <CryptoDetails />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
            <Route exact path="/blockstatus">
              <BlockStatus />
            </Route>
            <Route path="/port1" component={Test} exact={true}>
              <Test />
            </Route>
            <Route exact path="/por2">
              <News />
            </Route>
            <Route exact path="/por3">
              <News />
            </Route>
            <Route exact path="/blockstatus">
              <BlockStatus />
            </Route>
          </Switch>
        </div>
      </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2022
          <Link to="/">
            경일게임아카데미 Inc.
          </Link> <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/wallet">Wallet</Link>
          <Link to="/news">News</Link>
        </Space>
      </div>
    </div>
  </div>
);

export default App;
