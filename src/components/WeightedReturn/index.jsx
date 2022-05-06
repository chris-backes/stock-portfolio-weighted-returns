import React, { useState, useEffect } from "react";
import data from "../../assets/data.js";
import { convertData } from "../../utils/convertData.js";
import { convertToMoney, getOldestDate, formatDate, getWeightedDate } from "../../utils/utils.js";

const WeightedReturn = (curr) => {
	if (typeof curr !== "number") curr = 27521.18;

	const [averageWeighted, principal] = convertData(data);

	const [spyStartAmount, setSpyStartAmount] = useState("");
	const [spyWeightedAmount, setSpyWeightedAmount] = useState("");
	const [spyCurrAmount, setSpyCurrAmount] = useState('')

    const spyStartDate = getOldestDate(data.map(i => i.deposit))
	const sypWeightedDate = getWeightedDate(Math.floor(averageWeighted))
	const today = formatDate(new Date())
    console.log([today, spyStartDate, sypWeightedDate])

	// useEffect(() => {
	// 	let inception = "2021-07-22";
	// 	let apiUrl = `https://api.polygon.io/v2/aggs/ticker/SPY/range/1/day/${inception}/${inception}?adjusted=true&sort=asc&limit=120&apiKey=YHMpZffc6SJ6Ph0zhL1gNQzSUzWYE0KG`;
	// 	fetch(apiUrl)
	// 		.then(function (response) {
	// 			if (response.ok) {
	// 				response.json().then(function (data) {
	// 					setSpyStartAmount(data.results[0].c);
	// 				});
	// 			} else {
	// 				alert("some sort of error occur");
	// 			}
	// 		})
	// 		.catch(function (error) {
	// 			alert("Huh, the API didn't work");
	// 		});
	// }, [])

    // useEffect(() => {
	// 	let weighted = "2021-07-22";
	// 	let apiUrl = `https://api.polygon.io/v2/aggs/ticker/SPY/range/1/day/${weighted}/${weighted}?adjusted=true&sort=asc&limit=120&apiKey=YHMpZffc6SJ6Ph0zhL1gNQzSUzWYE0KG`;
	// 	fetch(apiUrl)
	// 		.then(function (response) {
	// 			if (response.ok) {
	// 				response.json().then(function (data) {
	// 					setSpyWeightedAmount(data.results[0].c);
	// 				});
	// 			} else {
	// 				alert("some sort of error occur");
	// 			}
	// 		})
	// 		.catch(function (error) {
	// 			alert("Huh, the API didn't work");
	// 		});
	// }, [])


	const weightedReturn =
		(curr / principal) ** (1 / (averageWeighted / 365)) * 100;

	return (
		<section>
			<article>
				<p>
					You have averaged {weightedReturn.toFixed(2).slice(1)}%
					annualized since the fund's inception
				</p>
				<p>The S&P returned something at some point</p>
			</article>
			<article>
				<p>You have invested {convertToMoney(principal.toString())}</p>
			</article>
		</section>
	);
};

export default WeightedReturn;
