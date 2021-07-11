import React from "react";
import { Typography, Container, Grid, Paper } from "@material-ui/core";

export default function Customers() {
	return (
		<Container>
			<Grid container>
				<Grid md={5}>
					<Paper>customer info</Paper>
				</Grid>
				<Grid md={7}>
					<Paper>customers list</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}
