import * as vec3 from './vec3/vec3';

class ray{
    constructor(origin, dir){
        if(origin && dir){
            this.orig = origin;
            this.dir = dir;
        }else{
            this.orig = vec3.fromValues(0,0,0);
            this.dir = vec3.fromValues(0,0,0);
        }
    }

    origin = ()=>this.orig;
    direction = ()=>this.dir;

    at = (t)=>{
        let out = vec3.create();
        return vec3.scaleAndAdd(out,this.orig, this.dir, t)
    }
}

export default ray;