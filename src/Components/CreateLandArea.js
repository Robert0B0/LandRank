import React, { useState } from "react";
import {
	Container,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Button,
	Fab,
	makeStyles,
	Typography,
	Input,
	InputLabel,
	OutlinedInput,
	InputAdornment,
	TextField,
	FormControl,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RoomIcon from "@material-ui/icons/Room";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import InfoIcon from "@material-ui/icons/Info";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	list: {
		marginTop: theme.spacing(1),
		overflow: "auto",
		maxHeight: 450,
		maxWidth: 400,
	},
	area: {
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(2),
	},
	addIcon: {
		marginRight: theme.spacing(1),
	},
	removeIcon: {
		marginLeft: theme.spacing(2),
	},
	noMarker: {
		marginTop: theme.spacing(20),
	},
	backIcon: {
		marginLeft: theme.spacing(1),
	},
	form: {
		marginTop: theme.spacing(5),
	},
}));

export default function CreateLandArea({ markers, setMarkers, areaMeasure }) {
	const classes = useStyles();
	const [nextStep, setNextStep] = useState(false);

	return (
		<Container>
			{!nextStep ? (
				<Container>
					<Fab
						variant="extended"
						color="primary"
						disabled={markers.length < 3 ? true : false}
						onClick={() => setNextStep(true)}
					>
						<AddIcon />
						Next
					</Fab>
					<Fab
						variant="extended"
						color="secondary"
						className={classes.removeIcon}
						onClick={() => setMarkers([])}
					>
						<HighlightOffIcon />
						Clear markers
					</Fab>
					<TextField
						disabled
						className={classes.area}
						id="standard-number"
						label="Land Area"
						type="number"
						value={areaMeasure}
						InputLabelProps={{
							shrink: true,
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">m^2</InputAdornment>
							),
						}}
					/>
					<List className={classes.list}>
						{markers.length > 0 ? (
							markers.map((marker) => (
								<ListItem key={marker.time} button>
									<ListItemIcon>
										<RoomIcon />#
									</ListItemIcon>
									<ListItemText>lat: {marker.lat}</ListItemText>
									<ListItemText>lng: {marker.lng}</ListItemText>
								</ListItem>
							))
						) : (
							<Typography variant="h4" className={classes.noMarker}>
								Place at least 3 <RoomIcon /> markers on map
							</Typography>
						)}
					</List>
				</Container>
			) : (
				<Container>
					<Fab variant="extended" color="primary">
						<AddIcon className={classes.addIcon} />
						Add Area
					</Fab>
					<Fab
						variant="extended"
						className={classes.backIcon}
						onClick={() => setNextStep(false)}
					>
						<ArrowBackIcon />
						Back
					</Fab>
					<FormControl variant="outlined" className={classes.form}>
						<InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
						<OutlinedInput
							id="outlined-adornment-amount"
							value={"value"}
							/* onChange={handleChange("amount")} */
							startAdornment={
								<InputAdornment position="start">$</InputAdornment>
							}
							labelWidth={60}
						/>
					</FormControl>
				</Container>
			)}
		</Container>
	);
}
