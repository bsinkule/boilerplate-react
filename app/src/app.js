import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import ScrollableAnchor, { configureAnchors, goToTop, goToAnchor } from 'react-scrollable-anchor';

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

  .anch {
    height: 300px;
  }

  .one {
    grid-area: One;
    background-color: red;
  }

  .two {
    grid-area: Two;
    background-color: yellow;
  }

  .three {
    grid-area: Three;
    background-color: brown;
  }

  .four {
    grid-area: Four;
    background-color: blue;
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
    "One"
    "Two"
    "Three"
    "Four"
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
    "One One"
    "Two Two"
    "Three Three"
    "Four Four"
  }
`;

class App extends Component {

  componentDidMount(){
    this.props.auth.isAuthenticated() ? this.props.checkAuthenticated() : null
  }

  componentWillMount() {
    configureAnchors({offset: -5, scrollDuration: 1500})
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
          <a href='#one'>section 1</a>
          <a href='#two'>section 2</a> 
          <a href='#three'>section 3</a>
          <a href='#four'>section 4</a> 
        </div>
        <div className="main">
          {this.props.children}
        </div>
        <div className="one anch"> 
          <ScrollableAnchor id={"one"} >
            <div>One</div>
          </ScrollableAnchor>
        </div>
        <div className="two anch"> 
          <ScrollableAnchor id={"two"}>
            <div>Two</div>
          </ScrollableAnchor>
        </div>
        <div className="three anch"> 
          <ScrollableAnchor id={"three"}>
            <div>Three</div>
          </ScrollableAnchor>
        </div>
        <div className="four anch"> 
          <ScrollableAnchor id={"four"}>
            <div>Four</div>
          </ScrollableAnchor>
          {/* <div onClick={goToTop}> Top </div> */}
          {/* <div onClick={() => goToAnchor("one")}> Anchor One </div> */}
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

