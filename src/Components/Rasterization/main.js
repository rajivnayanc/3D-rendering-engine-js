import { GameEngine } from './rasterizationEngine.js';
import * as vec3 from './vec3/vec3.js';
import * as mat4 from './matrix_util.js';
import * as plane from './planes.js';
let times = 0;
let canvasDOM = document.getElementById('gameWindow');
let scale = 1;
let game = new GameEngine(
    canvasDOM,
    Math.floor(scale * window.innerHeight),
    Math.floor(scale * window.innerWidth));
console.log(game.height, game.width)
const toRadians = (degree) => degree / 180.0 * Math.PI;
const logFileText = async file => {
    const response = await fetch(file)
    const text = await response.text();
    return text;
}
let stars = Array(game.height).fill().map(() => Array(game.width).fill(1));
for (let i = 0; i < game.height; i++) {
    for (let j = 0; j < game.width; j++) {
        stars[i][j] = Math.random()
    }
}

const createTriangle = (point1, point2, point3) => {
    let out = [];
    out.push(vec3.clone(point1))
    out.push(vec3.clone(point2))
    out.push(vec3.clone(point3))
    return out;
}

const randomColor = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return game.createColor(r, g, b, 255);
}

const arraytoVecArray = (points) => {
    let out = []
    for (let i = 0; i < points.length; i++) {
        let temp = [];
        temp.push(vec3.clone(points[i][0]));
        temp.push(vec3.clone(points[i][1]));
        temp.push(vec3.clone(points[i][2]));
        out.push(temp);
    }
    return out;
}
const createMesh = (triangleVertices) => {
    let out = [];
    for (let i = 0; i < triangleVertices.length; i++) {
        out.push(
            createTriangle(
                triangleVertices[i][0],
                triangleVertices[i][1],
                triangleVertices[i][2],
            )
        );
    }
    return (out);
}


let Mesh;
let fTheta = 0;
let vCamera = vec3.create();
let vLookDir = vec3.fromValues(0, 0, 1);
let fYaw = 0;
const keyPressedBool = {
    'ArrowDown': false,
    'ArrowUp': false,
    'ArrowLeft': false,
    'ArrowRight': false,
    'w': false,
    's': false,
    'a': false,
    'd': false,
}
window.addEventListener('keydown', (e) => {
    const keyPressed = e.key;
    if (keyPressed in keyPressedBool) {
        keyPressedBool[keyPressed] = true;
    }
});

window.addEventListener('keyup', (e) => {
    const keyPressed = e.key;
    if (keyPressed in keyPressedBool) {
        keyPressedBool[keyPressed] = false;
    }
})

