import * as vec3 from '../../Utils/vec3/vec3';
import ray from '../../Utils/ray';
import * as utils from '../../Utils/utils';

class material{
    scatter = (r, rec, attenuation, scattered)=>{};
}
export default material;

export class lambertian extends material{
    constructor(a){
        super();
        this.albedo = a;
    }
    scatter = (r, rec, attenuation, scattered)=>{
        let scatter_direction = vec3.create();
        let type = 'sphere';
        switch (type) {
            case 'sphere':
                vec3.add(scatter_direction,rec.p,rec.normal);
                vec3.add(scatter_direction,scatter_direction, utils.random_unit_vector());
                break;
            case 'hemisphere':
                vec3.add(scatter_direction,rec.p,utils.random_in_hemisphere(rec.normal));
                break
            default:
                break;
        }

        if(utils.near_zero(scatter_direction)){
            vec3.copy(scatter_direction, rec.normal);
        }
        scattered.copy(new ray(rec.p, vec3.subtract(vec3.create(),scatter_direction,rec.p)));
        vec3.copy(attenuation,this.albedo)
        return true;
    }
}

export class metal extends material{
    constructor(a, fuzz){
        super();
        this.albedo = a;
        this.fuzz = fuzz;
    }
    scatter = (r, rec, attenuation, scattered)=>{
        let reflected = utils.reflect(vec3.unit_vector(r.direction()),rec.normal);
        vec3.add(reflected,reflected, vec3.scale(
            vec3.create(),
            utils.random_unit_vector(),
            this.fuzz
        ));
        scattered.copy(new ray(rec.p, reflected));
        vec3.copy(attenuation,this.albedo);
        return (vec3.dot(scattered.direction(), rec.normal)>0);
    }

}