import * as vec3 from './vec3/vec3.js';

export function MatrixMultiply(A,B){
    let r1 = A.length;
    let c = A[0].length;
    let c2 = B[0].length;
    let out = Array(r1).fill().map(()=>Array(c2).fill(0));
    for(let i=0;i<r1;i++){
        for(let j=0;j<c2;j++){
            for(let k=0;k<c;k++){
                out[i][j]+=A[i][k]*B[k][j];
            }
        }
    }
    return out;
}

export function GetIdentityMatrix(){
    let out = Array(4).fill().map(()=>Array(4).fill(0));
    out[0][0]=1.0;
    out[1][1]=1.0;
    out[2][2]=1.0;
    out[3][3]=1.0;
    return out;
}
export function GetTranslationMatrix(x,y,z){
    let out = Array(4).fill().map(()=>Array(4).fill(0));
    out[0][0]=1.0;
    out[1][1]=1.0;
    out[2][2]=1.0;
    out[3][3]=1.0;
    out[3][0]=x;
    out[3][1]=y;
    out[3][2]=z;
    return out;
}

export function GetProjectionMatrix(fFov, height, width, fNear, fFar){
    let fAspectRatio = height/width;
    let fFovRad = 1.0/Math.tan(fFov*0.5 /180.0 * Math.PI);
    let matProj = Array(4).fill().map(()=>Array(4).fill(0))
    matProj[0][0] = fAspectRatio * fFovRad;
    matProj[1][1] = fFovRad;
    matProj[2][2] = fFar / (fFar - fNear);
    matProj[3][2] = (-fFar * fNear) / (fFar - fNear);
    matProj[2][3] = 1.0;
    matProj[3][3] = 0.0;
    return matProj;
}

export function GetRotationXMatrix(fTheta){
    let matProj = Array(4).fill().map(()=>Array(4).fill(0))
    matProj[0][0] = 1.0;
    matProj[1][1] = Math.cos(fTheta);
    matProj[1][2] = Math.sin(fTheta);
    matProj[2][1] = -Math.sin(fTheta);
    matProj[2][2] = Math.cos(fTheta);
    matProj[3][3] = 1.0;
    return matProj;
}

export function GetRotationYMatrix(fTheta){
    let matProj = Array(4).fill().map(()=>Array(4).fill(0))
    matProj[0][0] = Math.cos(fTheta);
    matProj[0][2] = Math.sin(fTheta);
    matProj[2][0] = -Math.sin(fTheta);
    matProj[1][1] = 1.0;
    matProj[2][2] = Math.cos(fTheta);
    matProj[3][3] = 1.0;
    return matProj;
}

export function GetRotationZMatrix(fTheta){
    let matProj = Array(4).fill().map(()=>Array(4).fill(0))
    matProj[0][0] = Math.cos(fTheta);
    matProj[0][1] = Math.sin(fTheta);
    matProj[1][0] = -Math.sin(fTheta);
    matProj[1][1] = Math.cos(fTheta);
    matProj[2][2] = 1.0;
    matProj[3][3] = 1.0;
    return matProj;
}

export function GetReflectionZXMatrix(){
    let matProj = Array(4).fill().map(()=>Array(4).fill(0))
    matProj[0][0] = 1;
    matProj[1][1] = -1;
    matProj[2][2] = 1;
    matProj[3][3] = 1;
    return matProj;
}

export function GetPointAtMatrix(pos, target, up){
    let forward = vec3.sub(vec3.create(),target,pos);
    forward = vec3.unit_vector(forward);

    let newRight = vec3.cross(vec3.create(), up, forward);
    newRight = vec3.unit_vector(newRight);

    let newUp = vec3.cross(vec3.create(), forward, newRight);
    newUp = vec3.unit_vector(newUp);

    // let a = vec3.scale(vec3.create(), forward, vec3.dot(up, forward));
    // let newUp = vec3.sub(vec3.create(),up,a);
    // newUp = vec3.unit_vector(newUp);

    // let newRight = vec3.cross(vec3.create(), newUp, forward);
    // newRight = vec3.unit_vector(newRight);


    let out = Array(4).fill().map(()=>Array(4).fill(0));
    out[0][0] = newRight[0]; out[0][1] = newRight[1]; out[0][2] = newRight[2]; out[0][3] = 0;
    out[1][0] = newUp[0]; out[1][1] = newUp[1]; out[1][2] = newUp[2]; out[1][3] = 0;
    out[2][0] = forward[0]; out[2][1] = forward[1]; out[2][2] = forward[2]; out[2][3] = 0;
    out[3][0] = pos[0]; out[3][1] = pos[1]; out[3][2] = pos[2]; out[3][3] = 1.0;

    return out;

}

export function GetQuickInverseMatrix(mat){
    let out = Array(4).fill().map(()=>Array(4).fill(0));
    out[0][0] = mat[0][0]; out[0][1] = mat[1][0]; out[0][2] = mat[2][0]; out[0][3] = 0;
    out[1][0] = mat[0][1]; out[1][1] = mat[1][1]; out[1][2] = mat[2][1]; out[1][3] = 0;
    out[2][0] = mat[0][2]; out[2][1] = mat[1][2]; out[2][2] = mat[2][2]; out[2][3] = 0;

    out[3][0] = -(mat[3][0] * out[0][0] + mat[3][1] * out[1][0] + mat[3][2] * out[2][0]);
    out[3][1] = -(mat[3][0] * out[0][1] + mat[3][1] * out[1][1] + mat[3][2] * out[2][1]);
    out[3][2] = -(mat[3][0] * out[0][2] + mat[3][1] * out[1][2] + mat[3][2] * out[2][2]);
    out[3][3] = 1.0;
    return out;
}

export function flatten(matrix){
    let out = Array(16);
    out[0] = matrix[0][0];
    out[1] = matrix[0][1];
    out[2] = matrix[0][2];
    out[3] = matrix[0][3];
    out[4] = matrix[1][0];
    out[5] = matrix[1][1];
    out[6] = matrix[1][2];
    out[7] = matrix[1][3];
    out[8] = matrix[2][0];
    out[9] = matrix[2][1];
    out[10] = matrix[2][2];
    out[11] = matrix[2][3];
    out[12] = matrix[3][0];
    out[13] = matrix[3][1];
    out[14] = matrix[3][2];
    out[15] = matrix[3][3];
    return out;
}