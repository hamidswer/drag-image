const emptyHolder=document.querySelectorAll(".empty");
const hideHolder=document.querySelector(".hide");
const fillHolder=document.querySelector(".fill");
let box = {};
emptyHolder.forEach((e,i)=>{
    let nameX = "box"+(i+1)+"x";
    let nameY = "box"+(i+1)+"y";
    let nameWidth = "box"+(i+1)+"width";
    let allPosition = e.getClientRects();
    box[nameX] = allPosition[0].x;
    box[nameY] = allPosition[0].y;
    box[nameWidth] = allPosition[0].width;
});
let border1;
let border2;
let border3;
if(box){
    let width = ((box.box4x + (box.box4width)) /4)-box.box1x;
    border1 = width;
    border2 = border1 * 2;
    border3 = border1 * 3;
}
let xTarget;
let yTarget;
function positionXY(xmouse,ymouse){
    xTarget = xmouse;
    yTarget = ymouse;
    fillHolder.style.position = "absolute";
    fillHolder.style.top = `${ymouse}px`;
    fillHolder.style.left = `${xmouse}px`;
    hideHolder.style.top = `${ymouse}px`;
    hideHolder.style.left = `${xmouse}px`;
}
document.addEventListener("drag", (e)=> {
    e.preventDefault();
    if(xTarget && yTarget){
        if (xTarget !== e.clientX || yTarget !== e.clientY ){
            if(e.clientX == 0 && e.clientY == 0){}
            else {
                positionXY(e.clientX, e.clientY);
            }
        }
    }
    else {
        if(e.clientX == 0 && e.clientY == 0){}
        else {
            positionXY(e.clientX, e.clientY);
        }
    }
});
let leftPositionStart;
let topPositionStart;
function animationJS(holder) {
    if (leftPositionStart<=border1){finalLocationX = box.box1x; finalLocationY = box.box1y;}
    else if (border1<leftPositionStart && leftPositionStart<=border2){finalLocationX = box.box2x; finalLocationY = box.box2y;}
    else if (border2<leftPositionStart&& leftPositionStart<=border3){finalLocationX = box.box3x; finalLocationY = box.box3y;}
    else if (border3<leftPositionStart) {finalLocationX = box.box4x; finalLocationY = box.box4y;};
    leftPositionEnd = Math.trunc(Number(finalLocationX));
    topPositionEnd = Math.trunc(Number(finalLocationY));
    holder.animate([
        // keyframes
        { left: `${leftPositionStart}px`, top: `${topPositionStart}px` },
        { left: `${leftPositionEnd}px`, top: `${topPositionEnd}px` }
      ], {
        // timing options
        duration: 100,
        iterations: 1,
    });
    positionXY(leftPositionEnd, topPositionEnd);
}
document.addEventListener("dragend", (e)=> {
    e.preventDefault();
    leftPositionStart = Number(fillHolder.style.left.replace("px",""));
    topPositionStart = Number(fillHolder.style.top.replace("px",""));
    animationJS(fillHolder);
    animationJS(hideHolder);
    
});