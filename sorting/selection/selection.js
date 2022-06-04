let x = [12, 11, 13, 5, 6];
let y = x;

console.log(x)

let min;

for (let i=0; i<x.length; i++) {
    min = i;
    for (let j=i+1; j<x.length; j++) {
        if(x[j]<x[min]) {
            min = j;
        }
    }
    temp = x[i]
    x[i] = x[min]
    x[min] = temp
}


// x.sort()

console.log(x)