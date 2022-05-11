import React, { useState, useEffect } from "react";
import data from "../../assets/data.js";
import { convertData } from "../../utils/convertData.js";
import {
	convertToMoney,
	getOldestDate,
	formatDate,
	getWeightedDate,
} from "../../utils/utils.js";
import Explanation from "../Explanation";

import styles from './WeightedReturn.module.css'

const WeightedReturn = (curr) => {
	if (typeof curr !== "number") curr = 27521.18;

	const [averageWeighted, principal] = convertData(data);

	const [spyWeightedAmount, setSpyWeightedAmount] = useState("");
	const [spyCurrAmount, setSpyCurrAmount] = useState("");

	const [nasdaqWeightedAmount, setNasdaqWeightedAmount] = useState("");
	const [nasdaqCurrAmount, setNasdaqCurrAmount] = useState("");

	const absoluteStart = getOldestDate(data.map((i) => i.deposit));
	const weightedStart = getWeightedDate(Math.floor(averageWeighted));
	const todayish = formatDate(new Date(new Date().setDate(new Date().getDate()-1))); //get yesterday's close becasue otherwise I'd either need to write separate funcitons for different points in the day or it wouldn't work outside of 5 PM to Midnight

	function useEffectWrapper(timeStamp, sign, setFunc) {
		useEffect(() => {
			let apiUrl = `https://api.polygon.io/v2/aggs/ticker/${sign}/range/1/day/${timeStamp}/${timeStamp}?adjusted=true&sort=asc&limit=120&apiKey=YHMpZffc6SJ6Ph0zhL1gNQzSUzWYE0KG`;
			fetch(apiUrl)
				.then(function (response) {
					if (response.ok) {
						response.json().then(function (res) {
							setFunc(res.results[0].c);
							
						});
					} else {
						console.log("could not find " + sign + " for " + timeStamp);
					}
				})
				.catch(function (err) {
					console.log(err);
				});
		}, [timeStamp, sign, setFunc]);
	}
	useEffectWrapper(todayish, "SPY", setSpyCurrAmount);
	useEffectWrapper(weightedStart, "SPY", setSpyWeightedAmount);

	useEffectWrapper(todayish, "QQQ", setNasdaqCurrAmount);
	useEffectWrapper(weightedStart, "QQQ", setNasdaqWeightedAmount);

	const weightedReturn = (curr / principal) ** (365 / averageWeighted) * 100;
	const totalReturn = (curr / principal) * 100;

	const spyWeightedReturnAnnualized =
		(spyCurrAmount / spyWeightedAmount) ** (365 / averageWeighted) * 100;
	const nasdaqWeightedReturnAnnualized =
		(nasdaqCurrAmount / nasdaqWeightedAmount) ** (365 / averageWeighted) *
		100;
	const spyWeightedReturnTotal = (spyCurrAmount / spyWeightedAmount) * 100;
	const nasdaqWeightedReturnTotal =
		(nasdaqCurrAmount / nasdaqWeightedAmount) * 100;

	return (
		<section>
			<p>
				You have invested {convertToMoney(principal.toString())} since you started investing on {absoluteStart.slice(5) + "-" + absoluteStart.slice(0, 4)}
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
			<Explanation />
		</section>
	);
};

export default WeightedReturn;