const rasterizeObject = (elapsedTime) => {
    let tt = 0, tt1 = 0, tt2 = 0;

    for (let i = 0; i < game.height; i++) {
        for (let j = 0; j < game.width; j++) {
            let color;
            if (stars[i][j] < 0.001) color = game.createColor(255, 255, 255, 255);
            else color = game.createColor(0, 0, 0, 255);
            game.putPixel(game.createCoord(j, i),
                color, false);
        }
    }
    // game.clearDrawingArea(false);


    const transSpeed = 0.01;
    const rotSpeed = 0.05;

    let vUp = vec3.fromValues(0, 1, 0);
    let vTarget = vec3.fromValues(0, 0, 1);

    let vForward = vec3.scale(vec3.create(), vLookDir, transSpeed * elapsedTime);
    let vRight = vec3.unit_vector(vec3.cross(vec3.create(), vForward, vUp));
    vec3.scale(vRight, vRight, transSpeed * elapsedTime);

    if (keyPressedBool.ArrowRight) vec3.add(vCamera, vCamera, vRight);
    if (keyPressedBool.ArrowLeft) vec3.sub(vCamera, vCamera, vRight);

    if (keyPressedBool.ArrowUp) vCamera[1] += transSpeed * elapsedTime;
    if (keyPressedBool.ArrowDown) vCamera[1] -= transSpeed * elapsedTime;

    if (keyPressedBool.w) vec3.add(vCamera, vCamera, vForward);
    if (keyPressedBool.s) vec3.sub(vCamera, vCamera, vForward);
    if (keyPressedBool.a) fYaw -= rotSpeed * elapsedTime;
    if (keyPressedBool.d) fYaw += rotSpeed * elapsedTime;




    let light_direction = vec3.fromValues(0, -1, 1);
    vec3.scale(light_direction, light_direction, -1)
    light_direction = vec3.unit_vector(light_direction);
    let fNear = 0.05;
    let fFar = 1000.0;
    let fFov = 60.0;
    let matProj = mat4.GetProjectionMatrix(fFov, game.height, game.width, fNear, fFar);

    let point1 = vec3.create(), point2 = vec3.create(), point3 = vec3.create();
    fTheta += 1.0 * (elapsedTime) / 10;
    fTheta = 0;
    let matRotX = mat4.GetIdentityMatrix();
    let matRotY = mat4.GetIdentityMatrix();
    let matRotZ = mat4.GetIdentityMatrix();
    let matTrans = mat4.GetIdentityMatrix();
    matRotX = mat4.GetRotationXMatrix(toRadians(0));
    matRotY = mat4.GetRotationYMatrix(toRadians(fTheta * 0.5));
    matRotZ = mat4.GetRotationZMatrix(toRadians(fTheta));
    matTrans = mat4.GetTranslationMatrix(0, 0, 25);
    let matWorld = mat4.GetIdentityMatrix();
    matWorld = mat4.MatrixMultiply(matRotZ, matRotY);
    matWorld = mat4.MatrixMultiply(matWorld, matRotX);
    matWorld = mat4.MatrixMultiply(matWorld, matTrans);



    let matCameraRot = mat4.flatten(mat4.GetRotationYMatrix(toRadians(fYaw)));
    vec3.transformMat4(vLookDir, vTarget, matCameraRot);
    vec3.add(vTarget, vCamera, vLookDir);
    let matCamera = mat4.GetPointAtMatrix(vCamera, vTarget, vUp);
    let matView = mat4.GetQuickInverseMatrix(matCamera);
    matWorld = mat4.flatten(matWorld);
    matView = mat4.flatten(matView);
    matProj = mat4.flatten(matProj);
    let color = game.createColor(255, 255, 255, 255);

    let trianglesToRaster = [];
    const L = Mesh.length;


    for (let i = 0; i < L; i++) {
        const a = Mesh[i];
        point1 = vec3.clone(a[0]);
        point2 = vec3.clone(a[1]);
        point3 = vec3.clone(a[2]);

        tt1 = performance.now();
        vec3.transformMat4(point1, point1, matWorld);
        vec3.transformMat4(point2, point2, matWorld);
        vec3.transformMat4(point3, point3, matWorld);


        let line1 = vec3.subtract(vec3.create(), point1, point2);
        let line2 = vec3.subtract(vec3.create(), point1, point3);
        let normal = vec3.cross(vec3.create(), line1, line2);

        normal = vec3.unit_vector(normal);
        let line_to_normal = vec3.subtract(vec3.create(), point1, vCamera);


        if (vec3.dot(normal, line_to_normal) < 0) {

            vec3.transformMat4(point1, point1, matView);
            vec3.transformMat4(point2, point2, matView);
            vec3.transformMat4(point3, point3, matView);


            let clippedTriangle = plane.Triangle_ClipAgainstPlane(
                vec3.fromValues(0, 0, fNear),
                vec3.fromValues(0, 0, 1),
                [point1, point2, point3]
            );

            clippedTriangle.forEach((a) => {

                let point1 = vec3.clone(a[0]);
                let point2 = vec3.clone(a[1]);
                let point3 = vec3.clone(a[2]);

                let dp = Math.max(0.1, vec3.dot(normal, light_direction));
                let new_color = vec3.lerp(vec3.create(), vec3.fromValues(0, 0, 0), vec3.fromValues(255, 255, 255), dp);
                color = game.createColor(new_color[0], new_color[1], new_color[2], 255);



                vec3.transformMat4(point1, point1, matProj);
                vec3.transformMat4(point2, point2, matProj);
                vec3.transformMat4(point3, point3, matProj);

                vec3.multiply(point1, point1, vec3.fromValues(-1, -1, 1));
                vec3.multiply(point2, point2, vec3.fromValues(-1, -1, 1));
                vec3.multiply(point3, point3, vec3.fromValues(-1, -1, 1));
                const offsetView = vec3.fromValues(1, 1, 0);
                vec3.add(point1, point1, offsetView);
                vec3.add(point2, point2, offsetView);
                vec3.add(point3, point3, offsetView);


                const scaleView = vec3.fromValues(0.5 * game.width, 0.5 * game.height, 1);

                vec3.multiply(point1, point1, scaleView);
                vec3.multiply(point2, point2, scaleView);
                vec3.multiply(point3, point3, scaleView);


                trianglesToRaster.push([point1, point2, point3, color, (point1[2] + point2[2] + point3[2]) / 3]);

            })
        }


    };


    trianglesToRaster = trianglesToRaster.sort((a, b) => b[4] - a[4]);


    let TriangleCount = 0;
    let triTotest, trisToAdd;
    trianglesToRaster.forEach(triToRaster => {

        let ListTriangles = [];
        ListTriangles.push(triToRaster);

        let countNewTriangles = 1;

        for (let p = 0; p < 4; p++) {
            while (countNewTriangles > 0) {
                triTotest = ListTriangles.shift();
                countNewTriangles--;
                trisToAdd = [];

                switch (p) {
                    case 0:
                        trisToAdd = plane.Triangle_ClipAgainstPlane(
                            vec3.fromValues(0, 0, 0),
                            vec3.fromValues(0, 1, 0), triTotest
                        ); break;
                    case 1:
                        trisToAdd = plane.Triangle_ClipAgainstPlane(
                            vec3.fromValues(0, game.height - 1, 0),
                            vec3.fromValues(0, -1, 0), triTotest
                        ); break;
                    case 2:
                        trisToAdd = plane.Triangle_ClipAgainstPlane(
                            vec3.fromValues(0, 0, 0),
                            vec3.fromValues(1, 0, 0), triTotest
                        ); break;
                    case 3:
                        trisToAdd = plane.Triangle_ClipAgainstPlane(
                            vec3.fromValues(game.width - 1, 0, 0),
                            vec3.fromValues(-1, 0, 0), triTotest
                        ); break;
                }

                trisToAdd.forEach(tri => {
                    ListTriangles.push([tri[0], tri[1], tri[2], triToRaster[3]]);
                });


            }
            countNewTriangles = ListTriangles.length;
        }

        ListTriangles.forEach(tri => {
            let point1 = vec3.clone(tri[0]);
            let point2 = vec3.clone(tri[1]);
            let point3 = vec3.clone(tri[2]);
            let color = tri[3];
            let p1 = game.createFloatCoord(point1[0], point1[1]),
                p2 = game.createFloatCoord(point2[0], point2[1]),
                p3 = game.createFloatCoord(point3[0], point3[1]);
            p1 = game.createCoord(p1.x, p1.y);
            p2 = game.createCoord(p2.x, p2.y);
            p3 = game.createCoord(p3.x, p3.y);
            TriangleCount++;
            game.fillTriangle(p1, p2, p3, color, false);
            // game.drawTriangle(p1,p2,p3,game.createColor(0,0,0,255),false);
            // game.drawTriangle(p1,p2,p3,game.createColor(255,255,255,255),false);
        })

    });

    const msg1 = `FPS: ${Math.round(1000 / elapsedTime)}`;
    const msg2 = `Elapsed Time: ${Math.round(elapsedTime)}ms`;
    const msg3 = `Triangle Count: ${TriangleCount}`;
    game.fillRect(
        game.createCoord(0, 0),
        game.createCoord(150, 40),
        game.createColor(255, 255, 20, 255), false);
    game.renderScreen(true);
    game.putText(msg1, game.createCoord(10, 10), game.createColor(0, 0, 0, 255), 20, false);
    game.putText(msg2, game.createCoord(10, 20), game.createColor(0, 0, 0, 255), 20, false);
    game.putText(msg3, game.createCoord(10, 30), game.createColor(0, 0, 0, 255), 20, false);

    console.log("Performance", tt);
    times++;
}


