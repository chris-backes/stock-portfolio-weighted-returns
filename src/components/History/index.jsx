import React, { useState } from "react";
// import data from "../../assets/data.js";
import { convertToMoney } from "../../utils/utils.js";
import { grabStorage } from "../../utils/storage.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Input from '../Input'
import styles from "./History.module.css";

const History = () => {
	let storage = grabStorage()
	let [transactionHistory, setTransactionHistory] = useState(grabStorage())

	let displayData = transactionHistory.map((i) => {
		const temp = convertToMoney(i.amount);
		return {
			deposit: i.deposit,
			amount: temp,
		};
	});

	return (
		<TableContainer
			sx={{
				boxShadow: 10,
				borderRadius: 2,
				p: 3,
				maxWidth: 800,
			}}
			className={styles.containingEl}
		>
			<Input setTransactionHistory={setTransactionHistory} />
			<Table>
				<TableHead>
					<TableRow>
						<TableCell className={styles.cellHeadEl}>Date</TableCell>
						<TableCell className={styles.cellHeadEl}>Amount</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{displayData.map((i, x) => (
						<TableRow key={x}>
							<TableCell className={styles.cellEl}>{i.deposit}</TableCell>
							<TableCell className={styles.cellEl}>{i.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default History;
