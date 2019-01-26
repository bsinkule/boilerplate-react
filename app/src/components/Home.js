import React from 'react';

import goalPNG from '../static/images/001-goal.png';
import flagPNG from '../static/images/002-flag.png';

const Home = () => {
  return (
    <div>
      Home   
      <img src={goalPNG} /> 
      <img src={flagPNG} /> 
    </div>
  )
}

export default Home;