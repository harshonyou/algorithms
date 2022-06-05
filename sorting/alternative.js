var controlsProgressEl = document.querySelector('.timeline-controls-demo .progress');

var tl = anime.timeline({
  direction: 'alternate',
  loop: true,
  duration: 500,
  easing: 'easeInOutSine'
});

document.body.onload = addElements;

const update = document.querySelector("#update")
const sort = document.querySelector("#sort")
const step = document.querySelector("#step")

let values = []
let steps = []
let sorted = false
let compared = []

sort.addEventListener("click", function () {
    if (sorted) {
        return
    }
    let min;
    for (let i=0; i<values.length; i++) {
        min = i;
        for (let j=i+1; j<values.length; j++) {
            compare(j, min)
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

let compare = (targetA, targetB) => {
    let a = document.querySelector("[location='"+targetA+"']")
    let b = document.querySelector("[location='"+targetB+"']")

    let colorA = a.style.backgroundColor
    let colorB = b.style.backgroundColor

    tl
    .add({
        targets: "[location='"+targetA+"'], "+"[location='"+targetB+"']",
        backgroundColor: '#FF0000',
        duration: 0
    })

    tl
    .add({
        targets: "[location='"+targetA+"']",
        backgroundColor: colorA,
        duration: 0
    })
    .add({
        targets: "[location='"+targetB+"']",
        backgroundColor: colorB,
        duration: 0
    })

}

function addElements() {
    let i=0;
    values = [6, 4, 3, 5, 1, 2]
    values.forEach(element => {
        addElement(element, (element*10)+"px", i++)
    });
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