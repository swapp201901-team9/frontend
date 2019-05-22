import React from 'react';
import {connect} from 'react-redux';
import {fabric} from 'fabric';
import {CirclePicker} from 'react-color';

import FabricCanvas from './FabricCanvas'
import TemplateList from './TemplateList'
import {back_arm, back_banding, back_body, back_stripe, front_arm, front_body, front_button, front_stripe, front_banding} from './images/templates/templatelist';
import MyGroupList from '../GroupPage/MyGroupList';

import { toSaveDesign, toPostDesign } from '../../actions/index.js';

//the templates are imported as images and passed as porps to the TemplateList components.
//if the user chooses any of the properties, the state gets updated in the DesignPage component
//it gets passed onto FabricCanvas as prop
//FabricCanvas uses lifecycle method ComponentWillReceiveProps() to update the canvas 
//about saveToCanvas: use a method from fabric named TODataUrl()


class DesignPage extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			design_body : null,
			design_sleeve : null,
			design_banding : null,
			design_stripe : null,
			design_button : null,
			activeBackProperty : null,
			activeFrontProperty : null,
			isFront: true,
			frontImage: null,
			backImage: null,
		};

		this.onDrop = this.onDropFront.bind(this);
		this.onDrop = this.onDropBack.bind(this);
		this.changeSide = this.changeSide.bind(this);
	}

	body_color = ["f29c9f", "fff45c", "80c269", "00b7ee",
		"aa89bd",
		
		"910000",
		"f39800",
		"097c25",
		"0075a9",
		"601986",
		
		"580b0b",
		"cfcfcf",
		"626262",
		"001c58",
		"232323"]
	sleeve_color = [

		"942727",
		"a65824",
		"485a2f",
		"316863",
		"2e4373",
		"462355",
		"4a321f",
		"f8f8f8",
		"4f4f53",
		"2a2a2a"]
	stripe_color = ["f29c9f",
		"fff45c",
		"80c269",
		"00b7ee",
		"aa89bd",
		
		"910000",
		"f39800",
		"097c25",
		"0075a9",
		"601986",
		
		"580b0b",
		"ffffff",
		"cfcfcf",
		"001c58",
		"232323"]

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

	handleDesignChangeComplete = (color, event) => {
		let design_element = document.getElementById("design_element").value;
		switch(design_element) {
			case 'body': 
				this.setState({design_body: color.hex}); 
				let imgElement = front_body.filter(item => {
					console.log("item: ", item, color.hex)
					return item.includes(color.hex)
				})
				var imageInstance = new fabric.image(imgElement, {
					width: 899,
					height: 959,
					the_type: "front_body",
					zIndex: 0
				})
				break;
			case 'sleeve': this.setState({design_sleeve: color.hex}); break;
			case 'banding': this.setState({design_banding: color.hex}); break;
			case 'stripe': this.setState({design_stripe: color.hex}); break;
			case 'button': this.setState({design_button: color.hex}); break;
		}
		console.log(this.state)
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
	
	changeSide(front) {
        console.log("changeSide: ", front)
        this.setState({
            isFront: front
        })
        console.log("after: ", this.isFront)
    }

	render() {
		console.log("state: ", this.state)
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
								{/* <TemplateList 
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
								/>*/}
								<TemplateList 
									data = {front_body}
									property_type = "front_body"
									zIndex = {0}
									addtocanvas = {this.addToFrontCanvas}
								/>
								{/*
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
								/> */}
						
								{/* ==========Design Element========== */}
								<h4>Design</h4>
								<div className="Design">
									<center>
										<select id="design_element">
											<option>body</option>
											<option>sleeve</option>
											<option>banding</option>
											<option>stripe</option>
											<option>button</option>
										</select>				
										<CirclePicker 
											id="design_colour"
											colors={this.body_color}
											onChangeComplete={this.handleDesignChangeComplete}
										/>
										{console.log(this.body_color)}
									</center>
								</div>
						
								{/* ==========Text========== */}	
								<div className="Text">
									<h4>Text</h4>
									<textarea id="text_area" placeholder="Hello" />
							
									<p>Choose a Font</p>
									<select id="text_font">
										<option>arial</option>
										<option>tahoma</option>
										<option>times new roman</option>
										<option>anton</option>
										<option>Akronim</option>
										<option>Alex Brush</option>
										<option>Aguafina Script</option>
									</select>

									<p>Font colour</p>
									<CirclePicker id="text_colour" onChangeComplete={this.handleChangeComplete}/>
										
									<p>Font style</p> 
									<select id="text_style">
										<option>normal</option>
										<option>italic</option>
										<option>oblique</option>
										<option>bold</option>
									</select>
							
									<p>Font Size</p> 
									<input id="text_size" type="range"  min="0" max="200" defaultValue="100" />

									<button onClick={() => this.addText(true)}>ENTER</button>
								</div>

							
								{/* ==========Upload File========== */}
								<div className="UploadFile">
									<h4>Upload Image</h4>
									<input type = "file"
																id = "input_front" 
																onChange = {this.onDropFront} />
									<img src = "" 
										id = "img_front" />

								</div>
								
						</div>
					</div>
								
					<div className="main">
						<h2 className="h_white">SAMPLE VIEW</h2>
							<div className="content">
								<button class="front_btn" onClick={() => this.changeSide(true)}>Front</button>
                    			<button class="back_btn" onClick={() => this.changeSide(false)}>Back</button>
								
								{/* <FabricCanvas 
									design = {this.state}
									activeFrontProperty = {this.state.activeFrontProperty}
									activeBackProperty = {this.state.activeBackProperty}
								/> */}
								<button class="save_btn" type="button" onClick={() => this.props.onSave(this.state)}>SAVE</button>
								<button class="post_btn" type="button" onClick={() => this.props.onPost(this.state)}>POST</button>
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
	
const mapDispatchToProps = (dispatch) => ({
	onSave: (design_detail) => dispatch(toSaveDesign(design_detail)),
	onPost: (design_detail) => dispatch(toPostDesign(design_detail)),
})

export default connect (mapDispatchToProps)(DesignPage)
