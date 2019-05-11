import React from 'react';
import {SwatchesPicker} from 'react-color';
import { connect } from 'react-redux';

export default class DesignPage extends React.Component {

    handleChange(color, event) {
      // color = {
      //   hex: '#333',
      //   rgb: {
      //     r: 51,
      //     g: 51,
      //     b: 51,
      //     a: 1,
      //   },
      //   hsl: {
      //     h: 0,
      //     s: 0,
      //     l: .20,
      //     a: 1,
      //   },
      // }
    }
  
    render() {
      return (<SwatchesPicker onChange={ this.handleChange } />);
    }
  }
