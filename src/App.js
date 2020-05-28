import React, { useState, useEffect } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieCard from "./components/MovieCard";
import "bootstrap/dist/css/bootstrap.min.css";
let apiKey = process.env.REACT_APP_APIKEY;

function App() {
	let tempObj = {};
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
		} catch (err) {
			alert(err.message);
		}
	};

	const getGenres = async () => {
		try {
			let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
			let data = await fetch(url);
			if (data.status !== 200) {
				throw new Error("data is wrong");
			}
			let result = await data.json();
			console.log(result);
			result.genres.forEach((element) => {
				tempObj[element.id] = element.name;
				console.log(tempObj);
			});
			setGenreList(tempObj);
		} catch (err) {
			alert(err.message);
		}

		// setGenreList(result)
	};

	useEffect(() => {
		getMovies();
		getGenres();
	}, []);

	if (movieList === null) {
		return <div>loading</div>;
	}
	return (
		<div className="App">
			<h1>Hahahahaha Lioasjdost</h1>
			{/* <div className="d-flex flex-wrap"> */}
			<MovieList movieList={movieList} genreList={genreList} />
			{/* </div> */}
		</div>
	);
}

export default App;
