import React, { useState } from "react";
import {
	Button,
	Backdrop,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { setDate, setMoney } from "../../utils/utils.js";
import styles from "./Input.module.css";

function Input({ setTransactionHistory, setPortfolio }) {
	const [depositOpen, setDepositOpen] = useState(false);
	const handleDepositOpen = () => setDepositOpen(true);
	const handleDepositClose = () => setDepositOpen(false);

	const [currValOpen, setCurrValOpen] = useState(false);
	const handleCurrValOpen = () => setCurrValOpen(true);
	const handleCurrValClose = () => setCurrValOpen(false);

	const [formVals, setFormVals] = useState({
		deposit: "",
		amount: "",
	});

	const [currVal, setCurrVal] = useState('')

	const setDeptStorage = ({ deposit, amount }) => {
		let res = JSON.parse(localStorage.getItem("transactions"));

		let newDep = setDate(deposit);
		let newAmt = setMoney(amount);

		res
			? res.push({ deposit: newDep, amount: newAmt })
			: (res = [{ deposit: newDep, amount: newAmt }]);

		//data gets sorted by date of the deposit. converting to Date object is probably suboptimal, but simple
		res.sort((a, b) => new Date(a.deposit) - new Date(b.deposit));
		//re-render the page
		setTransactionHistory(res);
		//put into memory
		localStorage.setItem("transactions", JSON.stringify(res));
	};

	const setCurrValStorage = (value) => {
		localStorage.setItem('current-value', value)
	}

	const handleDeptChange = (e) => {
		const { name, value } = e.target;
		setFormVals({
			...formVals,
			[name]: value,
		});
	};

	const handleCurrValChange = (e) => {
		const { value } = e.target
		setCurrVal(value)
	}

	const handleDeptSubmit = (e) => {
		e.preventDefault();
		setDeptStorage(formVals);
		handleDepositClose();
	};

	const handleCurrValSubmit = (e) => {
		e.preventDefault()
		setCurrValStorage(currVal)
		handleCurrValClose()
	}

	return (
		<div className={styles.divEl}>
			<Button className={styles.btnEl} onClick={handleDepositOpen}>
				Add New Deposit
			</Button>
			<Button className={styles.btnEl} onClick={handleCurrValOpen}>
				Set Current Value
			</Button>
			<Dialog
				open={depositOpen}
				onClose={handleDepositClose}
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<DialogTitle>Add another deposit</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ mb: 3 }}>
						Input the date as 'mm/dd/yyyy' and the monetary amount
						is USD, without the dollar symbol or commas (either with
						or without decimal/cents)
					</DialogContentText>
					<TextField
						sx={{ my: 1 }}
						fullWidth
						id="deposit"
						label="Date"
						name="deposit"
						onChange={handleDeptChange}
					/>
					<TextField
						sx={{ my: 1 }}
						fullWidth
						id="amount"
						label="Amount"
						name="amount"
						onChange={handleDeptChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						type="submit"
						onClick={handleDeptSubmit}
					>
						Submit
					</Button>
					<Button variant="contained" onClick={handleDepositClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={currValOpen}
				onClose={handleCurrValClose}
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<DialogTitle>Add another deposit</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ mb: 3 }}>
						Input the date as 'mm/dd/yyyy' and the monetary amount
						is USD, without the dollar symbol or commas (either with
						or without decimal/cents)
					</DialogContentText>
					<TextField
						sx={{ my: 1 }}
						fullWidth
						id="currVal"
						label="current value"
						name="currVal"
						onChange={handleCurrValChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						type="submit"
						onClick={handleCurrValSubmit}
					>
						Submit
					</Button>
					<Button variant="contained" onClick={handleCurrValClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Input;
