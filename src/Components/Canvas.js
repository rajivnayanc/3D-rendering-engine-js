import React, { Component } from 'react';
import {vec3, point3, color} from './Utils/vec3';
import ray from './Utils/ray';
import {hit_record} from './Hittables/hittable';
import hittable_list from './Hittables/hittable_list';
import sphere from './Hittables/Sphere';

export class Canvas extends Component {
    constructor(props){
        super(props);
        this.state = {
            canvasDOM:null,
            ctx:null,
            animate:false
        }
        this.b =0;
    }

    componentDidMount(){
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
    hit_sphere = (center, radius, r)=>{
        if( r instanceof ray && center instanceof vec3){
            const oc = vec3.subtract(r.origin(),center);
            const a = r.direction().length_squared();
            const half_b = vec3.dot(oc, r.direction());
            const c = oc.length_squared() - radius*radius;
            const discriminant = half_b*half_b - a*c;
            if(discriminant<0){
                return -1.0
            }
            return Math.min((-half_b - Math.sqrt(discriminant))/a,(-half_b + Math.sqrt(discriminant))/a)
        }
        return -1.0;
    }
    ray_color = (r, b, world)=>{
        let rec = new hit_record();
        if(world.hit(r,0, Math.pow(10,10)/1.0, rec)){
            return vec3.multiply(0.5, rec.normal.add(new color(1,1,1)))
        }
        const unit_direction = vec3.unit(r.direction());
        let t = Math.abs(unit_direction.y);
        return color.multiply(new color(1,1,1),(1.0-t)).add(color.multiply(t, new color(0.5, 0.7, b)));

    }
    buildImage = (color_b)=>{
        this.setState({
            animate:false
        },()=>{
            this.b = 0;
            this.drawImage(color_b);
        })
    }
    drawImage = (color_b)=> {
        // Image Properties
        let canvasDOM = this.state.canvasDOM;
        canvasDOM.style.visibility="visible";
        const image_height = canvasDOM.height;
        const image_width = canvasDOM.width;
        const aspect_ratio = image_width/image_height;

        // World
        let world = new hittable_list();
        world.add(new sphere(new point3(0,0,-1), 0.5));
        world.add(new sphere(new point3(-1,0,-1), 0.25));
        world.add(new sphere(new point3(1,0,-1), 0.25));
        world.add(new sphere(new point3(0,1,-1), 0.25));

        world.add(new sphere(new point3(2,0,1), 0.5));
        world.add(new sphere(new point3(1,0,1), 0.25));
        world.add(new sphere(new point3(3,0,1), 0.25));
        world.add(new sphere(new point3(2,1,1), 0.25));

        world.add(new sphere(new point3(-2,0,2), 0.5));
        world.add(new sphere(new point3(-1,0,2.4), 0.25));
        world.add(new sphere(new point3(-3,0,2.9), 0.25));
        world.add(new sphere(new point3(-2,1,3), 0.25));

        world.add(new sphere(new point3(0,-100.5,-1), 100));

        //Camera Properties
        const viewport_height = 2.0;
        const viewport_width = aspect_ratio*viewport_height;
        const focal_length = 1.0

        const origin = new point3(0,0, color_b);
        const horizontal = new vec3(viewport_width, 0, 0);
        const vertical = new vec3(0, viewport_height, 0);
        const lower_left_corner = origin.subtract(horizontal.divide(2)).subtract(vertical.divide(2)).subtract(new vec3(0,0,focal_length));
        
        // Render
        let ctx = this.state.ctx;
        let img = ctx.getImageData(0, 0, image_width, image_height);
        let pixels = img.data;
        for(let j =0;j<image_height;j++){
            for(let i =0;i<image_width;i++){
                var index = ((image_height-j+1) * image_width + i) * 4;
                let u = i/(image_width-1);
                let v = j/(image_height-1);
                const r = new ray(origin, lower_left_corner.add(horizontal.multiply(u)).add(vertical.multiply(v)).subtract(origin))
                const pixel_color = this.ray_color(r, Math.abs(color_b), world);
                pixels[index] = Math.floor(pixel_color.x*255.99);
                pixels[index+1] = Math.floor(pixel_color.y*255.99);
                pixels[index+2] = Math.floor(pixel_color.z*255.99);
                pixels[index+3] = 255;
            }
        }
        ctx.putImageData(img, 0,0)
    }

    animate = ()=>{
        if(this.state.animate){
            requestAnimationFrame(this.animate);
            this.drawImage(this.b);
            this.b += 0.2;
            if(this.b>20){
                this.b =0;
            }
        }
    }
    toggleAnimation = ()=>{
        this.setState({
            animate:!this.state.animate
        },()=>{
            if(this.state.animate) this.animate()
        })
    }
    render() {
        return (
            <> 
                <button onClick={()=>this.buildImage(1.0)} id = "buildImageBtn" className="btn">Build Image</button>
                <button onClick={()=>this.toggleAnimation()} id = "buildImageBtn2" className="btn">{this.state.animate?'Stop ':'Start ' }Animation</button>
                <canvas id = "myCanvas"></canvas>
            </>
        )
    }
}

export default Canvas;

