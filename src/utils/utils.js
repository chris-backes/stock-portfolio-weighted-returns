export function convertToMoney(num) {
	let i = num.length;
	if (num.indexOf('.') !== -1) i -= 3
	while (i > 0) {
		i -= 3;
		if (i > 0) {
			num = num.slice(0, i) + "," + num.slice(i);
		}
	}
	return "$" + num + (num.indexOf(".") !== -1 ? "" : ".00");
}

export function formatDate(str) {
	if (str.getDay() === 0) str = new Date(str.setDate(str.getDate() - 2))
	if (str.getDay() === 6) str = new Date(str.setDate(str.getDate() - 1))
	let month = str.getMonth() + 1
	return (
		str.getFullYear().toString() +
		"-" +
		(month < 10
			? "0" + month.toString()
			: month.toString()) +
		"-" +
		(str.getDate().toString().length === 1
			? "0" + str.getDate().toString()
			: str.getDate().toString())
	);
}

export function getWeightedDate(days) {
	let res = new Date();
	return formatDate(new Date(res.setDate(res.getDate() - days)));
}

export function getOldestDate(arr) {
	let res = arr.map((i) => new Date(i));
	res.sort((a, b) => a - b);

	return formatDate(res[0]);
}

export function setDate(deposit) {
	let res = deposit.replace(/-/g, "/");
	if (
		res.match(
			/^((0[1-9]|1[012]|[1-9])[- /.](0[1-9]|[12][0-9]|3[01]|[1-9])[- /.](19|20)\d\d|(19|20)\d\d[- /.](0[1-9]|1[012]|[1-9])[- /.](0[1-9]|[12][0-9]|3[01]|[1-9]))$/
		)
	) {
		let temp = res.split('/')
		if (temp[0].charAt(0) === "0") temp[0] = temp[0].substring(1)
		if (temp[1].charAt(0) === "0") temp[1] = temp[1].substring(1)
		return res;
	}
	window.alert("The date should be formatted mm/dd/yyyy");
	throw new Error('something went wrong')
}

export function setMoney(amount) {
	if (amount.charAt(0) === '$') amount = amount.substring(1)
	let res = amount.replace(/,/g, "")
	if (res.match(/[0-9]+(\.[0-9]{2})?/)) {
		return res;
	}
	window.alert("Dollar amounts must be of the form xxxx or xxxx.xx");
	throw new Error('something went wrong')
}
