import React from "react";
import { Backdrop, Box, Modal, Fade, Button, Typography } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	minWidth: 400,
	maxWidth: 1000,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

function FirstTime({ open, setOpen }) {
	const handleClose = () => setOpen(false);
	return (
		<Modal
			aria-labelledby="how-to-modal"
			aria-describedby="how-to-modal"
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
						id="how-to-modal-title"
						variant="h6"
						component="h2"
					>
						It looks like it might be your first time here
					</Typography>
					<Typography id="how-to-modal-description-1" sx={{ mt: 2 }}>
						The first thing we are going to want to do is explain
						how it works. You put in the deposits you've made into
						you account, along with the dates. Along with that, you
						will need to input the current value of your portfolio.
					</Typography>
					<Typography id="how-to-modal-description-2" sx={{ mt: 2 }}>
						Once you have comepleted that, the page takes care of
						the rest! You can input your information, and when you
						come back next time, it will be there waiting. We will
						also calculate the annualized returns for you. We do
						that by averaging out the length of time your deposits
						have been in your account, and weight them according to
						the size of each deposit as a percentage of the whole.
					</Typography>
					<Typography id="how-to-modal-description-2" sx={{ mt: 2 }}>
						Until you put that information in, the page is going to
						look a bit weird probably. So let's get started by
						inputting the current value of your portfolio, and just
						one deposit.
					</Typography>
					<Button onClick={handleClose}>Close</Button>
				</Box>
			</Fade>
		</Modal>
	);
}

export default FirstTime;
