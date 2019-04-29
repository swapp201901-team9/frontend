import React from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';

class Root extends React.Component {
    render() {

        return (
          <div className="app">
          < NavBar/>
          <section className="wrap clear col3">
          <div className="aside">
            <h2 className="h_white">SELECT STYLE</h2>
            <div className="content">
            <p> contents </p>
            </div>
          </div>
          <div className="main">
            <h2 className="h_white">SAMPLE VIEW</h2>
            <div className="content">
            <p> contents </p>
            </div>
          </div>
          <div className="aside">
            <h2 className="h_black">MY GROUP</h2>
            <div className="content">
            <p> contents </p>
            </div>
          </div>
          </section>
        </div>


        )
    }
}

export default Root;
