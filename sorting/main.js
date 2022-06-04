document.body.onload = addElements;

const update = document.querySelector("#update")
const sort = document.querySelector("#sort")

update.addEventListener("click", function () {
    let rawValues = document.querySelector("#input").value
    let values = rawValues.split(",").map(Number);
    removeDivs()
    let i=0;
    values.forEach(element => {
        addElement((element*10)+"px", i++)
    });
});

sort.addEventListener("click", function () {
    console.log("clicked");
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

function addElement(height, index) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("class", "element")
    newDiv.setAttribute("index", index)
    newDiv.setAttribute("location", index)
    newDiv.style.height = height
    newDiv.style.backgroundColor = "rgb("+getRandomArbitrary(0,255)+", "+getRandomArbitrary(0,255)+", "+getRandomArbitrary(0,255)+")"

    var currentDiv = document.getElementById("elements");
    currentDiv.append(newDiv)
}

function addElements() {
    let i=0;
    addElement("60px", i++);
    addElement("30px", i++);
    addElement("40px", i++);
    addElement("50px", i++);
}

function swap(targetA, targetB) {
    let a = document.querySelector("[index='"+targetA+"']").getAttribute("location")
    let b = document.querySelector("[index='"+targetB+"']").getAttribute("location")
    move(targetA, b)
    move(targetB, a)
}

function move(targetName, targetLoc) {
    document.querySelector("[index='"+targetName+"']").setAttribute("location", targetLoc)
    anime({
        targets: "[index='"+targetName+"']",
        translateX: 12*targetLoc - 12*document.querySelector("[index='"+targetName+"']").getAttribute("index"),
        delay: 100,
    });
}