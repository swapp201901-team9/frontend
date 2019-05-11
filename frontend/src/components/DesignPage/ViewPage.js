import React from 'react';
import { connect } from 'react-redux';
import { ResetButton } from './ResetButton.js';
import { SaveButton } from './SaveButton.js';
import { FrontBackTab } from './FrontBackTab.js';
import FabricCanvas from './FabricCanvas'
import {fabric} from 'fabric'

export default class ViewPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			activeProperty : null
		};
	}

	addToCanvas = (imgElement, property_type, z_Index) => {
		var imgInstance = new fabric.Image(imgElement, {
			width: 400,
			height: 400,
			the_type: property_type,
			zIndex: z_Index
		});

		this.setState({activeProperty: imgInstance});
	}
	

    render() {
      return (
      <div>


		{/*<!--========================================
			preview and reset area
	=========================================-->*/}
	<FabricCanvas 
	activeProperty = {this.state.activeProperty}
	/>




		{/*<!--========================================
			t-shirt design area
    =========================================-->*/}
		


		{/*<!--========================================
			front-back button section
    =========================================-->*/}
			<button class="front_btn" type="button">Front</button>
			<button class="back_btn" type="button">Back</button>


		{/*<!--========================================
			preview image modal
    =========================================-->*/}
		

		</div>
      );
    }
  }
