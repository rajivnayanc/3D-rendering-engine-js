import React, { Component } from "react";

import './style.css'

import { GameEngine } from './rasterizationEngine.js';
import * as vec3 from './vec3/vec3.js';
import * as mat4 from './matrix_util.js';
import * as plane from './planes.js';

// import {text} from './objs/cube.objs'

class Rasterization extends Component {
    times = 0;
    canvasDOM = null;
    scale = 1;
    game = null;
    ctx = null;
    Mesh = null;
    fTheta = 0;
    vCamera = vec3.create();
    vLookDir = vec3.fromValues(0, 0, 1);
    fYaw = 0;
    keyPressedBool = {
        'ArrowDown': false,
        'ArrowUp': false,
        'ArrowLeft': false,
        'ArrowRight': false,
        'w': false,
        's': false,
        'a': false,
        'd': false,
    };
    stars = null;

    componentDidMount() {
        const canvasDOM = document.getElementById('gameWindow');
        const ctx = canvasDOM.getContext('2d', { willReadFrequently: true });
        const game = new GameEngine(
            canvasDOM,
            Math.floor(this.scale * window.innerHeight),
            Math.floor(this.scale * window.innerWidth));
        const stars = Array(game.height).fill().map(() => Array(game.width).fill(1));
        for (let i = 0; i < game.height; i++) {
            for (let j = 0; j < game.width; j++) {
                stars[i][j] = Math.random()
            }
        }
        this.game = game;
        this.ctx = ctx;
        this.stars = stars;
        this.canvasDOM = canvasDOM;

        window.addEventListener('keydown', (e) => {
            const keyPressed = e.key;
            if (keyPressed in this.keyPressedBool) {
                this.keyPressedBool[keyPressed] = true;
            }
        });

        window.addEventListener('keyup', (e) => {
            const keyPressed = e.key;
            if (keyPressed in this.keyPressedBool) {
                this.keyPressedBool[keyPressed] = false;
            }
        });
    }
    toRadians = (degree) => degree / 180.0 * Math.PI;

    createTriangle = (point1, point2, point3) => {
        let out = [];
        out.push(vec3.clone(point1))
        out.push(vec3.clone(point2))
        out.push(vec3.clone(point3))
        return out;
    }

    randomColor = () => {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return this.game.createColor(r, g, b, 255);
    }

