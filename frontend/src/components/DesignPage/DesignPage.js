import React from 'react';
import {fabric} from 'fabric';
import {CirclePicker} from 'react-color';

import FabricCanvas from './FabricCanvas'
import TemplateList from './TemplateList'
import TemplateListItem from './TemplateListItem'
import {bglist, facelist, eyeslist, faciallist, hairlist, back_arm, back_banding,
back_body, back_stripe, front_arm, front_body, front_button, front_stripe} from './images/templates/templatelist';
import MyGroupList from '../GroupPage/MyGroupList';

import ImageUploader from 'react-images-upload';

const face = [

	require('./images/templates/faces/1.png'),

]



//the templates are imported as images and passed as porps to the TemplateList components.
//if the user chooses any of the properties, the state gets updated in the DesignPage component
//it gets passed onto FabricCanvas as prop
//FabricCanvas uses lifecycle method ComponentWillReceiveProps() to update the canvas 
//about saveToCanvas: use a method from fabric named TODataUrl()

export default class DesignPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			activeFrontProperty : null,
			activeBackProperty : null
		};
		//this.addToCanvas = this.addToCanvas.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}

	addToFrontCanvas = (imgElement, property_type, z_Index) => {
		var imgInstance = new fabric.Image(imgElement, {
			width: 899,
			height: 959,
			the_type: property_type,
			zIndex: z_Index
		});

		this.setState({activeFrontProperty: imgInstance});
	}

	addToBackCanvas = (imgElement, property_type, z_Index) => {
		var imgInstance = new fabric.Image(imgElement, {
			width: 899,
			height: 959,
			the_type: property_type,
			zIndex: z_Index
		});

		this.setState({activeBackProperty: imgInstance});
	}
	
    handleChange(color, event) {

	}
	addToBothCanvas = (imgElement, property_type, z_Index) => {
		var imgInstance = new fabric.Image(imgElement, {
			width: 899,
			height: 959,
			the_type: property_type,
			zIndex: z_Index
		});

		this.setState({
			activeFrontProperty: imgInstance,
			activeBackProperty: imgInstance
		});
	}
	
    handleChange(color, event) {

	}
	onDrop(picture) {
	   var myImage = new TemplateListItem('./images/templates/eyes/1.png', 'eye',2);
	   //myImage.src = './images/templates/eyes/1.png';
	   document.body.appendChild(myImage);
	   //this.addToCanvas(myImage, 'eye', 2);
       
	  //let imageUrl = './images/templates/eyes/1.png';
	  //var img = new Image(400,400);
	  //var img = document.createElement('img');
	  //img.src = imageUrl;
	  var imgInstance = new fabric.Image(myImage, {
		width: 400,
		height: 400,
		the_type: "eye",
		zIndex: 2
	});

	this.setState({activeProperty: imgInstance});
	  /*var img = new Image();
      img.src = imageUrl;
	  var imgI = new fabric.Image(imageUrl, {
		width: 400,
		height: 400,
		the_type: "eyes",
		zIndex: 2
	});
      this.setState({activeProperty: imgI});*/
	  
	 
    }
	

    render() {
      return (
      <div>
				<section className="wrap clear col3">
              <div className="aside">
                <h2 className="h_white">SELECT STYLE</h2>
                <div className="content">
								<TemplateList 
									data = {back_arm}
									property_type = "back_arm"
									zIndex = {0}
									addtocanvas = {this.addToBackCanvas}
								/>
								<TemplateList 
									data = {back_banding}
									property_type = "back_banding"
									zIndex = {0}
									addtocanvas = {this.addToBackCanvas}
								/>
								<TemplateList 
									data = {back_body}
									property_type = "back_body"
									zIndex = {0}
									addtocanvas = {this.addToBackCanvas}
								/>
								<TemplateList 
									data = {back_stripe}
									property_type = "back_stripe"
									zIndex = {2}
									addtocanvas = {this.addToBackCanvas}
								/>
								<TemplateList 
									data = {front_arm}
									property_type = "front_arm"
									zIndex = {0}
									addtocanvas = {this.addToFrontCanvas}
								/>
								<TemplateList 
									data = {front_body}
									property_type = "front_body"
									zIndex = {0}
									addtocanvas = {this.addToFrontCanvas}
								/>
								<TemplateList 
									data = {front_button}
									property_type = "front_button"
									zIndex = {2}
									addtocanvas = {this.addToFrontCanvas}
								/>
								<TemplateList 
									data = {front_stripe}
									property_type = "front_stripe"
									zIndex = {2}
									addtocanvas = {this.addToFrontCanvas}
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
						<ImageUploader 
                    	withIcon = {true}
                    	buttonText = 'Choose images'
                    	onChange = {this.onDrop}
                    	imgExtension = {['.jpg', '.gif', 'png', '.gif']}
                    	withPreview = {true}
                  		/>
						
						<TemplateList
						data = {face}
						property_type = "face"
						zIndex= {0}
						addtocanvas = {this.addToFrontCanvas}
						/>

					    
				

			</div>
          </div>
              <div className="main">
                <h2 className="h_white">SAMPLE VIEW</h2>
                <div className="content">
                {/*<!--========================================
			front-back button section
	=========================================-->*/}
	<FabricCanvas 
	activeFrontProperty = {this.state.activeFrontProperty}
	activeBackProperty = {this.state.activeBackProperty}
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
