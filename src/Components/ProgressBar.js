import React, { Component } from 'react'

export class ProgressBar extends Component {

    render() {
        const styles = {
            width:`${this.props.width}%`
        }
        return (
            <div>
                <div style={styles} id="ImageBuildProgressBar">
                    <center>
                        {`${this.props.width}%`}
                    </center>
                </div>
            </div>
        )
    }
}

export default ProgressBar;
