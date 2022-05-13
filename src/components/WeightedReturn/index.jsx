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

import styles from "./WeightedReturn.module.css";

const WeightedReturn = ({ portfolio }) => {
	const [averageWeighted, principal] = convertData(data);

	const [spyWeightedAmount, setSpyWeightedAmount] = useState("");
	const [spyCurrAmount, setSpyCurrAmount] = useState("");

	const [nasdaqWeightedAmount, setNasdaqWeightedAmount] = useState("");
	const [nasdaqCurrAmount, setNasdaqCurrAmount] = useState("");

	const absoluteStart = getOldestDate(data.map((i) => i.deposit));
	const weightedStart = getWeightedDate(Math.floor(averageWeighted));
	const todayish = formatDate(
		new Date(new Date().setDate(new Date().getDate() - 1))
	); //get yesterday's close because otherwise I'd either need to write separate funcitons for different points in the day or it wouldn't work outside of 5 PM to Midnight

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
						console.log(
							"could not find " + sign + " for " + timeStamp
						);
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

	//personal portfolio
	const weightedReturn =
		(portfolio / principal) ** (365 / averageWeighted) * 100 - 100;
	const totalReturn = (portfolio / principal) * 100 - 100;

	//S&P returns
	const spyWeightedReturnAnnualized =
		(spyCurrAmount / spyWeightedAmount) ** (365 / averageWeighted) * 100 -
		100;
	const spyWeightedReturnTotal =
		(spyCurrAmount / spyWeightedAmount) * 100 - 100;
	
	//Nasdaq returns
	const nasdaqWeightedReturnAnnualized =
		(nasdaqCurrAmount / nasdaqWeightedAmount) ** (365 / averageWeighted) *
			100 -
		100;
	const nasdaqWeightedReturnTotal =
		(nasdaqCurrAmount / nasdaqWeightedAmount) * 100 - 100;

	const assessment = () => {
		//gets the investing period in years, will be compared against a period of five years
		const investingPeriod =
			(new Date(new Date().setDate(new Date().getDate() - 1)) -
				new Date(absoluteStart)) /
			(1000 * 3600 * 24 * 365); //converts the milliseconds to years with decimals
		if (
			Number.isNaN(spyWeightedReturnAnnualized) ||
			Number.isNaN(nasdaqWeightedReturnAnnualized)
		)
			return "We seem to be having some trouble with our API calls, so we can't make an assessment of your portfolio.";
		if (
			weightedReturn > spyWeightedReturnAnnualized &&
			weightedReturn > nasdaqWeightedReturnAnnualized
		) {
			if (investingPeriod > 5) {
				return "It is rare that an investor can outperform the market for such a sustained period of time. Well done!";
			} else {
				return "This is a really great start. Keep up the good work.";
			}
		} else if (
			weightedReturn < spyWeightedReturnAnnualized &&
			weightedReturn < nasdaqWeightedReturnAnnualized
		) {
			if (investingPeriod > 5) {
				return "You probably want to look at index investing or some sort of broad market approach. The time and effort spent on this is not warranted by your returns";
			} else {
				return "Might be too soon to tell. But so far, your money was better spent elsewhere";
			}
		} else {
			if (weightedReturn > spyWeightedReturnAnnualized) {
				return "You beat the S&P, but not the NASDAQ. Bit of a mixed bag.";
			} else {
				return "You beat the NASDAQ, but not the S&P. Bit of a mixed bag.";
			}
		}
	};

	return (
		<section>
			<p>
				You have invested {convertToMoney(principal.toString())} since
				you started investing on{" "}
				{absoluteStart.slice(5, 7) +
					"/" +
					absoluteStart.slice(8) +
					"/" +
					absoluteStart.slice(0, 4)}
				. The current value of your portfolio is{" "}
				{convertToMoney(portfolio)}.
			</p>
			<p>
				Your portfolio has returned {totalReturn.toFixed(2)}% since
				inception. When taking into account that you may have deposited
				money at different times, the average length of time that each
				dollar has been invested in your account is{" "}
				{averageWeighted.toFixed(0)} days. The annualized return from
				this duration is {weightedReturn.toFixed(2)}%.
			</p>
			<p>
				Over the equivalent weighted period, the S&P has returned{" "}
				{spyWeightedReturnTotal.toFixed(2)}%, for an annualized return
				of {spyWeightedReturnAnnualized.toFixed(2)}%. The Nasdaq has
				returned {nasdaqWeightedReturnTotal.toFixed(2)}%, for an
				annualized return of {nasdaqWeightedReturnAnnualized.toFixed(2)}
				%.
			</p>
			<p>{assessment()}</p>
			<Explanation />
		</section>
	);
};

export default WeightedReturn;
