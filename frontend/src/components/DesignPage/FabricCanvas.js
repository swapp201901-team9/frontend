import React from 'react';
import {fabric} from 'fabric';
import ImageUploader from 'react-images-upload';
//import './App.css';

class FabricCanvas extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {pictures : []};
        this.onDrop = this.onDrop.bind(this);
    }

   
    componentDidMount(){
        this.the_canvas = new fabric.Canvas('main-canvas', {

            preserveObjectStacking: true,
            height:959,
            width:899,
        });
    }

    componentWillReceiveProps = (newprops) => {
      
        // If Updated Item is not the same as the old one
        //         => Update the canvas with newer item
        if(newprops.activeProperty !== this.props.activeProperty){
            this.updateCanvasforImage(this.props.activeProperty,newprops.activeProperty);
        }
    }

    updateCanvasforImage = (prev,next) => {
        console.log("updateCanvasForImage")

        if(next){

            let to_remove;
            // Find the same kind of element
            this.the_canvas.forEachObject( (object) => {

                if(object.the_type === next.the_type){
                    to_remove = object;
                }
            } );

            this.the_canvas.remove(to_remove);

            if(next.the_type === 'bg'){
                this.the_canvas.setBackgroundImage(next);
                this.the_canvas.renderAll();                
                return;
            }
            console.log("next: ", next)

            this.the_canvas.add(next);
            this.the_canvas.moveTo(next, next.zIndex);
        }
    }

    onDrop = (e) => {
        console.log("hey");

        e.preventDefault();
        var preview = document.getElementById('img');
        //var img = new Image(40, 40);
        var file = document.getElementById('input').files[0];
        var canvas = this.the_canvas;
        let reader = new FileReader();
        reader.addEventListener("load", function() {
            preview.src = reader.result; 
            //img.src = reader.result;
            var imgInstance = new fabric.Image(preview, {
            width: 40,
            height: 40,
            the_type: "upload",
            zIndex: 2
            });
            canvas.add(imgInstance);

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
        this.the_canvas = canvas;
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

                <canvas id= 'main-canvas'
                >
                </canvas>

                  <input type = "file"
                         id = "input" 
                         onChange = {this.onDrop} />
                  <img src = "" 
                        height = "40"
                        width = "40"
                        id = "img" />
                  {/*<ImageUploader 
                    withIcon = {true}
                    buttonText = 'Choose images'
                    onChange = {this.onDrop}
                    imgExtension = {['.jpg', '.gif', 'png', '.gif']}
                    withPreview = {true}
                  />*/}
            </div>
        );
    }
}

export default FabricCanvas;