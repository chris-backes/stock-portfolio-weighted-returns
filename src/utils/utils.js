export function convertToMoney(num) {
	let i = num.length;
	while (i > 0) {
		i = i - 3;
		if (i > 0) {
			num = num.slice(0, i) + "," + num.slice(i);
		}
	}
	return "$" + num + (num.indexOf(".") !== -1 ? "" : ".00");
}

export function formatDate(str) {
	return (
		str.getFullYear().toString() +
		"/" +
		(str.getMonth().toString().length === 1
			? "0" + str.getMonth().toString()
			: str.getMonth().toString()) +
		"/" +
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
			/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/
		)
	) {
		return deposit;
	}
	return window.alert("The date should be formatted mm/dd/yyyy");
}

export function setMoney(amount) {
	if (amount.charAt(0) === '$') amount = amount.substring(1)
	if (amount.match(/[0-9]+(\.[0-9]{2})?/)) {
		return amount;
	}
	return window.alert("Dollar ammounts must be of the form xxxx or xxxx.xx");
}
