import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const About = (props) => {
  return (
    <div>
      About
      <Link to="/home">Back</Link>
    </div>
  )
}

const mapStateToProps = (state) => ({
  checkAuth: state.checkAuth,
});

export default connect(mapStateToProps, null)(About);
