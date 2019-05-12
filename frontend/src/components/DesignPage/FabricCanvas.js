import React from 'react';
import {fabric} from 'fabric';
//import './App.css';

class FabricCanvas extends React.Component{

    componentDidMount(){

        // Make a New Canvas
        /*this.the_canvas = new fabric.StaticCanvas('main-canvas', {
            preserveObjectStacking: true,
            height:375,
            width:375,
        });*/
        this.the_canvas = new fabric.StaticCanvas('main-canvas', {
            preserveObjectStacking: true,
            height:375,
            width:375,
        });
    }

    componentWillReceiveProps = (newprops) =>{

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
    
    uploadToCanavas = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        var canvas = document.getElementById('main-canvas');
        reader.onload = function(event) {
            var img = new Image();
            img.onload = function(){
                var imgInstance = new fabric.Image(img);
                imgInstance.set({
                    angle: 0,
                    padding: 10,
                    cornersize:10,
                    height:40,
                    width:40,
              });
              canvas.centerObject(imgInstance);
              this.the_canvas.centerObject(imgInstance);
                this.the_canvas.add(imgInstance);
                canvas.add(imgInstance);
                canvas.renderAll();
                this.the_canvas.renderAll();
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    render(){

        return (
            <div className= "main-canvas-container">

                <canvas id= 'main-canvas'
                >
                </canvas>

                <button onClick = {this.saveToCanvas}>
                    Download Design 
                  </button>
                  <input 
                  id = "imageLoader"
                  name = "imageLoader"
                  type = "file"
                  onChange = {this.uploadToCanvas}
                  />
                  <button>
                    Upload logo
                  </button>
            </div>
        );
    }
}

export default FabricCanvas;