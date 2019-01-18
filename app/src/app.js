import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { checkAuthenticated } from './actions/checkAuthenticated';

import Main from './components/auth/Main.js';
import Login from './components/auth/Login.js';
import NotFound from './components/auth/NotFound.js';
import Callback from './components/auth/Callback.js';
import NavBar from './components/NavBar';

import styled from 'styled-components';

const MainWrapper = styled.div`
  .top-nav {
    grid-area: Nav;
    position: sticky;
    top: 0;
    background-color: white;
  }

  .side-nav {
    grid-area: Side;
    background-color: turquoise;
    display: flex;
    flex-direction: column;
  }

  .main {
    grid-area: Main;
    background-color: lightgreen;
  }

  @media (max-width: 600px) {
    margin: 0 auto;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 1fr;
    grid-template-areas: 
    "Nav"
    "Main"
    "Side"
  }

  @media (max-width: 600px) {
    .side-nav {
      display: none;
    }
  }

  @media (min-width: 600px) {
    margin: 0 auto;
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 1fr 4fr;
    grid-template-areas: 
    "Nav Nav"
    "Side Main"
  }
`;

class App extends Component {

  componentDidMount(){
    this.props.auth.isAuthenticated() ? this.props.checkAuthenticated() : null
  }

  render() {
    let mainComponent = "";
    switch(this.props.location.pathname){
        case "/":
            mainComponent = <Login {...this.props}/>;
            break;
        case "/callback":
            mainComponent = <Callback />;
            break;
        case "/home":
            mainComponent = this.props.auth.isAuthenticated() ? <Main {...this.props} /> : <NotFound {...this.props} />
            break;
        default:
            mainComponent = <Main {...this.props} />;
    }

    console.log("app.js props: ", this.props)

    return (
      <MainWrapper>
        <div className="top-nav">
          <NavBar auth={this.props.auth} mainComponent={mainComponent} />
        </div>
        <div className="side-nav">
          Side Nav
        </div>
        <div className="main">
          {this.props.children}
        </div>
      </MainWrapper>
    )
  }
}

const bindActions = (dispatch) => ({
  checkAuthenticated: (bool) => dispatch(checkAuthenticated(bool)),
});

const mapStateToProps = (state) => ({
  router: state.router,
  checkAuth: state.checkAuth,
});

export default withRouter(connect(mapStateToProps, bindActions)(App));

