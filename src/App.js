import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
// import MovieCard from "./components/MovieCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import SearchBar from './components/SearchBar';
let apiKey = process.env.REACT_APP_APIKEY;

function App() {
	let tempObj = {};
	let searchContents = '';
	const [keyword, setKeyword] = useState('');
	const [movieList, setMovieList] = useState(null);
	const [genreList, setGenreList] = useState({});
	const [searchList, setSearchList] = useState([]);
	const [searchText, setSearchText] = useState('');
	const getMovies = async () => {
		try {
			let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
			let data = await fetch(url);
			if (data.status !== 200) {
				throw new Error('data is wrong');
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
				throw new Error('data is wrong');
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

	const searchFilm = async (e) => {
		try {
			e.preventDefault();

			let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}`;
			let data = await fetch(url);
			if (data.status !== 200) {
				throw new Error('data is wrong');
			}
			let result = await data.json();
			setMovieList(result.results);
			console.log(result.results);
		} catch (err) {
			alert(err.message);
		}
	};
	const changeSearch = (e) => {
		setSearchText(e.target.value);
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
				<SearchBar searchFilm={searchFilm} changeSearch={changeSearch} />
				<h1 className="site-title">MooVeeDB</h1>
				{/* <div className="d-flex flex-wrap"> */}
				<Switch>
					<Route path="/" exact>
						<Form inline className="justify-content-center">
							<FormControl
								className="justify-content-center"
								onChange={(e) => {
									searchContents = e.target.value;
									setKeyword(searchContents);
								}}
								type="text"
								placeholder="Filter current list"
								className="mr-sm-2"
							/>
							{/* <Button variant="outline-success">Search</Button> */}
						</Form>
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
