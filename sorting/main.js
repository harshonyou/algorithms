document.body.onload = addElements;

const update = document.querySelector("#update")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")

let values = []
let steps = []
let history = []
let sorted = false
let reverse = false
let compared = []

/*
    OPCODE  |   OPRAND
    __________________
    -1       |   CLEAR
    0       |   SWAP
    1       |   COMPARE
*/
const CLEAR_OP = -1
const SWAP_OP = 0
const COMPARE_OP = 1
const SPACES = 32

update.addEventListener("click", function () {
    updateStage();
});

next.addEventListener("click", function () {
    nextStage();
});

prev.addEventListener("click", function () {
    previousStage();
});

let updateStage = () => {
    let rawValues = document.querySelector("#input").value
    if (rawValues == "")
        return
    values = rawValues.split(",").map(Number);
    removeDivs()
    let i=0;
    values.forEach(element => {
        addElement(element, (element*10)+"px", i++)
    });
    sorted = false
}

let sort = () => {
    let min;
    for (let i=0; i<values.length; i++) {
        min = i;
        for (let j=i+1; j<values.length; j++) {
            steps.push([1, j, min])
            if(values[j]<values[min]) {
                min = j;
            }
        }
        steps.push([0, i, min])
        let temp = values[i]
        values[i] = values[min]
        values[min] = temp
    }
    sorted = true
    steps.reverse()
}

let nextStage = () => {
    if (!sorted) {
        sort()
    }

    if(steps.length>0) {
        let currentStep = steps.pop()
        history.push(currentStep)
        if(reverse && currentStep[0] != SWAP_OP) {
            currentStep = steps.pop()
            history.push(currentStep)
        }
        removeCompare()

        if(currentStep[0] == SWAP_OP) {
            swap(currentStep[1], currentStep[2])
        }
        else if(currentStep[0] == COMPARE_OP) {

            compare(currentStep[1], currentStep[2])
        }
        reverse = false
    }
}

let previousStage = () => {
    if (!sorted) {
        sort()
    }

    if(history.length>0) {
        let currentStep = history.pop()
        steps.push(currentStep)
        if(!reverse && history.length>0 && currentStep[0] != SWAP_OP) {
            currentStep = history.pop()
            steps.push(currentStep)
        }
        removeCompare()

        if(currentStep[0] == SWAP_OP) {
            swap(currentStep[1], currentStep[2])
        }
        else if(currentStep[0] == COMPARE_OP) {
            compare(currentStep[1], currentStep[2])
        }
        reverse = true
    }
}

let removeCompare = () => {
    if(compared.length>0) {
        document.querySelector("[location='"+compared[0][0]+"']").style.backgroundColor = compared[0][1]
        document.querySelector("[location='"+compared[1][0]+"']").style.backgroundColor = compared[1][1]

        compared = []
    }
}

let compare = (targetA, targetB) => {
    let a = document.querySelector("[location='"+targetA+"']")
    let b = document.querySelector("[location='"+targetB+"']")

    compared.push([targetA, a.style.backgroundColor])
    compared.push([targetB, b.style.backgroundColor])

    a.style.backgroundColor = "red";
    b.style.backgroundColor = "red";
}

let removeDivs = () => {
    let i=0;
    let tempDivSelector = document.querySelector("[index='"+(i++)+"']")
    while(tempDivSelector != null) {
        tempDivSelector.remove()
        tempDivSelector = document.querySelector("[index='"+(i++)+"']")
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function addElement(value, height, index) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "element")
    newDiv.setAttribute("value", value)
    newDiv.setAttribute("tooltip", "value: " + value+"; " + "index: " + index)
    newDiv.setAttribute("flow", "down")
    newDiv.setAttribute("index", index)
    newDiv.setAttribute("location", index)
    newDiv.style.height = height
    newDiv.style.backgroundColor = "rgb("+getRandomArbitrary(0,255)+", "+getRandomArbitrary(0,255)+", "+getRandomArbitrary(0,255)+")"

    var currentDiv = document.getElementById("elements");
    currentDiv.append(newDiv)
}

function addElements() {
    let i=0;
    values = [6, 4, 3, 5, 1, 2]
    values.forEach(element => {
        addElement(element, (element*60)+"px", i++)
    });
}

function swap(targetA, targetB) {
    let a = document.querySelector("[location='"+targetA+"']").getAttribute("index")
    let b = document.querySelector("[location='"+targetB+"']").getAttribute("index")
    move(a, targetB)
    move(b, targetA)
}

function move(targetInd, targetLoc) {
    let target = document.querySelector("[index='"+targetInd+"']")
    target.setAttribute("location", targetLoc)
    target.setAttribute("tooltip", "value: " + target.getAttribute("value") + "; " + "index: " + targetLoc)
    anime({
        targets: "[index='"+targetInd+"']",
        translateX: SPACES*(targetLoc - target.getAttribute("index")),
        endDelay: 0,
        delay: 0,
        duration: 100,
        easing: 'easeInOutQuad'
    });
}




/////////////////////////////////////////////////////

var colorBlock = document.getElementById('color-block');
var ctx1 = colorBlock.getContext('2d');
var width1 = colorBlock.width;
var height1 = colorBlock.height;

var colorStrip = document.getElementById('color-strip');
var ctx2 = colorStrip.getContext('2d');
var width2 = colorStrip.width;
var height2 = colorStrip.height;

var colorLabel = document.getElementById('color-label');

var x = 0;
var y = 0;
var drag = false;
var rgbaColor = 'rgba(255,0,0,1)';

ctx1.rect(0, 0, width1, height1);
fillGradient();

ctx2.rect(0, 0, width2, height2);
var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();

function click(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx2.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  fillGradient();
}

function fillGradient() {
  ctx1.fillStyle = rgbaColor;
  ctx1.fillRect(0, 0, width1, height1);

  var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx1.fillStyle = grdWhite;
  ctx1.fillRect(0, 0, width1, height1);

  var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx1.fillStyle = grdBlack;
  ctx1.fillRect(0, 0, width1, height1);
}

function mousedown(e) {
  drag = true;
  changeColor(e);
}

function mousemove(e) {
  if (drag) {
    changeColor(e);
  }
}

function mouseup(e) {
  drag = false;
}

function changeColor(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx1.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
  colorLabel.style.backgroundColor = rgbaColor;
}

colorStrip.addEventListener("click", click, false);

colorBlock.addEventListener("mousedown", mousedown, false);
colorBlock.addEventListener("mouseup", mouseup, false);
colorBlock.addEventListener("mousemove", mousemove, false);