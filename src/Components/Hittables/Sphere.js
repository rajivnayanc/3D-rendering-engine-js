import {hittable} from './hittable';
import * as vec3 from '../Utils/vec3/vec3';

class sphere extends hittable{
    constructor(cen, r){
        super();
        this.center = cen;
        this.radius = r
    }

    hit = (r, t_min, t_max, rec)=>{
        let oc = vec3.create();
        oc = vec3.subtract(oc, r.origin(), this.center);
        const a = vec3.squaredLength(r.direction());
        const half_b = vec3.dot(oc, r.direction());
        const c = vec3.squaredLength(oc) - this.radius*this.radius;
        const discriminant = half_b*half_b - a*c;

        if(discriminant>0){
            const root = Math.sqrt(discriminant);
            let temp = (-half_b-root)/a;

            if(temp < t_max && temp>t_min){
                rec.t = temp;
                rec.p = r.at(rec.t);
                
                let outward_normal = vec3.create();
                outward_normal = vec3.subtract(outward_normal, rec.p, this.center);
                outward_normal = vec3.unit_vector(outward_normal);
                rec.set_face_normal(r, outward_normal);
                return true;
            }
            temp = (-half_b+root)/a;
            if(temp < t_max && temp>t_min){
                rec.t = temp;
                rec.p = r.at(rec.t);
                let outward_normal = vec3.create();
                outward_normal = vec3.subtract(outward_normal, rec.p, this.center);
                outward_normal = vec3.unit_vector(outward_normal);
                rec.set_face_normal(r, outward_normal);
                return true;
            } 
        }
        return false;
    }
}


export default sphere;