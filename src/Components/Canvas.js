import React, { Component } from 'react';

export class Canvas extends Component {

    get_color = (r,g,b)=>{
        r = Math.floor(r*255.99);
        g = Math.floor(g*255.99);
        b = Math.floor(b*255.99);
        return `rgba(${r},${g},${b},${1})`;
    }
    componentDidMount(){
        let canvasDOM = document.getElementById('myCanvas');
        canvasDOM.width = this.props.width;
        canvasDOM.height = this.props.height;
        const image_height = canvasDOM.height;
        const image_width = canvasDOM.width;
        let ctx = canvasDOM.getContext('2d');
        // ctx.fillRect(0, 0, image_width, image_height);
        for(let j =image_height-1;j>=0;j--){
            for(let i =0;i<image_width;i++){
                const r = i/(image_width-1);
                const g = j/(image_height-1);
                const b = 0.1;
                ctx.fillStyle = this.get_color(r,g,b);
                ctx.fillRect(i, j, 1, 1);
            }
        }
    }
    render() {
        return (
            <canvas id = "myCanvas"></canvas>
        )
    }
}

export default Canvas;

