import React, {Component} from 'react';

import './styles.css';

import Canvas from './Canvas';

class RayTracing extends Component {
    constructor(props){
        super(props);
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const aspect = windowWidth/windowHeight;
        const scale = 0.5;
        const width = Math.floor(windowWidth*scale);
        const height = Math.floor(windowHeight*scale);
        this.state = {
            aspectRatio:aspect,
            width:width,
            height:height,
            samples_per_pixel:100
        }
    }

    render(){
        return (
            <div className="container">
                <div className="main-content">
                    <div className="canvas-container">
                        <Canvas samples_per_pixel={this.state.samples_per_pixel} width = {this.state.width} height={this.state.height}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default RayTracing;