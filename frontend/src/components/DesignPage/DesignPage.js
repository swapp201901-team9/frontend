import React from 'react';
import {connect} from 'react-redux';
import {fabric} from 'fabric';
import {CirclePicker} from 'react-color';
//import ThreeScene from './ThreeScene';
//import FabricCanvas from './FabricCanvas';
import MyGroupList from '../GroupPage/MyGroupList';
//import ImageUploader from 'react-images-upload';

import { toSaveDesign, toNewDesign } from '../../actions/index.js';
//import { tsImportEqualsDeclaration } from '@babel/types';

import logo from './images/templates/templatelist';

//the templates are imported as images and passed as props to the TemplateList components.
//if the user chooses any of the properties, the state gets updated in the DesignPage component
//it gets passed onto FabricCanvas as prop
//FabricCanvas uses lifecycle method ComponentWillReceiveProps() to update the canvas
//about saveToCanvas: use a method from fabric named TODataUrl()

// export default class DesignPage extends React.Component {
/*class DesignPage extends React.Component {
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
					fill: "#3f51b5",
					fontStyle: "bold",
					fontSize: 50,
					left: 250,
					top: 110,
				},
				rightarm: {
					textvalue: "19",
					fontFamily: "arial",
					fill: "#607d8b",
					fontStyle: "bold",
					fontSize: 50,
					left: 50,
					top: 120,
				},
				upperback: {
					textvalue: "SEOUL NAT'L",
					fontFamily: "arial",
					fill: "#ffc107",
					fontStyle: "bold",
					fontSize: 25,
					left: 135,
					top: 125,
				},
				middleback: {
					textvalue: "UNIVERSITY",
					fontFamily: "arial",
					fill: "#ffc107",
					fontStyle: "bold",
					fontSize: 20,
					left: 155,
					top: 155,
				},
				lowerback: {
					textvalue: "Department of\nComputer Science",
					fontFamily: "arial",
					fill: "#ffc107",
					fontStyle: "italic",
					fontSize: 15,
					left: 150,
					top: 190,
				}
			},
			
			logo : {
				frontchest: {
					left: 250,
					top: 110,
				},
				rightarm: {
					left: 50,
					top: 120,
				},
				upperback: {
					left: 135,
					top: 125,
				},
				middleback: {
					left: 155,
					top: 155,
				},
				lowerback: {
					left: 150,
					top: 190,
				}
			},

			designClickedWhat: null,
			textClickedWhat: null,
			logoClickedWhat: null
		};


		this.handleElementChange = this.handleElementChange.bind(this);
		this.handleDesignChange = this.handleDesignChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleTextColorChange = this.handleTextColorChange.bind(this);
		this.handleLogoChange = this.handleLogoChange.bind(this);

		this.designElementToImage = this.designElementToImage.bind(this);
		this.textElementToImage = this.textElementToImage.bind(this);
		this.logoElementToImage = this.logoElementToImage.bind(this);
        this.updateFrontCanvas = this.updateFrontCanvas.bind(this);
		this.updateBackCanvas = this.updateBackCanvas.bind(this);
		

		this.clickedDesignInitButton = this.clickedDesignInitButton.bind(this);
		this.clickedTextInitButton = this.clickedTextInitButton.bind(this);
		this.clickedLogoInitButton = this.clickedLogoInitButton.bind(this);
		this.clickedAddButton = this.clickedAddButton.bind(this);
		this.moveHandler = this.moveHandler.bind(this);
		//this.onDrop = this.onDrop.bind(this);
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
				"#097c25", "#0075a9", "#601986", "#580b0b", "#cfcfcf", "#626262", "#001c58", "#232323"]
		}

		this.design_element = ["body", "sleeve", "stripe", "banding", "button"]
		this.text_element = ["frontchest", "rightarm", "upperback", "middleback", "lowerback"]
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
        this.the_front_canvas.add(this.designElementToImage(this.state.design.stripe, "front_stripe", 2))
        this.the_back_canvas.add(this.designElementToImage(this.state.design.stripe, "back_stripe", 2))
        this.the_front_canvas.add(this.designElementToImage(this.state.design.button, "front_button", 2))

        this.the_front_canvas.add(this.textElementToImage(this.state.text.frontchest, "frontchest"))
        this.the_front_canvas.add(this.textElementToImage(this.state.text.rightarm, "rightarm"))
        this.the_back_canvas.add(this.textElementToImage(this.state.text.upperback, "upperback"))
        this.the_back_canvas.add(this.textElementToImage(this.state.text.middleback, "middleback"))
        this.the_back_canvas.add(this.textElementToImage(this.state.text.lowerback, "lowerback"))

        // console.log("the_front_canvas: ", this.the_front_canvas);
        //this.the_front_canvas.renderAll();
		//this.the_back_canvas.renderAll();
	}


	componentWillUpdate = (nextProps, nextState) => {
		console.log("DesignPage - componentWillUpdate nextState: ", nextState)
	
        // If Updated Item is not the same as the old one
        //         => Update the canvas with newer item
        for(let element of this.design_element){
            if(nextState.design[element] !== this.state.design[element]) {
                if(element === "stripe" ) {
                    this.updateFrontCanvas(this.designElementToImage(nextState.design[element], 'front_'+element, 2))
                    this.updateBackCanvas(this.designElementToImage(nextState.design[element], 'back_'+element, 2))
                }
                else if (element === "button") {
                    this.updateFrontCanvas(this.designElementToImage(nextState.design[element], 'front_'+element, 2))
                }
                else {
                    this.updateFrontCanvas(this.designElementToImage(nextState.design[element], 'front_'+element, 0))
                    this.updateBackCanvas(this.designElementToImage(nextState.design[element], 'back_'+element, 0))
                    //this.forceUpdate();
                    //console.log("force update");
                }
            }
        }

        for(let element of this.text_element){
            if(nextState.text[element] !== this.state.text[element]) {
				if(element === "frontchest" || element === "rightarm") {
					this.updateFrontCanvas(this.textElementToImage(nextState.text[element], element))
				}
				else {
					this.updateBackCanvas(this.textElementToImage(nextState.text[element], element))
				}
            }
		}
		this.the_front_canvas.renderAll();
        this.the_back_canvas.renderAll();
	}

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
		else if (id === "logo_element") {
			this.setState({logoClickedWhat: value});
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
		console.log("DesignPage - handleTextColorChange")

		this.setState({text : ({...this.state.text, 
			[text_element]: ({...this.state.text[text_element], fill: color.hex})
		})});
	}

	handleLogoChange = (e) => {
        console.log("hey");

		e.preventDefault();
		const scope = this;
		var img = document.createElement("img");
		var file = document.getElementById('input').files[0];
		let reader = new FileReader();
		reader.addEventListener("load", function() {
			img.src = reader.result;
			//scope.setState({logo: img});
			scope.logoElementToImage(img, null);
		})

		if (file) {
            reader.readAsDataURL(file);
        }
        // var preview = document.getElementById('img');
        // var file = document.getElementById('input').files[0];
        // var canvas = this.the_front_canvas;
        // let reader = new FileReader();
        // reader.addEventListener("load", function() {
        //     preview.src = reader.result;
        //     var imgInstance = new fabric.Image(preview, {
        //     width: 899,
        //     height:959,
        //     the_type: "upload",
        //     zIndex: 12
        //     });
        //     console.log("imgInstance set");
        //     imgInstance.set({
        //         scaleY: 0.1,
        //         scaleX: 0.1,
        //         originX: "center",
        //         originY: "center"
        //     });
        //     console.log("imgInstance scale");

        // },false);


        // if (file) {
        //     reader.readAsDataURL(file);
        // }

        // this.the_front_canvas = canvas;
	}

    designElementToImage(color, type, z_Index) {
        console.log("DesignPage - designElementToImage - color: ", color, "type: ", type)

        var imgElement = document.createElement("img");
        var src = './images/templates/' + type + '/' + type + color.substring(1)+'.png';
        
        // console.log("src: ", src)
		imgElement.setAttribute("src", require(src));

		var imgInstance = new fabric.Image(imgElement, {
			width: 430,
			height: 460,
			the_type: type                                                         ,
			zIndex: z_Index
		});

        // console.log("imgInstance: ", imgInstance)
        return imgInstance;
    }

    textElementToImage(text, type) {
        console.log("DesignPage - textElementToImage")
        let imgInstance = new fabric.IText(text.textvalue, {
			fontFamily: text.fontFamily,
			fill: text.fill,
			fontStyle: text.fontStyle,
			fontSize: text.fontSize,
			the_type: type,
			zIndex: 10,
			left: text.left,
			top: text.top,
			textAlign: "center"
		})
        
        // console.log("text imgInstance: ", imgInstance)
        return imgInstance
	}
	
	logoElementToImage(img, type) {
        console.log("FabricCanvas - textElementToImage")
        let imgInstance;
        
        imgInstance = new fabric.Image(img, {
            width: 899,
			height:959,
			the_type: type,
            zIndex: 10,
            left: 450,
            top: 600
        });
        imgInstance.set({
            scaleY: 0.2,
            scaleX: 0.2,
            originX: "center",
            originY: "center"
        });
         
        //console.log("text imgInstance: ", imgInstance)
        return imgInstance;
    }

    updateFrontCanvas = (next) => {
        console.log("DesignPage - updateFrontCanvas next: ", next)

        if(next){
			// this.the_front_canvas.add(next);

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
            //this.the_back_canvas.renderAll();
        }
    }

	clickedDesignInitButton = (e) => {
		this.setState({designClickedWhat: "body"});
		this.forceUpdate();
	}

	clickedTextInitButton = (e) => {
		this.setState({textClickedWhat: "frontchest"});
		this.forceUpdate();
	}

	clickedLogoInitButton = (e) => {
		this.setState({logoClickedWhat: "frontchest"});
		this.forceUpdate();
	}

	clickedAddButton = (e) => {
		this.forceUpdate();
	}


	moveHandler = (e) =>{
		let movingObject = e.target;
		console.log(movingObject)
		console.log("left: ", movingObject.get('left'), " top: ", movingObject.get('top'))

		this.setState({text : ({...this.state.text, 
			[movingObject.the_type]: ({...this.state.text[movingObject.the_type],
				left:movingObject.get('left'),
				top: movingObject.get('top')})
		})});
	}


    saveToCanvas = () => {
        console.log("DesignPage - saveToCanvas")

        let link = document.createElement("a");
        link.href = this.the_canvas.toDataURL({format: 'png'});
        link.download = "design.png";
        link.click();
    }

    fileChangedHandler = (event) => {
        const file = event.target.files[0];
        this.setState({selectedFile: file});
    }

    render() {
		console.log("DesignPage - render state: ", this.state)
		const designClickedWhat = this.state.designClickedWhat;
		const textClickedWhat = this.state.textClickedWhat;
		const logoClickedWhat = this.state.logoClickedWhat;
		let colorPicker;
		let textPicker;
		let logoPicker;

		if(designClickedWhat === null) {
			colorPicker = <button  onClick={(e) => this.clickedDesignInitButton(e)}>DEFAULT</button>
		}
		else {
			colorPicker = <CirclePicker width="220" id="design_colour" 
				onChangeComplete={this.handleDesignChange} colors={this.design_color[clickedWhat]}/>;
		}

		if(textClickedWhat === null) {
			textPicker = <button  onClick={(e) => this.clickedTextInitButton(e)}>DEFAULT</button>
		}
		else {
			textPicker =
			<center> 
			<textarea id="text_area" placeholder={this.state.text[this.state.textClickedWhat].textvalue} 
				name="textvalue" onChange={(e)=>this.handleTextChange(e)}/>
			<p>Color</p>
				<CirclePicker width="220" id="text_colour" name="fill" onChangeComplete={this.handleTextColorChange}/>
			</center>
		}

		if(logoClickedWhat === null) {
			logoPicker = <button  onClick={(e) => this.clickedLogoInitButton(e)}>DEFAULT</button>
		}
		else {
			logoPicker = <input type = "file" id = "input" onChange = {this.handleLogoChange} />
		}

		return (
		<section className="wrap clear col3">

			
			<div className="aside">
				<h2 className="h_white">SELECT STYLE</h2>
				
				<div className="content">

					
					<h1>Design</h1>
					<center>
						<select id="design_element" onChange={(e)=>this.handleElementChange(e)}>
							<option value = "body">body</option>
							<option value = "sleeve">sleeve</option>
							<option value = "banding">banding</option>
							<option value = "stripe">stripe</option>
							<option value = "button">button</option>
						</select>
						<br/><br/>
						{colorPicker}
						<br/>
						<div className="Button-Field-Side"> 
							<button onClick={(e) => this.clickedAddButton(e)}>ADD</button>
						</div>
					</center>
	

					
					<h1>Text</h1>
					<center>
						<select id="text_element" onChange={(e)=>this.handleElementChange(e)}>
							<option value="frontchest">Front Chest</option>
							<option value="rightarm">Right Arm</option>
							<option value="upperback">Upper Back</option>
							<option value="middleback">Middle Back</option>
							<option value="lowerback">Lower Back</option>
						</select>
						
						<textarea id="text_area" placeholder={this.state.text[this.state.textClickedWhat].textvalue} 
							name="textvalue" onChange={(e)=>this.handleTextChange(e)}/>

						<p>Font</p> 
						<select id="text_font" name="fontFamily" onChange={(e)=>this.handleTextChange(e)}>
							<option>arial</option>
							<option>tahoma</option>
							<option>times new roman</option>
							<option>anton</option>
							<option>Akronim</option>
							<option>Alex Brush</option>
							<option>Aguafina Script</option>
						</select>
						
						<p>Style</p>
						<select id="text_style" name="fontStyle" onChange={(e)=>this.handleTextChange(e)}>
							<option>normal</option>
							<option>italic</option>
							<option>oblique</option>
							<option>bold</option>
						</select>

						<p>Size</p> 
						<input type="range"  min="0" max="200" defaultValue="100" id="text_size" 
							name="fontSize" onChange={(e)=>this.handleTextChange(e)}/>

						<p>Color</p>
							<CirclePicker width="220" id="text_colour" name="fill" onChangeComplete={this.handleTextColorChange}/>

					</center>
			

					
					<h1>Logo</h1>
					<select id="text_element" onChange={(e)=>this.handleElementChange(e)}>
							<option value="frontchest">Front Chest</option>
							<option value="rightarm">Right Arm</option>
							<option value="upperback">Upper Back</option>
							<option value="middleback">Middle Back</option>
							<option value="lowerback">Lower Back</option>
					</select>
					<input type = "file" id = "input" onChange = {this.handleLogoChange} />
				</div>
			</div>



			
			<div className="main">
				<h2 className="h_white">SAMPLE VIEW</h2>
				<div className="content">

					
					<div className= "main-canvas-container">
						<button class="front_btn" type="button">Front</button>
						<canvas id='front-canvas'/>

						<button class="back_btn" type="button">Back</button>
						<canvas id='back-canvas'/>
					</div>
		
					
					{this.props.isLoggedIn ?
						(<div>
							<button className="new_btn" type="button" onClick={() => this.props.onNew()}>NEW</button>
							<button className="save_btn" type="button" onClick={() => this.props.onSave(this.props.now_design.id, this.state.design, this.state.text)}>SAVE</button>
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
		);
    }
}*/
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
					fill: "#3f51b5",
					fontStyle: "bold",
					fontSize: 50,
					left: 250,
					top: 110,
				},
				rightarm: {
					textvalue: "19",
					fontFamily: "arial",
					fill: "#607d8b",
					fontStyle: "bold",
					fontSize: 50,
					left: 50,
					top: 120,
				},
				upperback: {
					textvalue: "SEOUL NAT'L",
					fontFamily: "arial",
					fill: "#ffc107",
					fontStyle: "bold",
					fontSize: 25,
					left: 135,
					top: 125,
				},
				middleback: {
					textvalue: "UNIVERSITY",
					fontFamily: "arial",
					fill: "#ffc107",
					fontStyle: "bold",
					fontSize: 20,
					left: 155,
					top: 155,
				},
				lowerback: {
					textvalue: "Department of\nComputer Science",
					fontFamily: "arial",
					fill: "#ffc107",
					fontStyle: "italic",
					fontSize: 15,
					left: 150,
					top: 190,
				}
			
			},

			logo : {
				frontchest: {
					src: require('./images/logo.jpg'),
					left: 250,
					top: 110,
				},
				rightarm: {
					src: require('./images/logo.jpg'),
					left: 50,
					top: 120,
				},
				upperback: {
					src: require('./images/logo.jpg'),
					left: 135,
					top: 125,
				},
				middleback: {
					src: require('./images/logo.jpg'),
					left: 155,
					top: 155,
				},
				lowerback: {
					src: require('./images/logo.jpg'),
					left: 150,
					top: 190,
				}
			},

			designClickedWhat: null,
			textClickedWhat: null,
			logoClickedWhat: null,
		};

		this.handleElementChange = this.handleElementChange.bind(this);
		this.handleDesignChange = this.handleDesignChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleTextColorChange = this.handleTextColorChange.bind(this);
		this.handleLogoChange = this.handleLogoChange.bind(this);

		this.designElementToImage = this.designElementToImage.bind(this);
		this.textElementToImage = this.textElementToImage.bind(this);
		this.logoElementToImage = this.logoElementToImage.bind(this);
        this.updateFrontCanvas = this.updateFrontCanvas.bind(this);
		this.updateBackCanvas = this.updateBackCanvas.bind(this);
		
		this.clickedInitButton = this.clickedInitButton.bind(this);
		this.clickedAddButton = this.clickedAddButton.bind(this);
		this.moveHandler = this.moveHandler.bind(this);
		this.onDrop = this.onDrop.bind(this);
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
				"#097c25", "#0075a9", "#601986", "#580b0b", "#cfcfcf", "#626262", "#001c58", "#232323"]
		}

		this.design_element = ["body", "sleeve", "stripe", "banding", "button"]
		this.text_element = ["frontchest", "rightarm", "upperback", "middleback", "lowerback"]
		this.logo_element = ["frontchest", "rightarm", "upperback", "middleback", "lowerback"]
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
        this.the_front_canvas.add(this.designElementToImage(this.state.design.stripe, "front_stripe", 2))
        this.the_back_canvas.add(this.designElementToImage(this.state.design.stripe, "back_stripe", 2))
        this.the_front_canvas.add(this.designElementToImage(this.state.design.button, "front_button", 2))

        this.the_front_canvas.add(this.textElementToImage(this.state.text.frontchest, "frontchest"))
        this.the_front_canvas.add(this.textElementToImage(this.state.text.rightarm, "rightarm"))
        this.the_back_canvas.add(this.textElementToImage(this.state.text.upperback, "upperback"))
        this.the_back_canvas.add(this.textElementToImage(this.state.text.middleback, "middleback"))
        this.the_back_canvas.add(this.textElementToImage(this.state.text.lowerback, "lowerback"))
	}


	componentWillUpdate = (nextProps, nextState) => {
		console.log("DesignPage - componentWillUpdate nextState: ", nextState)
	
        // If Updated Item is not the same as the old one
        //         => Update the canvas with newer item
        for(let element of this.design_element){
            if(nextState.design[element] !== this.state.design[element]) {
                if(element === "stripe" ) {
                    this.updateFrontCanvas(this.designElementToImage(nextState.design[element], 'front_'+element, 2))
                    this.updateBackCanvas(this.designElementToImage(nextState.design[element], 'back_'+element, 2))
                }
                else if (element === "button") {
                    this.updateFrontCanvas(this.designElementToImage(nextState.design[element], 'front_'+element, 2))
                }
                else {
                    this.updateFrontCanvas(this.designElementToImage(nextState.design[element], 'front_'+element, 0))
                    this.updateBackCanvas(this.designElementToImage(nextState.design[element], 'back_'+element, 0))
                }
            }
        }

        for(let element of this.text_element){
            if(nextState.text[element] !== this.state.text[element]) {
				if(element === "frontchest" || element === "rightarm") {
					this.updateFrontCanvas(this.textElementToImage(nextState.text[element], element))
				}
				else {
					this.updateBackCanvas(this.textElementToImage(nextState.text[element], element))
				}
            }
		}

		for (let element of this.logo_element) {
			if(nextState.logo[element] !== this.state.logo[element]) {
				if(element === "frontchest" || element === "rightarm") {
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
		else if (id == "logo_element") {
			this.setState({logoClickedWhat: value});
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
		console.log("DesignPage - handleTextColorChange")

		this.setState({text : ({...this.state.text, 
			[text_element]: ({...this.state.text[text_element], fill: color.hex})
		})});
	}

	handleLogoChange = (e) => {
        console.log("hey");

		e.preventDefault();
		const scope = this;
		var img = document.createElement("img");
		var file = document.getElementById('input').files[0];
		let reader = new FileReader();
		reader.addEventListener("load", function() {
			img.src = reader.result;
			//scope.setState({logo: img});
			//scope.logoElementToImage(img, null);
		})

		if (file) {
            reader.readAsDataURL(file);
        }
	}

    designElementToImage(color, type, z_Index) {
        console.log("DesignPage - designElementToImage - color: ", color, "type: ", type)

        var imgElement = document.createElement("img");
        var src = './images/templates/' + type + '/' + type + color.substring(1)+'.png';
        
        // console.log("src: ", src)
		imgElement.setAttribute("src", require(src));

		var imgInstance = new fabric.Image(imgElement, {
			width: 430,
			height: 460,
			the_type: type                                                         ,
			zIndex: z_Index
		});

        // console.log("imgInstance: ", imgInstance)
        return imgInstance
    }

    textElementToImage(text, type) {
        console.log("DesignPage - textElementToImage")
        let imgInstance = new fabric.IText(text.textvalue, {
			fontFamily: text.fontFamily,
			fill: text.fill,
			fontStyle: text.fontStyle,
			fontSize: text.fontSize,
			the_type: type,
			zIndex: 10,
			left: text.left,
			top: text.top,
			textAlign: "center"
		})
        
        // console.log("text imgInstance: ", imgInstance)
        return imgInstance;
    }

	logoElementToImage(img, type) {
        console.log("FabricCanvas - textElementToImage")
        let imgInstance;
        
        imgInstance = new fabric.Image(img.src, {
            width: 899,
			height:959,
			the_type: type,
            zIndex: 10,
            left: 450,
            top: 600
        });
        imgInstance.set({
            scaleY: 0.2,
            scaleX: 0.2,
            originX: "center",
            originY: "center"
        });
         
        //console.log("text imgInstance: ", imgInstance)
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
            //this.the_back_canvas.renderAll();
        }
    }

	clickedInitButton = (e) => {
		this.setState({designClickedWhat: "body", 
					   textClickedWhat: "frontchest",
					   logoClickedWhat: "frontchest"});
		this.forceUpdate();
	}

	clickedAddButton = (e) => {
		this.forceUpdate();
	}

	moveHandler = (e) =>{
		let movingObject = e.target;
		console.log(movingObject)
		console.log("left: ", movingObject.get('left'), " top: ", movingObject.get('top'))

		this.setState({text : ({...this.state.text, 
			[movingObject.the_type]: ({...this.state.text[movingObject.the_type],
				left:movingObject.get('left'),
				top: movingObject.get('top')})
		})});
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

    saveToCanvas = () => {
        console.log("DesignPage - saveToCanvas")

        let link = document.createElement("a");
        link.href = this.the_canvas.toDataURL({format: 'png'});
        link.download = "design.png";
        link.click();

    }

    fileChangedHandler = (event) => {
        const file = event.target.files[0];
        this.setState({selectedFile: file});
    }

    render() {
		console.log("DesignPage - render state: ", this.state)
		const designClickedWhat = this.state.designClickedWhat;
		const textClickedWhat = this.state.textClickedWhat;
		const logoClickedWhat = this.logoClickedWhat;

		let colorPicker;
		let textPicker;
		let logoPicker;

		if(designClickedWhat === null) {
			colorPicker = <button  onClick={(e) => this.clickedInitButton(e)}>DEFAULT</button>
		}
		else {
			colorPicker = <CirclePicker width="220" id="design_colour" 
				onChangeComplete={this.handleDesignChange} colors={this.design_color[designClickedWhat]}/>;
		}

		if(textClickedWhat === null) {
			textPicker = <button  onClick={(e) => this.clickedInitButton(e)}>DEFAULT</button>
		}
		else {
			textPicker = <center>
			<select id="text_element" onChange={(e)=>this.handleElementChange(e)}>
				<option value="frontchest">Front Chest</option>
				<option value="rightarm">Right Arm</option>
				<option value="upperback">Upper Back</option>
				<option value="middleback">Middle Back</option>
				<option value="lowerback">Lower Back</option>
			</select>
			
			<textarea id="text_area" placeholder={this.state.text[this.state.textClickedWhat].textvalue} 
				name="textvalue" onChange={(e)=>this.handleTextChange(e)}/>

			<p>Font</p> 
			<select id="text_font" name="fontFamily" onChange={(e)=>this.handleTextChange(e)}>
				<option>arial</option>
				<option>tahoma</option>
				<option>times new roman</option>
				<option>anton</option>
				<option>Akronim</option>
				<option>Alex Brush</option>
				<option>Aguafina Script</option>
			</select>
			
			<p>Style</p>
			<select id="text_style" name="fontStyle" onChange={(e)=>this.handleTextChange(e)}>
				<option>normal</option>
				<option>italic</option>
				<option>oblique</option>
				<option>bold</option>
			</select>

			<p>Size</p> 
			<input type="range"  min="0" max="200" defaultValue="100" id="text_size" 
				name="fontSize" onChange={(e)=>this.handleTextChange(e)}/>

			<p>Color</p>
				<CirclePicker width="220" id="text_colour" name="fill" onChangeComplete={this.handleTextColorChange}/>

		</center>;
		}

		if(logoClickedWhat === null) {
			logoPicker = <button  onClick={(e) => this.clickedInitButton(e)}>DEFAULT</button>
		}
		else {
			logoPicker = <input type = "file" id = "input" onChange = {this.handleLogoChange} />;
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
					<h1>Design</h1>
					<center>
						<select id="design_element" onChange={(e)=>this.handleElementChange(e)}>
							<option value = "body">body</option>
							<option value = "sleeve">sleeve</option>
							<option value = "banding">banding</option>
							<option value = "stripe">stripe</option>
							<option value = "button">button</option>
						</select>
						<br/><br/>
						{colorPicker}
						<br/>
						<div className="Button-Field-Side"> 
							<button onClick={(e) => this.clickedAddButton(e)}>ADD</button>
						</div>
					</center>
	

					{/*<!--========================================
						Text section
					=========================================-->*/}
					<h1>Text</h1>
					{textPicker}
					{/*<center>
						<select id="text_element" onChange={(e)=>this.handleElementChange(e)}>
							<option value="frontchest">Front Chest</option>
							<option value="rightarm">Right Arm</option>
							<option value="upperback">Upper Back</option>
							<option value="middleback">Middle Back</option>
							<option value="lowerback">Lower Back</option>
						</select>
						
						<textarea id="text_area" placeholder={this.state.text[this.state.textClickedWhat].textvalue} 
							name="textvalue" onChange={(e)=>this.handleTextChange(e)}/>

						<p>Font</p> 
						<select id="text_font" name="fontFamily" onChange={(e)=>this.handleTextChange(e)}>
							<option>arial</option>
							<option>tahoma</option>
							<option>times new roman</option>
							<option>anton</option>
							<option>Akronim</option>
							<option>Alex Brush</option>
							<option>Aguafina Script</option>
						</select>
						
						<p>Style</p>
						<select id="text_style" name="fontStyle" onChange={(e)=>this.handleTextChange(e)}>
							<option>normal</option>
							<option>italic</option>
							<option>oblique</option>
							<option>bold</option>
						</select>

						<p>Size</p> 
						<input type="range"  min="0" max="200" defaultValue="100" id="text_size" 
							name="fontSize" onChange={(e)=>this.handleTextChange(e)}/>

						<p>Color</p>
							<CirclePicker width="220" id="text_colour" name="fill" onChangeComplete={this.handleTextColorChange}/>

					</center>*/}
			

					{/*<!--========================================
						Image Upload Section
					=========================================-->*/}
					<h1>Logo</h1>
					<select id="logo_element" onChange={(e)=>this.handleElementChange(e)}>
							<option value="frontchest">Front Chest</option>
							<option value="rightarm">Right Arm</option>
							<option value="upperback">Upper Back</option>
							<option value="middleback">Middle Back</option>
							<option value="lowerback">Lower Back</option>
						</select>
					{/*<input type = "file" id = "input" onChange = {this.handleLogoChange} />*/}
					{logoPicker}
					{/*<img src = "" id = "img" />*/}
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
					<div className= "main-canvas-container">
						<button class="front_btn" type="button">Front</button>
						<canvas id='front-canvas'/>

						<button class="back_btn" type="button">Back</button>
						<canvas id='back-canvas'/>
					</div>
		
					{/*<!--========================================
						NEW & SAVE Button Section
					=========================================-->*/}
					{this.props.isLoggedIn ?
						(<div>
							<button className="new_btn" type="button" onClick={() => this.props.onNew()}>NEW</button>
							<button className="save_btn" type="button" onClick={() => this.props.onSave(this.props.now_design.id, this.state.design, this.state.text)}>SAVE</button>
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
	onSave: (designid, design, text) => dispatch(toSaveDesign(designid, design, text)),
})

export default connect (mapStateToProps, mapDispatchToProps)(DesignPage)
