let selection = (arr, steps) => {
    let min;
    for (let i=0; i<arr.length; i++) {
        min = i;
        for (let j=i+1; j<arr.length; j++) {
            steps.push([1, j, min])
            if(arr[j] < arr[min]) {
                min = j;
            }
        }
        steps.push([0, i, min])
        let temp = arr[i]
        arr[i] = arr[min]
        arr[min] = temp
    }
}