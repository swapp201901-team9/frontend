import React from 'react';
import {fabric} from 'fabric';
import {CirclePicker} from 'react-color';

import FabricCanvas from './FabricCanvas'
import TemplateList from './TemplateList'
import {bglist, facelist, eyeslist, faciallist, hairlist} from './images/templates/templatelist';
import MyGroupList from '../GroupPage/MyGroupList';


//the templates are imported as images and passed as porps to the TemplateList components.
//if the user chooses any of the properties, the state gets updated in the DesignPage component
//it gets passed onto FabricCanvas as prop
//FabricCanvas uses lifecycle method ComponentWillReceiveProps() to update the canvas 
//about saveToCanvas: use a method from fabric named TODataUrl()

export default class DesignPage extends React.Component {
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
	
    handleChange(color, event) {

	}
	

    render() {
      return (
      <div>
				<section className="wrap clear col3">
              <div className="aside">
                <h2 className="h_white">SELECT STYLE</h2>
                <div className="content">
								<TemplateList 
									data = {facelist}
									property_type = "face"
									zIndex= {0}
									addtocanvas = {this.addToCanvas}
								/>
								<TemplateList 
									data = {eyeslist}
									property_type = "eyes"
									zIndex = {2}
									addtocanvas = {this.addToCanvas}
								/>
								<TemplateList 
									data = {faciallist}
									property_type = "beard"
									zIndex = {2}
									addtocanvas = {this.addToCanvas}
								/>
								<TemplateList 
									data = {hairlist}
									property_type = "hair"
									zIndex = {2}
									addtocanvas = {this.addToCanvas}
								/>
								<TemplateList 
									data = {bglist}
									property_type = "bg"
									zIndex = {-9999}
									addtocanvas = {this.addToCanvas}
								/>
								{/*<!--========================================
			left design tool
    =========================================-->*/}
		<div class="design_tool">
			
						<textarea id="text_area"> Hello
						</textarea>
					    <p>Choose a font</p>
						<select id="text_font">
				        			{/*<!-- all fonts -->*/}
									<option>arial</option>
									<option>tahoma</option>
									<option>times new roman</option>
									<option>anton</option>
									<option>Akronim</option>
									<option>Alex Brush</option>
									<option>Aguafina Script</option>
						        </select>
					        	<p>Text colour</p>
					        	{/*<!-- colour -->*/}
										{/*<input type="text" id="text_colour" />*/}
										<CirclePicker onChange={ this.handleChange } />
				        	<p>Text style</p>
			        		<select id="text_style">

			        			{/*<!-- font style -->*/}
								<option>normal</option>
								<option>italic</option>
								<option>oblique</option>
								<option>bold</option>
					        </select>
				        
				        <div class="font_size">
				        	{/*<!-- font size -->*/}
				        	<p>Font Size :</p> <input type="range"  min="0" max="100" value="30" id="text_size" />
				        </div>
						</div>
				

		{/*<!--========================================
			front-back button section
    =========================================-->*/}
		<div class="change_side">
			<button class="front_btn" type="button">Front</button>
			<button class="back_btn" type="button">Back</button>
		</div>

		

		{/*<!--========================================
			Image Upload Modal
    =========================================-->*/}
		
						<h4 class="modal-title">Upload image</h4>
					
						<input 
						id = "imageLoader" 
						name = "imageLoader"
						type="file"/>
					
						<button type="button" class="btn btn-default btn_add_image" name="button">Upload</button>

					    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				

			</div>
          </div>
              <div className="main">
                <h2 className="h_white">SAMPLE VIEW</h2>
                <div className="content">
                {/*<!--========================================
			front-back button section
	=========================================-->*/}
	<button class="front_btn" type="button">Front</button>
	<FabricCanvas 
	activeProperty = {this.state.activeProperty}
	/>	
	
	<button class="back_btn" type="button">Back</button>
	<FabricCanvas 
	activeProperty = {this.state.activeProperty}
	/>

                </div>
              </div>
              <div className="aside">
                <h2 className="h_black">MY GROUP</h2>
                <div className="content">
                  <MyGroupList />
                </div>
              </div>
            </section>
				
		


	
      </div>
 
      );
    }
  }
