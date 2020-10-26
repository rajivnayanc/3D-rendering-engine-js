import ray from './ray';
import {vec3} from './vec3';

test('ray initialization from (0,0,0) with direction (0,0,0)',()=>{
    let r = new ray();
    let flag = vec3.equals(r.origin(), new vec3(0,0,0));
    expect(flag).toBe(true);
    flag = vec3.equals(r.direction(), new vec3(0,0,0));
    expect(flag).toBe(true);
});

test('ray initialization from (1,2,3) with direction (1,-1,-1)',()=>{
    let r = new ray(new vec3(1,2,3), new vec3(1,-1,-1));
    let flag = vec3.equals(r.origin(), new vec3(1,2,3));
    expect(flag).toBe(true);
    flag = vec3.equals(r.direction(), new vec3(1,-1,-1));
    expect(flag).toBe(true);
});

test('ray =>(1,2,3)+ t*(1,-1,-1) (t = 3.4) = [4.4 -1.4 -0.3999999999999999]',()=>{
    let r = new ray(new vec3(1,2,3), new vec3(1,-1,-1));
    let point = r.at(0);
    let res = new vec3(1,2,3);
    let flag = vec3.equals(point, res);
    expect(flag).toBe(true);
    point = r.at(3.4);
    res = new vec3(1+3.4*1,2+3.4*(-1),3+3.4*(-1));
    flag = vec3.equals(point, res);
    expect(flag).toBe(true);
});

