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

    onDrop(e) {
        console.log("hey");

        e.preventDefault();
        var preview = document.getElementById('img');
        var file = document.getElementById('input').files[0];

        let reader = new FileReader();
        reader.addEventListener("load", function() {
            preview.src = reader.result;
            
            var imgInstance = new fabric.Image(preview, {
                width: 40,
                height: 40,
                the_type: "upload",
                zIndex: 2
            });

            //var imgInstance = new fabric.Image(preview);
            this.the_canvas = new fabric.Canvas('main-canvas', {
                preserveObjectStacking: true,
                height:959,
                width:899,
            });
            this.the_canvas.add(imgInstance);
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

            this.the_canvas.add(next);
            this.the_canvas.moveTo(next, next.zIndex);
        }
    }

    saveToCanvas = () => {

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