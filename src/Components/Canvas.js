import React, { Component } from 'react';
import {vec3, point3, color} from './Utils/vec3';
import write_color from './Utils/color';
export class Canvas extends Component {
    constructor(props){
        super(props);
        this.state = {
            progressBar:null,
            canvasDOM:null,
            ctx:null
        }
        this.b =0;
    }

    componentDidMount(){
        // let progressBar = document.getElementById('ImageBuildProgressBar');
        // progressBar.style.visibility="hidden";
        let canvasDOM = document.getElementById('myCanvas');
        canvasDOM.style.visibility ="hidden";
        canvasDOM.width = this.props.width;
        canvasDOM.height = this.props.height;
        let ctx = canvasDOM.getContext('2d');
        this.setState({
            canvasDOM:canvasDOM,
            ctx:ctx
        });        
    }

    buildImage = (color_b)=> {
        // let progressBar = this.state.progressBar;
        // progressBar.style.visibility="visible";
        let canvasDOM = this.state.canvasDOM;
        canvasDOM.style.visibility="visible";
        const image_height = canvasDOM.height;
        const image_width = canvasDOM.width;
        let ctx = this.state.ctx;
        for(let j =image_height-1;j>=0;j--){
            // progressBar.style.width = (1-j/(image_height-1))*100+'%';
            // progressBar.style.width = 50+'%';
            // progressBar.innerHTML = '<center>'+(1-j/(image_height-1))*100+'%</center>'
            // console.log(progressBar.style.width);

            for(let i =0;i<image_width;i++){
                const pixel_color = new color(i/(image_width-1), j/(image_height-1), color_b);
                write_color(ctx, i, j, pixel_color);
            } 
        }
    }
    animate = ()=>{
        requestAnimationFrame(this.animate);
        this.buildImage(this.b);
        this.b += 0.01;
        if(this.b>1){
            this.b =0;
        }
    }
    render() {
        return (
            <> 
                <button onClick={()=>this.buildImage(0.1)} id = "buildImageBtn" className="btn">Build Image</button>
                <button onClick={()=>this.animate()} id = "buildImageBtn2" className="btn">Animate</button>
                {/* <div id="ImageBuildProgressBar"></div> */}
                <canvas id = "myCanvas"></canvas>
            </>
        )
    }
}

export default Canvas;

