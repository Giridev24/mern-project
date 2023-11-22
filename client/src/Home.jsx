import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './login';
import './Home.css';

const Home = () => {
  return (
    <div className='home'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
