import React, { useState } from "react";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";

import styles from "./Explanation.module.css";

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

function Explanation() {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button className={styles.btnEl} onClick={handleOpen}>
				Open modal
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
					<Box sx={style}>
						<Typography
							id="transition-modal-title"
							variant="h6"
							component="h2"
						>
							How getting the average day works
						</Typography>
						<Typography
							id="transition-modal-description"
							sx={{ mt: 2 }}
						>
							To calculate the average day, we take the amount and
							the date of each deposit. The amount for each
							deposit is divided by the total, giving the
							percentage of the principal that amount is. The date
							is used to calculate the difference between today
							and the date isself, expressed as an integer value.
							The difference and the percentage are then
							multiplied together for each deposit, and the
							resultsof those oeprations are summed.
						</Typography>
						<Button onClick={handleClose}>Close</Button>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}

export default Explanation;
