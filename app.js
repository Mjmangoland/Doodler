const saveBtn = document.getElementById("save")
//const textInput = document.getElementById("text")
const fileInput = document.getElementById("file")
const eraserBtn = document.getElementById("eraser-btn")
const destroyBtn = document.getElementById("destroy-btn")
const modeBtn = document.getElementById("mode-btn")
const colorOptions = Array.from(
    document.getElementsByClassName("color-option")
);
const color = document.getElementById("color")
const lineWidth = document.getElementById("line-width")
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

//캔버스 크기 만들기
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.lineWidth = lineWidth.value ;
ctx.lineCap = "round"

let isPainting = false;
let isFilling = false;

function onMove(event){
   if(isPainting){
    ctx.lineTo(event.offsetX,event.offsetY);
    ctx.stroke();
    return;
   } 
   ctx.moveTo(event.offsetX,event.offsetY)
}

function startPainting(){
    isPainting = true;
}

function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle =colorValue;
    color.value =colorValue;
}
//채워지는 부분과 선이 그려지는 부분 나누기
function onModeClick(){
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = "Fill";
    }else{
        isFilling = true;
        modeBtn.innerText="Draw"
    }
}

//그림판 채우기 버튼
function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    }
}
//그림판 초기화 버튼 - 클릭했을 때 화면 전체 리셋 
function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
}

function onEraserClick(){
    ctx.strokeStyle="white";
    isFilling = false;
    modeBtn.innerText = "Fill"
}
//그림판 이미지 추가 코드
function onFileChange(event){
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src=url;
    image.onload = function (){
        ctx.drawImage(image,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        fileInput.value = null;       
    };
}
//그림판 텍스트입력 코드
function onDoubleClick(event){
    const text = textInput.value;
    if (text !== ""){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font ="68px sans-serif";
        ctx.fillText(text, event.offsetX,event.offsetY);
        ctx.restore()
    }
}

//그림판 저장버튼 코드
function onSaveClick(){
 const url = canvas.toDataURL();
 const a = document.createElement("a");
 a.href = url;
 a.download = "Doodle.png"
 a.click();   
}

canvas.addEventListener("dblclick",onDoubleClick);
canvas.addEventListener("mousemove",onMove);
canvas.addEventListener("mousedown",startPainting);
canvas.addEventListener("mouseup",cancelPainting);
canvas.addEventListener("mouseleave",cancelPainting);
canvas.addEventListener("click",onCanvasClick);
lineWidth.addEventListener("change",onLineWidthChange);
color.addEventListener("change",onColorChange);
colorOptions.forEach((color)=>color.addEventListener("click",onColorClick));
modeBtn.addEventListener("click",onModeClick);
destroyBtn.addEventListener("click",onDestroyClick);
eraserBtn.addEventListener("click",onEraserClick);
fileInput.addEventListener("change",onFileChange);
saveBtn.addEventListener("click",onSaveClick);
