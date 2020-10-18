import {color} from './vec3';

const get_color = (r,g,b)=>{
    r = Math.floor(r*255.99);
    g = Math.floor(g*255.99);
    b = Math.floor(b*255.99);
    return `rgba(${r},${g},${b},${1})`;
}
const write_color=(ctx,i,j, pixel_color)=>{
    if(pixel_color instanceof color){
        ctx.fillStyle = get_color(pixel_color.x, pixel_color.y, pixel_color.z);
        ctx.fillRect(i, j, 1, 1);
    }
}
export default write_color;