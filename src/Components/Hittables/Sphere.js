import {hittable} from './hittable';
import {vec3} from '../Utils/vec3';

class sphere extends hittable{
    constructor(cen, r){
        super();
        this.center = cen;
        this.radius = r
    }

    hit = (r, t_min, t_max, rec)=>{
        const oc = vec3.subtract(r.origin(),this.center);
        const a = r.direction().length_squared();
        const half_b = vec3.dot(oc, r.direction());
        const c = oc.length_squared() - this.radius*this.radius;
        const discriminant = half_b*half_b - a*c;

        if(discriminant>0){
            const root = Math.sqrt(discriminant);
            let temp = (-half_b-root)/a;

            if(temp < t_max && temp>t_min){
                rec.t = temp;
                rec.p = r.at(rec.t);
                let outward_normal = vec3.unit(rec.p.subtract(this.center));
                rec.set_face_normal(r, outward_normal);
                return true;
            }
            temp = (-half_b+root)/a;
            if(temp < t_max && temp>t_min){
                rec.t = temp;
                rec.p = r.at(rec.t);
                let outward_normal = vec3.unit(rec.p.subtract(this.center));
                rec.set_face_normal(r, outward_normal);
                return true;
            } 
        }
        return false;
    }
}


export default sphere;