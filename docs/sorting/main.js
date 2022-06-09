// Add default values on page load
document.body.onload = addElements;

// buttons
const update = document.querySelector("#update")
const prev = document.querySelector("#prev")
const next = document.querySelector("#next")
const algo = document.querySelector("#algo")

// variables
let values = []
let steps = []
let history = []
let sorted = false
let reverse = false
let compared = []
let spaces = 32

/*
    OPCODE  |   OPRAND
    __________________
    -1       |   CLEAR
    0       |   SWAP
    1       |   COMPARE
*/
// constants
const CLEAR_OP = -1
const SWAP_OP = 0
const COMPARE_OP = 1

// event handlers for different button
update.addEventListener("click", function () {
    updateStage();
    if(values.length>1) {
        spaces = getXDistanceBetweenElements(
            document.querySelector("[location='"+0+"']"),
            document.querySelector("[location='"+1+"']")
        );
    }
});

next.addEventListener("click", function () {
    nextStage();
});

prev.addEventListener("click", function () {
    previousStage();
});

algo.addEventListener("change", function () {
    updateStage();
});

window.addEventListener('resize', () => {
    if(values.length>1) {
        spaces = getXDistanceBetweenElements(
            document.querySelector("[location='"+0+"']"),
            document.querySelector("[location='"+1+"']")
        );
    }
});

let print = () => {
    console.log("Bruh")
}

let updateStage = () => {
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

    steps = []
    history = []
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
    console.log(algo.value)
    switch (algo.value) {
        case "bubble":
            bubble(values, steps)
            break;
        case "selection":
            selection(values, steps)
            break;
        default:
            break;
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
        translateX: spaces*(targetLoc - target.getAttribute("index")),
        endDelay: 0,
        delay: 0,
        duration: 100,
        easing: 'easeInOutQuad'
    });
}


function getPositionAtCenter(element) {
    const {top, left, width, height} = element.getBoundingClientRect();
    return {
        x: left + width / 2,
        y: top + height / 2
    };
}

function getXDistanceBetweenElements(a, b) {
    const aPosition = getPositionAtCenter(a);
    const bPosition = getPositionAtCenter(b);

    return Math.abs(aPosition.x - bPosition.x);
}

function getDistanceBetweenElements(a, b) {
    const aPosition = getPositionAtCenter(a);
    const bPosition = getPositionAtCenter(b);

    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}