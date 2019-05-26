import React from 'react';
import {fabric} from 'fabric';
import {CirclePicker} from 'react-color';

import FabricCanvas from './FabricCanvas'
import TemplateList from './TemplateList'
//import TemplateListItem from './TemplateListItem'
import {back_arm, back_banding, back_body, back_stripe, front_arm, front_body, front_button, front_stripe, front_banding} from './images/templates/templatelist';
import MyGroupList from '../GroupPage/MyGroupList';

//import ImageUploader from 'react-images-upload';

import { connect } from 'react-redux'
import { toSaveDesign, toPostDesign, toNewDesign } from '../../actions/index.js';

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
			activeFrontProperty : null
		};
		// this.onDrop = this.onDropFront.bind(this);
		// this.onDrop = this.onDropBack.bind(this);
	}

	body_color = ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800", 
	"#097c25", "#0075a9", "#601986", "#580b0b", "#cfcfcf", "#626262", "#001c58", "#232323"]
	sleeve_color = ["#942727", "#a65824", "#485a2f", "#316863", "#2e4373", "#462355", "#4a321f", 
	"#f8f8f8", "#4f4f53", "#2a2a2a"]
	stripe_color = ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
	"#097c25", "#0075a9", "#601986", "#580b0b", "#ffffff", "#cfcfcf", "#001c58", "#232323"]


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
			case 'body': this.setState({design_body: color.hex}); break;
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
	/*shouldComponentUpdate(nextProps, nextState) {
		if (nextState.image != this.state.image ) {
			console.log("true");
			this.setState({activeFrontProperty: this.img_front[0]});
			return true;
		}
		else {
			return true;
		}
	}*/
	/*onDropFront = (e) => {
        console.log("hey");
		//this.setState(prevState => {return {image: prevState.image+1}});
        e.preventDefault();
        var preview = document.getElementById('img_front');
        var file = document.getElementById('input_front').files[0];
		let reader = new FileReader();
		let imgFront = this.img_front;
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

			imgFront.push(imgInstance);
			console.log(imgFront);


        },false);


        if (file) {
			reader.readAsDataURL(file);


		}

		//this.setState({activeFrontProperty: img_front});


    }
	onDropBack = (e) => {

    }*/

    render() {
      return (
      <div>
				<section className="wrap clear col3">
              <div className="aside">
                <h2 className="h_white">SELECT STYLE</h2>
                <div className="content">
						<h3> *front* </h3>
						<h4> sleeve </h4>
						<TemplateList
									data = {front_arm}
									property_type = "front_arm"
									zIndex = {0}
									addtocanvas = {this.addToFrontCanvas}
								/>
								<h4> body </h4>
								<TemplateList
									data = {front_body}
									property_type = "front_body"
									zIndex = {0}
									addtocanvas = {this.addToFrontCanvas}
								/>
								<h4> button </h4>
								<TemplateList
									data = {front_button}
									property_type = "front_button"
									zIndex = {2}
									addtocanvas = {this.addToFrontCanvas}
								/>
								<h4> stripe </h4>
								<TemplateList
									data = {front_stripe}
									property_type = "front_stripe"
									zIndex = {2}
									addtocanvas = {this.addToFrontCanvas}
								/>
								<h4> banding </h4>
								<TemplateList
									data = {front_banding}
									property_type = "front_banding"
									zIndex = {2}
									addtocanvas = {this.addToFrontCanvas}
								/>

								<h3> *back* </h3>
								<h4> sleeve </h4>
								<TemplateList
									data = {back_arm}
									property_type = "back_arm"
									zIndex = {0}
									addtocanvas = {this.addToBackCanvas}
								/>
								<h4> banding </h4>
								<TemplateList
									data = {back_banding}
									property_type = "back_banding"
									zIndex = {0}
									addtocanvas = {this.addToBackCanvas}
								/>
								<h4> body </h4>
								<TemplateList
									data = {back_body}
									property_type = "back_body"
									zIndex = {0}
									addtocanvas = {this.addToBackCanvas}
								/>
								<h4> stripe </h4>
								<TemplateList
									data = {back_stripe}
									property_type = "back_stripe"
									zIndex = {2}
									addtocanvas = {this.addToBackCanvas}
								/>
						
								{<h1>Design Element</h1>}
									<center><select id="design_element">
										<option>body</option>
										<option>sleeve</option>
										<option>banding</option>
										<option>stripe</option>
										<option>button</option>
									</select></center>
								<h1>Colour</h1>
								<CirclePicker 
									id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.body_color}/>


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

						{/*<h4 class="modal-title">Upload image Front</h4>
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
	id = "img_back" />*/}
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
		//now_design: state.now_design
	})

	const mapDispatchToProps = (dispatch) => ({
		onNew: () => dispatch(toNewDesign()),
		onSave: (designid, design_detail) => dispatch(toSaveDesign(designid, design_detail)),
		onPost: (designid, groupid, design_detail) => dispatch(toPostDesign(designid, groupid, design_detail)),
	})

export default connect (mapStateToProps, mapDispatchToProps)(DesignPage)
