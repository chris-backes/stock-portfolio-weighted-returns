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

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	maxWidth: 800,
	minWidth: 500,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function Input({ setTransactionHistory }) {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [formVals, setFormVals] = useState({
		deposit: "",
		amount: "",
	});

	const setStorage = ({ deposit, amount }) => {
		let res = JSON.parse(localStorage.getItem("transactions"));

		let newDep = setDate(deposit);
		let newAmt = setMoney(amount);

		res
			? res.push({ deposit: newDep, amount: newAmt })
			: (res = [{ deposit: newDep, amount: newAmt }]);
		
		//data gets sorted by date of the deposit. converting to Date object is probably suboptimal, but simple
		res.sort((a, b) => new Date(a.deposit) - new Date(b.deposit))
		//re-render the page
		setTransactionHistory(res)
		//put into memory
		localStorage.setItem("transactions", JSON.stringify(res));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormVals({
			...formVals,
			[name]: value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setStorage(formVals);
		handleClose();
	};

	return (
		<div className={styles.divEl}>
			<Button className={styles.btnEl} onClick={handleOpen}>
				Add new deposit
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
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
						onChange={handleChange}
					/>
					<TextField
						sx={{ my: 1 }}
						fullWidth
						id="amount"
						label="Amount"
						name="amount"
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						type="submit"
						onClick={handleSubmit}
					>
						Submit
					</Button>
					<Button variant="contained" onClick={handleClose}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Input;
