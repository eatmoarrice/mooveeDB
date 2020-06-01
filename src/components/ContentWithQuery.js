// import React from 'react';
// import { Form, FormControl } from 'react-bootstrap';
// import MovieList from './MovieList';
// import Pagination from './Pagination';
// import React, { useState, useEffect } from 'react';

// const apiKey = process.env.REACT_APP_APIKEY;

// export default function ContentWithQuery() {
// 	let tempObj = {};
// 	let searchContents = '';
// 	const [totalResults, setTotalResults] = useState(null);
// 	const [numberOfPages, setNumberOfPages] = useState(null);
// 	const [keyword, setKeyword] = useState('');
// 	const [movieList, setMovieList] = useState(null);
// 	const [genreList, setGenreList] = useState({});
// 	const [page, setPage] = useState(1);
// 	let sort = '';
// 	// let page = 1;

// 	const [searchText, setSearchText] = useState('');
// 	// const [category, setCategory] = useState('now_playing');
// 	let category = 'now_playing';
// 	const [currentList, setCurrentList] = useState('');
// 	const getMovies = async (page) => {
// 		try {
// 			let url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=${page}`;
// 			let data = await fetch(url);
// 			console.log(url);
// 			if (data.status !== 200) {
// 				throw new Error('data is wrong');
// 			}
// 			let result = await data.json();
// 			setMovieList(result.results);
// 			// setTotalResults(result.total_results);
// 			setNumberOfPages(result.total_pages);
// 			setCurrentList('now_playing');
// 			// console.log(result);
// 		} catch (err) {
// 			alert(err.message);
// 		}
// 	};
// 	const refreshList = (categ) => {
// 		category = categ;
// 		getMovies(1);
// 	};

// 	const getGenres = async () => {
// 		try {
// 			getMovies();
// 			let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`;
// 			let data = await fetch(url);

// 			if (data.status !== 200) {
// 				throw new Error('data is wrong');
// 			}
// 			let result = await data.json();
// 			result.genres.forEach((element) => {
// 				tempObj[element.id] = element.name;
// 				// console.log(tempObj);
// 			});
// 			setGenreList(tempObj);
// 		} catch (err) {
// 			alert(err.message);
// 		}

// 		// setGenreList(result)
// 	};

// 	const nextPage = (num) => {
// 		setPage(num);
// 		if (currentList == 'now_playing') {
// 			getMovies(num);
// 		} else if (currentList == 'movie') {
// 			searchFilm(num);
// 		}
// 	};
// 	const changeSearch = (e) => {
// 		setSearchText(e.target.value);
// 	};

// 	useEffect(() => {
// 		getGenres();
// 	}, []);

// 	if (movieList === null) {
// 		return <div>loading</div>;
// 	}
// 	return (
// 		<div>
// 			<Form inline className="justify-content-center">
// 				<FormControl
// 					className="justify-content-center"
// 					onChange={(e) => {
// 						searchContents = e.target.value;
// 						setKeyword(searchContents);
// 					}}
// 					type="text"
// 					placeholder="Filter current page"
// 					className="mr-sm-2"
// 				/>
// 			</Form>
// 			<MovieList movieList={movieList} genreList={genreList} filter={keyword} sort={sort} />
// 			<Pagination pages={numberOfPages} nextPage={nextPage} currentPage={page} />
// 		</div>
// 	);
// }