    arraytoVecArray = (points) => {
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
    createMesh = (triangleVertices) => {
        let out = [];
        for (let i = 0; i < triangleVertices.length; i++) {
            out.push(
                this.createTriangle(
                    triangleVertices[i][0],
                    triangleVertices[i][1],
                    triangleVertices[i][2],
                )
            );
        }
        return (out);
    }

    rasterizeObject = (elapsedTime) => {
        let tt = 0, tt1 = 0, tt2 = 0;

        for (let i = 0; i < this.game.height; i++) {
            for (let j = 0; j < this.game.width; j++) {
                let color;
                if (this.stars[i][j] < 0.001) color = this.game.createColor(255, 255, 255, 255);
                else color = this.game.createColor(0, 0, 0, 255);
                this.game.putPixel(this.game.createCoord(j, i),
                    color, false);
            }
        }
        // game.clearDrawingArea(false);


        const transSpeed = 0.01;
        const rotSpeed = 0.05;

        let vUp = vec3.fromValues(0, 1, 0);
        let vTarget = vec3.fromValues(0, 0, 1);

        let vForward = vec3.scale(vec3.create(), this.vLookDir, transSpeed * elapsedTime);
        let vRight = vec3.unit_vector(vec3.cross(vec3.create(), vForward, vUp));
        vec3.scale(vRight, vRight, transSpeed * elapsedTime);

        if (this.keyPressedBool.ArrowRight) vec3.add(this.vCamera, this.vCamera, vRight);
        if (this.keyPressedBool.ArrowLeft) vec3.sub(this.vCamera, this.vCamera, vRight);

        if (this.keyPressedBool.ArrowUp) this.vCamera[1] += transSpeed * elapsedTime;
        if (this.keyPressedBool.ArrowDown) this.vCamera[1] -= transSpeed * elapsedTime;

        if (this.keyPressedBool.w) vec3.add(this.vCamera, this.vCamera, vForward);
        if (this.keyPressedBool.s) vec3.sub(this.vCamera, this.vCamera, vForward);
        if (this.keyPressedBool.a) this.fYaw -= rotSpeed * elapsedTime;
        if (this.keyPressedBool.d) this.fYaw += rotSpeed * elapsedTime;

        let light_direction = vec3.fromValues(0.5, 0.5, 0.5);
        vec3.scale(light_direction, light_direction, -1)
        light_direction = vec3.unit_vector(light_direction);
        let fNear = 0.05;
        let fFar = 1000.0;
        let fFov = 60.0;
        let matProj = mat4.GetProjectionMatrix(fFov, this.game.height, this.game.width, fNear, fFar);

        let point1 = vec3.create(), point2 = vec3.create(), point3 = vec3.create();
        this.fTheta += 1.0 * (elapsedTime) / 10;
        this.fTheta = 0;
        let matRotX = mat4.GetIdentityMatrix();
        let matRotY = mat4.GetIdentityMatrix();
        let matRotZ = mat4.GetIdentityMatrix();
        let matTrans = mat4.GetIdentityMatrix();
        matRotX = mat4.GetRotationXMatrix(this.toRadians(0));
        matRotY = mat4.GetRotationYMatrix(this.toRadians(this.fTheta * 0.5));
        matRotZ = mat4.GetRotationZMatrix(this.toRadians(this.fTheta));
        matTrans = mat4.GetTranslationMatrix(0, 0, 25);
        let matWorld = mat4.GetIdentityMatrix();
        matWorld = mat4.MatrixMultiply(matRotZ, matRotY);
        matWorld = mat4.MatrixMultiply(matWorld, matRotX);
        matWorld = mat4.MatrixMultiply(matWorld, matTrans);



        let matCameraRot = mat4.flatten(mat4.GetRotationYMatrix(this.toRadians(this.fYaw)));
        vec3.transformMat4(this.vLookDir, vTarget, matCameraRot);
        vec3.add(vTarget, this.vCamera, this.vLookDir);
        let matCamera = mat4.GetPointAtMatrix(this.vCamera, vTarget, vUp);
        let matView = mat4.GetQuickInverseMatrix(matCamera);
        matWorld = mat4.flatten(matWorld);
        matView = mat4.flatten(matView);
        matProj = mat4.flatten(matProj);
        let color = this.game.createColor(255, 255, 255, 255);

        let trianglesToRaster = [];
        const L = this.Mesh.length;

        for (let i = 0; i < L; i++) {
            const a = this.Mesh[i];
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
            let line_to_normal = vec3.subtract(vec3.create(), point1, this.vCamera);


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
                    color = this.game.createColor(new_color[0], new_color[1], new_color[2], 255);



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


                    const scaleView = vec3.fromValues(0.5 * this.game.width, 0.5 * this.game.height, 1);

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
                                vec3.fromValues(0, this.game.height - 1, 0),
                                vec3.fromValues(0, -1, 0), triTotest
                            ); break;
                        case 2:
                            trisToAdd = plane.Triangle_ClipAgainstPlane(
                                vec3.fromValues(0, 0, 0),
                                vec3.fromValues(1, 0, 0), triTotest
                            ); break;
                        case 3:
                            trisToAdd = plane.Triangle_ClipAgainstPlane(
                                vec3.fromValues(this.game.width - 1, 0, 0),
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
                let p1 = this.game.createFloatCoord(point1[0], point1[1]),
                    p2 = this.game.createFloatCoord(point2[0], point2[1]),
                    p3 = this.game.createFloatCoord(point3[0], point3[1]);
                p1 = this.game.createCoord(p1.x, p1.y);
                p2 = this.game.createCoord(p2.x, p2.y);
                p3 = this.game.createCoord(p3.x, p3.y);
                TriangleCount++;
                this.game.fillTriangle(p1, p2, p3, color, false);
                // game.drawTriangle(p1,p2,p3,game.createColor(0,0,0,255),false);
                // game.drawTriangle(p1,p2,p3,game.createColor(255,255,255,255),false);
            })

        });

        const msg1 = `FPS: ${Math.round(1000 / elapsedTime)}`;
        const msg2 = `Elapsed Time: ${Math.round(elapsedTime)}ms`;
        const msg3 = `Triangle Count: ${TriangleCount}`;
        this.game.fillRect(
            this.game.createCoord(0, 0),
            this.game.createCoord(150, 40),
            this.game.createColor(255, 255, 20, 255), false);
        this.game.renderScreen(true);
        this.game.putText(msg1, this.game.createCoord(10, 10), this.game.createColor(0, 0, 0, 255), 20, false);
        this.game.putText(msg2, this.game.createCoord(10, 20), this.game.createColor(0, 0, 0, 255), 20, false);
        this.game.putText(msg3, this.game.createCoord(10, 30), this.game.createColor(0, 0, 0, 255), 20, false);

        console.log("Performance", tt);
        this.times++;
    }


    FPS = 10000;
    previousTimeStamp = 0;

    animate = (timestamp) => {
        setTimeout(() => {
            this.animate(performance.now())
            this.rasterizeObject(timestamp - this.previousTimeStamp);
            this.previousTimeStamp = timestamp;
        }, 0);
    }

    parseModelFile(modelText) {
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
        return this.createMesh(this.arraytoVecArray(triangles));
    }

    async init() {
        const file_name_input = document.getElementById("renderObjs")
        const fileName = `/objs/${file_name_input.value}`
        // const fileName = '/objs/cube.obj'
        document.getElementById('startButton').style.display = "none";
        document.getElementById("renderObjs").style.display = "none"
        
        const response = await fetch(fileName);
        const text = await response.text();
        const modelMesh = this.parseModelFile(text)
        this.Mesh = modelMesh;
        this.animate(performance.now())
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="canvasContainer">
                        <canvas id="gameWindow"></canvas>
                    </div>
                </div>
                <select name="object" id="renderObjs">
                    <option value="VideoShip.obj">VideoShip</option>
                    <option value="Anime_charcter.obj">Anime Character</option>
                    <option value="Audi R8.obj">Audi R8</option>
                    <option value="wolf.obj">Wolf</option>
                    <option value="spaceship.obj">Spaceship</option>
                    <option value="mountains.obj">Mountains</option>
                    <option value="StatueOfLiberty.obj">Statue of Liberty</option>
                    <option value="house.obj">House</option>
                    <option value="axis.obj">Axis</option>
                    <option value="cube.obj">Cube</option>
                    <option value="teapot.obj">Tea Pot</option>
                    <option value="teapot2.obj">Tea Pot 2</option>
                    <option value="tavern2.obj">Tavern</option>
                    <option value="driller2.obj">Driller</option>
                </select>
                <button onClick={() => this.init()} className="startButton" id="startButton">Start 3D CPU Rasterization Engine</button>
            </div>);
    }

}

export default Rasterization;