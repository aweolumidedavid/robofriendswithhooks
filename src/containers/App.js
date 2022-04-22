import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import { robots } from "../robots";
import "./App.css";

function App() {
	const [robots, setRobots] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((response) => response.json())
			.then((users) => {
				setRobots(users);
			});
	}, []);

	const onSearchChangeEvent = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredRobots = robots.filter((robot) => {
		return robot.name
			.toLocaleLowerCase()
			.includes(searchTerm.toLocaleLowerCase());
	});

	return !robots.length ? (
		<h1>Loading...</h1>
	) : (
		<div className="tc">
			<h1 className="f1">RoboFriends</h1>
			<SearchBox searchChange={onSearchChangeEvent} />
			<Scroll>
				<ErrorBoundary>
					<CardList robots={filteredRobots} />
				</ErrorBoundary>
			</Scroll>
		</div>
	);
}

export default App;
