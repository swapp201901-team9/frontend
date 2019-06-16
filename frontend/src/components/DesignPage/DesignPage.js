import React from 'react';
import {connect} from 'react-redux';
import {fabric} from 'fabric';
import {CirclePicker, SketchPicker} from 'react-color';
import {Tabs, TabContent, TabLink} from 'react-tabs-redux';
//import ThreeScene from './ThreeScene';
//import FabricCanvas from './FabricCanvas';
import MyGroupList from '../GroupPage/MyGroupList';
//import ImageUploader from 'react-images-upload';

import { toSaveDesign, toNewDesign } from '../../actions/index.js';
//import { tsImportEqualsDeclaration } from '@babel/types';

//import logo from './images/templates/templatelist';

class DesignPage extends React.Component {
	constructor(props){
		console.log("DesignPage - constructor")
		super(props);

		this.state = {
			design : {
				body: this.props.now_design.design.body,
				sleeve: this.props.now_design.design.sleeve,
				banding: this.props.now_design.design.banding,
				stripe: this.props.now_design.design.stripe,
				button: this.props.now_design.design.button
			},

			text: {
				frontchest: this.props.now_design.text.frontchest,
				rightarm: this.props.now_design.text.rightarm,
				upperback: this.props.now_design.text.upperback,
				middleback: this.props.now_design.text.middleback,
				lowerback: this.props.now_design.text.lowerback,
			},

			logo : {
				front: this.props.now_design.logo.front,
				back: this.props.now_design.logo.back,
			},

			image: {
				frontImg: this.props.now_design.image.frontImg,
				backImg: this.props.now_design.image.backImg,
			},

			element: null,
			designClickedWhat: "body",
			textClickedWhat: null,
			logoClickedWhat: null,

			displayTextColor: false,
			displayBorderColor: false,
		};

		this.handleElementChange = this.handleElementChange.bind(this);
		this.handleCanvasChange = this.handleCanvasChange.bind(this);
		this.handleDesignChange = this.handleDesignChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleTextColorChange = this.handleTextColorChange.bind(this);
		this.handleStrokeColorChange = this.handleStrokeColorChange.bind(this);
		this.handleLogoChange = this.handleLogoChange.bind(this);

		this.designElementToImage = this.designElementToImage.bind(this);
		this.textElementToImage = this.textElementToImage.bind(this);
		this.logoElementToImage = this.logoElementToImage.bind(this);

        this.updateFrontCanvas = this.updateFrontCanvas.bind(this);
		this.updateBackCanvas = this.updateBackCanvas.bind(this);

		this.clickedDesignPopButton = this.clickedDesignPopButton.bind(this);
		this.clickedTextPopButton = this.clickedTextPopButton.bind(this);
		this.clickedLogoPopButton = this.clickedLogoPopButton.bind(this);

		this.moveHandler = this.moveHandler.bind(this);
		this.onClickSave = this.onClickSave.bind(this);

		this.getDataUrl = this.getDataUrl.bind(this);

	}

