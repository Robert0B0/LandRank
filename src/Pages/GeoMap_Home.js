import React, { useState, useCallback, useRef, useEffect } from "react";
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
	Polygon,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import { formatRelative } from "date-fns";

import mapStyles from "../mapStyles";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxOption,
	ComboboxList,
} from "@reach/combobox";
import { Grid } from "@material-ui/core";
import CreateLandArea from "../Components/CreateLandArea";

const libraries = ["places"];
const mapContainerStyle = {
	width: "57vw",
	height: "80vh",
};
const mapSettings = {
	center: {
		lat: 46.77121,
		lng: 23.623634,
	},
	zoom: 12,
	options: {
		styles: mapStyles,
		disableDefaultUI: true,
		zoomControl: true,
		mapTypeControl: true,
	},
};

export default function GeoMap() {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
		libraries,
	});
	const [markers, setMarkers] = useState([]);

	useEffect(() => {}, [markers]);

	const markerTest = [
		{ id: 1, lat: 46.77121, lng: 23.623634 },
		{ id: 2, lat: 46.77121, lng: 23.623634 },
		{ id: 3, lat: 46.77121, lng: 23.623634 },
		{ id: 4, lat: 46.77121, lng: 23.623634 },
		{ id: 5, lat: 46.77121, lng: 23.623634 },
		{ id: 6, lat: 46.77121, lng: 23.623634 },
		{ id: 7, lat: 46.77121, lng: 23.623634 },
		{ id: 8, lat: 46.77121, lng: 23.623634 },
		{ id: 9, lat: 46.77121, lng: 23.623634 },
		{ id: 10, lat: 46.77121, lng: 23.623634 },
		{ id: 10, lat: 46.77121, lng: 23.623634 },
		{ id: 10, lat: 46.77121, lng: 23.623634 },
		{ id: 10, lat: 46.77121, lng: 23.623634 },
	];
	const [areaMeasure, setAreaMeasure] = useState(123);

	const [coords, setCoords] = useState([]);
	const [selected, setSelected] = useState(null);
	const onMapClick = useCallback((event) => {
		setMarkers((current) => [
			...current,
			{
				lat: event.latLng.lat(),
				lng: event.latLng.lng(),
				time: new Date(),
			},
		]);
	}, []);

	const mapRef = useRef();
	const onMapLoad = useCallback((map) => {
		mapRef.current = map;
	}, []);

	if (loadError) return "Error loading maps";
	if (!isLoaded) return "Loading maps";
	return (
		<Grid container spacing={1}>
			<Grid xs={8}>
				<GoogleMap
					mapContainerStyle={mapContainerStyle}
					zoom={mapSettings.zoom}
					center={mapSettings.center}
					options={mapSettings.options}
					onClick={onMapClick}
					onLoad={onMapLoad}
				>
					{markers.map((marker) => (
						<Marker
							key={marker.time.toISOString()}
							position={{ lat: marker.lat, lng: marker.lng }}
							/* icon={{
									url: "/blueMark.png",
								scaledSize: new window.google.maps.Size(30, 30),
								origin: new window.google.maps.Point(0, 0),
								anchor: new window.google.maps.Point(15, 15),
							}} */
							draggable={true}
							onClick={() => setSelected(marker)}
							onDragEnd={() => {
								console.log(this.latLng.lat());
							}}
						/>
					))}
					{selected && (
						<InfoWindow
							position={{ lat: selected.lat, lng: selected.lng }}
							onCloseClick={() => setSelected(null)}
						>
							<div>
								<h2>your placement</h2>
								<p>Placed at {formatRelative(selected.time, new Date())}</p>
							</div>
						</InfoWindow>
					)}
					<Polygon
						path={markers}
						options={{
							fillColor: "#000",
							fillOpacity: 0.4,
							strokeColor: "#000",
							strokeOpacity: 1,
							strokeWeight: 1,
						}}
						onClick={() => {
							console.log("ahmet");
						}}
					/>
				</GoogleMap>
			</Grid>
			<Grid xs={4} border>
				<CreateLandArea {...{ markers, setMarkers, areaMeasure }} />
			</Grid>
		</Grid>
	);
}
