let x = [12, 11, 13, 5, 6];
let y = x;

console.log(x)

let bubble = (arr, steps) => {
    for (let i=0; i<arr.length; i++) {
        for (let j=0; j<arr.length-i-1; j++) {
            steps.push([1, j, j+1])
            if(arr[j] > arr[j+1]) {
                steps.push([0, j, j+1])
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1] = temp
            }
        }
    }
}


// x.sort()

console.log(x)