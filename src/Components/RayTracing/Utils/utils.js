import * as vec3 from './vec3/vec3';

export const clamp = (x, min, max)=>{
    if(x<min) return min;
    if(x>max) return max;
    return x;
}

export const random_unit_vector = ()=>{
    return new vec3.random(new vec3.create(),1.0);
}

export const random_in_hemisphere = (normal)=>{
    let in_unit_sphere = random_unit_vector();
    return (vec3.dot(in_unit_sphere, normal)>0.0)?in_unit_sphere:vec3.negate(vec3.create(),in_unit_sphere);
}

export const near_zero = (v)=>{
    const s = 1e-8;
    return (Math.abs(v[0])<s)&&(Math.abs(v[1])<s)&&(Math.abs(v[2])<s)
}

export const reflect = (v, n)=>{
    let target = vec3.create();
    return vec3.subtract(target,v, vec3.scale(vec3.create(),n, vec3.dot(v,n)*2) )
}