const FPS = 10000;
let previousTimeStamp = 0;

const animate = (timestamp) => {
    setTimeout(() => {
        animate(performance.now())
        rasterizeObject(timestamp - previousTimeStamp);
        previousTimeStamp = timestamp;
    }, 0);
}

const parseModelFile = (modelText) => {
    modelText = modelText.split("\n").map(line => line.split(" "));
    let vertices = [];
    let triangles_ind = [];
    for (let i = 0; i < modelText.length; i++) {
        if (modelText[i][0] === "v") {
            let temp = [];
            temp.push(parseFloat(modelText[i][1]));
            temp.push(parseFloat(modelText[i][2]));
            temp.push(parseFloat(modelText[i][3]));
            vertices.push(temp);
        } else if (modelText[i][0] === "f") {
            let temp = [];
            temp.push(parseInt(modelText[i][1]));
            temp.push(parseInt(modelText[i][2]));
            temp.push(parseInt(modelText[i][3]));
            triangles_ind.push(temp);
        }
    }
    let triangles = [];
    for (let i = 0; i < triangles_ind.length; i++) {
        let temp = [];
        temp.push(vertices[triangles_ind[i][0] - 1]);
        temp.push(vertices[triangles_ind[i][1] - 1]);
        temp.push(vertices[triangles_ind[i][2] - 1]);
        triangles.push(temp);
    }
    console.log("Number of Triangles", triangles.length)
    return createMesh(arraytoVecArray(triangles));
}

const init = () => {
    const file_name_input = document.getElementById("renderObjs")
    const fileName = `objs/${file_name_input.value}`
    document.getElementById('startButton').style.display = "none";
    document.getElementById("renderObjs").style.display = "none"
    logFileText(fileName)
        .then(text => parseModelFile(text))
        .then((mesh) => { Mesh = mesh; })
        .then(animate(performance.now()));

}

document.getElementById('startButton').addEventListener('click', () => init());