import React, { useState } from "react";
import { Backdrop, Box, Modal, Fade, Button, TextField } from "@mui/material";
import { setDate, setMoney } from '../../utils/utils.js'
import styles from "./Input.module.css";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	maxWidth: 700,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function Input() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [formVals, setFormVals] = useState({
		deposit: "",
		amount: "",
	});

	const setStorage = ({ deposit, amount }) => {
		let res = JSON.parse(localStorage.getItem("transactions"));

		let newDep = setDate(deposit)
		let newAmt = setMoney(amount)

		res.push({ deposit: newDep, amount: newAmt });
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
		setStorage(formVals)
	};

	return (
		<div className={styles.divEl}>
			<Button className={styles.btnEl} onClick={handleOpen}>
				Add new deposit
			</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
						<Box
							component="form"
							sx={style}
							noValidate
							autoComplete="off"
						>
							<TextField fullWidth
								id="deposit"
								label="Date"
								name='deposit'
								onChange={handleChange}
							/>
							<TextField fullWidth
								id="amount"
								label="Amount"
								name='amount'
								onChange={handleChange}
							/>
							<Button
								variant="contained"
								type="submit"
								onClick={handleSubmit}
							>
								Submit
							</Button>
						</Box>
				</Fade>
			</Modal>
		</div>
	);
}

export default Input;
