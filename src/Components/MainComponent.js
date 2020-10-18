import React from 'react';
import Canvas from './Canvas';
class MainComponent extends React.Component {
    constructor(props){
        super(props);
        const aspectRatio = 16/9;
        const height = 300;
        const width = height*aspectRatio; 
        this.state = {
            aspectRatio:aspectRatio,
            width:width,
            height:height
        }
    }
    render(){
        return (
            <div className="container">
                <div className="main-content">
                    <div className="canvas-container">
                        <Canvas width = {this.state.width} height={this.state.height}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default MainComponent;
