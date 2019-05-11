import React from 'react';
import {SwatchesPicker} from 'react-color';
import { connect } from 'react-redux';



export default class ViewPage extends React.Component {

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


		{/*<!--========================================
			preview and reset area
    =========================================-->*/}
		<div class="canvas_edit_tool">
			<a href="#" class="preview_btn" data-toggle="modal" data-target="#previewModal"><i class="fa fa-eye" aria-hidden="true"></i><span>Preview</span></a>
			<a href="#" class="reset_btn" ><i class="fa fa-refresh" aria-hidden="true"></i><span>Reset</span></a>
		</div>

		{/*<!--========================================
			t-shirt design area
    =========================================-->*/}
		<div class="design_area">
			<div class="canvas_area_front">
				<canvas id="front_canvas" width="192" height="302"></canvas>
	        </div>
	        <div class="canvas_area_back">
				<canvas id="back_canvas" width="192" height="302"></canvas>
	        </div>
		</div>



		{/*<!--========================================
			front-back button section
    =========================================-->*/}
		<div class="change_side">
			<button class="front_btn" type="button">Front</button>
			<button class="back_btn" type="button">Back</button>
		</div>



		{/*<!--========================================
			preview image modal
    =========================================-->*/}
		<div class="modal fade" id="previewModal" role="dialog">
			<div class="modal-dialog">
				{/*<!-- Modal content-->*/}
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal">&times;</button>
						<h4 class="modal-title">Preview</h4>
					</div>
					<div class="modal-body clear_fix">
						<div id="front_preview">
							<div class="canvas_wrapper">
								<canvas id="previewcanvasfront" width="500" height="500"></canvas>
							</div>
							<a href="#" class="download" download="YourFileName.jpg"><i class="fa fa-download" aria-hidden="true"></i><span>Download front</span></a>
						</div>
			            <div id="back_preview">
			            	<div class="canvas_wrapper">
				            	<canvas id="previewcanvasback" width="500" height="500"></canvas>
			            	</div>
				            <a href="#" class="download_back" download="YourFileName.jpg"><i class="fa fa-download" aria-hidden="true"></i><span>Download back</span></a>
			            </div>
					</div>
					<div class="modal-footer">
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
