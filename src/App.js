import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GeoMap from "./Pages/GeoMap_Home";
import AgentPage from "./Pages/Agent_Settings";
import Customers from "./Pages/Customers";
import Sellers from "./Pages/Sellers";
import EstateLands from "./Pages/EstateLands";
import Compare from "./Pages/LandCompare";
import Notes from "./Pages/Notes";
import Settings from "./Pages/Settings";
import AboutPage from "./Pages/AboutPage";

import Layout from "./Components/Layout";

import "./App.css";

function App() {
	return (
		<Router>
			<Layout>
				<Switch>
					<Route exact path="/" component={GeoMap} />
					<Route exact path="/agentpage" component={AgentPage} />
					<Route exact path="/customers" component={Customers} />
					<Route exact path="/sellers" component={Sellers} />
					<Route exact path="/estatelands" component={EstateLands} />
					<Route exact path="/compare" component={Compare} />
					<Route exact path="/notes" component={Notes} />
					<Route exact path="/settings" component={Settings} />
					<Route exact path="/about" component={AboutPage} />
				</Switch>
			</Layout>
		</Router>
	);
}

export default App;
