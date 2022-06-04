document.body.onload = addElements;

const update = document.querySelector("#update")
const sort = document.querySelector("#sort")
const step = document.querySelector("#step")

let values = []
let steps = []
let sorted = false

update.addEventListener("click", function () {
    let rawValues = document.querySelector("#input").value
    values = rawValues.split(",").map(Number);
    removeDivs()
    let i=0;
    values.forEach(element => {
        addElement(element, (element*10)+"px", i++)
    });
    sorted = false
});

sort.addEventListener("click", function () {
    // console.log(values)
    // for (let index = 0; index < values.length; index++) {
    //     if(index<4)
    //         swap(index, index+1)
    //     else
    //         swap(index, index-1)
    // }
    let min;
    for (let i=0; i<values.length; i++) {
        min = i;
        for (let j=i+1; j<values.length; j++) {
            if(values[j]<values[min]) {
                min = j;
            }
        }
        // swap(i, min)
        steps.push([i, min])
        let temp = values[i]
        values[i] = values[min]
        values[min] = temp
    }
    sorted = true
});

step.addEventListener("click", function () {
    if (!sorted) {
        console.log("Not Sorted")
    }
    if(steps.length>0) {
        let currentStep = steps.shift()
        swap(currentStep[0], currentStep[1])
        console.log(currentStep)
    }
});

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
        addElement(element, (element*10)+"px", i++)
    });
}

function swap(targetA, targetB) {
    let a = document.querySelector("[location='"+targetA+"']").getAttribute("index")
    let b = document.querySelector("[location='"+targetB+"']").getAttribute("index")
    move(a, targetB)
    move(b, targetA)
}

function move(targetInd, targetLoc) {
    document.querySelector("[index='"+targetInd+"']").setAttribute("location", targetLoc)
    anime({
        targets: "[index='"+targetInd+"']",
        translateX: 12*targetLoc - 12*document.querySelector("[index='"+targetInd+"']").getAttribute("index"),
        delay: 100,
    });
}