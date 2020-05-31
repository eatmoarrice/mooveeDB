import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
// import MovieCard from "./components/MovieCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
let apiKey = process.env.REACT_APP_APIKEY;

function App() {
	let tempObj = {};
	let searchContents = '';
	const [totalResults, setTotalResults] = useState(null);
	const [numberOfPages, setNumberOfPages] = useState(null);
	const [keyword, setKeyword] = useState('');
	const [movieList, setMovieList] = useState(null);
	const [genreList, setGenreList] = useState({});
	const [page, setPage] = useState(1);
	// let page = 1;

	const [searchText, setSearchText] = useState('');
	const [currentList, setCurrentList] = useState('');
	const getMovies = async (page) => {
		try {
			let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${page}`;
			let data = await fetch(url);
			if (data.status !== 200) {
				throw new Error('data is wrong');
			}
			let result = await data.json();
			setMovieList(result.results);
			// setTotalResults(result.total_results);
			setNumberOfPages(result.total_pages);
			setCurrentList('now_playing');
			console.log(result);
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

	const searchFilm = async (page) => {
		try {
			let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}&page=${page}`;
			let data = await fetch(url);
			if (data.status !== 200) {
				throw new Error('data is wrong');
			}
			let result = await data.json();
			setMovieList(result.results);
			setNumberOfPages(result.total_pages);
			setCurrentList('movie');
			// setTotalFilms(result.total_results);
			console.log(result);
		} catch (err) {
			alert(err.message);
		}
	};

	const nextPage = (num) => {
		setPage(num);
		if (currentList == 'now_playing') {
			getMovies(num);
		} else if (currentList == 'movie') {
			searchFilm(num);
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
								placeholder="Filter current page"
								className="mr-sm-2"
							/>
							{/* <Button variant="outline-success">Search</Button> */}
						</Form>
						<MovieList movieList={movieList} genreList={genreList} filter={keyword} />
						<Pagination pages={numberOfPages} nextPage={nextPage} currentPage={page} />
					</Route>
					<Route path="/movie/:id" component={MovieDetails}></Route>
					{/* </div> */}
				</Switch>
			</div>
		</Router>
	);
}

export default App;
