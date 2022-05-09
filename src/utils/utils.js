export function convertToMoney(num) {
	let i = num.length
	while (i > 0) {
	    i = i - 3
	    if (i > 0) {
	        num = num.slice(0, i) + "," + num.slice(i)
	    }
	}
	return "$" + num + (num.indexOf(".") !== -1 ? "" : ".00");
}

export function formatDate(str) {
    return (
		str.getFullYear().toString() +
		"-" +
		(str.getMonth().toString().length === 1
			? "0" + str.getMonth().toString()
			: str.getMonth().toString()) +
		"-" +
		(str.getDate().toString().length === 1
			? "0" + str.getDate().toString()
			: str.getDate().toString())
	);
}

export function getWeightedDate(days) {
    let res = new Date()
    return formatDate(new Date(res.setDate(res.getDate() - days)))
}

export function getOldestDate(arr) {
	let res = arr.map((i) => new Date(i));
	res.sort((a, b) => a - b);

	return formatDate(res[0])
}
