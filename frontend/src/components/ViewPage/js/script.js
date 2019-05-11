/*global $,WOW*/
/*
===========================================================================
 EXCLUSIVE ON themeforest.net
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Project Name		: T-Shirt Designer
 Author             : Ismail Bin Dawud
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Copyright (c) 2017 -  Ismail Bin Dawud - https://codecanyon.net/user/nivodev
===========================================================================
*/


"use strict";


$(function(){

	// front canvas
	var frontCanvas = new fabric.Canvas('front_canvas');
	
	// back canvas
	var backCanvas = new fabric.Canvas('back_canvas');

	// front canvas in preview modal
	var previewCanvasFront = new fabric.Canvas('previewcanvasfront');
	
	// back canvas in preview modal
	var previewCanvasBack = new fabric.Canvas('previewcanvasback');

	// by default t-shirt front side is shown
	var frontFace = true;

	var allProducts, proIdOfSelectedPro ;
	
	// productUrl: the server (file) location
	var productUrl = "/json/product.json";

	loadProduct(productUrl, perseProductJson);

	// request to get the products
	function loadProduct(url, givenFunction) {
		var xhttp;
		xhttp = new XMLHttpRequest();
		
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				givenFunction(this.responseText);			
			}
		};

		xhttp.open("GET", url, true);
		
		xhttp.send(null);
	}

	// perse product json
	function perseProductJson(xhttp){
		allProducts = JSON.parse(xhttp);

		// set first id as default
		proIdOfSelectedPro = allProducts.products[0].productId;
		setProductModel(allProducts.products);
	}

	frontCanvas.on({
		'object:selected':onObjectSelected,
		'selection:cleared':onSelectedCleared,
		'object:modified':onObjectModified
    });

    backCanvas.on({
		'object:selected':onObjectSelected,
		'selection:cleared':onSelectedCleared,
		'object:modified':onObjectModified
    });

	function onObjectSelected(e) {
		var selectedObject = e.target;
        if (selectedObject && selectedObject.type != 'image') {
			$('.text_tool_window').addClass("show");
        }

        addDeleteBtn(e.target.oCoords.mt.x, e.target.oCoords.mt.y, e.target.width);
	}

	function onSelectedCleared(e){
		$('.text_tool_window').removeClass("show");
		$(".deleteBtn").remove();
	}

	function onObjectModified(e){
		addDeleteBtn(e.target.oCoords.mt.x, e.target.oCoords.mt.y, e.target.width);
	}


	// get the product which is selected by user
	function getSelectedProduct(productId){
		var productObj = allProducts.products.filter(function ( obj ) {
		    return obj.productId === productId;
		})[0];

		return productObj;
	}


	// show all products into product modal
	function setProductModel(givenProducts) {
		for (var i = 0; i < givenProducts.length; i++) {
			$(".product_area").append('<div class="product_details" ><img src="'+givenProducts[i].frontImgUrl+'"data-myval="'+givenProducts[i].productId+'"><p >'+givenProducts[i].productName+'</p></div>');			
		}

		$(".product_details img").on("click", function(event){
		    
		    $("[data-dismiss=modal]").trigger({ type: "click" });

		    proIdOfSelectedPro = parseInt($(this).attr("data-myval"), 10);

		    var proObj = getSelectedProduct(proIdOfSelectedPro);

			$('.design_area').css('background-image','url('+proObj.frontImgUrl+')');
		});

		$(".front_btn").trigger({ type: "click" });
	}

	$(".open_window, #close_window").on( "click", function() {
		var text_tool_window = $('.text_tool_window');
		text_tool_window.toggleClass('show');
	});

	$(".open_help_window, #close_help_window").on( "click", function() {
		var help_window = $('.help_window');
		help_window.toggleClass('show');
	});

	// front button click listener
	$(".front_btn").on( "click", function() {
		frontFace = true;
		var proObj = getSelectedProduct(proIdOfSelectedPro);
		
		$('.design_area').css('background-image','url('+proObj.frontImgUrl+')');
		$('.canvas_area_front').css('display','block');
		$('.canvas_area_back').css('display','none');
	});

	// back button click listener
	$(".back_btn").on( "click", function() {
		frontFace = false;
		var proObj = getSelectedProduct(proIdOfSelectedPro);
		
		$('.design_area').css('background-image','url('+proObj.backImgUrl+')');
		$('.canvas_area_front').css('display','none');
		$('.canvas_area_back').css('display','block');
	});
	

	// text area keyup listener
	$("#text_area").on( "keyup", function() {

		if(frontFace){
			var obj = frontCanvas.getActiveObject();
			if(obj){
				obj.setText(this.value);
				frontCanvas.renderAll();
			}
		}
		
		else{
			var obj = backCanvas.getActiveObject();
			if(obj){
				obj.setText(this.value);
				backCanvas.renderAll();
			}
		}
	});

	$(".open_window").on( "click", function() {
		
		// add text into canvas
		var oText = new fabric.IText('Hello', {
			left: 50,
			top: 100
		});
		
		if(frontFace){
			frontCanvas.add(oText);
			frontCanvas.setActiveObject(oText);
		}
		
		else{
			backCanvas.add(oText);
			backCanvas.setActiveObject(oText);
		}
		$('#text_font, #text_colour, #text_style, #text_size').trigger('change');
		oText.bringToFront();
	});


	// font change listener
	$('#text_font').on("change", function(){
	    if(frontFace){
	      var obj = frontCanvas.getActiveObject();
	    }
	    else{
	      var obj = backCanvas.getActiveObject();
	    }
	    if(obj){
	      obj.setFontFamily($(this).val());
	    }
	    frontCanvas.renderAll();
	    backCanvas.renderAll();
	});

	// adding spectrum color picker
	$("#text_colour").spectrum({
	    color: "#333",
	    change: function(color) {
		    if(frontFace){
		      var obj = frontCanvas.getActiveObject();
		    }
		    else{
		      var obj = backCanvas.getActiveObject();
		    }
		    if(obj){
		      obj.setFill(color.toHexString());
		    }
		    frontCanvas.renderAll();
		    backCanvas.renderAll();
		}
	});

	// text style change listener
	$('#text_style').on("change", function(){
	    if(frontFace){
	      var obj = frontCanvas.getActiveObject();
	    }
	    else{
	      var obj = backCanvas.getActiveObject();
	    }
	    if(obj){
	      obj.setFontStyle($(this).val());
	    }
	    frontCanvas.renderAll();
	    backCanvas.renderAll();
	});

	// font size change listener
	$('#text_size').on("change", function(){
		
		if(frontFace){
	      var obj = frontCanvas.getActiveObject();
	    }
	    else{
	      var obj = backCanvas.getActiveObject();
	    }
	    
	    if(obj){
	      obj.setFontSize($(this).val());
	    }

	    frontCanvas.renderAll();
	    backCanvas.renderAll();

	});

	var file;
	$('#imgfile').on("change", function(e){

		file = e.target.files[0];
	
	});

	$(".btn_add_image").on( "click", function() {

		$("[data-dismiss=modal]").trigger({ type: "click" });
		

		// add image into canvas
		var reader = new FileReader();

		reader.onload = function (f) {
		
			var data = f.target.result;
			
			fabric.Image.fromURL(data, function (img) {
			
				var oImg = img.set({left: 20, top: 100, width: 150, height: 150, angle: 0}).scale(0.9);
				
				if(frontFace){
					frontCanvas.add(oImg).renderAll();
					frontCanvas.setActiveObject(oImg);
				}
				else{
				    backCanvas.add(oImg).renderAll();
				    backCanvas.setActiveObject(oImg);
				}
			});
		};
		reader.readAsDataURL(file);
	});


	// converts a canvas to an image
	function convertCanvasToImage(can) {
		var image = new Image();
		image.src = can.toDataURL("image/png");
		return image;
	}

	
	// setting the preview modal
	function setPreviewCanvas(){

		var proObj = getSelectedProduct(proIdOfSelectedPro);

		var frontImgUrl = proObj.frontImgUrl;
		var backImgUrl = proObj.backImgUrl;

		previewCanvasFront.clear();
		previewCanvasBack.clear();

		// setting background image to a canvas
		previewCanvasFront.setBackgroundImage(frontImgUrl, previewCanvasFront.renderAll.bind(previewCanvasFront), {
			width: previewCanvasFront.width,
			height: previewCanvasFront.height,
			// Needed to position backgroundImage at 0/0
			originX: 'left',
			originY: 'top'
		});

		previewCanvasBack.setBackgroundImage(backImgUrl, previewCanvasBack.renderAll.bind(previewCanvasBack), {
			width: previewCanvasBack.width,
			height: previewCanvasBack.height,
			// Needed to position backgroundImage at 0/0
			originX: 'left',
			originY: 'top'
		});

		var frontImg = convertCanvasToImage(frontCanvas);
		var backImg = convertCanvasToImage(backCanvas);

		
		frontImg.onload=function(){

			var imgInstanceFront = new fabric.Image(frontImg, {
				left: 155,
				top: 95,
				selectable:false
			});

			previewCanvasFront.add(imgInstanceFront);
			previewCanvasFront.renderAll();
		};

		backImg.onload=function(){

			var imgInstanceBack = new fabric.Image(backImg, {
				left: 155,
				top: 95,
				selectable:false
			});

			previewCanvasBack.add(imgInstanceBack);
			previewCanvasBack.renderAll();

		};
	}


	// preview button click listener
	$(".preview_btn").on("click", function(){

		setPreviewCanvas();
		
		$("#previewModal .modal-title").text("Preview");
		$('#previewModal a').css('display','none');
		$('.download_back').css('display','none');

	});


	// export button click listener
	$(".export_btn").on("click", function(){

		setPreviewCanvas();
		
		$("#previewModal .modal-title").text("Export");
		$('#previewModal a').css('display','inline-block');
		$('.download_back').css('display','inline-block');

	});

	// download front button click listener
	$(".download").on("click", function(){

		$("[data-dismiss=modal]").trigger({ type: "click" });
		var dt = previewCanvasFront.toDataURL('image/jpg');
	    this.href = dt;

	});

	// download back button click listener
	$(".download_back").on("click", function(){

		$("[data-dismiss=modal]").trigger({ type: "click" });
		var dt = previewCanvasBack.toDataURL('image/jpg');
	    this.href = dt;

	});

	
	// add deleteIcon to an element
	function addDeleteBtn(x, y, w){

		$(".deleteBtn").remove(); 
		var btnLeft = x;
		var btnTop = y - 10;
		var widthadjust=w/2;
		btnLeft=widthadjust+btnLeft-10;
		
		var deleteBtn = '<i class="fa fa-trash-o deleteBtn" aria-hidden="true" style="position:absolute;top:'+btnTop+'px;left:'+btnLeft+'px;cursor:pointer;"></i>';

		$(".canvas_area_front").append(deleteBtn);

		// delete icon click listener	
		$(".deleteBtn").on( "click", function() {
			
			if(frontCanvas.getActiveGroup()){
				frontCanvas.getActiveGroup().forEachObject(function(o){ frontCanvas.remove(o); });
				frontCanvas.discardActiveGroup().renderAll();
			}

			else {

				frontCanvas.remove(frontCanvas.getActiveObject());
			}

			if(backCanvas.getActiveGroup()){
				backCanvas.getActiveGroup().forEachObject(function(o){ backCanvas.remove(o); });
				backCanvas.discardActiveGroup().renderAll();
			}

			else {

				backCanvas.remove(backCanvas.getActiveObject());
			}

			$(".deleteBtn").remove(); 

		});
	}


	// reset button click listener
	$(".reset_btn").on( "click", function() {
			
		if(frontFace)
			frontCanvas.clear();
		
		else
			backCanvas.clear();

	});

});













