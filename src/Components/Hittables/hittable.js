import * as vec3 from '../Utils/vec3/vec3';

function hit_record(){
    this.p = vec3.create();
    this.normal = vec3.create();
    this.t = 0;
    this.front_face = false;
    this.set_face_normal = (r, outward_normal)=>{
        this.front_face = vec3.dot(r.direction(),outward_normal);
        this.normal = this.front_face?outward_normal:-outward_normal;
    }
    this.copy = (rec)=>{
        this.p = rec.p;
        this.normal = rec.normal;
        this.t = rec.t;
        this.front_face = rec.front_face;
    }
}

class hittable{
    hit = (ray, t_min, t_max, hit_record)=>{}
}

export {hittable, hit_record};

