import React from 'react';
import { connect } from 'react-redux';
import { ResetButton } from './ResetButton.js';
import { SaveButton } from './SaveButton.js';
import { FrontBackTab } from './FrontBackTab.js';

export default class ViewPage extends React.Component {

    render() {
      return (
      <div>


		{/*<!--========================================
			preview and reset area
    =========================================-->*/}




		{/*<!--========================================
			t-shirt design area
    =========================================-->*/}
		<div class="design_area">
			<div class="canvas_area_front">
				<canvas id="front_canvas"></canvas>
    
	        </div>
	        <div class="canvas_area_back">
				<canvas id="back_canvas"></canvas>
	        </div>
		</div>



		{/*<!--========================================
			front-back button section
    =========================================-->*/}
			<button class="front_btn" type="button">Front</button>
			<button class="back_btn" type="button">Back</button>


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
