import React from 'react';
import {fabric} from 'fabric';
import {CirclePicker} from 'react-color';

import FabricCanvas from './FabricCanvas'
import TemplateList from './TemplateList'
import TemplateListItem from './TemplateListItem'
import {back_arm, back_banding, back_body, back_stripe, front_arm, front_body, front_button, front_stripe, front_banding} from './images/templates/templatelist';
import MyGroupList from '../GroupPage/MyGroupList';

import ImageUploader from 'react-images-upload';




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
		this.onDrop = this.onDropFront.bind(this);
		this.onDrop = this.onDropBack.bind(this);
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

	handleChangeComplete = (color, event) => {
		this.fontcolor = color.hex
	}

	addText(isFront) {
		console.log("addText")
		let text = new fabric.IText(document.getElementById("text_area").value, {
			fontFamily: document.getElementById("text_font").value,
			fill: this.fontcolor,
			fontStyle: document.getElementById("text_style").value,
			fontSize: document.getElementById("text_size").value,
			zIndex: 10
			// objecttype: 'image',
		})

		console.log(text)
		if(isFront) {
			this.setState({activeFrontProperty: text})
		}
		else {
			this.setState({activeBackProperty: text})
		}
		
	}
	onDropFront = (e) => {
        console.log("hey");

        e.preventDefault();
        var preview = document.getElementById('img_front');
        var file = document.getElementById('input_front').files[0];
		let reader = new FileReader();
		let img_front;
        reader.addEventListener("load", function() {
            preview.src = reader.result; 
            console.log(preview.width);
            console.log(preview.height);
          
            var imgInstance = new fabric.Image(preview, {
            width: 899,
            height:959,
            the_type: "upload",
            zIndex: 3
            });
            console.log("imgInstance set");
            imgInstance.set({
                scaleY: 0.1,
                scaleX: 0.1,
                originX: "center",
                originY: "center"
            });
			console.log("imgInstance scale");
			
			img_front = imgInstance;
			console.log(img_front);
			this.setState({activeFrontProperty: img_front});
            
        },false);
    
        
        if (file) {
			reader.readAsDataURL(file);
			
			
		}
		
		//this.setState({activeFrontProperty: img_front});
	
       
    }
	onDropBack = (e) => {
       
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

<TemplateList 
									data = {front_banding}
									property_type = "front_banding"
									zIndex = {2}
									addtocanvas = {this.addToFrontCanvas}
								/>

	{/*<!--========================================
			left design tool
    =========================================-->*/}
		<div class="design_tool">
			
			<textarea id="text_area"> Hello </textarea>
			
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
				<CirclePicker id="text_colour" onChangeComplete={this.handleChangeComplete}/>
						
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
				<p>Font Size :</p> <input type="range"  min="0" max="200" defaultValue="100" id="text_size" />
			</div>
		</div>
				

		{/*<!--========================================
			front-back button section
    =========================================-->*/}
		<div class="change_side">
			<button class="front_btn" type="button" onClick={() => this.addText(true)}>Front</button>
			<button class="back_btn" type="button" onClick={() => this.addText(false)}>Back</button>
		</div>

		

		{/*<!--========================================
			Image Upload Modal
    =========================================-->*/}
		
						<h4 class="modal-title">Upload image Front</h4>
						<input type = "file"
                         id = "input_front" 
                         onChange = {this.onDropFront} />
                  		<img src = "" 
                        id = "img_front" />

						<h4 class="modal-title">Upload image Back</h4>
						<input type = "file"
                         id = "input_front" 
                         onChange = {this.onDropBack} />
                  		<img src = "" 
                        id = "img_back" />
					
						

					    
				

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
