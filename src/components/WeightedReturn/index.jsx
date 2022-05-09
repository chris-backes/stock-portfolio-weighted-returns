import React, { useState, useEffect } from "react";
import data from "../../assets/data.js";
import { convertData } from "../../utils/convertData.js";
import {
	convertToMoney,
	getOldestDate,
	formatDate,
	getWeightedDate,
} from "../../utils/utils.js";

const WeightedReturn = (curr) => {
	if (typeof curr !== "number") curr = 27521.18;

	const [averageWeighted, principal] = convertData(data);

	const [spyStartAmount, setSpyStartAmount] = useState("");
	const [spyWeightedAmount, setSpyWeightedAmount] = useState("");
	const [spyCurrAmount, setSpyCurrAmount] = useState("");

	const [nasdaqStartAmount, setNasdaqStartAmount] = useState("");
	const [nasdaqWeightedAmount, setNasdaqWeightedAmount] = useState("");
	const [nasdaqCurrAmount, setNasdaqCurrAmount] = useState("");

	const spyStartDate = getOldestDate(data.map((i) => i.deposit));
	const sypWeightedDate = getWeightedDate(Math.floor(averageWeighted));
	const today = formatDate(new Date());

	function useEffectWrapper(data, sign, setFunc) {
		useEffect(() => {
			let apiUrl = `https://api.polygon.io/v2/aggs/ticker/${sign}/range/1/day/${data}/${data}?adjusted=true&sort=asc&limit=120&apiKey=YHMpZffc6SJ6Ph0zhL1gNQzSUzWYE0KG`;
			fetch(apiUrl)
				.then(function (response) {
					if (response.ok) {
						response.json().then(function (data) {
							setFunc(data.results[0].c);
						});
					} else {
						console.log("could not find " + sign + " for " + data);
					}
				})
				.catch(function (err) {
					console.log(err);
				});
		}, [data, sign, setFunc]);
	}
	useEffectWrapper(today, "SPY", setSpyCurrAmount);
	useEffectWrapper(spyStartDate, "SPY", setSpyStartAmount);
	useEffectWrapper(sypWeightedDate, "SPY", setSpyWeightedAmount);

	useEffectWrapper(today, "QQQ", setNasdaqCurrAmount);
	useEffectWrapper(spyStartDate, "QQQ", setNasdaqStartAmount);
	useEffectWrapper(sypWeightedDate, "QQQ", setNasdaqWeightedAmount);

	const weightedReturn = (curr / principal) ** (365 / averageWeighted) * 100;
	const totalReturn = (curr / principal) * 100;

	const spyWeightedReturnAnnualized =
		(spyCurrAmount / spyWeightedAmount) ** (365 / averageWeighted) * 100;
	const nasdaqWeightedReturnAnnualized =
		(nasdaqCurrAmount / nasdaqWeightedAmount) ** (365 / averageWeighted) *
		100;
	console.log([nasdaqWeightedAmount, nasdaqCurrAmount, nasdaqWeightedAmount]);
	const spyWeightedReturnTotal = (spyCurrAmount / spyWeightedAmount) * 100;
	const nasdaqWeightedReturnTotal =
		(nasdaqCurrAmount / nasdaqWeightedAmount) ** 100;

	// const spyStartReturnAnnualized = (spyCurrAmount / spyStartAmount) ** (365 / ) * 100;
	const spyStartReturnTotal = (spyCurrAmount / spyStartAmount) * 100;
	const nasdaqStartReturnTotal = (nasdaqCurrAmount / nasdaqStartAmount) * 100

	return (
		<article>
			<p>
				You have invested {convertToMoney(principal.toString())} since
				starting
			</p>
			<p>
				Your portfolio has returned {totalReturn.toFixed(2).slice(1)}%
				since inception. When taking into account that you may have
				deposited money at different times, the average length of time
				that each dollar has been invested in your accoutn is{" "}
				{averageWeighted.toFixed(0)} days. The annualized return from
				this average length is {weightedReturn.toFixed(2).slice(1)}%
				annualized since the fund's inception
			</p>
			<p>
				Over the equivalent weighted period, the S&P has returned{" "}
				{spyWeightedReturnTotal.toFixed(2).slice(1)}%, for an annualized
				return of {spyWeightedReturnAnnualized.toFixed(2).slice(1)}%.
				The Nasdaq has returned{" "}
				{nasdaqWeightedReturnTotal.toFixed(2).slice(1)}%, for an
				annualized return of{" "}
				{nasdaqWeightedReturnAnnualized.toFixed(2).slice(1)}%.
			</p>
			{/* <p>
					Since the inception of your portfolio, the S&P has returned{" "}
					{spyStartReturnTotal.toFixed(2).slice(1)}%, with an
					annualized return of{" "}
					{spyStartReturnAnnualized.toFixed(2).slice(1)}%.
				</p> */}
		</article>
	);
};

export default WeightedReturn;
