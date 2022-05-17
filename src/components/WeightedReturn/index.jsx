import React, { useState } from "react";
import { convertData } from "../../utils/convertData.js";
import {
	convertToMoney,
	getOldestDate,
	formatDate,
	getWeightedDate,
} from "../../utils/utils.js";
import assessment from '../../utils/assessment'
import Explanation from "../Explanation";
import Graph from '../Graph'
import useEffectWrapper from '../../hooks/useEffectWrapping'

import "./WeightedReturn.module.css";

const WeightedReturn = ({ portfolio, transactionHistory }) => {
	const [averageWeighted, principal] = convertData(transactionHistory);

	//initialize state for api calls, s&p and nasdaq
	const [spyWeightedAmount, setSpyWeightedAmount] = useState("");
	const [spyCurrAmount, setSpyCurrAmount] = useState("");

	const [nasdaqWeightedAmount, setNasdaqWeightedAmount] = useState("");
	const [nasdaqCurrAmount, setNasdaqCurrAmount] = useState("");

	//getting date vars
	const absoluteStart = getOldestDate(transactionHistory.map((i) => i.deposit));
	const weightedStart = getWeightedDate(Math.floor(averageWeighted));
	const todayish = formatDate(
		new Date(new Date().setDate(new Date().getDate() - 1))
	); //get yesterday's close because otherwise I'd either need to write separate funcitons for different points in the day or it wouldn't work outside of 5 PM to Midnight

	useEffectWrapper(todayish, "SPY", setSpyCurrAmount);
	useEffectWrapper(weightedStart, "SPY", setSpyWeightedAmount);
	useEffectWrapper(todayish, "QQQ", setNasdaqCurrAmount);
	useEffectWrapper(weightedStart, "QQQ", setNasdaqWeightedAmount);

	//personal portfolio
	const weightedReturn =
		(parseFloat(portfolio) / principal) ** (365 / averageWeighted) * 100 - 100;
	const totalReturn = (parseFloat(portfolio) / principal) * 100 - 100;

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

	const graphData = {
		total: [totalReturn, spyWeightedReturnTotal, nasdaqWeightedReturnTotal],
		weighted: [weightedReturn, spyWeightedReturnAnnualized, nasdaqWeightedReturnAnnualized]
	}


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
			<p>{assessment(absoluteStart, spyWeightedReturnAnnualized, nasdaqWeightedReturnAnnualized, weightedReturn)}</p>
			<Explanation />
			<Graph graphData={graphData} />
		</section>
	);
};

export default WeightedReturn;
