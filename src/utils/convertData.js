export function convertData(arr) {
    let today = new Date()
    let sum = 0
    let temp = []
    // The frist loop accomplishes two tasks:
    // 1. the Date is altered to be the difference, in dats of today and the date in the object
    // 2. the Amounts are summed
    for (let i = 0; i < arr.length; i++) {
 
        temp.push(Math.floor((today - new Date(arr[i].deposit)) / (1000 * 3600 * 24)))
        sum += parseInt(arr[i].amount)
    }
    // res is the weighted average days invested per dollar (e.g. when res = 96.7, a dollar is invested, on average, 96.7 days in the market)

    let res = 0
    for (let i = 0; i < temp.length; i++) {

        res+=(parseInt(arr[i].amount) / sum) * parseInt(temp[i])
    }

    return [res, sum]
}
