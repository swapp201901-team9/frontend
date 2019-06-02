import React from 'react';
import {fabric} from 'fabric';
//import './App.css';

class FabricCanvas extends React.Component{

    constructor(props) {
        super(props);
        this.state = {pictures : []};
        this.onDrop = this.onDrop.bind(this);
    }


    componentDidMount(){

        this.the_front_canvas = new fabric.Canvas('front-canvas', {
            preserveObjectStacking: true,
            height:430,
            width:403,
        });

        this.the_back_canvas = new fabric.Canvas('back-canvas', {
            preserveObjectStacking: true,
            height:430,
            width:403,
        });

        this.the_canvas = this.the_front_canvas;
    }

    componentWillReceiveProps = (newprops) => {

        // If Updated Item is not the same as the old one
        //         => Update the canvas with newer item
        if(newprops.activeFrontProperty !== this.props.activeFrontProperty){
            this.updateFrontCanvasforImage(this.props.activeFrontProperty,newprops.activeFrontProperty);
        }

        if(newprops.activeBackProperty !== this.props.activeBackProperty){
            this.updateBackCanvasforImage(this.props.activeBackProperty,newprops.activeBackProperty);
        }
    }

    updateFrontCanvasforImage = (prev,next) => {

        if(next){

            let to_remove;
            // Find the same kind of element
            this.the_front_canvas.forEachObject( (object) => {

                if(object.the_type === next.the_type){
                    to_remove = object;
                }
            } );

            this.the_front_canvas.remove(to_remove);

            // if(next.the_type === 'bg'){
            //     this.the_front_canvas.setBackgroundImage(next);
            //     this.the_front_canvas.renderAll();
            //     return;
            // }

            this.the_front_canvas.add(next);
            this.the_front_canvas.moveTo(next, next.zIndex);
        }
    }

    updateBackCanvasforImage = (prev,next) => {

        console.log("updateCanvasForImage")


        if(next){

            let to_remove;
            // Find the same kind of element
            this.the_back_canvas.forEachObject( (object) => {

                if(object.the_type === next.the_type){
                    to_remove = object;
                }
            } );

            this.the_back_canvas.remove(to_remove);


            // if(next.the_type === 'bg'){
            //     this.the_back_canvas.setBackgroundImage(next);
            //     this.the_back_canvas.renderAll();
            //     return;
            // }

            this.the_back_canvas.add(next);
            //this.the_back_canvas.renderAll();
            this.the_back_canvas.moveTo(next, next.zIndex);


        }
    }

    onDrop = (e) => {
        console.log("hey");

        e.preventDefault();
        var preview = document.getElementById('img');
        //var img = new Image(40, 40);
        var file = document.getElementById('input').files[0];
        var canvas = this.the_front_canvas;
        var canvas2 = this.the_back_canvas;
        let reader = new FileReader();
        reader.addEventListener("load", function() {
            preview.src = reader.result;
            //img.src = reader.result;
            /*var imgInstance = new fabric.Image(preview, {
            width: 40,
            height: 40,
            the_type: "upload",
            zIndex: 2
            });*/
            console.log(preview.width);
            console.log(preview.height);

            var imgInstance = new fabric.Image(preview, {
            width: 899,
            height:959,
            the_type: "upload",
            zIndex: 10
            });
            console.log("imgInstance set");
            imgInstance.set({
                scaleY: 0.1,
                scaleX: 0.1,
                originX: "center",
                originY: "center"
            });
            console.log("imgInstance scale");
            canvas.add(imgInstance);
            canvas2.add(imgInstance);
            canvas.renderAll();
            canvas2.renderAll();
            canvas.moveTo(imgInstance, imgInstance.zIndex);
            canvas2.moveTo(imgInstance, imgInstance.zIndex);
            console.log("imgInstance add");

            //var imgInstance = new fabric.Image(preview);
            /*this.the_canvas = new fabric.Canvas('main-canvas', {
                preserveObjectStacking: true,
                height:959,
                width:899,
            });*/

        },false);

        /*reader.onloadend = () => {
            var img = new Image(40,40);
	        img.src = reader.result;

            var imgInstance = new fabric.Image(img, {
                width: 899,
                height: 959,
                the_type: "upload",
                zIndex: 2
            });
            this.the_canvas.add(imgInstance);
        }*/

        if (file) {
            reader.readAsDataURL(file);
        }
        //console.log(img.src);
        /*var imgInstance = new fabric.Image(img, {
            width: 40,
            height: 40,
            the_type: "upload",
            zIndex: 2
        });*/
        //var imgInstance = new fabric.Image(img);
        //this.the_canvas.add(imgInstance);
        this.the_front_canvas = canvas;
    }

    saveToCanvas = () => {
        console.log("saveToCanvas")

        let link = document.createElement("a");
        link.href = this.the_canvas.toDataURL({format: 'png'});
          link.download = "design.png";
         link.click();

    }
    fileChangedHandler = (event) => {
        const file = event.target.files[0];
        this.setState({selectedFile: file});
    }

    render(){

        return (
            <div className= "main-canvas-container">
                <button class="front_btn" type="button">Front</button>
                <canvas id='front-canvas'
                >
                </canvas>

                  <input type = "file"
                         id = "input"
                         onChange = {this.onDrop} />
                  <img src = ""
                        id = "img" />


                <button class="back_btn" type="button">Back</button>
                <canvas id='back-canvas'
                >
                </canvas>
            </div>
        );
    }
}

export default FabricCanvas;
