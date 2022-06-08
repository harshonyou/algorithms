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

// addElements()

update.addEventListener("click", function () {
    updateStage();
});

next.addEventListener("click", function () {
    nextStage();
});

prev.addEventListener("click", function () {
    previousStage();
});

let print = () => {
    // if(colorVisibility.style.opacity == '') {
    //     colorVisibility.style.opacity = '1'
    // } else {
    //     colorVisibility.style.opacity = ''
    // }
    console.log("Bruh")
}

let updateStage = () => {
    console.log("bruh")
    let tableElements = document.querySelectorAll(".element");

    tableElements.forEach(function(element) {
        element.removeEventListener("click", print);
    });

    let rawValues = document.querySelector("#input").value
    if (rawValues == "")
        return
    values = rawValues.split(",").map(Number);
    removeDivs()
    let i=0;
    values.forEach(element => {
        addElement(element, (element*60)+"px", i++)
    });
    sorted = false

    tableElements = document.querySelectorAll(".element");

    tableElements.forEach(function(element) {
        element.addEventListener("click", print);
    });

    Coloris({
        el: '.coloris'
    });
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

// let sort = () => {
//     bubble(values, steps)
//     sorted = true
//     steps.reverse()
// }

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
    let tempDivSelector = document.querySelector("div[index='"+(i++)+"']")
    while(tempDivSelector != null) {
        tempDivSelector.parentElement.remove()
        tempDivSelector = document.querySelector("div[index='"+(i++)+"']")
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function addElement(value, height, index) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "element coloris")
    newDiv.setAttribute("value", value)
    newDiv.setAttribute("tooltip", "value: " + value+"; " + "index: " + index)
    newDiv.setAttribute("flow", "down")
    newDiv.setAttribute("index", index)
    newDiv.setAttribute("location", index)
    newDiv.setAttribute("coloris-value", "rgb("+getRandomArbitrary(0,255)+", "+getRandomArbitrary(0,255)+", "+getRandomArbitrary(0,255)+")")
    newDiv.style.height = height

    var currentDiv = document.getElementById("elements");
    currentDiv.append(newDiv)
}

function addElements() {
    document.querySelector("#input").value = "6, 4, 3, 5, 1, 2"
    updateStage()
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
        targets: document.querySelector("div[index='"+targetInd+"']").parentElement,
        translateX: SPACES*(targetLoc - target.getAttribute("index")),
        endDelay: 0,
        delay: 0,
        duration: 100,
        easing: 'easeInOutQuad'
    });
}