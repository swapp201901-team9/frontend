import React from 'react';
import { connect } from 'react-redux'
import {fabric} from 'fabric';
import {CirclePicker} from 'react-color';
//import ThreeScene from './ThreeScene';

import FabricCanvas from './FabricCanvas';
//import TemplateList from './TemplateList'
//import TemplateListItem from './TemplateListItem'
//import {back_arm, back_banding, back_body, back_stripe, front_arm, front_body, front_button, front_stripe, front_banding} from './images/templates/templatelist';
import MyGroupList from '../GroupPage/MyGroupList';

//import ImageUploader from 'react-images-upload';

import { toSaveDesign, toPostDesign, toNewDesign } from '../../actions/index.js';

//import ThreeScene from './ThreeScene';

//the templates are imported as images and passed as porps to the TemplateList components.
//if the user chooses any of the properties, the state gets updated in the DesignPage component
//it gets passed onto FabricCanvas as prop
//FabricCanvas uses lifecycle method ComponentWillReceiveProps() to update the canvas
//about saveToCanvas: use a method from fabric named TODataUrl()

// export default class DesignPage extends React.Component {
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
			clickedWhat: null
		};
		this.onDrop = this.onDrop.bind(this);
		
		this.addToFrontCanvas = this.addToFrontCanvas.bind(this);
		this.addToBackCanvas = this.addToBackCanvas.bind(this);
		this.addToBothCanvas = this.addToBothCanvas.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeComplete = this.handleChangeComplete.bind(this);
		this.handleDesignChangeComplete = this.handleDesignChangeComplete.bind(this);
	}

	componentDidMount(){
		this.body_color = ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
	"#097c25", "#0075a9", "#601986", "#580b0b", "#cfcfcf", "#626262", "#001c58", "#232323"];
		this.sleeve_color = ["#942727", "#a65824", "#485a2f", "#316863", "#2e4373", "#462355", "#4a321f",
	"#f8f8f8", "#4f4f53", "#2a2a2a"];
		this.stripe_color = ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
	"#097c25", "#0075a9", "#601986", "#580b0b", "#ffffff", "#cfcfcf", "#001c58", "#232323"];
		this.banding_color = ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
	"#097c25", "#0075a9", "#601986", "#580b0b", "#cfcfcf", "#626262", "#001c58", "#232323"];
		this.button_color = ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
	"#097c25", "#0075a9", "#601986", "#580b0b", "#cfcfcf", "#626262", "#001c58", "#232323"];


    }

	/*componentDidUpdate(prevProps, prevState) {
	}*/


	addToFrontCanvas(imgElement, property_type, z_Index) {
		var imgInstance = new fabric.Image(imgElement, {
			width: 430,
			height: 403,
			the_type: property_type,
			zIndex: z_Index
		});

		this.setState({activeFrontProperty: imgInstance});
	}

	addToBackCanvas(imgElement, property_type, z_Index) {
		var imgInstance = new fabric.Image(imgElement, {
			width: 430,
			height: 403,
			the_type: property_type,
			zIndex: z_Index
		});

		this.setState({activeBackProperty: imgInstance});
	}

	addToBothCanvas(imgElement, property_type, z_Index)  {
		var imgInstance = new fabric.Image(imgElement, {
			width: 430,
			height: 403,
			the_type: property_type,
			zIndex: z_Index
		});

		this.setState({
			activeFrontProperty: imgInstance,
			activeBackProperty: imgInstance
		});
	}

	handleChangeComplete(color, event) {
		this.fontcolor = color.hex;
	}

	handleDesignChangeComplete(color, event) {
		let design_element = document.getElementById("design_element").value;
		switch(design_element) {
			case 'body': 
				this.setState({design_body: color.hex}); 
				//this.forceUpdate();
				//var imgElement1 = document.getElementById('front_body');
				var imgElement1 = document.createElement("img");
				
				
				var src1 = './images/templates/front_body/'+this.state.design_body.substring(1)+'_body.png';
				console.log("front body src is");
				
				imgElement1.setAttribute("src", require(src1));
				console.log(src1);
				//imgElement1.src = require(src1);
				
				

				//var imgElement2 = document.getElementById('back_body');
				var imgElement2 = document.createElement("img");
				var src2 = './images/templates/back_body/'+this.state.design_body.substring(1)+'.png';
				console.log("back body src is");
				console.log(src2);
				imgElement2.setAttribute("src", require(src2));
				//imgElement2.src = require(src2);

				this.addToFrontCanvas(imgElement1, "front_body", 0);
				this.addToBackCanvas(imgElement2, "back_body", 0);


			break;
			case 'sleeve': 
			this.setState({design_sleeve: color.hex}); 
			this.forceUpdate();
			var imgElement1 = document.getElementById('front_sleeve');
			var src1 = './images/templates/front_arm/'+this.state.design_sleeve.substring(1)+'_arm.png';
			console.log("front sleeve src is");
			console.log(src1);
			imgElement1.src = require(src1);

			var imgElement2 = document.getElementById('back_sleeve');
			var src2 = './images/templates/back_arm/'+this.state.design_sleeve.substring(1)+'.png';
			console.log("back sleeve src is");
			console.log(src2);
			imgElement2.src = require(src2);

			this.addToFrontCanvas(imgElement1, "front_sleeve", 0);
			this.addToBackCanvas(imgElement2, "back_sleeve", 0);
			break;

			case 'banding': 
			this.setState({design_banding: color.hex}); 
			this.forceUpdate();
			var imgElement1 = document.getElementById('front_banding');
			var src1 = './images/templates/front_banding/'+this.state.design_banding.substring(1)+'_banding.png';
			console.log("front banding src is");
			console.log(src1);
			imgElement1.src = require(src1);

			var imgElement2 = document.getElementById('back_banding');
			var src2 = './images/templates/back_banding/'+this.state.design_banding.substring(1)+'.png';
			console.log("back banding src is");
			console.log(src2);
			imgElement2.src = require(src2);

			this.addToFrontCanvas(imgElement1, "front_banding", 0);
			this.addToBackCanvas(imgElement2, "back_banding", 0);

			break;

			case 'stripe': 
			this.setState({design_stripe: color.hex}); 
			this.forceUpdate();
			var imgElement1 = document.getElementById('front_stripe');
			var src1 = './images/templates/front_stripe/'+this.state.design_stripe.substring(1)+'_stripe.png';
			console.log("front stripe src is");
			console.log(src1);
			imgElement1.src = require(src1);

			var imgElement2 = document.getElementById('back_stripe');
			var src2 = './images/templates/back_stripe/'+this.state.design_stripe.substring(1)+'.png';
			console.log("back stripe src is");
			console.log(src2);
			imgElement2.src = require(src2);

			this.addToFrontCanvas(imgElement1, "front_stripe", 2);
			this.addToBackCanvas(imgElement2, "back_stripe", 2);

			break;

			case 'button': 
			this.setState({design_button: color.hex}); 
			this.forceUpdate();
			var imgElement1 = document.getElementById('img_button');
			var src1 = './images/templates/front_button/'+this.state.design_button.substring(1)+'_button.png';
			console.log("front button src is");
			console.log(src1);
			imgElement1.src = require(src1);

			this.addToFrontCanvas(imgElement1, "front_button", 2);


			break;

			default:
			
			break;
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

	handleChange(e){
		let value = e.target.value;
		if (value == "body") {
			this.setState({clickedWhat: "body"});
		}
		else if (value == "sleeve"){
			this.setState({clickedWhat: "sleeve"});
		}
		else if (value == "banding") {
			this.setState({clickedWhat: "banding"});
		}
		else if (value == "sleeve"){
			this.setState({clickedWhat: "stripe"});
		}
		else if (value == "sleeve"){
			this.setState({clickedWhat: "button"});
		}
		this.forceUpdate();
	}

	onDrop = (e) => {
        console.log("hey");

        e.preventDefault();
        var preview = document.getElementById('img');
        var file = document.getElementById('input').files[0];
        var canvas = this.the_front_canvas;
        let reader = new FileReader();
        reader.addEventListener("load", function() {
            preview.src = reader.result;
            var imgInstance = new fabric.Image(preview, {
            width: 899,
            height:959,
            the_type: "upload",
            zIndex: 10
            });
            console.log("imgInstance set");
            imgInstance.set({
                scaleY: 0.1,
                scaleX: 0.1,
                originX: "center",
                originY: "center"
            });
            console.log("imgInstance scale");
            
        },false);

       
        if (file) {
            reader.readAsDataURL(file);
        }
       
        this.the_front_canvas = canvas;
    }

    render() {
	  const clickedWhat = this.state.clickedWhat;
	  let colorPicker;
	  if (clickedWhat == "body") {
		  colorPicker = <CirclePicker
		  id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.body_color}/>;
		  //this.forceUpdate();
	  }
	  else if (clickedWhat == "sleeve") {
		colorPicker = <CirclePicker
		id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.sleeve_color}/>;
		//this.forceUpdate();
	  }
	  else if (clickedWhat == "banding") {
		colorPicker = <CirclePicker
		id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.banding_color}/>;
		//this.forceUpdate();
	  }
	  else if (clickedWhat == "stripe") {
		colorPicker = <CirclePicker
		id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.stripe_color}/>;
		//this.forceUpdate();
	  }
	  else if (clickedWhat == "button") {
		colorPicker = <CirclePicker
		id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.button_color}/>;
		//this.forceUpdate();
	  }
	  else {
		colorPicker = <CirclePicker
		id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.body_color}/>;
	  }
      return (
      <div>
				<section className="wrap clear col3">
              <div className="aside">
                <h2 className="h_white">SELECT STYLE</h2>
                <div className="content">
									<center><select id="design_element"
									onChange={(e)=>this.handleChange(e)}>
										<option value = "body">body</option>
										<option value = "sleeve">sleeve</option>
										<option value = "banding">banding</option>
										<option value = "stripe">stripe</option>
										<option value = "button">button</option>
									</select></center>
								<h1>Colour</h1>
								{colorPicker}
								
								<img src = '' id = "front_body"/>
								<img src = '' id = "back_body" />
									
									<img src = "" id = "front_sleeve" />
									<img src = '' id = "back_sleeve" />

									<img src = "" id = "front_stripe" />
									<img src = '' id = "back_stripe" />


									<img src = "" id = "front_banding" />
									<img src = '' id = "back_banding" />


									<img src = "" id = "img_button" />


		<br></br>
		<div class="design_tool">

		<h1>Text</h1>
			<textarea id="text_area" defaultValue="Hello"/>

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
				<select id="text_style" onChange={(e)=>this.handleChange(e)}>
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
	<h1>Logo</h1>
    <input type = "file"
                         id = "input"
                         onChange = {this.onDrop} />
                  <img src = ""
                        id = "img" />
			</div>
          </div>
              <div className="main">
                <h2 className="h_white">SAMPLE VIEW</h2>
                <div className="content">

                {/*<!--========================================
			front-back button section
	=========================================-->*/}
	{/*<ThreeScene/>*/}
	<FabricCanvas
	activeFrontProperty = {this.state.activeFrontProperty}
	activeBackProperty = {this.state.activeBackProperty}
	/>

	{this.props.isLoggedIn ?
		(<div>
			<button className="new_btn" type="button" onClick={() => this.props.onNew()}>NEW</button>
			<button className="save_btn" type="button" onClick={() => this.props.onSave(this.props.now_design.id, this.state)}>SAVE</button>
		</div>)
		: <div></div>
	}


                </div>
              </div>
              <div className="aside">
                <h2 className="h_black">MY GROUP</h2>
                <div className="content">
									{this.props.isLoggedIn? <MyGroupList /> : <p>로그인을 해주세요</p>}
                </div>
              </div>
            </section>





      </div>

      );
    }
	}

	const mapStateToProps = (state) => ({
		isLoggedIn: state.authorization,
		now_design: state.now_design,
		my_groups: state.my_groups,
	})

	const mapDispatchToProps = (dispatch) => ({
		onNew: () => dispatch(toNewDesign()),
		onSave: (designid, design_detail) => dispatch(toSaveDesign(designid, design_detail)),
		onPost: (designid, groupid, design_detail) => dispatch(toPostDesign(designid, groupid, design_detail)),
	})

export default connect (mapStateToProps, mapDispatchToProps)(DesignPage)
