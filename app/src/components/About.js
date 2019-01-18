import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AnchorLink from 'react-anchor-link-smooth-scroll'

import styled from 'styled-components';

const MainWrapper = styled.div`

  .aboutTop {
    display: flex;
    flex-direction: column;
  }

  .anch {
    height: 300px;
    margin: 5px 0px;
    padding: 5px;
  }

  .one {
    background-color: red;
  }

  .two {
    background-color: yellow;
  }

  .three {
    background-color: brown;
  }

  .four {
    background-color: blue;
  }
`;

const About = (props) => {
  console.log("about props: ", props)
  return (
    <MainWrapper>
      <div className="aboutTop">
        About
        <Link to="/home">Back</Link>
        <AnchorLink offset='50' href='#one'>section 1</AnchorLink>
        <AnchorLink offset='50' href='#two'>section 2</AnchorLink> 
        <AnchorLink offset='50' href='#three'>section 3</AnchorLink>
        <AnchorLink offset='50' href='#four'>section 4</AnchorLink> 
      </div>
      <div className="one anch" id="one"> 
        <div>One</div>
      </div>
      <div className="two anch" id="two"> 
        <div>Two</div>
      </div>
      <div className="three anch" id="three"> 
        <div>Three</div>
      </div>
      <div className="four anch" id="four"> 
        <div>Four</div>
      </div>

    </MainWrapper>
  )
}

const mapStateToProps = (state) => ({
  checkAuth: state.checkAuth,
});

export default connect(mapStateToProps, null)(About);
