import {hittable, hit_record} from './hittable';

class hittable_list extends hittable{
    objects = [];
    constructor(obj){
        super();
        if(obj!==undefined){
            this.add(obj);
        }
    }
    add = (obj)=>this.objects.push(obj);
    length = ()=>(this.objects.length);
    clear = ()=>{this.objects = []};

    hit = (r, t_min, t_max, rec)=>{
        let temp_rec = new hit_record();
        let hit_anything = false;
        let closest_so_far = t_max;
        for(let i =0;i<this.length();i++){
            if(this.objects[i].hit(r, t_min, closest_so_far, temp_rec)){
                hit_anything=true;
                closest_so_far = temp_rec.t;
                rec.copy(temp_rec);
            }
        }
        return hit_anything;
    }
}

export default hittable_list;