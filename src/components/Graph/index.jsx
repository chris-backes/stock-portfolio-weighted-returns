import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Button } from "@mui/material";
import styles from "./Graph.module.css";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

function Graph({ graphData }) {
	const [whichReturns, setWhichReturns] = useState(true);

	function changeState(e) {
		if (e.target.innerText === "ANNUALIZED") {
			setWhichReturns(true);
		} else {
			setWhichReturns(false);
		}
	}
	const chartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
                labels: {
                    font: {
                        family: "Radio Canada",
                        size: 15
                    }
                }
			},
			title: {
				display: true,
				text: "Returns",
                font: {
                    family: "Radio Canada",
                    size: 20
                }
			},
		},
		scales: {
			y: {
				ticks: {
					callback: (label) => `${label}%`,
                    font: {
                        family: "Radio Canada",
                        size: 15
                    }
				},
			},
            x: {
				ticks: {
                    font: {
                        family: "Radio Canada",
                        size: 15
                    }
				},
			},
		},
	};

	const dataSets = {
		labels: ["Personal", "S&P", "NASADAQ"],
		datasets: [
			{
				label: whichReturns ? "Annualized Returns" : "Total Returns",
				data: whichReturns
					? graphData.weighted.map((i) => i.toFixed(2))
					: graphData.total.map((i) => i.toFixed(2)),
				backgroundColor: "#e1ce7a",
			},
		],
	};

	return (
		<>
			<Bar options={chartOptions} data={dataSets} />
			<div className={styles.divEl}>
				<Button className={styles.btnEl} onClick={changeState}>Annualized</Button>
				<Button className={styles.btnEl} onClick={changeState}>Total</Button>
			</div>
		</>
	);
}

export default Graph;
