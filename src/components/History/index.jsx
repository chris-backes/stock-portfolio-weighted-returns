import React, { useState } from "react";
import { convertToMoney } from "../../utils/utils.js";
import { grabStorage } from "../../utils/storage.js";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Input from "../Input";
import styles from "./History.module.css";

const History = ({ setPortfolio }) => {
	const [transactionHistory, setTransactionHistory] = useState(grabStorage());

	const displayData = transactionHistory.map((i) => {
		const temp = convertToMoney(i.amount);
		return {
			deposit: i.deposit,
			amount: temp,
		};
	});

	const handleDelete = (e) => {
		const i =e.currentTarget.id
		let res = [...transactionHistory]
		res.splice(i, 1)
		localStorage.setItem('transactions', JSON.stringify(res))
		setTransactionHistory(grabStorage())
	}

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
			<Input setTransactionHistory={setTransactionHistory} setPortfolio={setPortfolio}/>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell className={styles.cellHeadEl}>
							Date
						</TableCell>
						<TableCell className={styles.cellHeadEl}>
							Amount
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{displayData.map((i, x) => (
						<TableRow key={x}>
							<TableCell className={styles.cellEl}>
								{i.deposit}
							</TableCell>
							<TableCell className={styles.cellEl}>
								{i.amount}
							</TableCell>
							<TableCell className={styles.cellEl}>
								<IconButton id={x} aria-label="delete" onClick={handleDelete}>
									<DeleteIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default History;
