import {vec3} from './vec3';

//Tests

// For equals()
test('(u==u) = true', ()=>{
    let vec1 = new vec3(0,0.009,9);
    expect(vec3.equals(vec1,vec1)).toBe(true);
});
test('(u == not u) = false', ()=>{
    let vec1 = new vec3(0,0.009,9);
    let vec2 = new vec3(0.1,0.009,9);
    expect(vec3.equals(vec1,vec2)).toBe(false);
});
test('[0,1,2]==[0,1,2] = true', ()=>{
    let vec1 = new vec3(0,1,2);
    let vec2 = new vec3(0,1,2);
    expect(vec3.equals(vec1,vec2)).toBe(true);
});

// For add()
test('2 + [1,2,3] = [3,4,5]', ()=>{
    let num1 = 2;
    let vec1 = new vec3(1,2,3);
    let res = new vec3(3,4,5);
    let flag = vec3.equals(vec1.add(num1),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec3.add(num1, vec1),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec3.add(vec1, num1),res)
    expect(flag).toBe(true);
});
test('[2,3,4] + [1,2,3] = [3,5,7]', ()=>{
    let vec1 = new vec3(2,3,4);
    let vec2 = new vec3(1,2,3);
    let res = new vec3(3,5,7);
    let flag = vec3.equals(vec1.add(vec2),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec2.add(vec1),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec3.add(vec1, vec2),res)
    expect(flag).toBe(true);
});

// for negative()
test('-[1,-2,3] = [-1, 2, -3]', ()=>{
    let vec1 = new vec3(1,-2,3);
    let res = new vec3(-1,2,-3);
    let flag = vec3.equals(vec1.negative(),res)
    expect(flag).toBe(true);
});

// for length_squared()
test('[1,2,3].length() ^2 = 14', ()=>{
    let vec1 = new vec3(1,2,3);
    expect(vec1.length_squared()).toBe(14);
});

// for length()
test('[1,2,3].length() = sqrt(14)', ()=>{
    let vec1 = new vec3(1,2,3);
    expect(vec1.length()).toBe(Math.sqrt(14));
});

// for subtract()
test('2 - [1,-2.01,3] = [1,4.01,-1]', ()=>{
    let num1 = 2;
    let vec1 = new vec3(1,-2.01,3);
    let res = new vec3(1,4.01,-1);
    let flag = vec3.equals(vec3.subtract(num1, vec1),res)
    expect(flag).toBe(true);
});
test('[1,-2.01,3]-2 = [-1,-4.01,1]', ()=>{
    let num1 = 2;
    let vec1 = new vec3(1,-2.01,3);
    let res = new vec3(-1,-4.01,1);
    let flag = vec3.equals(vec3.subtract(vec1, num1),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec1.subtract(num1),res)
    expect(flag).toBe(true);
});
test('[2,3,4] - [1,2,3] = [1,1,1]', ()=>{
    let vec1 = new vec3(2,3,4);
    let vec2 = new vec3(1,2,3);
    let res = new vec3(1,1,1);
    let flag = vec3.equals(vec1.subtract(vec2),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec3.subtract(vec1,vec2),res)
    expect(flag).toBe(true);
});

// for multiply()
test('2 * [1,2,3] = [2,4,6]', ()=>{
    let num1 = 2;
    let vec1 = new vec3(1,2,3);
    let res = new vec3(2,4,6);
    let flag = vec3.equals(vec1.multiply(num1),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec3.multiply(num1, vec1),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec3.multiply(vec1, num1),res)
    expect(flag).toBe(true);
});
test('[2,3,4] * [1,2,3] = [2,6,12]', ()=>{
    let vec1 = new vec3(2,3,4);
    let vec2 = new vec3(1,2,3);
    let res = new vec3(2,6,12);
    let flag = vec3.equals(vec1.multiply(vec2),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec2.multiply(vec1),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec3.multiply(vec1, vec2),res)
    expect(flag).toBe(true);
});

// for divide()
test('[1,2,-3] / 2 = [0.5,1,-1.5]', ()=>{
    let num1 = 2;
    let vec1 = new vec3(1,2,-3);
    let res = new vec3(0.5,1,-1.5);
    let flag = vec3.equals(vec1.divide(num1),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec3.divide(vec1, num1),res)
    expect(flag).toBe(true);
});
test(`[2,3,4] / [1,2,3] = [${2/1},${3/2},${4/3}]`, ()=>{
    let vec1 = new vec3(2,3,4);
    let vec2 = new vec3(1,2,3);
    let res = new vec3(2/1,3/2,4/3);
    let flag = vec3.equals(vec1.divide(vec2),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec3.divide(vec1,vec2),res)
    expect(flag).toBe(true);
});

// for unit()
test(`unit([2,3,4]) = [${2/Math.sqrt(29)},${3/Math.sqrt(29)},${4/Math.sqrt(29)}]`, ()=>{
    let vec1 = new vec3(2,3,4);
    let res = new vec3(2/Math.sqrt(29),3/Math.sqrt(29),4/Math.sqrt(29));
    let flag = vec3.equals(vec1.unit(),res)
    expect(flag).toBe(true);
    flag = vec3.equals(vec3.unit(vec1),res)
    expect(flag).toBe(true);
});

// for dot()
test(`[2,3,4] o [1,2,3] = 20`, ()=>{
    let vec1 = new vec3(2,3,4);
    let vec2 = new vec3(1,2,3);
    let res = 20;
    expect(vec3.dot(vec1,vec2)).toBe(res);
    expect(vec3.dot(vec2,vec1)).toBe(res);
});

// for cross()
test(`[-2,15,12] x [100, -2, -11] = [-141, 1178,-1496]`, ()=>{
    let vec1 = new vec3(-2,15,12);
    let vec2 = new vec3(100, -2, -11);
    let res = new vec3(-141, 1178,-1496);
    let flag = vec3.equals(vec3.cross(vec1, vec2),res)
    expect(flag).toBe(true);
});