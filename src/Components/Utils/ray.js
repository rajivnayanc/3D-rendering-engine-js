import {vec3,point3} from './vec3';

class ray{
    constructor(origin, dir){
        if(origin instanceof vec3 && dir instanceof vec3 ){
            this.orig = origin;
            this.dir = dir;
        }else{
            this.orig = new point3(0,0,0);
            this.dir = new vec3(0,0,0);
        }
    }

    origin = ()=>this.orig;
    direction = ()=>this.dir;

    at = (t)=>{
        return vec3.add(this.orig, vec3.multiply(this.dir, t))
    }
}

export default ray;