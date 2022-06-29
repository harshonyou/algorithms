let insertion = (arr, steps) => {
    for (let i=1; i<arr.length; i++) {
        let j = i;
        while(j>0 && arr[j-1]>arr[j]){
            steps.push([1, j, j-1])
            steps.push([0, j, j-1])
            let temp = arr[j]
            arr[j] = arr[j-1]
            arr[j-1] = temp
            j = j-1;
        }
    }
}