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
			text_element: null,
			designClickedWhat: "body",
			textClickedWhat: null,
			logoClickedWhat: "front_close",

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

		//his.clickedAddButton = this.clickedAddButton.bind(this);
		this.scaleHandler = this.scaleHandler.bind(this);
		this.moveHandler = this.moveHandler.bind(this);
		this.onClickSave = this.onClickSave.bind(this);

		this.getDataUrl = this.getDataUrl.bind(this);
		this.temp = this.temp.bind(this);

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
			'object:scaled': this.scaleHandler,
			'object:moved': this.moveHandler,
		})

		this.the_back_canvas.on({
			'object:scaled': this.scaleHandler,
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
		
		// this.the_front_canvas.hoverCursor = 'pointer';
		// this.the_back_canvas.hoverCursor = 'pointer';
		// this.__canvases.push(this.the_front_canvas);
		this.setState({logoClickedWhat: "front_close"});


	}


	componentWillUpdate (nextProps, nextState) {
		// console.log("DesignPage - componentWillUpdate nextState: ", nextState)

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

				// var x =this.textElementToImage(nextState.text[element], element);
				// 	this.setState({text : ({...this.state.text,
				// 		[element]: ({...this.state.text[element], width:x.width, height: x.height})
				// 	})});

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
				console.log("logo: ", nextState.logo[element])
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
		console.log("logoClickedWhat tab value "+tab);
		let logoTab = this.state.logoClickedWhat
		if(logoTab === "front_close" || logoTab === "back_close") {
			this.setState({logoClickedWhat: tab + "_close"});
		}
		else {
			this.setState({logoClickedWhat: tab});
		}
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
		if (logo_element === "front_close" || logo_element==="back_close") {
			console.log("trying to add image but logoClickedWhat value close")
		}
		else {
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
			//scope.setState({logoClickedWhat: logo_element+"_close"});
		});

		if (file) {
            reader.readAsDataURL(file);
		}
		e.target.value = '';
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
        // console.log("DesignPage - designElementToImage - color: ", color, "type: ", type)

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

		console.log("design imgInstance: ", imgInstance)
		return imgInstance;

    }

    textElementToImage(text, type) {
		let imgInstance;
		if (text.width == 0) {
			console.log("text width 0")
			imgInstance = new fabric.IText(text.textvalue, {
				fontFamily: text.fontFamily,
				fill: text.fill,
				fontStyle: text.fontStyle,
				fontSize: text.fontSize,
				stroke: text.stroke,
				strokeWidth: text.strokeWidth,
				textAlign: "center",
				the_type: type,
				zIndex: 10,
				left: text.left,
				top: text.top,
			})
			this.setState({text : ({...this.state.text,
				[type]: ({...this.state.text[type],
				width: imgInstance.width,
				height: imgInstance.height}) })})
		}
		else {
		imgInstance = new fabric.IText(text.textvalue, {
			fontFamily: text.fontFamily,
			fill: text.fill,
			fontStyle: text.fontStyle,
			fontSize: text.fontSize,
			stroke: text.stroke,
			strokeWidth: text.strokeWidth,
			textAlign: "center",
			the_type: type,
			zIndex: 10,
			left: text.left,
			top: text.top,
			width: text.width,
			height: text.height,
			scaleX: text.scaleX,
			scaleY: text.scaleY,
			originX: "center",
			originY: "center",
		})
		}
		// console.log(this.state.text[type].width+ "야")
		// if(this.state.text[type].width == 0) {
		// 	console.log(this.state.text[type].width+ "야")
		// 	this.temp(imgInstance, type);
		// }
		
		console.log("text imgInstance: ", imgInstance)
		console.log(imgInstance.width);
		console.log(imgInstance.height);
        return imgInstance;
    }

	logoElementToImage(logo, type) {
		console.log("DesignPage - logoElementToImage", logo, type)

		let img = new Image();
		const scope = this;
		img.addEventListener('load', function(event){
			let imgInstance;
        	imgInstance = new fabric.Image(event.currentTarget, {
            width: logo.width,
			height: logo.height,
			the_type: type,
            zIndex: 10,
            left: logo.left,
            top: logo.top,
		});
		// imgInstance.set({
        //     scaleY: 0.05,
        //     scaleX: 0.05,
        //     originX: "center",
        //     originY: "center"
        // });

		scope.setState({element: imgInstance});
		})
		img.src = logo.src;

		let imgInstance;
		console.log("logo.width "+ logo.width);
		console.log("logo.height "+ logo.height);
        imgInstance = new fabric.Image(img, {
            width: logo.width,
			height: logo.height,
			the_type: type,
            zIndex: 10,
            left: logo.left,
			top: logo.top,
			scaleX: logo.scaleX,
			scaleY: logo.scaleY,
			originX: "center",
			originY: "center",
		});
		if(imgInstance.width >= 500) {
		console.log("logo element to image will be scaled")
        imgInstance.set({
            scaleY: 0.1,
            scaleX: 0.1,
            originX: "center",
            originY: "center"
		});
	}
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
	// clickedAddButton = () => {
	// 	this.forceUpdate();
	// }
	clickedDesignPopButton = () => {
		//console.log("clicked", this.state.designClickedWhat)
		this.state.designClickedWhat
			? this.setState({designClickedWhat: null})
			: this.setState({designClickedWhat: "body"});
		
	}
	clickedTextPopButton = () => {
		this.state.textClickedWhat
			? this.setState({textClickedWhat: null})
			: this.setState({textClickedWhat: "frontchest"});
	}
	/******************* problem detected *************/
	clickedLogoPopButton = () => {
		// this.state.logoClickedWhat
		// 	? this.setState({logoClickedWhat: null})
		// 	: this.setState({logoClickedWhat: "front"});
		var temp = this.state.logoClickedWhat;

		console.log("clickedLogoPopButton: logoClickedWhat "+ temp);

		if (temp === "front_close"){
			console.log("->front");
			this.setState({logoClickedWhat: "front"});
		}
		else if (temp === "back_close") {
			console.log("->back");
			this.setState({logoClickedWhat: "back"});
		}
		else if (temp === "front") {
			console.log("->front_close");
			this.setState({logoClickedWhat: "front_close"});
		}
		else if (temp === "back") {
			console.log("->back_close");
			this.setState({logoClickedWhat: "back_close"})
		}
		
	}

	temp (imgInstance, type) {
		this.setState({text : ({...this.state.text,
        	[type]: ({...this.state.text[type],
        	width: imgInstance.width,
            height: imgInstance.height}) })})
	}

	scaleHandler = (e)=>{
		let scalingObject = e.target;
		var width = scalingObject.getScaledWidth();
		var height = scalingObject.getScaledHeight();

		console.log("scaling: ", scalingObject)
		console.log("width: ", width, " height: ", height);

		if (scalingObject.the_type === "frontchest" ||
    		scalingObject.the_type === "rightarm" ||
    		scalingObject.the_type === "upperback" ||
    		scalingObject.the_type === "middleback" ||
    		scalingObject.the_type === "lowerback") {
			
			var old_width_text = this.state.text[scalingObject.the_type].width
			var old_height_text = this.state.text[scalingObject.the_type].height
			
			var scaleX_text= width/old_width_text
			var scaleY_text= height/old_height_text
			if (old_width_text != 0) {
			console.log("old_width_text "+ old_width_text+ "old_height_text "+old_height_text)
			console.log("width_text"+width+"height_text"+height)
			//width = width*2;
			//height = height*2;
			var scaleX_text= width/old_width_text
			var scaleY_text= height/old_height_text
    		this.setState({text : ({...this.state.text,
        	[scalingObject.the_type]: ({...this.state.text[scalingObject.the_type],
        	width: width,
            height: height, scaleX: scaleX_text, scaleY: scaleY_text})
			})});
			}
		}
		else if (scalingObject.the_type === "front" ||
         	scalingObject.the_type === "back") {
			console.log("scale handler logo width height")
			width = width*10;
			height = height*10;
			var old_width = this.state.logo[scalingObject.the_type].width
			var old_height = this.state.logo[scalingObject.the_type].height
			console.log("old_width "+ old_width+ "old_height "+old_height)
			var scaleX= width/old_width
			var scaleY= height/old_height
			console.log("scaleX " + scaleX+ "scaleY "+ scaleY);
    		this.setState({logo : ({...this.state.logo,
        	[scalingObject.the_type]: ({...this.state.logo[scalingObject.the_type],
        	width:width,
            height: height, scaleX: scaleX, scaleY: scaleY})
    	})});
		}
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
		window.confirm("design saved. Do you want to modify some more?")
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
				<select className = "select select_32"
				id="design_element" onChange={(e)=>this.handleElementChange(e)}>
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
			{(logoClickedWhat === "front" || logoClickedWhat === "front_close")
				? <select className="select select_32"
				id="text_element" onChange={(e)=>this.handleElementChange(e)}>
					<option value="frontchest">Front Chest</option>
					<option value="rightarm">Right Arm</option> )
				 </select>
				: <select className="select select_32"
				id="text_element" onChange={(e)=>this.handleElementChange(e)}>
						<option value="upperback">Upper Back</option>
						<option value="middleback">Middle Back</option>
						<option value="lowerback">Lower Back</option>
				</select>	
			}
				
			<textarea id="text_area" placeholder={this.state.text[this.state.textClickedWhat].textvalue}
				name="textvalue" onChange={(e)=>this.handleTextChange(e)}/>

			<div className = "section-field">
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
			<input type="range"  min="0" max="100" defaultValue="50" id="text_size" 
				name="fontSize" onChange={(e)=>this.handleTextChange(e)}/>
			</div>

			<div className="section-field">
			<span id="title2">Color</span>
			<div onClick={()=>{this.setState({displayTextColor: !this.state.displayTextColor})}}>
				<button className="button button_60">pick color</button>
			</div>
			{ this.state.displayTextColor ? <div style={popover}> <div style={cover} onClick={()=>{this.setState({displayTextColor: false})}}/>
				<SketchPicker color={ this.state.text[document.getElementById("text_element").value].fill } onChange={this.handleTextColorChange} />
			</div> : null }
			</div>

			<div className="section-field">
			</div>

			<div className="section-field">
			<span id="title2">Border</span>
			<div onClick={()=>{this.setState({displayBorderColor: !this.state.displayBorderColor})}}>
			<button className="button button_60">Pick Color</button><br/>
			</div>
			<input type="range"  min="0" max="10" defaultValue="2" id="stroke_width"
				name="strokeWidth" onChange={(e)=>this.handleTextChange(e)}/>
			{/*<div onClick={()=>{this.setState({displayBorderColor: !this.state.displayBorderColor})}}>*/}
				{/*<button>pick color</button>*/}
			{/*</div>*/}

			{ this.state.displayBorderColor ? <div style={popover}> <div style={cover} onClick={()=>{this.setState({displayBorderColor: false})}}/>
				<SketchPicker color={ this.state.text[document.getElementById("text_element").value].stroke } onChange={this.handleStrokeColorChange} />
			</div> : null }
			</div>
			</center>
			: <div/>


	//   logoPicker = logoClickedWhat
	// 		? <center>
	// 			{/*<select id="logo_element" onChange={(e)=>this.handleElementChange(e)}>
	// 							<option value="front">Front</option>
	// 							<option value="back">Lower</option>
	// 			</select>*/}
	// 			<input type = "file" id = "input" onChange = {this.handleLogoChange} />
	// 		</center>
	// 		: <div/>
		if (logoClickedWhat === "front_close" || logoClickedWhat === "back_close"){
			logoPicker = <div/>
		}
		else if (logoClickedWhat === "front" || logoClickedWhat === "back") {
			logoPicker = <center>
				<input type = "file" id = "input" onChange = {this.handleLogoChange} />
				</center>;
		}
		else {
			logoPicker = <div>logoClickedWhat does not have valid value</div>
		}


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
						{this.state.designClickedWhat
							? <img src="https://user-images.githubusercontent.com/44845920/59564888-1cd1b180-9087-11e9-918b-df35d1af3b1b.png"/>
							: <img src="https://user-images.githubusercontent.com/44845920/59564889-1e9b7500-9087-11e9-9347-cea6011b6b72.png"/>}

						</button>
						{colorPicker}
						</div>
	
						{/*<!--========================================
							Text section
						=========================================-->*/}
						<div className="section-field">
						<span className="title1"> Text</span>
						<button id="popbtn" onClick={this.clickedTextPopButton}>
						{this.state.textClickedWhat
							? <img src="https://user-images.githubusercontent.com/44845920/59564888-1cd1b180-9087-11e9-918b-df35d1af3b1b.png"/>
							: <img src="https://user-images.githubusercontent.com/44845920/59564889-1e9b7500-9087-11e9-9347-cea6011b6b72.png"/>}
						</button>
						{textPicker}
						</div>
						{/*<!--========================================
							Image Upload Section
						=========================================-->*/}
						<div className="section-field">
						<span className="title1"> Logo</span>
						<button id="popbtn" onClick={this.clickedLogoPopButton}>
						{this.state.logoClickedWhat
							? <img src="https://user-images.githubusercontent.com/44845920/59564888-1cd1b180-9087-11e9-918b-df35d1af3b1b.png"/>
							: <img src="https://user-images.githubusercontent.com/44845920/59564889-1e9b7500-9087-11e9-9347-cea6011b6b72.png"/>}
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
								<button className="button rst_btn" type="button" onClick={() => this.props.onNew()}>NEW</button>
								{/* <button className="save_btn" type="button" onClick={() => this.props.onSave(this.props.now_design.id, this.state.design, this.state.text)}>SAVE</button> */}
								<button className="button save_btn" type="button" onClick={() => this.onClickSave()}>SAVE</button>
							</div>)
							: <div>
								<button className="button rst_btn" type="button" onClick={() => this.props.onNew()}>NEW</button>
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
	//onView: () => dispatch(changeUrl('/group/1'))
})

export default connect (mapStateToProps, mapDispatchToProps)(DesignPage)
