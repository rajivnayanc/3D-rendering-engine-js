class vec3{
    constructor(x , y , z){
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    negative = ()=>{
        return new vec3(-this.x, -this.y, -this.z);
    }
    length_squared = ()=>{
        return this.x*this.x + this.y*this.y + this.z*this.z;
    }
    length = ()=>{
        return Math.sqrt(this.length_squared())
    }
    add = (v)=>{
        if(v instanceof vec3) return new vec3(this.x + v.x, this.y + v.y, this.z + v.z);
        else return new vec3(this.x + v, this.y + v, this.z + v);
    }
    subtract = (v)=>{
        if(v instanceof vec3) return new vec3(this.x - v.x, this.y - v.y, this.z - v.z);
        else return new vec3(this.x - v, this.y - v, this.z - v);
    }
    multiply = (v)=>{
        if(v instanceof vec3) return new vec3(this.x * v.x, this.y * v.y, this.z * v.z);
        else return new vec3(this.x * v, this.y * v, this.z * v);
    }
    divide = (v)=>{
        if(v instanceof vec3) return new vec3(this.x / v.x, this.y / v.y, this.z / v.z);
        else return new vec3(this.x / v, this.y / v, this.z / v);
    }
    unit = ()=>{
        return this.divide(this.length());
    }
};

vec3.print = (v)=>{
    if(v instanceof vec3) console.log(v.x, v.y, v.z);
}
vec3.add = (u,v)=>{
    if(u instanceof vec3) return u.add(v);
    if(v instanceof vec3) return v.add(u);
}
vec3.subtract = (u,v)=>{
    if(u instanceof vec3) return u.subtract(v);
    if(v instanceof vec3) return v.negative().add(u);
}
vec3.multiply = (u,v)=>{
    if(u instanceof vec3) return u.multiply(v);
    if(v instanceof vec3) return v.multiply(u);
}
vec3.divide = (u,v)=>{
    if(u instanceof vec3) return u.divide(v);
}
vec3.dot = (u,v)=>{
    return u.x*v.x + u.y*v.y + u.z*v.z;
}
vec3.cross = (u,v)=>{
    return new vec3(u.y * v.z - u.z * v.y, u.z * v.x - u.x * v.z, u.x * v.y - u.y * v.x);
}
vec3.unit = (u)=>{
    return u.divide(u.length());
}

vec3.equals=(u,v)=>{
    if(u instanceof vec3 && v instanceof vec3)
        return u.x===v.x && u.y===v.y && u.z===v.z;
    return false;
}
class point3 extends vec3{};
class color extends vec3{};
export {vec3, point3, color};