import * as vec3 from './vec3/vec3.js';

export function vectorPlaneIntersection(plane_p,plane_n, lineStart, lineEnd){
    plane_n = vec3.unit_vector(plane_n);
    const plane_d = -vec3.dot(plane_n,plane_p);
    const ad = vec3.dot(plane_n, lineStart);
    const bd = vec3.dot(plane_n, lineEnd);
    const t = (-plane_d-ad)/(bd-ad);
    const vecLineStartToEnd = vec3.sub(vec3.create(),lineEnd, lineStart);
    const vecLineToIntersect = vec3.scale(vec3.create(), vecLineStartToEnd, t);
    return vec3.add(vec3.create(),lineStart,vecLineToIntersect);
}

export function Triangle_ClipAgainstPlane(plane_p, plane_n, triangle){
   plane_n = vec3.unit_vector(plane_n);
   const dist = (p)=>{
       let n = vec3.unit_vector(p);
       return (vec3.dot(plane_n,p)-vec3.dot(plane_n, plane_p));
   }
   const d0 = dist(triangle[0]);
   const d1 = dist(triangle[1]);
   const d2 = dist(triangle[2]);

   let inside_points = []; let insidePointsCount=0;
   let outside_points = []; let outsidePointsCount=0;

   if(d0 >= 0) {inside_points.push(triangle[0]); insidePointsCount++;}
   else{outside_points.push(triangle[0]); outsidePointsCount++;}

   if(d1 >= 0) {inside_points.push(triangle[1]); insidePointsCount++;}
   else{outside_points.push(triangle[1]); outsidePointsCount++;}

   if(d2 >= 0) {inside_points.push(triangle[2]); insidePointsCount++;}
   else{outside_points.push(triangle[2]); outsidePointsCount++;}

   let outTriangles = [];
   if(insidePointsCount === 0){
       return outTriangles;
   }
   else if(insidePointsCount === 3){
       let temp = [];
       temp.push(triangle[0]);
       temp.push(triangle[1]);
       temp.push(triangle[2]);
       outTriangles.push(temp);
       return outTriangles;
   }

   else if(insidePointsCount === 1 && outsidePointsCount === 2){
       let temp = [];
       temp.push(inside_points[0]);
       temp.push(vectorPlaneIntersection(plane_p, plane_n,inside_points[0], outside_points[0]));
       temp.push(vectorPlaneIntersection(plane_p, plane_n,inside_points[0], outside_points[1]));
       outTriangles.push(temp);
       return outTriangles;
   }
   else if(insidePointsCount === 2 && outsidePointsCount === 1){
       let temp1 = [];
       temp1.push(inside_points[0]);
       temp1.push(inside_points[1]);
       temp1.push(vectorPlaneIntersection(plane_p, plane_n,inside_points[0], outside_points[0]));
       outTriangles.push(temp1);

       let temp2 = [];
       temp2.push(inside_points[1]);
       temp2.push(vectorPlaneIntersection(plane_p, plane_n,inside_points[1], outside_points[0]));
       temp2.push(temp1[2]);
       outTriangles.push(temp2);
       return outTriangles;
   }
    return outTriangles;

}