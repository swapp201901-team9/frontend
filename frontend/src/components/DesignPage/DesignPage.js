import React from 'react';
import {fabric} from 'fabric';
import {CirclePicker} from 'react-color';
//import './css/style.css';
//import './App.css';

import FabricCanvas from './FabricCanvas'
import TemplateList from './TemplateList'
import {bglist, facelist, eyeslist, faciallist, hairlist} from './images/templates/templatelist';
//import {Col, Tabs, Tab, Button } from 'react-bootstrap';



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
									zIndex = {0}
									addtocanvas = {this.addToCanvas}
								/>
                </div>
              </div>
              <div className="main">
                <h2 className="h_white">SAMPLE VIEW</h2>
                <div className="content">
                
                </div>
              </div>
              <div className="aside">
                <h2 className="h_black">MY GROUP</h2>
                <div className="content">
                  <p>MyGroupList contents</p>
                </div>
              </div>
            </section>
				
		{/*<!--========================================
			left design tool
    =========================================-->*/}
		<div class="design_tool">
			<ul>
				<li>
				  	<a href="#home" data-toggle="modal" data-target="#productModal"><i class="fa fa-leaf" aria-hidden="true"></i><span>Choose product</span></a>
				</li>
				<li class="add_text">
					<a class="open_window" href="#">
						<i class="fa fa-text-width" aria-hidden="true"></i>
						<span>Add text</span>
					</a>
					<div class="text_tool_window">
						<div class="header clear_fix">
							<p class="title"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit text</p>
							<i id="close_window" class="fa fa-window-close" aria-hidden="true"></i>
						</div>
						<textarea id="text_area"> Hello
						</textarea>
						<div class="wrapper clear_fix">
					        <div class="font_area">
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
					        </div>
					        <div class="color_area">
					        	<p>Text colour</p>
					        	{/*<!-- colour -->*/}
										{/*<input type="text" id="text_colour" />*/}
										<CirclePicker onChange={ this.handleChange } />
							</div>
						</div>
				        <div class="font_style">
				        	<p>Text style</p>
			        		<select id="text_style">

			        			{/*<!-- font style -->*/}
								<option>normal</option>
								<option>italic</option>
								<option>oblique</option>
								<option>bold</option>
					        </select>
				        </div>
				        <div class="font_size">
				        	{/*<!-- font size -->*/}
				        	<p>Font Size :</p> <input type="range"  min="0" max="100" value="30" id="text_size" />
				        </div>
					</div>
				</li>
				<li>
				  	<a href="#" data-toggle="modal" data-target="#imgUploadModal"><i class="fa fa-picture-o" aria-hidden="true"></i><span>Add image</span></a>
				</li>
				<li>
					<a href="#" class="export_btn" data-toggle="modal" data-target="#previewModal"><i class="fa fa-arrow-up" aria-hidden="true"></i><span>Export</span></a>
				  	{/*<!-- <a href="#" data-toggle="modal" data-target="#previewModal"><i class="fa fa-arrow-up" aria-hidden="true"></i><span>Export</span></a> -->*/}
				</li>
			</ul>
		</div>

		{/*<!--========================================
			front-back button section
    =========================================-->*/}
		<div class="change_side">
			<button class="front_btn" type="button">Front</button>
			<button class="back_btn" type="button">Back</button>
		</div>

		{/*<!--========================================
			product modal
    =========================================-->*/}
		<div class="modal fade" id="productModal" role="dialog">
			<div class="modal-dialog modal-lg">
				{/*<!-- Modal content-->*/}
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Products</h4>
					</div>
					<div class="modal-body product_area clear_fix">
					</div>
					<div class="modal-footer">
					    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>

		{/*<!--========================================
			Image Upload Modal
    =========================================-->*/}
		<div class="modal fade" id="imgUploadModal" role="dialog">
			<div class="modal-dialog modal-lg">

				{/*<!-- Modal content-->*/}
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Upload image</h4>
					</div>
					<div class="modal-body">
						<input type="file" id="imgfile"/>
					</div>
					<div class="modal-footer">

						<button type="button" class="btn btn-default btn_add_image" name="button">Upload</button>

					    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>



	
      </div>
 
      );
    }
  }