	componentWillMount() {
		console.log("DesignPage - componentWillMount")
		this.design_color = {
			body: ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
				"#097c25", "#0075a9", "#601986", "#580b0b", "#cfcfcf", "#626262", "#001c58", "#232323"],
			sleeve: ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
				"#097c25", "#0075a9", "#601986", "#580b0b", "#fcfcfc", "#626262", "#001c58", "#232323"],
			stripe: ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
				"#097c25", "#0075a9", "#601986", "#580b0b", "#fcfcfc", "#cfcfcf", "#001c58", "#232323"],
			banding: ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
				"#097c25", "#0075a9", "#601986", "#580b0b", "#cfcfcf", "#626262", "#001c58", "#232323"],
			button: ["#f29c9f", "#fff45c", "#80c269", "#00b7ee", "#aa89bd", "#910000", "#f39800",
				"#097c25", "#0075a9", "#601986", "#580b0b", "#fcfcfc", "#cfcfcf", "#001c58", "#232323"]
		}

		this.design_element = ["body", "sleeve", "stripe", "banding", "button"]
		this.text_element = ["frontchest", "rightarm", "upperback", "middleback", "lowerback"]
		this.logo_element = ["front", "back"]
	}

	componentDidMount() {
        console.log("DesignPage - componentDidMount")

		this.the_front_canvas = new fabric.Canvas('front-canvas', {
            preserveObjectStacking: true,
            height:460,
            width:430,
        });

        this.the_back_canvas = new fabric.Canvas('back-canvas', {
            preserveObjectStacking: true,
            height:460,
            width:430,
		});

		this.the_front_canvas.on({
			'object:moved': this.moveHandler,
		})

		this.the_back_canvas.on({
			'object:moved': this.moveHandler,
		})

		this.the_front_canvas.add(this.designElementToImage(this.state.design.body, "front_body", 0))
        this.the_back_canvas.add(this.designElementToImage(this.state.design.body, "back_body", 0))
        this.the_front_canvas.add(this.designElementToImage(this.state.design.sleeve, "front_sleeve", 0))
        this.the_back_canvas.add(this.designElementToImage(this.state.design.sleeve, "back_sleeve", 0))
        this.the_front_canvas.add(this.designElementToImage(this.state.design.banding, "front_banding", 0))
        this.the_back_canvas.add(this.designElementToImage(this.state.design.banding, "back_banding", 0))
        this.the_front_canvas.add(this.designElementToImage(this.state.design.stripe, "front_stripe", 3))
        this.the_back_canvas.add(this.designElementToImage(this.state.design.stripe, "back_stripe", 3))
        this.the_front_canvas.add(this.designElementToImage(this.state.design.button, "front_button", 3))

        this.the_front_canvas.add(this.textElementToImage(this.state.text.frontchest, "frontchest"))
        this.the_front_canvas.add(this.textElementToImage(this.state.text.rightarm, "rightarm"))
        this.the_back_canvas.add(this.textElementToImage(this.state.text.upperback, "upperback"))
        this.the_back_canvas.add(this.textElementToImage(this.state.text.middleback, "middleback"))
		this.the_back_canvas.add(this.textElementToImage(this.state.text.lowerback, "lowerback"))

		this.the_front_canvas.add(this.logoElementToImage(this.state.logo.front, "front"))
        this.the_back_canvas.add(this.logoElementToImage(this.state.logo.back, "back"))

	}


	componentWillUpdate = (nextProps, nextState) => {
		console.log("DesignPage - componentWillUpdate nextState: ", nextState)

        // If Updated Item is not the same as the old one
		//         => Update the canvas with newer item

		//update for design element
        for(let element of this.design_element){
            if(nextState.design[element] !== this.state.design[element]) {
				console.log("design: ", nextState.design[element])
                if(element === "stripe" ) {
                    this.updateFrontCanvas(this.designElementToImage(nextState.design[element], 'front_'+element, 3))
                    this.updateBackCanvas(this.designElementToImage(nextState.design[element], 'back_'+element, 3))
                }
                else if (element === "button") {
                    this.updateFrontCanvas(this.designElementToImage(nextState.design[element], 'front_'+element, 3))
                }
                else {
                    this.updateFrontCanvas(this.designElementToImage(nextState.design[element], 'front_'+element, 0))
                    this.updateBackCanvas(this.designElementToImage(nextState.design[element], 'back_'+element, 0))
                }
            }
        }

		//update for text element
        for(let element of this.text_element){
            if(nextState.text[element] !== this.state.text[element]) {
				console.log("text: ", nextState.text[element])
				if(element === "frontchest" || element === "rightarm") {
					this.updateFrontCanvas(this.textElementToImage(nextState.text[element], element))
				}
				else {
					this.updateBackCanvas(this.textElementToImage(nextState.text[element], element))
				}
            }
		}

		//update for logo element
		for (let element of this.logo_element) {
			if(nextState.logo[element] !== this.state.logo[element]) {
				if(element === "front") {
					this.updateFrontCanvas(this.logoElementToImage(nextState.logo[element], element))
				}
				else {
					this.updateBackCanvas(this.logoElementToImage(nextState.logo[element], element))
				}
            }
		}

		this.the_front_canvas.renderAll();
        this.the_back_canvas.renderAll();

	}

    // componentDidUpdate(nextProps, nextState) {
    //     this.the_front_canvas.renderAll();
    //     this.the_back_canvas.renderAll();
    // }


	handleElementChange(e){
		console.log("DesignPage - handleElementChange target: ", e.target)
		let id = e.target.id;
		let value = e.target.value;

		if(id === "design_element") {
			this.setState({designClickedWhat: value});
		}
		else if(id === "text_element") {
			this.setState({textClickedWhat: value});
		}
		// else if (id == "logo_element") {
		// 	this.setState({logoClickedWhat: value});
		// }
	}

	handleCanvasChange(tab) {
		console.log("clicked tab "+tab);
		this.setState({logoClickedWhat: tab});
	}

	handleDesignChange(color) {
		console.log("DesignPage - handleDesignChange")
		let design_element = document.getElementById("design_element").value;

		this.setState({design : ({...this.state.design, [design_element]: color.hex})})
	}

	handleTextChange(e) {
		let text_element = document.getElementById("text_element").value;
		console.log("DesignPage - handleTextChange e.target: ", e.target, " text element: ", text_element)

		this.setState({text : ({...this.state.text,
			[text_element]: ({...this.state.text[text_element], [e.target.name]:e.target.value})
		})});
	}

	handleTextColorChange(color) {
		let text_element = document.getElementById("text_element").value;
		console.log("DesignPage - handleTextColorChange", color)

		this.setState({text : ({...this.state.text,
			[text_element]: ({...this.state.text[text_element], fill: color.hex})
		})});
	}

	handleStrokeColorChange(color) {
		let text_element = document.getElementById("text_element").value;
		console.log("DesignPage - handleTextColorChange", color)

		this.setState({text : ({...this.state.text,
			[text_element]: ({...this.state.text[text_element], stroke: color.hex})
		})});
	}


    // componentDidUpdate(nextProps, nextState) {
    //     this.the_front_canvas.renderAll();
    //     this.the_back_canvas.renderAll();
    // }

	handleLogoChange = (e) => {
		e.preventDefault();
		let logo_element = this.state.logoClickedWhat;
		const scope = this;
		//var img = document.createElement("img");
		var file = document.getElementById('input').files[0];
		let reader = new FileReader();
		reader.addEventListener("load", function() {
			//var image= new Image();
			//image.src = reader.result;
			console.log(reader.result);
			scope.setState({logo: ({...scope.state.logo,
				[logo_element]: ({...scope.state.logo[logo_element], src :reader.result})
			}) });

		})

		if (file) {
            reader.readAsDataURL(file);
        }
	}

	getDataUrl = (img) => {
		var canvas = document.createElement('canvas')
  		var ctx = canvas.getContext('2d')

  		canvas.width = img.width
  		canvas.height = img.height
  		ctx.drawImage(img, 0, 0)

  		// If the image is not png, the format
  		// must be specified here
  		return canvas.toDataURL()
	}

    designElementToImage(color, type, z_Index) {
        console.log("DesignPage - designElementToImage - color: ", color, "type: ", type)

        var imgElement = document.createElement("img");

		const scope = this
		imgElement.addEventListener('load', function(event){
			var dataUrl = scope.getDataUrl(event.currentTarget)
			var img = document.createElement("img");
			img.src = dataUrl;
			var imgInstance = new fabric.Image(img, {
				width: 430,
				height: 460,
				the_type: type                                                         ,
				zIndex: z_Index
			});
			scope.setState({element: imgInstance});
		})

		var src = './images/templates/' + type + '/' + type + color.substring(1)+'.png';

        // console.log("src: ", src)
		imgElement.setAttribute("src", require(src));
		// console.log(this.state.element);
		var imgInstance = new fabric.Image(imgElement, {
			width: 430,
			height: 460,
			the_type: type                                                         ,
			zIndex: z_Index
		});

		return imgInstance;

    }

    textElementToImage(text, type) {
        console.log("DesignPage - textElementToImage", text, type)

      	// const scope = this
		// imgElement.addEventListener('load', function(event){
		// 	var dataUrl = scope.getDataUrl(event.currentTarget)
		// 	var img = document.createElement("img");
		// 	img.src = dataUrl;
		// 	var imgInstance = new fabric.Image(img, {
		// 		width: 430,
		// 		height: 460,
		// 		the_type: type                                                         ,
		// 		zIndex: z_Index
		// 	});
		// 	scope.setState({element: imgInstance});
		// })
        let imgInstance = new fabric.IText(text.textvalue, {
			fontFamily: text.fontFamily,
			fill: text.fill,
			fontStyle: text.fontStyle,
			fontSize: text.fontSize,
			stroke: text.stroke,
			strokeWidth: text.strokeWidth,
			the_type: type,
			zIndex: 10,
			left: text.left,
			top: text.top,
			textAlign: "center"
		})

        // console.log("text imgInstance: ", imgInstance)
        return imgInstance;
    }

	logoElementToImage(logo, type) {
		console.log("FabricCanvas - textElementToImage")

		//let img = document.createElement("img");
		//img.setAttribute("src", require(logo.src));
		let img = new Image();
		img.src = logo.src;

        let imgInstance;
        imgInstance = new fabric.Image(img, {
            width: 899,
			height:959,
			the_type: type,
            zIndex: 10,
            left: logo.left,
            top: logo.top
        });
        imgInstance.set({
            scaleY: 0.05,
            scaleX: 0.05,
            originX: "center",
            originY: "center"
        });

        return imgInstance;
    }

    updateFrontCanvas = (next) => {
        console.log("DesignPage - updateFrontCanvas next: ", next)

        if(next){
            let to_remove;
            // Find the same kind of element
            this.the_front_canvas.forEachObject( (object) => {

                if(object.the_type === next.the_type){
                    console.log("obcject.the_type: ", object.the_type, " next.the_type: ", next.the_type)
                    to_remove = object;
                    this.the_front_canvas.remove(to_remove);
                }
            } );

            this.the_front_canvas.add(next);
            this.the_front_canvas.moveTo(next, next.zIndex);
            this.the_front_canvas.renderAll();
        }
    }

    updateBackCanvas = (next) => {
        console.log("DesignPage - updateBackCanvas next: ", next)

        if(next){

            let to_remove;
            // Find the same kind of element
            this.the_back_canvas.forEachObject( (object) => {

                if(object.the_type === next.the_type){
                    to_remove = object;
                    this.the_back_canvas.remove(to_remove);
                }
            } );

            this.the_back_canvas.add(next);
            this.the_back_canvas.moveTo(next, next.zIndex);
            this.the_back_canvas.renderAll();
        }
    }

	clickedDesignPopButton = () => {
		console.log("clicked", this.state.designClickedWhat)
		this.state.designClickedWhat
			? this.setState({designClickedWhat: null})
			: this.setState({designClickedWhat: "body"});

	}
	clickedTextPopButton = () => {
		this.state.textClickedWhat
			? this.setState({textClickedWhat: null})
			: this.setState({textClickedWhat: "frontchest"});
	}
	/*******************problem detected */
	clickedLogoPopButton = () => {
		this.state.logoClickedWhat
			? this.setState({logoClickedWhat: null})
			: this.setState({logoClickedWhat: "front"});
	}

	moveHandler = (e) =>{
		let movingObject = e.target;
		console.log("moving: ", movingObject)
		console.log("left: ", movingObject.get('left'), " top: ", movingObject.get('top'))

		// this.text_element = ["frontchest", "rightarm", "upperback", "middleback", "lowerback"]
		// this.logo_element = ["front", "back"]
		if (movingObject.the_type === "frontchest" ||
		movingObject.the_type === "rightarm" ||
		movingObject.the_type === "upperback" ||
		movingObject.the_type === "middleback" ||
		movingObject.the_type === "lowerback") {
		this.setState({text : ({...this.state.text,
			[movingObject.the_type]: ({...this.state.text[movingObject.the_type],
				left: movingObject.get('left'),
				top: movingObject.get('top')})
		})});
		}
		else if (movingObject.the_type === "front" ||
				movingObject.the_type === "back") {
				this.setState({logo : ({...this.state.logo,
					[movingObject.the_type]: ({...this.state.logo[movingObject.the_type],
					left:movingObject.get('left'),
					top: movingObject.get('top')})
				})});
		}
	}

	onClickSave = () => {
		console.log("clickSave")
		let image = {
			frontImg: this.the_front_canvas.toDataURL({format:'png'}),
			backImg: this.the_back_canvas.toDataURL({format: 'png'})
		}

		this.setState({image: image})
		this.props.onSave(this.props.now_design.id, this.state.design, this.state.text, image, this.state.logo)
	}

    render() {
		console.log("DesignPage - render state: ", this.state)
		const designClickedWhat = this.state.designClickedWhat;
		const textClickedWhat = this.state.textClickedWhat;
		const logoClickedWhat = this.state.logoClickedWhat;

		let colorPicker;
		let textPicker;
		let logoPicker;

		const popover = {
			position: 'absolute',
			zIndex: '2',
		  }

		const cover = {
			position: 'fixed',
			top: '0px',
			right: '0px',
			bottom: '0px',
			left: '0px',
		}


		colorPicker = designClickedWhat
			? <center>
				<select id="design_element" onChange={(e)=>this.handleElementChange(e)}>
					<option value = "body">body</option>
					<option value = "sleeve">sleeve</option>
					<option value = "banding">banding</option>
					<option value = "stripe">stripe</option>
					<option value = "button">button</option>
				</select>
				<br/><br/>
				<CirclePicker width="220" id="design_colour"
					onChangeComplete={this.handleDesignChange} colors={this.design_color[designClickedWhat]}/>
				<br/>
			</center>
			: <div />


		textPicker = textClickedWhat
			? <center>
					<select id="text_element" onChange={(e)=>this.handleElementChange(e)}>
						<option value="frontchest">Front Chest</option>
						<option value="rightarm">Right Arm</option>
						<option value="upperback">Upper Back</option>
						<option value="middleback">Middle Back</option>
						<option value="lowerback">Lower Back</option>
					</select>

					<textarea id="text_area" placeholder={this.state.text[this.state.textClickedWhat].textvalue}
						name="textvalue" onChange={(e)=>this.handleTextChange(e)}/>
					<div className="section-field">
						<span id="title2">Font</span>
						<select id="text_font" name="fontFamily" onChange={(e)=>this.handleTextChange(e)}>
							<option>arial</option>
							<option>tahoma</option>
							<option>Alfa Slab One</option>
							<option>Teko</option>
							<option>Damion</option>
						</select>
						<br/>
					</div>
					<div className="section-field">
						<span id="title2">Style</span>
						<select id="text_style" name="fontStyle" onChange={(e)=>this.handleTextChange(e)}>
							<option>normal</option>
							<option>italic</option>
							<option>oblique</option>
							<option>bold</option>
						</select>
						<br/>
						</div>
					<div className="section-field2">
						<span id="title2">Size</span>
						<input type="range"  min="0" max="200" defaultValue="100" id="text_size"
							name="fontSize" onChange={(e)=>this.handleTextChange(e)}/>
					</div>

					<div className="section-field">
						<span id="title2">Color</span>
						<div onClick={()=>{this.setState({displayTextColor: !this.state.displayTextColor})}}>
							<button className="button button_60">Pick Color</button>
						</div>
						{ this.state.displayTextColor ? <div style={popover}> <div style={cover} onClick={()=>{this.setState({displayTextColor: false})}}/>
							<SketchPicker color={ this.state.text[document.getElementById("text_element").value].fill } onChange={this.handleTextColorChange} />
						</div> : null }
					</div>
					<div className="section-field">
					</div>
					<div className="section-field">
					<span id="title2">Border</span>
					<button className="button button_60">Pick Color</button><br/>
					<input type="range"  min="0" max="10" defaultValue="2" id="stroke_width"
						name="strokeWidth" onChange={(e)=>this.handleTextChange(e)}/>
					<div onClick={()=>{this.setState({displayBorderColor: !this.state.displayBorderColor})}}>

					</div>

					{ this.state.displayBorderColor ? <div style={popover}> <div style={cover} onClick={()=>{this.setState({displayBorderColor: false})}}/>
						<SketchPicker color={ this.state.text[document.getElementById("text_element").value].stroke } onChange={this.handleStrokeColorChange} />
					</div> : null }
					</div>
			</center>
		: <div/>


	  logoPicker = logoClickedWhat
			? <center>
				{/*<select id="logo_element" onChange={(e)=>this.handleElementChange(e)}>
								<option value="front">Front</option>
								<option value="back">Lower</option>
				</select>*/}
				<input type = "file" id = "input" onChange = {this.handleLogoChange} />
			</center>
			: <div/>



		return (
		<section className="wrap clear col3">

			{/*<!--========================================
				LEFT SIDE BAR
			=========================================-->*/}
			<div className="aside">
				<h2 className="h_white">SELECT STYLE</h2>

				<div className="content">

					{/*<!--========================================
						Design section
					=========================================-->*/}
					<div className="section-field">
						<span className="title1"> Color Match</span>
						<button id="popbtn" onClick={this.clickedDesignPopButton}>
						</button>
						{colorPicker}
					</div>

					{/*<!--========================================
						Text section
					=========================================-->*/}
					<div className="section-field">
						<span className="title1"> Text</span>
						<button id="popbtn" onClick={this.clickedTextPopButton}>

						</button>
						{textPicker}
					</div>

					{/*<!--========================================
						Image Upload Section
					=========================================-->*/}
					<div className="section-field">
						<span className="title1"> Logo</span>
						<button id="popbtn" onClick={this.clickedLogoPopButton}>
						</button>
						{logoPicker}
					</div>
				</div>
			</div>


		{/*<!--========================================
			CENTER DESIGN SECTION
		=========================================-->*/}
		<div className="main">
			<h2 className="h_white">SAMPLE VIEW</h2>
				<div className="content">

					{/*<!--========================================
						Fabric Canvas Section
					=========================================-->*/}
					{/*<ThreeScene/>*/}
					<div id="plain-react">
						<Tabs className="tabs tabs-1" onChange={(tab)=> this.handleCanvasChange(tab)}>

							<TabLink to="front">FRONT</TabLink>
							<TabLink to="back">BACK</TabLink>
							<TabContent for="front">

								<div classname="canvas-bg">
									<canvas id="front-canvas" />
								</div>
							</TabContent>

							<TabContent for="back">

								<div classname="canvas-bg">
									<canvas id="back-canvas"/>
								</div>
							</TabContent>
						</Tabs>
					</div>

					{/*<!--========================================
						NEW & SAVE Button Section
					=========================================-->*/}
					{this.props.isLoggedIn ?
						(<div>
							<button className="new_btn" type="button" onClick={() => this.props.onNew()}>NEW</button>
							{/* <button className="save_btn" type="button" onClick={() => this.props.onSave(this.props.now_design.id, this.state.design, this.state.text)}>SAVE</button> */}
							<button className="save_btn" type="button" onClick={() => this.onClickSave()}>SAVE</button>
						</div>)
						: <div>
							<button className="new_btn" type="button" onClick={() => this.props.onNew()}>NEW</button>
						</div>
					}
				</div>
			</div>

			{/*<!--========================================
				RIGHT SIDE BAR
			=========================================-->*/}
			<div className="aside">
				<h2 className="h_black">MY GROUP</h2>
				<div className="content">
					{this.props.isLoggedIn? <MyGroupList /> : <p>로그인을 해주세요</p>}
				</div>
			</div>
		</section>
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
	onSave: (designid, design, text, image, logo) => dispatch(toSaveDesign(designid, design, text, image, logo)),
})

export default connect (mapStateToProps, mapDispatchToProps)(DesignPage)
