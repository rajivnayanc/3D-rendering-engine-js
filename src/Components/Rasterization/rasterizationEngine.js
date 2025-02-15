import * as vec3 from './vec3/vec3.js';
export class GameEngine{
    context = null;
    height = 0;
    width = 0;
    drawingArea = null;

    constructor(canvasDom, height, width){
        canvasDom.height = height;
        canvasDom.width = width;
        this.width = width;
        this.height = height;
        this.context = canvasDom.getContext('2d');
        console.log(width, height)
        this.drawingArea = this.context.getImageData(0, 0, width, height)
        this.fillDrawingArea(this.createColor(0,0,0,255),true);
    }
    createColor(r,g,b,a){
        return {r:r,g:g,b:b,a:a};
    }

    createFloatCoord(i,j){
        return {x:i,y:j};
    }
    createCoord(i,j){
        i = Math.floor(i);
        j = Math.floor(j);
        return {x:i,y:j};
    }
    renderScreen(render){
        if(render){
            this.context.putImageData(this.drawingArea,0,0)
        }
    }

    putText(text, loc,color,size, render){
        this.context.save();
        this.context.fillStyle=`rgba(${color.r},${color.g},${color.b},${color.a})`;
        this.context.fillText(text,loc.x,loc.y)
        this.context.restore();
        this.renderScreen(render);
    }
    putPixel(point,color, render = true){
        let x = point.x;
        let y = point.y;

        // const index = ((this.height-y-1) * this.width + x) * 4;
        const index = ((y) * this.width + x) * 4;
        this.drawingArea.data[index] = color.r;
        this.drawingArea.data[index+1] = color.g;
        this.drawingArea.data[index+2] = color.b;
        this.drawingArea.data[index+3] = color.a;
        this.renderScreen(render);
    }
    fillDrawingArea(color, render=true){
        for(let j = 0;j<this.height;j++){
            for(let i =0;i<this.width;i++){
                this.putPixel(this.createCoord(i,j),color,false);
            }
        }
        this.renderScreen(render);
    }
    fillRect(point0,point1,color, render=true){
        let x0 = (point0.x);
        let x1 = (point1.x);
        let y0 = (point0.y);
        let y1 = (point1.y);
        for(let j = y0;j<=y1;j++){
            for(let i =x0;i<=x1;i++){
                this.putPixel(this.createCoord(i,j),color,false);
            }
        }
        this.renderScreen(render);
    }
    clearDrawingArea(render=true){
        for(let j = 0;j<this.height;j++){
            for(let i =0;i<this.width;i++){
                this.putPixel(this.createCoord(i,j),{r:0,g:0,b:0,a:255},false);
            }
        }
        this.renderScreen(render);
    }

    drawLine(point1,point2,color, render = true){
        let x1 = (point1.x);
        let x2 = (point2.x);
        let y1 = (point1.y);
        let y2 = (point2.y);

        let dx = Math.abs(x2-x1);
        let dy = Math.abs(y2-y1);
        let sx = (x1<x2)?1:-1;
        let sy = (y1<y2)?1:-1;
        let err = dx-dy;
        while(true){
            this.putPixel(this.createCoord(x1,y1),color,false);
            if((x1===x2) && (y1===y2))break;
            let e2 = 2*err;
            if(e2 > -dy){
                err-=dy;
                x1+=sx;
            }

            if(e2 < dx){
                err+=dx;
                y1+=sy;
            }
        }
        this.renderScreen(render);
    }

    drawTriangle(point1, point2, point3,color, render = true){
        this.drawLine(point1, point2, color, false);
        this.drawLine(point2, point3, color, false);
        this.drawLine(point3, point1, color, false);

        this.renderScreen(render);
    }
    fillBottomFlatTriangle(v1, v2, v3,color,render){
        let invslope1 = (v2.x - v1.x) / (v2.y - v1.y);
        let invslope2 = (v3.x - v1.x) / (v3.y - v1.y);
   
        let curx1 = v1.x;
        let curx2 = v1.x;
        for (let scanlineY = v1.y; scanlineY <= v2.y; scanlineY++){
            this.drawLine(
                this.createCoord(Math.floor(curx1),scanlineY),
                this.createCoord(Math.floor(curx2),scanlineY),
                color,false
            )
            curx1 += invslope1;
            curx2 += invslope2;
        }
        this.renderScreen(render);
    }
    fillTopFlatTriangle(v1, v2, v3, color, render){
        let invslope1 = (v3.x - v1.x) / (v3.y - v1.y);
        let invslope2 = (v3.x - v2.x) / (v3.y - v2.y);

        let curx1 = v3.x;
        let curx2 = v3.x;

        for (let scanlineY = v3.y; scanlineY > v1.y; scanlineY--)
        {
            this.drawLine(
                this.createCoord(curx1, scanlineY), 
                this.createCoord(curx2, scanlineY),
                color, false);
            curx1 -= invslope1;
            curx2 -= invslope2;
        }
        this.renderScreen(render);
    }
    fillTriangle(point1, point2, point3, color, render=true){
        let vertices = [point1, point2, point3];
        vertices = vertices.sort((a,b)=>a.y-b.y);
        if(vertices[1].y===vertices[2].y){
            this.fillBottomFlatTriangle(vertices[0],vertices[1],vertices[2],color,render)
        }else if(vertices[0].y===vertices[1].y){
            this.fillTopFlatTriangle(vertices[0],vertices[1],vertices[2],color,render)
        }else{
            let v4 = this.createCoord(
                Math.round(vertices[0].x + (vertices[1].y-vertices[0].y)/(vertices[2].y-vertices[0].y)*(vertices[2].x-vertices[0].x)),
                vertices[1].y);
            
            this.fillBottomFlatTriangle(vertices[0],vertices[1], v4,color,render);
            this.fillTopFlatTriangle(vertices[1],v4,vertices[2],color,render);
        }

        this.renderScreen(render);
    }
}
