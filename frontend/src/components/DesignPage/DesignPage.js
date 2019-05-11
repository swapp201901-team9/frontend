import React from 'react';
import ReactDOM from 'react-dom';
import {SwatchesPicker} from 'react-color';
import PropTypes from 'prop-types';
import {fabric} from 'fabric';
import 'fabric-webpack'
import CanvasObjects from './CanvasObject';
import Arrow from './Arrow';

import DesignCanvas from './DesignCanvas'
import Rect from './Rect'
import Circle from './Circle'
import Image from './Image'

//import {Canvas} from 'react-fabricjs';
//import { connect } from 'react-redux';
import {CirclePicker} from 'react-color';
import { connect } from 'react-redux';



export default class DesignPage extends React.Component {

    handleChange(color, event) {
      // color = {
      //   hex: '#333',
      //   rgb: {
      //     r: 51,
      //     g: 51,
      //     b: 51,
      //     a: 1,
      //   },
      //   hsl: {
      //     h: 0,
      //     s: 0,
      //     l: .20,
      //     a: 1,
      //   },
      // }
    }

    render() {
      return (
      <div>
      <CirclePicker onChange={ this.handleChange } />

	  {/*<DesignCanvas>
      <Rect width={100} height={100} fill="blue" />
	  <Circle radius={20} top={200} />
	   <Image url="https://http.cat/100" scale={0.2} top={100} />
	  </DesignCanvas>*/}

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
						        <input type="text" id="text_colour" />
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
			right help area
    =========================================-->*/}
		<div class="help_area">

			{/*<!-- help popup window -->*/}
			<div class="help_window_wrapper">
				<div class="help_window">
					<div class="header clear_fix">
						<p class="title"><i class="fa fa-question-circle" aria-hidden="true"></i> Help</p>
						<i id="close_help_window" class="fa fa-window-close" aria-hidden="true"></i>
					</div>

					<p><i class="fa fa-leaf" aria-hidden="true"></i> <span>Choose product</span> - Use this button to select your product.</p>

					<p><i class="fa fa-text-width" aria-hidden="true"></i> <span>Add text</span> - Use this button to add a text.</p>

					<p><i class="fa fa-pencil-square-o" aria-hidden="true"></i> <span>Edit text</span> - Click on the text and edit your text from the popup window</p>

					<p><i class="fa fa-picture-o" aria-hidden="true"></i> <span>Add image</span> - Use this button to add an image.</p>

					<p><i class="fa fa-arrow-up" aria-hidden="true"></i> <span>Export</span> - Click on this button, a popup window will appear with download buttons</p>

					<p><i class="fa fa-trash-o" aria-hidden="true"></i> <span>Delete</span> - Click on the <i class="fa fa-trash-o" aria-hidden="true"></i> icon to delete an element</p>

				</div>
			</div>
			<a class="open_help_window" href="#">
				<i class="fa fa-question-circle" aria-hidden="true"></i>
				<p>Help</p>
			</a>
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



		{/*<!--========================================
			JavaScript Files
    =========================================-->*/}
		<script type="text/javascript" src="js/fabric.min.js"></script>
		<script type="text/javascript" src="js/script.js"></script>
      </div>
 
      );
    }
  }
