document.body.onload = addElements;

const update = document.querySelector("#update")
const sort = document.querySelector("#sort")
let values = []

update.addEventListener("click", function () {
    let rawValues = document.querySelector("#input").value
    values = rawValues.split(",").map(Number);
    removeDivs()
    let i=0;
    values.forEach(element => {
        addElement(element, (element*10)+"px", i++)
    });
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
        swap(i, min)
        console.log("SWAP "+i+" with "+min)
        let temp = values[i]
        values[i] = values[min]
        values[min] = temp
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
    values = [6, 3, 4, 5]
    addElement(6, "60px", i++);
    addElement(3, "30px", i++);
    addElement(4, "40px", i++);
    addElement(5, "50px", i++);
}

function swap(targetA, targetB) {
    let a = document.querySelector("[location='"+targetA+"']").getAttribute("index")
    let b = document.querySelector("[location='"+targetB+"']").getAttribute("index")
    console.log("ACTUALSWAP "+a+" with "+b)
    move(a, targetB)
    move(b, targetA)
}

function move(targetName, targetLoc) {
    document.querySelector("[index='"+targetName+"']").setAttribute("location", targetLoc)
    anime({
        targets: "[index='"+targetName+"']",
        translateX: 12*targetLoc - 12*document.querySelector("[index='"+targetName+"']").getAttribute("index"),
        delay: 100,
    });
}