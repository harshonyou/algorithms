document.body.onload = addElements;

const update = document.querySelector("#update")
const sort = document.querySelector("#sort")
const step = document.querySelector("#step")

let values = []
let steps = []
let sorted = false
let compared = []
/*
    OPCODE  |   OPRAND
    __________________
    0       |   SWAP
    1       |   COMPARE
*/

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
            steps.push([1, j, min])
            if(values[j]<values[min]) {
                min = j;
            }
        }
        // swap(i, min)
        steps.push([0, i, min])
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
        console.log(currentStep)
        removeCompare()
        if(currentStep[0] == 0) {
            swap(currentStep[1], currentStep[2])
        }
        else if(currentStep[0] == 1) {
            compare(currentStep[1], currentStep[2])
        }
    }
});

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