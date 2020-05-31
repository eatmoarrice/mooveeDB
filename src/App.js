import React, { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
// import MovieCard from "./components/MovieCard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, FormControl, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
let apiKey = process.env.REACT_APP_APIKEY;

function App() {
	let tempObj = {};
	let searchContents = "";
	const [keyword, setKeyword] = useState("");
	const [movieList, setMovieList] = useState(null);
	const [genreList, setGenreList] = useState({});
	const getMovies = async () => {
		try {
			let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
			let data = await fetch(url);
			if (data.status !== 200) {
				throw new Error("data is wrong");
			}
			let result = await data.json();
			setMovieList(result.results);
			console.log(result.results);
		} catch (err) {
			alert(err.message);
		}
	};

	const getGenres = async () => {
		try {
			getMovies();
			let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
			let data = await fetch(url);
			if (data.status !== 200) {
				throw new Error("data is wrong");
			}
			let result = await data.json();
			result.genres.forEach((element) => {
				tempObj[element.id] = element.name;
				// console.log(tempObj);
			});
			setGenreList(tempObj);
		} catch (err) {
			alert(err.message);
		}

		// setGenreList(result)
	};

	useEffect(() => {
		getGenres();
	}, []);

	if (movieList === null) {
		return <div>loading</div>;
	}
	return (
		<Router>
			<div className="App">
				<Form inline>
					<FormControl
						onChange={(e) => {
							searchContents = e.target.value;
							setKeyword(searchContents);
						}}
						type="text"
						placeholder="Search"
						className="mr-sm-2"
					/>
					<Button variant="outline-success">Search</Button>
				</Form>
				<h1>MooVeeDB</h1>
				{/* <div className="d-flex flex-wrap"> */}
				<Switch>
					<Route path="/" exact>
						<MovieList movieList={movieList} genreList={genreList} filter={keyword} />
					</Route>
					<Route path="/movie/:id" component={MovieDetails}></Route>
					{/* </div> */}
				</Switch>
			</div>
		</Router>
	);
}

export default App;
