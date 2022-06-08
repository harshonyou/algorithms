let x = [12, 11, 13, 5, 6];
let y = x;

console.log(x)

for (let i=0; i<x.length; i++) {
    for (let j=0; j<x.length-i-1; j++) {
        if(x[j] > x[j+1]) {
            let temp = x[j]
            x[j] = x[j+1]
            x[j+1] = temp
        }
    }
}


// x.sort()

console.log(x)