import ray from './ray';
import * as vec3 from './vec3/vec3';

function camera(aspect_ratio, viewport_height, focal_length, color_b){
        this.aspect_ratio = aspect_ratio;
        this.viewport_height = viewport_height;
        this.viewport_width = aspect_ratio*viewport_height;
        this.focal_length = focal_length;

        this.origin = vec3.fromValues(0,0, color_b);
        this.horizontal = vec3.fromValues(this.viewport_width, 0, 0);
        this.vertical = vec3.fromValues(0, viewport_height, 0);
        this.lower_left_corner = vec3.create();
        vec3.scaleAndAdd(this.lower_left_corner,this.origin,this.horizontal,-0.5);
        vec3.scaleAndAdd(this.lower_left_corner,this.lower_left_corner,this.vertical,-0.5);
        vec3.subtract(this.lower_left_corner,this.lower_left_corner, vec3.fromValues(0,0, focal_length));
    
    this.get_ray = (u, v)=>{
        let direction = vec3.create();
        vec3.scaleAndAdd(direction,this.lower_left_corner,this.horizontal,u);
        vec3.scaleAndAdd(direction,direction,this.vertical,v);
        vec3.subtract(direction,direction, this.origin);
        const r = new ray(this.origin, direction);
        return r;
    }
}


export default camera;