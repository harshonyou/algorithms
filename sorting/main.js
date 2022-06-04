document.body.onload = addElements;

function addElement(idName, height, index) {
    var newDiv = document.createElement("div");
    // var newContent = document.createTextNode("Hi there and greetings!");
    // newDiv.appendChild(newContent);
    newDiv.setAttribute("class", "element")
    newDiv.setAttribute("id", idName)
    newDiv.setAttribute("index", index)
    newDiv.setAttribute("location", index)
    newDiv.style.height = height

    var currentDiv = document.getElementById("elements");
    currentDiv.append(newDiv)
}

function addElements() {
    let i=0;
    addElement("red", "60px", i++);
    addElement("blue", "30px", i++);
    addElement("green", "40px", i++);
    addElement("yellow", "50px", i++);

    // anime({
    //     targets: 'div.element#red',
    //     translateY: [
    //         {value: 200, duration: 500},
    //         {value: 0, duration: 500},
    //     ],
    // });
    // anime({
    //     targets: 'div.element#red',
    //     // translateX: [
    //     //             {value: 0, duration: 500},
    //     //             {value: 12*1, duration: 500},
    //     //         ],
    //     translateX: 12*1,
    //     delay: 500,
    //     // easing: 'easeInOutExpo'
    //     // duration: 3000
    // });
}

function swap(targetA, targetB) {
    let a = document.getElementById(targetA).getAttribute("location")
    let b = document.getElementById(targetB).getAttribute("location")
    move(targetA, b)
    move(targetB, a)
}

function move(targetName, targetLoc) {
    document.getElementById(targetName).setAttribute("location", targetLoc)
    anime({
        targets: 'div.element#'+targetName,
        translateX: 12*targetLoc - 12*document.getElementById(targetName).getAttribute("index"),
        delay: 100,
    });
}