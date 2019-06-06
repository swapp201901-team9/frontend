import React from 'react';
import { connect } from 'react-redux'
import {fabric} from 'fabric';
import {CirclePicker} from 'react-color';
//import ThreeScene from './ThreeScene';

import FabricCanvas from './FabricCanvas';
//import TemplateList from './TemplateList'
//import TemplateListItem from './TemplateListItem'
//import {back_sleeve, back_banding, back_body, back_stripe, front_sleeve, front_body, front_button, front_stripe, front_banding} from './images/templates/templatelist';
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
		console.log("DesignPage - constructor")
		super(props);

		this.state = {
			design : {
				body: this.props.now_design.detail_body,
				sleeve: this.props.now_design.detail_sleeve,
				banding: this.props.now_design.detail_banding,
				stripe: this.props.now_design.detail_stripes,
				button: this.props.now_design.detail_buttons
			},

			text : {
				frontchest: {
					textvalue: "S",
					fontFamily: "arial",
					fill: "#fe0e0e",
					fontStyle: "normal",
					fontSize: 50
				},
				leftarm: {
					textvalue: "19",
					fontFamily: "arial",
					fill: "#e91e63",
					fontStyle: "normal",
					fontSize: 50
				},
				rightarm: {
					textvalue: "19",
					fontFamily: "arial",
					fill: "#e91e63",
					fontStyle: "normal",
					fontSize: 50
				}

				// frontchest: this.props.now_design.front_chest,
				// leftarm: this.props.now_design.left_arm,
				// rightarm: this.props.now_design.right_arm,
				// upperback: this.props.now_design.upper_back,
				// middleback: this.props.now_design.middle_back,
				// lowerback: this.props.now_design.lower_back

				// {
				// 	textvalue: text.text_value,
				// 	fontFamily: text.font_family,
				// 	fill: text.font_fill,
				// 	fontStyle: text.font_style,
				// 	fontSize: text.font_size
				// },
			},

			// activeBackProperty : null,
			// activeFrontProperty : null,
			clickedWhat: null

		};

		this.onDrop = this.onDrop.bind(this);

		this.handleChange = this.handleChange.bind(this);
		this.handleDesignChangeComplete = this.handleDesignChangeComplete.bind(this);
		this.handleTextChangeComplete = this.handleTextChangeComplete.bind(this);
		this.handleTextColorChangeComplete = this.handleTextColorChangeComplete.bind(this);
		this.clickedButton = this.clickedButton.bind(this);
		console.log("design page state: ", this.state.design)
		//this.handleFontChangeComplete = this.handleFontChangeComplete.bind(this);


	}

	componentWillMount() {
		console.log("DesignPage - componentWillMount")
		this.body_color = ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
		"#097c25", "#0075a9", "#601986", "#580b0b", "#cfcfcf", "#626262", "#001c58", "#232323"];
		this.sleeve_color = ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
		"#097c25", "#0075a9", "#601986", "#580b0b", "#fcfcfc", "#626262", "#001c58", "#232323"];
		this.stripe_color = ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
		"#097c25", "#0075a9", "#601986", "#580b0b", "#fcfcfc", "#cfcfcf", "#001c58", "#232323"];
		this.banding_color = ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
		"#097c25", "#0075a9", "#601986", "#580b0b", "#cfcfcf", "#626262", "#001c58", "#232323"];
		this.button_color = ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
		"#097c25", "#0075a9", "#601986", "#580b0b", "#cfcfcf", "#626262", "#001c58", "#232323"];

		this.text_style_id = ["text_area", "text_font", "text_style", "text_size", "text_colour"]
	}



	handleDesignChangeComplete(color, event) {
		console.log("DesignPage - handleDesignChangeComplete")
		let design_element = document.getElementById("design_element").value;

		switch(design_element) {

		case 'body':
		console.log("body")
			this.setState({design : {
				body: color.hex,
				sleeve: this.state.design.sleeve,
				banding: this.state.design.banding,
				stripe: this.state.design.stripe,
				button: this.state.design.button
			 }});
			break;

		case 'sleeve':
			this.setState({design : {
				body: this.state.design.body,
				sleeve: color.hex,
				banding: this.state.design.banding,
				stripe: this.state.design.stripe,
				button: this.state.design.button
			}});
			break;

		case 'banding':
			this.setState({design : {
				body: this.state.design.body,
				sleeve: this.state.design.sleeve,
				banding: color.hex,
				stripe: this.state.design.stripe,
				button: this.state.design.button
			}});
			break;

		case 'stripe':
			this.setState({design : {
				body: this.state.design.body,
				sleeve: this.state.design.sleeve,
				banding: this.state.design.banding,
				stripe: color.hex,
				button: this.state.design.button
			}});

			break;

		case 'button':
			this.setState({design : {
				body: this.state.design.body,
				sleeve: this.state.design.sleeve,
				banding: this.state.design.banding,
				stripe: this.state.design.stripe,
				button: color.hex
			}});

			break;

		default:
			this.setState({design : {
				body: this.state.design.body,
				sleeve: this.state.design.sleeve,
				banding: this.state.design.banding,
				stripe: this.state.design.stripe,
				button: this.state.design.button
			}});
			break;
		}


		this.setState({design : ({...this.state.design, [design_element]: color.hex})})

		// switch(design_element) {
		// case 'body':
		// console.log("body")
		// 	this.setState({design : ({...this.state.design, body: color.hex})})
		// 	break;

		// case 'sleeve':
		// 	this.setState({design : ({...this.state.design, sleeve: color.hex})})
		// 	break;

		// case 'banding':
		// 	this.setState({design : ({...this.state.design, banding: color.hex})})
		// 	break;

		// case 'stripe':
		// 	this.setState({design : ({...this.state.design, stripe: color.hex})})
		// 	break;

		// case 'button':
		// 	this.setState({design : ({...this.state.design, button: color.hex})})
		// 	break;

		// default:
		// 	this.setState({design : ({...this.state.design})});
		// 	break;
		// }
	}

	handleTextChangeComplete(e) {
		let text_element = document.getElementById("text_element").value;
		console.log("DesignPage - handleTextChangeComplete e.target: ", e.target, " text element: ", text_element)

		this.setState({text : ({...this.state.text,
			[text_element]: ({...this.state.text[text_element], [e.target.name]:e.target.value})
		})});


		console.log("this.state: ", this.state)
		//this.forceUpdate();
	}

	handleTextColorChangeComplete(color) {
		let text_element = document.getElementById("text_element").value;
		console.log("DesignPage - handleTextColorChangeComplete")
		this.setState({text : ({...this.state.text,
			[text_element]: ({...this.state.text[text_element], fill: color.hex})
		})});
	}

	addText() {
		console.log("DesignPage - addText")
		let text = new fabric.IText(document.getElementById("text_area").value, {
			fontFamily: document.getElementById("text_font").value,
			fill: this.fontcolor,
			fontStyle: document.getElementById("text_style").value,
			fontSize: document.getElementById("text_size").value,
			zIndex: 10
		})

		console.log(text)


	}

	handleChange(e){
		console.log("DesignPage - handleChange")
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
		else if (value == "stripe"){
			this.setState({clickedWhat: "stripe"});
		}
		else if (value == "button"){
			this.setState({clickedWhat: "button"});
		}
		else {
			this.setState({clickedWhat: this.state.clickedWhat});
		}
		//this.forceUpdate();
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
            zIndex: 12
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

	clickedButton = (e) => {
		this.forceUpdate();
	}

	clickedInitButton = (e) => {
		this.setState({clickedWhat: "body"});
		this.forceUpdate();
	}

    render() {
			console.log("DesignPage - render")
			const clickedWhat = this.state.clickedWhat;
			let colorPicker;
			if (clickedWhat == "body") {
				colorPicker = <CirclePicker
				width = "220" id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.body_color}/>;

				//this.forceUpdate();
			}
			else if (clickedWhat == "sleeve") {
				colorPicker = <CirclePicker
				width = "220" id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.sleeve_color}/>;


				//this.forceUpdate();
			}
			else if (clickedWhat == "banding") {
				colorPicker = <CirclePicker

				width = "220" id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.banding_color}/>;


				//this.forceUpdate();
			}
			else if (clickedWhat == "stripe") {
				colorPicker = <CirclePicker

				width = "220" id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.stripe_color}/>;


				//this.forceUpdate();
			}
			else if (clickedWhat == "button") {
				colorPicker = <CirclePicker
				width = "220" id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.button_color}/>;
				//this.forceUpdate();
			}
			else {
				// colorPicker = <CirclePicker
				// width = "220" id="design_colour" onChangeComplete={this.handleDesignChangeComplete} colors={this.body_color}/>;
				colorPicker = <button  onClick={(e) => this.clickedInitButton(e)}>DEFAULT</button>


			}

      return (
      <div>
		<section className="wrap clear col3">
			<div className="aside">
				<h2 className="h_white">SELECT STYLE</h2>
					<div className="content">

						{/*<!--========================================
							Design section
						=========================================-->*/}
						<h1>Design</h1>
						<center><select id="design_element"
						onChange={(e)=>this.handleChange(e)}>
							<option value = "body">body</option>
							<option value = "sleeve">sleeve</option>
							<option value = "banding">banding</option>
							<option value = "stripe">stripe</option>
							<option value = "button">button</option>
						</select></center>
						<br></br>
						{colorPicker}
						<br></br>
						<div className="Button-Field-Side">
						<button  onClick={(e) => this.clickedButton(e)}>ADD</button>
						</div>

						{/* <div class="design_tool"> */}
						{/*<!--========================================
						Text section
						=========================================-->*/}

						<h1>Text</h1>
							<center><select id="text_element">
								<option value="frontchest">Front Chest</option>
								<option value="leftarm">Left Arm</option>
								<option value="rightarm">Right Arm</option>
								<option value="upperback">Upper Back</option>
								<option value="middleback">Middle Back</option>
								<option value="lowerback">Lower Back</option>
							</select>

							<textarea id="text_area" defaultValue="S" name="textvalue"
							onChange={(e)=>this.handleTextChangeComplete(e)}/>

							<p>Font</p>
							<select id="text_font" name="fontFamily"
							onChange={(e)=>this.handleTextChangeComplete(e)}>
								<option>arial</option>
								<option>tahoma</option>
								<option>times new roman</option>
								<option>anton</option>
								<option>Akronim</option>
								<option>Alex Brush</option>
								<option>Aguafina Script</option>
							</select>

							<p>Text style</p>
							<select id="text_style" name="fontStyle"
							onChange={(e)=>this.handleTextChangeComplete(e)}>
								<option>normal</option>
								<option>italic</option>
								<option>oblique</option>
								<option>bold</option>
							</select>

							<p>Text size</p>
							<input type="range"  min="0" max="200" defaultValue="100" id="text_size" name="fontSize"/>

							<p>Colour</p>
								<CirclePicker id="text_colour" name="fill"
								onChangeComplete={this.handleTextColorChangeComplete}/>

							</center>

						</div>

						<div>
							<button class="front_btn" type="button" onClick={() => this.addText()}>Enter</button>
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
          {/* </div> */}
              <div className="main">
                <h2 className="h_white">SAMPLE VIEW</h2>
                <div className="content">

                {/*<!--========================================
			front-back button section
	=========================================-->*/}
	{/*<ThreeScene/>*/}
	<FabricCanvas
	design = {this.state.design}
	text = {this.state.text}
	// activeFrontProperty = {this.state.activeFrontProperty}
	// activeBackProperty = {this.state.activeBackProperty}
	/>
	{/* {console.log("DesignPage - render - activeFrontProperty: ", this.state.activeFrontProperty)}
	{console.log("DesignPage - render - activeBackProperty: ", this.state.activeBackProperty)} */}

	{this.props.isLoggedIn ?
		(<div>
			<button className="new_btn" type="button" onClick={() => this.props.onNew()}>NEW</button>
			<button className="save_btn" type="button" onClick={() => this.props.onSave(this.props.now_design.id, this.state.design)}>SAVE</button>
		</div>)
		: <div>
			<button className="new_btn" type="button" onClick={() => this.props.onNew()}>NEW</button>
		</div>
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
